import React from 'react';
import { useSalon } from '../context/SalonContext';
import { Sparkles, Award, Heart, Shield, Check, Calendar } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { stylists, openBookingWithService } = useSalon();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-24">
      
      {/* 1. HERO STORY SPLIT */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B76E79] font-semibold">
            The Wave Bar Story
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C2C2C] leading-tight">
            Elevating Hair Artistry into a Serene Ritual
          </h1>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            Wave Bar was conceived as an antidote to frantic, assembly-line salons. Founded by celebrity wave architect Elena Rostova, our Beverly Hills sanctuary was purposefully designed around slow luxury, intentional hair health, and fluid, natural movement.
          </p>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            We reject heavy lacquers and harsh bleaching. Instead, our team pioneers micro-foil balayage, custom copper and rose-gold glazes, and botanical lipid therapies that allow hair to reflect light with liquid brilliance.
          </p>
          <div className="pt-2 flex items-center gap-6">
            <div className="space-y-1">
              <span className="text-3xl font-serif font-bold text-rose-gold-gradient block">
                14+
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#6B6B6B]">
                Years of Artistry
              </span>
            </div>
            <div className="h-10 w-[1px] bg-[#E8D5B7]" />
            <div className="space-y-1">
              <span className="text-3xl font-serif font-bold text-rose-gold-gradient block">
                5.0 ★
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#6B6B6B]">
                Flawless Rating
              </span>
            </div>
            <div className="h-10 w-[1px] bg-[#E8D5B7]" />
            <div className="space-y-1">
              <span className="text-3xl font-serif font-bold text-rose-gold-gradient block">
                100%
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#6B6B6B]">
                Clean Formulations
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E8D5B7] aspect-[4/3]">
            <img
              src="/images/hero_salon_luxury_interior_1793149644642.jpg"
              alt="Wave Bar Sanctuary Interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
              <div className="font-serif font-semibold text-base">The Beverly Hills Sanctuary</div>
              <p className="text-stone-300 text-[11px] mt-0.5">Designed with arched rose-gold trimmed mirrors and sound-dampening acoustic wall curves.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MASTER STYLISTS TEAM */}
      <section className="space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B76E79] font-semibold">
            Our Artists
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C2C2C]">
            Master Stylists & Color Architects
          </h2>
          <p className="text-xs text-[#6B6B6B]">
            Each stylist brings specialized global training, profound technical discipline, and an instinctive eye for dimensional harmony.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stylists.map((stylist) => (
            <div
              key={stylist.id}
              className="p-6 rounded-3xl bg-white border border-[#E8D5B7]/60 luxury-card-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-square border border-[#E8D5B7]/60">
                  <img
                    src={stylist.avatar}
                    alt={stylist.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#2C2C2C] shadow-xs">
                    ★ {stylist.rating} ({stylist.reviewsCount})
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-[#2C2C2C]">
                    {stylist.name}
                  </h3>
                  <div className="text-xs text-[#B76E79] font-medium mt-0.5">
                    {stylist.role}
                  </div>
                </div>

                <p className="text-xs text-[#6B6B6B] leading-relaxed">
                  {stylist.bio}
                </p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold block">
                    Specialties
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {stylist.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-[#F9F6F2] border border-[#E8D5B7]/50 text-[#2C2C2C]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8D5B7]/40">
                <button
                  onClick={() => openBookingWithService()}
                  className="w-full py-2.5 rounded-full border border-[#B76E79] text-[#B76E79] hover:bg-[#B76E79] hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Book with {stylist.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SANCTUARY EXPERIENCE DETAILS */}
      <section className="rounded-3xl bg-[#2C2C2C] p-8 sm:p-14 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9A27C] font-semibold">
              The Sanctuary Design
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light leading-snug">
              Every Detail Curated for Your Complete Restoration
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              From our custom rose-gold stations to the acoustic soundscapes tuned to 432Hz, every sensory element at Wave Bar encourages you to exhale and surrender to luxury care.
            </p>

            <div className="space-y-3 pt-2 text-xs text-stone-200">
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#C9A27C] shrink-0 mt-0.5" />
                <span>Private reclining wash beds with integrated air-compression massage</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#C9A27C]" />
                <span>HEPA air filtration continuously cleansing ambient salon atmosphere</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#C9A27C]" />
                <span>Reverse-osmosis filtered water for mineral-free hair rinsing</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#C9A27C]" />
                <span>Complimentary organic tea ceremonies and vintage champagne</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl">
            <img
              src="/images/salon_interior_wash_lounge_1793149646187.jpg"
              alt="Wave Bar Private Wash Lounge"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <div className="text-center max-w-xl mx-auto space-y-4">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C2C2C]">
          Experience Wave Bar in Person
        </h2>
        <p className="text-xs text-[#6B6B6B]">
          Consultations are complimentary with every scheduled service.
        </p>
        <button
          onClick={() => openBookingWithService()}
          className="px-8 py-3.5 rounded-full bg-rose-gold-gradient text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:scale-102 transition-transform cursor-pointer"
        >
          Book Your Reservation
        </button>
      </div>

    </div>
  );
};
