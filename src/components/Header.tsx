import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';
import { PageRoute } from '../types';
import { Menu, X, Shield, Calendar, Phone, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { activePage, setActivePage, openBookingWithService, isAdminLoggedIn } = useSalon();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageRoute }[] = [
    { label: 'Services', page: 'services' },
    { label: 'About', page: 'about' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Reviews', page: 'reviews' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNav = (page: PageRoute) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top luxury announcement bar */}
      <div className="bg-[#2C2C2C] text-[#F9F6F2] text-xs py-2 px-4 sm:px-8 border-b border-[#3D3D3D]">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] sm:text-xs tracking-wider">
          <div className="flex items-center gap-2">
            <span className="text-[#C9A27C]">★ 5.0 Rating</span>
            <span className="text-[#6B6B6B]">·</span>
            <span className="hidden sm:inline text-stone-300">Beverly Hills Premier Wave & Balayage Sanctuary</span>
            <span className="sm:hidden text-stone-300">Beverly Hills Salon</span>
          </div>
          <div className="flex items-center gap-4 text-stone-300">
            <a
              href="tel:3105559283"
              className="flex items-center gap-1.5 hover:text-[#C9A27C] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C9A27C]" />
              <span className="hidden md:inline">(310) 555-WAVE</span>
              <span className="md:hidden">Call</span>
            </a>
            <span className="text-[#6B6B6B]">·</span>
            <button
              onClick={() => handleNav('admin')}
              className={`flex items-center gap-1 text-[11px] transition-colors ${
                activePage === 'admin' ? 'text-[#C9A27C]' : 'hover:text-[#C9A27C]'
              }`}
            >
              <Shield className="w-3 h-3 text-[#C9A27C]" />
              <span>{isAdminLoggedIn ? 'Admin Portal (Active)' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Strictly follows the 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8D5B7]/50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single Brand Zone wordmark/logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center shrink-0 text-left group focus:outline-none cursor-pointer"
            aria-label="Wave Bar Home"
          >
            <img
              src="/assets/aistudio/Wave_Bar_284bd31f.png"
              alt="Wave Bar High-End Hair & Beauty Salon"
              className="h-16 sm:h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
            />
          </button>

          {/* Zone 2: 4-5 single-line nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-[14px] font-medium tracking-wide">
            {navLinks.map((link) => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNav(link.page)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#2C2C2C] font-semibold'
                      : 'text-[#6B6B6B] hover:text-[#2C2C2C]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#B76E79] to-[#C9A27C] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => openBookingWithService()}
              className="relative group overflow-hidden px-5 sm:px-6 py-2.5 rounded-full text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#B76E79]/20 bg-rose-gold-gradient hover:bg-rose-gold-gradient-hover active:scale-98 whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#2C2C2C] hover:bg-[#E8D5B7]/30 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FDFBF7] border-b border-[#E8D5B7] px-6 py-5 shadow-xl transition-all">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => handleNav(link.page)}
                  className={`text-left py-2 text-base font-medium transition-colors ${
                    activePage === link.page
                      ? 'text-[#B76E79] font-semibold pl-2 border-l-2 border-[#B76E79]'
                      : 'text-[#2C2C2C]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 border-t border-[#E8D5B7]/60 flex flex-col gap-3">
                <button
                  onClick={() => handleNav('admin')}
                  className="text-left text-sm text-[#6B6B6B] hover:text-[#2C2C2C] flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 text-[#C9A27C]" />
                  <span>Admin Portal</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
