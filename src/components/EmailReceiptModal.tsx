import React from 'react';
import { useSalon } from '../context/SalonContext';
import { X, CheckCircle, MapPin, Calendar, Scissors, Sparkles, Mail, Printer } from 'lucide-react';

export const EmailReceiptModal: React.FC = () => {
  const { activeReceiptAppointment, setActiveReceiptAppointment } = useSalon();

  if (!activeReceiptAppointment) return null;

  const apt = activeReceiptAppointment;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 text-stone-800">
        
        {/* Email client chrome header */}
        <div className="bg-stone-100 px-6 py-3 border-b border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[#B76E79]" />
            <span>Wave Bar Appointment Details</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
            >
              <Printer className="w-3 h-3" />
              <span>Print</span>
            </button>
            <button
              onClick={() => setActiveReceiptAppointment(null)}
              className="text-stone-500 hover:text-stone-900"
              aria-label="Close email receipt"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Email Content Container */}
        <div className="p-8 space-y-6">
          {/* Email Header */}
          <div className="text-center space-y-3 pb-6 border-b border-stone-100">
            <img
              src="/images/wavebar-logo.jpg"
              alt="Wave Bar"
              className="h-10 mx-auto object-contain mix-blend-multiply"
            />
            <p className="text-xs uppercase tracking-widest text-[#B76E79] font-medium">
              Reservation Confirmation · #{apt.code}
            </p>
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Your Appointment Details
            </h2>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Dear {apt.clientName}, thank you for contacting Wave Bar.
            </p>
          </div>

          {/* Booking Summary Box */}
          <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#E8D5B7]/60 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8D5B7]/40 pb-3">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
                  Service
                </span>
                <div className="text-base font-semibold text-stone-900 mt-0.5">
                  {apt.serviceName}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
                  Price
                </span>
                <div className="text-base font-semibold text-[#B76E79] mt-0.5">
                  Rs. {apt.price.toLocaleString('en-PK')}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-stone-400 block mb-1">Artist</span>
                <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-[#C9A27C]" />
                  {apt.stylistName}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block mb-1">Date</span>
                <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C9A27C]" />
                  {apt.date}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block mb-1">Time</span>
                <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A27C]" />
                  {apt.time}
                </span>
              </div>
            </div>

            {apt.notes && (
              <div className="pt-3 border-t border-[#E8D5B7]/40 text-xs">
                <span className="text-stone-400 block mb-1">Special Consultation Notes:</span>
                <p className="text-stone-700 italic">“{apt.notes}”</p>
              </div>
            )}
          </div>

          {/* Salon Sanctuary Hospitality Note */}
          <div className="text-xs text-stone-500 space-y-2 bg-stone-50 p-4 rounded-xl">
            <div className="font-semibold text-stone-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#B76E79]" />
              <span>Salon Location</span>
            </div>
            <p>
              10th Commercial Ln, Zamzama Commercial Area, Defence V, Karachi 75500, Pakistan.
            </p>
          </div>

          {/* Footer controls */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-stone-400">
              Need to confirm your appointment? Call +92 319 9283227.
            </span>
            <button
              onClick={() => setActiveReceiptAppointment(null)}
              className="px-5 py-2 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-semibold cursor-pointer"
            >
              Close Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
