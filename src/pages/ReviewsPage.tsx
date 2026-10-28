import React from 'react';
import { useSalon } from '../context/SalonContext';
import { Star, ShieldCheck, MessageSquarePlus, Sparkles } from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const { reviews, setIsReviewModalOpen, averageRating, totalReviewsCount } = useSalon();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-[#B76E79] font-semibold">
          Client Testimonials
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C2C2C]">
          Pure 5.0 ★ Excellence
        </h1>
        <p className="text-sm text-[#6B6B6B] leading-relaxed">
          Read genuine reflections from clients who have trusted our sanctuary with their hair health, balayage, and styling.
        </p>
      </div>

      {/* Trust Scoreboard Banner */}
      <div className="rounded-3xl bg-[#2C2C2C] text-white p-8 sm:p-12 border border-[#3D3D3D]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 text-center lg:text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400" />
              ))}
            </div>
            <div className="text-5xl sm:text-6xl font-serif font-bold text-white">
              {averageRating.toFixed(1)}
            </div>
            <div className="text-xs text-stone-400">
              Overall score based on {totalReviewsCount} verified client reservations
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-stone-300">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-center sm:text-left">
              <span className="text-[#C9A27C] font-semibold text-lg font-serif">5.0 ★</span>
              <div className="font-semibold text-white">Hair Artistry & Color</div>
              <p className="text-stone-400 text-[11px]">Dimensional accuracy, low damage, flawless gloss</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-center sm:text-left">
              <span className="text-[#C9A27C] font-semibold text-lg font-serif">5.0 ★</span>
              <div className="font-semibold text-white">Sanctuary Comfort</div>
              <p className="text-stone-400 text-[11px]">Private steam wash lounge, zero rushed atmosphere</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-center sm:text-left">
              <span className="text-[#C9A27C] font-semibold text-lg font-serif">5.0 ★</span>
              <div className="font-semibold text-white">Wave Longevity</div>
              <p className="text-stone-400 text-[11px]">Signature styling holding 3–4 days effortlessly</p>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <ShieldCheck className="w-4 h-4 text-[#C9A27C]" />
            <span>All reviews verified through Wave Bar booking appointments</span>
          </div>
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="px-6 py-2.5 rounded-full bg-rose-gold-gradient hover:bg-rose-gold-gradient-hover text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Leave a Review</span>
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-8 rounded-3xl bg-white border border-[#E8D5B7]/60 luxury-card-shadow flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-[#6B6B6B]">{rev.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#2C2C2C] leading-relaxed italic">
                “{rev.comment}”
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E8D5B7]/40 flex items-center justify-between">
              <div>
                <div className="font-semibold text-xs text-[#2C2C2C]">
                  {rev.clientName}
                </div>
                <div className="text-[11px] text-[#B76E79]">
                  {rev.serviceName}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#6B6B6B] block">Artist</span>
                <span className="text-xs font-medium text-[#2C2C2C]">
                  {rev.stylistName}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Review Invite Banner */}
      <div className="p-8 rounded-3xl bg-[#F9F6F2] border border-[#E8D5B7] text-center space-y-4">
        <Sparkles className="w-6 h-6 text-[#B76E79] mx-auto" />
        <h3 className="text-xl font-serif font-bold text-[#2C2C2C]">
          Have you experienced Wave Bar recently?
        </h3>
        <p className="text-xs text-[#6B6B6B] max-w-md mx-auto">
          We warmly invite our guests to share their transformation stories and salon memories.
        </p>
        <button
          onClick={() => setIsReviewModalOpen(true)}
          className="px-6 py-2.5 rounded-full border border-[#B76E79] text-[#B76E79] hover:bg-[#B76E79] hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider cursor-pointer"
        >
          Submit Your Reflections
        </button>
      </div>

    </div>
  );
};
