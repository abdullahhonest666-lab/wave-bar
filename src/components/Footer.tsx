import React from 'react';
import { useSalon } from '../context/SalonContext';
import { PageRoute } from '../types';
import { MapPin, Phone, Clock, ArrowUp } from 'lucide-react';

const googleMapsUrl =
  'https://www.google.com/maps/place/Wave+Bar+Salon/@24.81859,67.0394615,17z/data=!4m17!1m10!3m9!1s0x3eb33dafbc434b11:0xfe3f511b3f425256!2sWave+Bar+Salon!8m2!3d24.8185886!4d67.0394686!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11s63_zqgy!3m5!1s0x3eb33dafbc434b11:0xfe3f511b3f425256!8m2!3d24.8185886!4d67.0394686!16s%2Fg%2F11s63_zqgy';

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
                  src="/images/wavebar-logo.jpg"
                  alt="Wave Bar"
                  className="h-16 w-auto object-contain mix-blend-multiply"
                />
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              Hair, colour and beauty services at Wave Bar in Karachi.
            </p>
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
                  Blow-dry & Styling
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hair Colour & Balayage
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hair Treatments & Massage
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Haircuts & Trims
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Threading & Beauty Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Nail Services & Gift Cards
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Sanctuary Location & Hours */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-[#E8D5B7]">
              Find Wave Bar
            </h3>
            <div className="space-y-3 text-sm text-stone-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A27C] shrink-0 mt-0.5" />
                <a href={googleMapsUrl} target="_blank" rel="noreferrer noopener" className="hover:text-white">
                  10th Commercial Ln, Zamzama Commercial Area<br />Defence V, Karachi 75500, Pakistan
                </a>
              </div>
              <a href="tel:+923199283227" className="flex items-center gap-3 hover:text-white">
                <Phone className="w-4 h-4 text-[#C9A27C] shrink-0" />
                <span>+92 319 9283227</span>
              </a>
              <div className="flex items-start gap-3 pt-1">
                <Clock className="w-4 h-4 text-[#C9A27C] shrink-0 mt-0.5" />
                <a href={googleMapsUrl} target="_blank" rel="noreferrer noopener" className="text-xs text-stone-300 hover:text-white">
                  View current hours on Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Book Appointment Card */}
          <div className="space-y-4 bg-[#353535] p-6 rounded-2xl border border-[#444444]">
            <h3 className="text-base font-serif font-medium text-white">
              Reserve Your Salon Ritual
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Browse the service menu and request an appointment with the Wave Bar team.
            </p>
            <button
              onClick={() => openBookingWithService()}
              className="w-full py-2.5 px-4 rounded-full bg-rose-gold-gradient hover:bg-rose-gold-gradient-hover text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer"
            >
              Book Online Now
            </button>
            <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-[#444444]">
              <span>Karachi</span>
              <span>·</span>
              <span>Pakistan</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#3D3D3D] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Wave Bar Salon. All rights reserved.</span>
            <span className="hidden">·</span>
            <button
              onClick={() => navigateTo('admin')}
              className="hidden hover:text-[#C9A27C] transition-colors"
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
