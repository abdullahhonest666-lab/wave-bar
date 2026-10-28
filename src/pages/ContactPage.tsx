import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';
import { MapPin, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';

const googleMapsUrl =
  'https://www.google.com/maps/place/Wave+Bar+Salon/@24.81859,67.0394615,17z/data=!4m17!1m10!3m9!1s0x3eb33dafbc434b11:0xfe3f511b3f425256!2sWave+Bar+Salon!8m2!3d24.8185886!4d67.0394686!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11s63_zqgy!3m5!1s0x3eb33dafbc434b11:0xfe3f511b3f425256!8m2!3d24.8185886!4d67.0394686!16s%2Fg%2F11s63_zqgy';

export const ContactPage: React.FC = () => {
  const { submitContact } = useSalon();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceInterest, setServiceInterest] = useState('Hair Services');
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
          Contact & Location
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C2C2C]">
          Visit Wave Bar Salon
        </h1>
        <p className="text-sm text-[#6B6B6B] leading-relaxed">
          Find Wave Bar in Karachi, call the salon or send a service inquiry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Col: Contact Information */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-3xl bg-white border border-[#E8D5B7]/60 luxury-card-shadow space-y-6">
            <h2 className="text-xl font-serif font-bold text-[#2C2C2C]">
              Wave Bar Details
            </h2>

            <div className="space-y-4 text-xs text-[#2C2C2C]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-sm">Karachi Location</span>
                  <a href={googleMapsUrl} target="_blank" rel="noreferrer noopener" className="text-[#6B6B6B] hover:text-[#B76E79]">
                    10th Commercial Ln, Zamzama Commercial Area<br />Defence V, Karachi 75500, Pakistan
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-sm">Phone</span>
                  <a href="tel:+923199283227" className="text-[#6B6B6B] hover:text-[#B76E79]">
                    +92 319 9283227
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-sm">Opening Hours</span>
                  <a href={googleMapsUrl} target="_blank" rel="noreferrer noopener" className="text-[#6B6B6B] hover:text-[#B76E79]">
                    View current hours on Google Maps
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E8D5B7]/40">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#B76E79] hover:text-[#2C2C2C] transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open Wave Bar on Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Directions Note */}
          <div className="p-6 rounded-2xl bg-[#E8D5B7]/25 border border-[#E8D5B7]/60 text-xs text-[#2C2C2C] space-y-2">
            <span className="font-semibold block">Find the Salon</span>
            <p className="text-[#6B6B6B] leading-relaxed">
              Wave Bar is in Zamzama Commercial Area, Defence V, Karachi. Use the map for directions.
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
                  Thank you for contacting Wave Bar. Your message has been received.
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
                    Send an Inquiry
                  </h2>
                  <p className="text-xs text-[#6B6B6B] mt-1">
                    Ask about services, menu prices or appointment availability.
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
                      placeholder="Your name"
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
                      placeholder="you@example.com"
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
                      placeholder="+92 3XX XXXXXXX"
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
                      <option value="Hair Services">Hair Services</option>
                      <option value="Haircuts">Haircuts</option>
                      <option value="Hair Colour">Hair Colour</option>
                      <option value="Hair Treatments">Hair Treatments</option>
                      <option value="Massage">Massage</option>
                      <option value="Beauty Services">Beauty Services</option>
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
                      placeholder="Tell us which service you’re interested in or ask a question..."
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
          title="Wave Bar Salon in Karachi"
          src="https://maps.google.com/maps?q=24.8185886%2C67.0394686&t=&z=16&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 filter grayscale contrast-125 opacity-90"
          loading="lazy"
        />
        <div className="absolute bottom-6 left-6 bg-[#2C2C2C] text-white p-4 rounded-2xl shadow-xl border border-white/10 text-xs space-y-1 max-w-xs">
          <div className="font-serif font-bold text-sm text-[#E8D5B7]">Wave Bar Salon</div>
          <p className="text-stone-300">Zamzama Commercial Area, Defence V, Karachi</p>
          <a href={googleMapsUrl} target="_blank" rel="noreferrer noopener" className="text-[10px] text-stone-400 underline">
            Get directions
          </a>
        </div>
      </div>

    </div>
  );
};
