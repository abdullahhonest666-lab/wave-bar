import React from 'react';
import { useSalon } from '../context/SalonContext';
import { PageRoute } from '../types';
import { Instagram, MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, openBookingWithService } = useSalon();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (page: PageRoute) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2C2C2C] text-[#F9F6F2] pt-16 pb-12 border-t border-[#3D3D3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div>
              <div className="inline-block bg-[#FDFBF7] px-4 py-2 rounded-2xl border border-[#E8D5B7]/60 shadow-md">
                <img
                  src="/images/Wave_Bar_284bd31f.png"
                  alt="Wave Bar High-End Hair & Beauty Salon"
                  className="h-16 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              Dedicated to bespoke hair architecture, custom rose-gold balayage, and transcendent scalp wellness in an intimate Beverly Hills sanctuary.
            </p>
            <div className="pt-2">
              <a
                href="https://www.instagram.com/wavebar__"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#383838] hover:bg-[#484848] text-[#C9A27C] text-xs font-medium tracking-wide transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>@wavebar__</span>
              </a>
            </div>
          </div>

          {/* Col 2: Services Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-[#E8D5B7]">
              Signature Offerings
            </h3>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Signature Silk Waves & Blowout
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Rose-Gold & Copper Balayage
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Caviar Hair Spa Ritual
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Liquid Silk Keratin Therapy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bespoke Architectural Cuts
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bridal & Red Carpet Artistry
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Sanctuary Location & Hours */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-[#E8D5B7]">
              Sanctuary & Hours
            </h3>
            <div className="space-y-3 text-sm text-stone-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A27C] shrink-0 mt-0.5" />
                <span>742 Ocean Promenade, Suite 400<br />Beverly Hills, CA 90210</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C9A27C] shrink-0" />
                <span>(310) 555-WAVE (9283)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C9A27C] shrink-0" />
                <span>concierge@wavebarsalon.com</span>
              </div>
              <div className="flex items-start gap-3 pt-1">
                <Clock className="w-4 h-4 text-[#C9A27C] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1 text-stone-300">
                  <div>Tue – Fri: 9:00 AM – 7:00 PM</div>
                  <div>Saturday: 9:00 AM – 6:00 PM</div>
                  <div>Sun – Mon: Reserved for Private Events</div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Book Appointment Card */}
          <div className="space-y-4 bg-[#353535] p-6 rounded-2xl border border-[#444444]">
            <h3 className="text-base font-serif font-medium text-white">
              Reserve Your Salon Ritual
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Experience personalized hair alchemy with our master artists. Appointments fill 2-3 weeks in advance.
            </p>
            <button
              onClick={() => openBookingWithService()}
              className="w-full py-2.5 px-4 rounded-full bg-rose-gold-gradient hover:bg-rose-gold-gradient-hover text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer"
            >
              Book Online Now
            </button>
            <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-[#444444]">
              <span>Complimentary Valet</span>
              <span>·</span>
              <span>Organic Coffee & Bubbles</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#3D3D3D] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Wave Bar Salon. All rights reserved.</span>
            <span>·</span>
            <button
              onClick={() => navigateTo('admin')}
              className="hover:text-[#C9A27C] transition-colors"
            >
              Staff Portal
            </button>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo('about')}
              className="hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => navigateTo('services')}
              className="hover:text-white transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => navigateTo('reviews')}
              className="hover:text-white transition-colors"
            >
              Reviews
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="hover:text-white transition-colors"
            >
              Contact
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#383838] hover:bg-[#484848] text-white transition-colors ml-2"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
