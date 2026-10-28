import React, { useState, useEffect } from 'react';
import { useSalon } from '../context/SalonContext';
import { X, Check, Clock, Calendar, User, Sparkles, ChevronRight, ChevronLeft, Download, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BookingModal: React.FC = () => {
  const {
    isBookingOpen,
    setIsBookingOpen,
    services,
    stylists,
    preselectedServiceId,
    bookAppointment,
    setActiveReceiptAppointment,
  } = useSalon();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedStylistId, setSelectedStylistId] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  // Pre-fill next 7 calendar dates for convenient booking
  const availableDates: { value: string; label: string; weekday: string }[] = [];
  const today = new Date();
  for (let i = 1; i <= 10; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    // Skip Mondays
    if (d.getDay() !== 1) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const dateString = `${yyyy}-${mm}-${dd}`;
      const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      availableDates.push({ value: dateString, label, weekday });
    }
  }

  const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '12:30 PM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
  ];

  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
      setStep(2);
    } else if (services.length > 0 && !selectedServiceId) {
      setSelectedServiceId(services[0].id);
    }
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0].value);
    }
    if (!selectedTime) {
      setSelectedTime(timeSlots[1]);
    }
  }, [preselectedServiceId, services, isBookingOpen]);

  if (!isBookingOpen) return null;

  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];
  const currentStylist = stylists.find((s) => s.id === selectedStylistId);

  const handleNextStep = () => {
    setBookingError(null);
    if (step === 1 && !selectedServiceId) {
      setBookingError('Please select a service to continue.');
      return;
    }
    if (step === 3 && (!selectedDate || !selectedTime)) {
      setBookingError('Please select both a date and time slot.');
      return;
    }
    if (step === 4) {
      handleSubmitBooking();
      return;
    }
    setStep((prev) => (prev + 1) as any);
  };

  const handlePrevStep = () => {
    setBookingError(null);
    if (step > 1) {
      setStep((prev) => (prev - 1) as any);
    }
  };

  const handleSubmitBooking = async () => {
    if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim()) {
      setBookingError('Please fill in your name, email, and phone number.');
      return;
    }
    setSubmitting(true);
    setBookingError(null);

    const result = await bookAppointment({
      clientName,
      clientEmail,
      clientPhone,
      serviceId: selectedServiceId,
      stylistId: selectedStylistId,
      date: selectedDate,
      time: selectedTime,
      notes,
    });

    setSubmitting(false);

    if (result.success && result.appointment) {
      setConfirmedBooking(result.appointment);
      setStep(5);
      // Trigger rose gold celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B76E79', '#C9A27C', '#E8D5B7', '#2C2C2C'],
        });
      } catch (err) {
        // ignore if canvas blocked
      }
    } else {
      setBookingError(result.error || 'Failed to confirm booking. Please try another time slot.');
    }
  };

  const resetAndClose = () => {
    setIsBookingOpen(false);
    setTimeout(() => {
      setStep(1);
      setConfirmedBooking(null);
      setBookingError(null);
    }, 300);
  };

  const downloadIcsCalendar = () => {
    if (!confirmedBooking) return;
    const dateParts = confirmedBooking.date.split('-');
    const [time, meridiem] = confirmedBooking.time.split(' ');
    const [hourText, minuteText] = time.split(':');
    const hour = (Number(hourText) % 12) + (meridiem === 'PM' ? 12 : 0);
    const start = new Date(Date.UTC(
      Number(dateParts[0]),
      Number(dateParts[1]) - 1,
      Number(dateParts[2]),
      hour,
      Number(minuteText),
    ));
    const end = new Date(start.getTime() + confirmedBooking.durationMinutes * 60_000);
    const formatIcsDateTime = (date: Date) =>
      `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, '0')}${String(date.getUTCDate()).padStart(2, '0')}T${String(date.getUTCHours()).padStart(2, '0')}${String(date.getUTCMinutes()).padStart(2, '0')}00`;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wave Bar Salon//Appointment//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Wave Bar Salon: ${confirmedBooking.serviceName}`,
      `DESCRIPTION:Appointment with ${confirmedBooking.stylistName} at Wave Bar Salon. Code: ${confirmedBooking.code}`,
      'LOCATION:10th Commercial Ln, Zamzama Commercial Area, Defence V, Karachi 75500, Pakistan',
      `DTSTART;TZID=Asia/Karachi:${formatIcsDateTime(start)}`,
      `DTEND;TZID=Asia/Karachi:${formatIcsDateTime(end)}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `WaveBar-Appointment-${confirmedBooking.code}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#E8D5B7] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#E8D5B7]/60 bg-white/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-gold-gradient flex items-center justify-center text-white text-xs font-bold shadow-xs">
              WB
            </div>
            <div>
              <h2 className="text-lg font-serif font-semibold text-[#2C2C2C]">
                Reserve Your Appointment
              </h2>
              <p className="text-xs text-[#6B6B6B]">
                Step {step} of 5 · {step === 1 && 'Select Ritual'}
                {step === 2 && 'Select Stylist'}
                {step === 3 && 'Date & Time'}
                {step === 4 && 'Guest Details'}
                {step === 5 && 'Confirmation'}
              </p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 rounded-full text-[#6B6B6B] hover:text-[#2C2C2C] hover:bg-[#E8D5B7]/30 transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress indicator */}
        <div className="w-full bg-[#E8D5B7]/30 h-1">
          <div
            className="bg-rose-gold-gradient h-1 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {bookingError && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
              <span>{bookingError}</span>
              <button
                onClick={() => setBookingError(null)}
                className="text-rose-500 hover:text-rose-800"
              >
                ✕
              </button>
            </div>
          )}

          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#6B6B6B] font-semibold">
                  Choose Your Service
                </span>
                <span className="text-xs text-[#B76E79]">
                  {services.length} services available
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {services.map((service) => {
                  const isSelected = selectedServiceId === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#B76E79] bg-white shadow-md ring-1 ring-[#B76E79]/50'
                          : 'border-[#E8D5B7]/60 bg-white/70 hover:border-[#C9A27C] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-[#2C2C2C]">
                              {service.name}
                            </span>
                            {service.badge && (
                              <span className="text-[10px] text-[#B76E79] font-medium tracking-wide">
                                · {service.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#6B6B6B] leading-relaxed">
                            {service.description}
                          </p>
                          <div className="text-xs font-semibold text-[#2C2C2C] pt-1">
                            Rs. {service.price.toLocaleString('en-PK')}
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-colors ${
                            isSelected
                              ? 'bg-[#B76E79] border-[#B76E79] text-white'
                              : 'border-[#C9A27C]/50'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Select Stylist */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#6B6B6B] font-semibold">
                  Select a Wave Bar Artist
                </span>
                <p className="text-xs text-[#6B6B6B] mt-1">
                  Choose a team member or select the first available artist.
                </p>
              </div>

              {/* Any Stylist Option */}
              <div
                onClick={() => setSelectedStylistId('any')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedStylistId === 'any'
                    ? 'border-[#B76E79] bg-white shadow-md ring-1 ring-[#B76E79]/50'
                    : 'border-[#E8D5B7]/60 bg-white/70 hover:border-[#C9A27C]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E8D5B7]/40 flex items-center justify-center text-[#2C2C2C]">
                    <Sparkles className="w-6 h-6 text-[#C9A27C]" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#2C2C2C]">
                      First Available Artist
                    </div>
                    <div className="text-xs text-[#6B6B6B]">
                      The Wave Bar team will assign an available artist
                    </div>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                    selectedStylistId === 'any'
                      ? 'bg-[#B76E79] border-[#B76E79] text-white'
                      : 'border-[#C9A27C]/50'
                  }`}
                >
                  {selectedStylistId === 'any' && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>

              {/* Individual Stylists */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {stylists.map((stylist) => {
                  const isSelected = selectedStylistId === stylist.id;
                  return (
                    <div
                      key={stylist.id}
                      onClick={() => setSelectedStylistId(stylist.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer text-center flex flex-col items-center ${
                        isSelected
                          ? 'border-[#B76E79] bg-white shadow-md ring-1 ring-[#B76E79]/50'
                          : 'border-[#E8D5B7]/60 bg-white/70 hover:border-[#C9A27C]'
                      }`}
                    >
                      <div className="relative mb-3">
                        <div
                          aria-label={stylist.name}
                          className="w-16 h-16 rounded-full bg-[#F9F6F2] border-2 border-[#E8D5B7] flex items-center justify-center text-xl font-serif text-[#B76E79]"
                        >
                          {stylist.name.slice(0, 1)}
                        </div>
                        {isSelected && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#B76E79] text-white flex items-center justify-center text-[10px]">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <div className="font-semibold text-xs text-[#2C2C2C]">
                        {stylist.name}
                      </div>
                      <div className="text-[11px] text-[#B76E79] font-medium mb-1">
                        {stylist.role}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time Picker */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#6B6B6B] font-semibold">
                  Select Date
                </span>
                <p className="text-xs text-[#6B6B6B] mt-1">
                  Choose a preferred date and time. Please confirm availability with Wave Bar.
                </p>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                {availableDates.map((item) => {
                  const isSelected = selectedDate === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setSelectedDate(item.value)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#B76E79] bg-white shadow-sm ring-1 ring-[#B76E79]'
                          : 'border-[#E8D5B7]/60 bg-white/60 hover:bg-white'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-semibold text-[#6B6B6B]">
                        {item.weekday}
                      </div>
                      <div
                        className={`text-sm font-bold mt-1 ${
                          isSelected ? 'text-[#B76E79]' : 'text-[#2C2C2C]'
                        }`}
                      >
                        {item.label}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-[#6B6B6B] font-semibold">
                  Select Time Slot
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-3">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-3 px-4 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          isSelected
                            ? 'bg-rose-gold-gradient text-white border-transparent shadow-sm'
                            : 'bg-white border-[#E8D5B7]/60 text-[#2C2C2C] hover:border-[#C9A27C]'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Client Details */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#6B6B6B] font-semibold">
                  Client & Contact Information
                </span>
                <p className="text-xs text-[#6B6B6B] mt-1">
                  We will send your luxury booking confirmation and reminder to this email and phone.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#2C2C2C]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Charlotte Dubois"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8D5B7] bg-white text-sm text-[#2C2C2C] placeholder-[#6B6B6B]/60 focus:outline-none focus:ring-1 focus:ring-[#B76E79]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#2C2C2C]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="charlotte@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8D5B7] bg-white text-sm text-[#2C2C2C] placeholder-[#6B6B6B]/60 focus:outline-none focus:ring-1 focus:ring-[#B76E79]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#2C2C2C]">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 3XX XXXXXXX"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8D5B7] bg-white text-sm text-[#2C2C2C] placeholder-[#6B6B6B]/60 focus:outline-none focus:ring-1 focus:ring-[#B76E79]"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#2C2C2C]">
                    Hair Goals & Special Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your hair length, prior color treatments, or desired look..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-[#E8D5B7] bg-white text-sm text-[#2C2C2C] placeholder-[#6B6B6B]/60 focus:outline-none focus:ring-1 focus:ring-[#B76E79]"
                  />
                </div>
              </div>

              {/* Order Summary Recap */}
              <div className="mt-4 p-4 rounded-2xl bg-[#E8D5B7]/20 border border-[#E8D5B7]/50 space-y-2 text-xs">
                <div className="flex justify-between text-[#2C2C2C] font-semibold">
                  <span>{currentService?.name}</span>
                  <span>Rs. {currentService?.price.toLocaleString('en-PK')}</span>
                </div>
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Artist: {currentStylist?.name || 'First Available Artist'}</span>
                  <span>Wave Bar, Karachi</span>
                </div>
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Date & Time: {selectedDate} at {selectedTime}</span>
                  <span className="text-[#B76E79] font-medium">No deposit required</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Booking Confirmed */}
          {step === 5 && confirmedBooking && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#B76E79] font-semibold">
                  Reservation Confirmed
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#2C2C2C]">
                  We look forward to welcoming you, {confirmedBooking.clientName}
                </h3>
                <p className="text-xs text-[#6B6B6B] max-w-md mx-auto">
                  Your appointment code is{' '}
                  <span className="font-mono font-bold text-[#2C2C2C] px-2 py-0.5 bg-[#E8D5B7]/40 rounded-md">
                    {confirmedBooking.code}
                  </span>
                  . A confirmation summary has been registered.
                </p>
              </div>

              {/* Appointment summary card */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8D5B7] text-left max-w-md mx-auto space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-[#E8D5B7]/50">
                  <span className="text-[#6B6B6B]">Service</span>
                  <span className="font-semibold text-[#2C2C2C]">{confirmedBooking.serviceName}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#E8D5B7]/50">
                  <span className="text-[#6B6B6B]">Stylist</span>
                  <span className="font-semibold text-[#2C2C2C]">{confirmedBooking.stylistName}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#E8D5B7]/50">
                  <span className="text-[#6B6B6B]">Date & Time</span>
                  <span className="font-semibold text-[#2C2C2C]">
                    {confirmedBooking.date} · {confirmedBooking.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Location</span>
                  <span className="font-semibold text-[#2C2C2C]">Zamzama Commercial Area, Karachi</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setActiveReceiptAppointment(confirmedBooking);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#B76E79] text-[#B76E79] hover:bg-[#B76E79] hover:text-white transition-colors text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>View Email Receipt</span>
                </button>
                <button
                  onClick={downloadIcsCalendar}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-rose-gold-gradient text-white text-xs font-semibold shadow-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Add to Calendar (.ics)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step < 5 && (
          <div className="px-6 sm:px-8 py-4 bg-[#F9F6F2] border-t border-[#E8D5B7]/60 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 text-xs font-medium text-[#6B6B6B] hover:text-[#2C2C2C] flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              disabled={submitting}
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-full bg-rose-gold-gradient hover:bg-rose-gold-gradient-hover text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <span>Confirming...</span>
              ) : step === 4 ? (
                <span>Complete Reservation</span>
              ) : (
                <>
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="px-6 sm:px-8 py-4 bg-[#F9F6F2] border-t border-[#E8D5B7]/60 flex justify-center">
            <button
              type="button"
              onClick={resetAndClose}
              className="px-8 py-2.5 rounded-full bg-[#2C2C2C] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
