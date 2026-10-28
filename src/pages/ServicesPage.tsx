import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';
import { Clock, Scissors, Sparkles, Check, ChevronDown, ChevronUp, Calendar } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { services, openBookingWithService } = useSalon();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const categories = [
    'All',
    'Cuts & Styling',
    'Color & Balayage',
    'Treatments & Hair Spa',
    'Bridal & Glam',
  ];

  const filteredServices =
    selectedCategory === 'All'
      ? services
      : services.filter((s) => s.category === selectedCategory);

  const faqs = [
    {
      q: 'How should I prepare for a balayage appointment?',
      a: 'We recommend arriving with clean, dry hair free of heavy root touch-up sprays or mineral buildup. Feel free to bring inspiration photos of tones you admire.',
    },
    {
      q: 'What is included in the Signature Wave blowout?',
      a: 'Every blowout includes an aromatherapeutic scalp massage, tailored botanical shampoo, conditioning treatment mask, and precision thermal wave sculpting.',
    },
    {
      q: 'Do you offer bridal party styling on location?',
      a: 'Yes, our bridal concierge coordinates on-location teams for weddings and red carpet appearances throughout Southern California. Inquire via our contact page.',
    },
    {
      q: 'What is your appointment cancellation policy?',
      a: 'We kindly request at least 24 hours notice for standard appointments and 48 hours for balayage transformations to allow waitlisted clients the opportunity to book.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-[#B76E79] font-semibold">
          Menu of Artistry
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C2C2C]">
          Haute Hair Services
        </h1>
        <p className="text-sm text-[#6B6B6B] leading-relaxed">
          Each ritual includes an in-depth consultation, personalized botanical infusions, and our signature wave finishing.
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

              <div className="flex items-center gap-4 text-xs text-[#6B6B6B] pt-2">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C9A27C]" />
                  <span>{service.durationMinutes} Minutes</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A27C]" />
                  <span>Custom Finish</span>
                </span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E8D5B7]/50 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#6B6B6B] block">Price</span>
                <span className="text-2xl font-serif font-bold text-[#2C2C2C]">
                  ${service.price}
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

      {/* Salon Hospitality Amenities Banner */}
      <div className="rounded-3xl bg-[#2C2C2C] p-8 sm:p-12 text-white">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A27C] font-semibold">
            The Wave Bar Standard
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-light">
            Every Reservation Includes Our Signature Amenities
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-stone-300">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="font-semibold text-white">Personal Consultation</div>
            <p className="text-stone-400">15-minute tailored analysis of scalp health, tone balance, and bone framing.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="font-semibold text-white">Steam Wash Sanctuary</div>
            <p className="text-stone-400">Warm aromatic steam mist and reclining shiatsu wash loungers.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="font-semibold text-white">Concierge Refreshments</div>
            <p className="text-stone-400">Complimentary artisanal matcha, Italian roast espresso, and sparkling champagne.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="font-semibold text-white">Thermal Wave Finishing</div>
            <p className="text-stone-400">Weightless thermal wave protection and micro-fine hair fragrance gloss.</p>
          </div>
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
