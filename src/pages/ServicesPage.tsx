import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { services, openBookingWithService } = useSalon();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const categories = ['All', ...new Set(services.map((service) => service.category))];

  const filteredServices =
    selectedCategory === 'All'
      ? services
      : services.filter((s) => s.category === selectedCategory);

  const faqs = [
    {
      q: 'Which services are available?',
      a: 'The Wave Bar menus list hair styling, haircuts, colour, treatments, dry massage, threading, eyeliner, nail services and Wave Tab gift cards.',
    },
    {
      q: 'How should I confirm a service or price?',
      a: 'Prices are shown in Pakistani rupees. Some services have Standard and L’Oréal menu prices, and colour services marked “Starting at” may vary. Call Wave Bar to confirm details.',
    },
    {
      q: 'Where is Wave Bar located?',
      a: 'Wave Bar is in Zamzama Commercial Area, Defence V, Karachi. Use the Google Maps listing on the Contact page for directions and current opening hours.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-[#B76E79] font-semibold">
          Wave Bar Menu
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C2C2C]">
          Services & Prices
        </h1>
        <p className="text-sm text-[#6B6B6B] leading-relaxed">
          Explore Wave Bar’s hair, colour, beauty and wellness services. Prices are listed in Pakistani rupees.
        </p>
      </div>

      {/* Category Filter Controls */}
      <div className="flex items-center justify-center gap-2 flex-wrap pb-4">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#2C2C2C] text-white shadow-md'
                  : 'bg-white text-[#6B6B6B] hover:text-[#2C2C2C] border border-[#E8D5B7]/60 hover:border-[#C9A27C]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="p-8 rounded-3xl bg-white border border-[#E8D5B7]/60 luxury-card-shadow luxury-card-shadow-hover transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#B76E79] uppercase tracking-wider text-[11px] font-semibold">
                  {service.category}
                </span>
                {service.badge && (
                  <span className="text-[10px] font-medium text-[#2C2C2C] bg-[#E8D5B7]/40 px-2.5 py-0.5 rounded-full">
                    {service.badge}
                  </span>
                )}
              </div>

              <h2 className="text-xl font-serif font-bold text-[#2C2C2C] group-hover:text-[#B76E79] transition-colors">
                {service.name}
              </h2>

              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                {service.description}
              </p>

            </div>

            <div className="pt-6 mt-6 border-t border-[#E8D5B7]/50 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#6B6B6B] block">
                  {service.badge === 'Starting at' ? 'Starting at' : 'Price'}
                </span>
                <span className="text-2xl font-serif font-bold text-[#2C2C2C]">
                  Rs. {service.price.toLocaleString('en-PK')}
                </span>
              </div>
              <button
                onClick={() => openBookingWithService(service.id)}
                className="px-5 py-2.5 rounded-full bg-rose-gold-gradient hover:bg-rose-gold-gradient-hover text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Official menu scans */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B76E79] font-semibold">
            Official Menu Images
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C2C2C]">
            View the Wave Bar Menus
          </h2>
          <p className="text-xs text-[#6B6B6B]">
            Select a menu to open the original image at full size.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Hair Services & Treatments', image: '/images/wavebar-hair-services-menu.jpg' },
            { title: 'Haircut & Colour Menu', image: '/images/wavebar-hair-colour-menu.jpg' },
            { title: 'Beauty, Nail Services & Gift Cards', image: '/images/wavebar-beauty-menu.jpg' },
          ].map((menu) => (
            <a
              key={menu.image}
              href={menu.image}
              target="_blank"
              rel="noreferrer noopener"
              className="p-5 rounded-3xl bg-white border border-[#E8D5B7]/60 luxury-card-shadow block"
            >
              <img src={menu.image} alt={menu.title} className="w-full h-auto rounded-xl" />
              <h3 className="mt-4 text-sm font-semibold text-[#2C2C2C]">{menu.title}</h3>
            </a>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-3xl mx-auto space-y-6 pt-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B76E79] font-semibold">
            Common Inquiries
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C2C2C]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-[#E8D5B7]/60 bg-white overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between text-sm font-semibold text-[#2C2C2C] cursor-pointer hover:bg-stone-50"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#B76E79] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#6B6B6B] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 pt-1 text-xs text-[#6B6B6B] leading-relaxed border-t border-[#E8D5B7]/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
