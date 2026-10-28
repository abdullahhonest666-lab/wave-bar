import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';
import { MapPin, Phone, Mail, Clock, Instagram, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { submitContact } = useSalon();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceInterest, setServiceInterest] = useState('Signature Waves & Blowout');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitting(true);
    const res = await submitContact({
      name,
      email,
      phone,
      serviceInterest,
      message,
    });
    setIsSubmitting(false);
    if (res.success) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-[#B76E79] font-semibold">
          Concierge & Inquiries
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C2C2C]">
          Connect with Our Sanctuary
        </h1>
        <p className="text-sm text-[#6B6B6B] leading-relaxed">
          Whether planning a bridal experience, inquiring about bespoke coloring, or requesting private event bookings, our concierge is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Col: Contact Information */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-3xl bg-white border border-[#E8D5B7]/60 luxury-card-shadow space-y-6">
            <h2 className="text-xl font-serif font-bold text-[#2C2C2C]">
              Sanctuary Details
            </h2>

            <div className="space-y-4 text-xs text-[#2C2C2C]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-sm">Beverly Hills Location</span>
                  <span className="text-[#6B6B6B]">742 Ocean Promenade, Suite 400<br />Beverly Hills, CA 90210</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-sm">Direct Line & WhatsApp</span>
                  <a href="tel:3105559283" className="text-[#6B6B6B] hover:text-[#B76E79]">
                    (310) 555-WAVE (9283)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-sm">Concierge Email</span>
                  <a href="mailto:concierge@wavebarsalon.com" className="text-[#6B6B6B] hover:text-[#B76E79]">
                    concierge@wavebarsalon.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-sm">Opening Hours</span>
                  <div className="text-[#6B6B6B] space-y-1 mt-1">
                    <div>Tuesday – Friday: 9:00 AM – 7:00 PM</div>
                    <div>Saturday: 9:00 AM – 6:00 PM</div>
                    <div>Sunday – Monday: Private VIP & Bridal Buyouts</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E8D5B7]/40">
                <a
                  href="https://www.instagram.com/wavebar__"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#B76E79] hover:text-[#2C2C2C] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram: @wavebar__</span>
                </a>
              </div>
            </div>
          </div>

          {/* Valet & Parking Note */}
          <div className="p-6 rounded-2xl bg-[#E8D5B7]/25 border border-[#E8D5B7]/60 text-xs text-[#2C2C2C] space-y-2">
            <span className="font-semibold block">Complimentary Valet Parking</span>
            <p className="text-[#6B6B6B] leading-relaxed">
              Arrive at the circular driveway at 742 Ocean Promenade. Inform the attendant you are visiting Wave Bar for priority complimentary parking.
            </p>
          </div>
        </div>

        {/* Right Col: Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E8D5B7]/60 luxury-card-shadow">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-2xl font-serif font-bold text-[#2C2C2C]">
                  Message Received
                </h3>
                <p className="text-xs text-[#6B6B6B] max-w-md mx-auto">
                  Thank you for reaching out to Wave Bar. Our salon concierge will review your inquiry and connect with you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="px-6 py-2.5 rounded-full border border-[#B76E79] text-[#B76E79] text-xs font-semibold cursor-pointer hover:bg-[#B76E79] hover:text-white transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#2C2C2C]">
                    Send a Concierge Inquiry
                  </h2>
                  <p className="text-xs text-[#6B6B6B] mt-1">
                    Inquire about custom appointments, bridal packages, or private salon events.
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
                      placeholder="e.g. Victoria Sterling"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8D5B7] bg-white text-sm text-[#2C2C2C] focus:outline-none focus:ring-1 focus:ring-[#B76E79]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#2C2C2C]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="victoria@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8D5B7] bg-white text-sm text-[#2C2C2C] focus:outline-none focus:ring-1 focus:ring-[#B76E79]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#2C2C2C]">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (310) 555-0144"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8D5B7] bg-white text-sm text-[#2C2C2C] focus:outline-none focus:ring-1 focus:ring-[#B76E79]"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#2C2C2C]">
                      Primary Area of Interest
                    </label>
                    <select
                      value={serviceInterest}
                      onChange={(e) => setServiceInterest(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8D5B7] bg-white text-xs text-[#2C2C2C] focus:outline-none focus:ring-1 focus:ring-[#B76E79]"
                    >
                      <option value="Signature Waves & Blowout">Signature Waves & Blowout</option>
                      <option value="Rose-Gold & Copper Dimensional Balayage">Rose-Gold & Copper Dimensional Balayage</option>
                      <option value="Caviar Scalp Spa Ritual">Caviar Scalp Spa Ritual</option>
                      <option value="Bridal & Event Hair Glamour">Bridal & Event Hair Glamour</option>
                      <option value="Private Salon Buyout / VIP Event">Private Salon Buyout / VIP Event</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#2C2C2C]">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please share any preferred dates, bridal party details, or questions..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8D5B7] bg-white text-sm text-[#2C2C2C] focus:outline-none focus:ring-1 focus:ring-[#B76E79]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 rounded-full bg-rose-gold-gradient hover:bg-rose-gold-gradient-hover text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Styled Google Maps Embed Area */}
      <div className="rounded-3xl overflow-hidden border border-[#E8D5B7] shadow-xl relative aspect-[16/7] bg-stone-100">
        <iframe
          title="Wave Bar Beverly Hills Location"
          src="https://maps.google.com/maps?q=Beverly%20Hills,%20California&t=&z=14&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 filter grayscale contrast-125 opacity-90"
          loading="lazy"
        />
        <div className="absolute bottom-6 left-6 bg-[#2C2C2C] text-white p-4 rounded-2xl shadow-xl border border-white/10 text-xs space-y-1 max-w-xs">
          <div className="font-serif font-bold text-sm text-[#E8D5B7]">Wave Bar Salon</div>
          <p className="text-stone-300">742 Ocean Promenade, Suite 400, Beverly Hills</p>
          <p className="text-[10px] text-stone-400">Valet attendant at front promenade entry</p>
        </div>
      </div>

    </div>
  );
};
