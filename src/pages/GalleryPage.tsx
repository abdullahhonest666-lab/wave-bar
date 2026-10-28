import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';
import { GalleryItem } from '../types';
import { X, Sparkles, Calendar, Maximize2 } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { gallery, openBookingWithService } = useSalon();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const filters = ['All', ...new Set(gallery.map((item) => item.category))];

  const filteredGallery =
    selectedFilter === 'All'
      ? gallery
      : gallery.filter((item) => item.category === selectedFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-[#B76E79] font-semibold">
          Wave Bar Gallery
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C2C2C]">
          Salon & Client Photos
        </h1>
        <p className="text-sm text-[#6B6B6B] leading-relaxed">
          Photos of Wave Bar’s salon and client styling, shared with the salon’s brand materials.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {filters.map((filter) => {
          const isActive = selectedFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#2C2C2C] text-white shadow-md'
                  : 'bg-white text-[#6B6B6B] hover:text-[#2C2C2C] border border-[#E8D5B7]/60 hover:border-[#C9A27C]'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveLightboxItem(item)}
            className="group relative rounded-3xl overflow-hidden border border-[#E8D5B7]/60 bg-white luxury-card-shadow luxury-card-shadow-hover transition-all duration-300 cursor-pointer aspect-[4/5]"
          >
            <img
              src={item.image}
              alt={item.title}
              className="photo-crisp w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#E8D5B7]">
                <span>{item.category}</span>
                <span className="flex items-center gap-1">
                  <Maximize2 className="w-3 h-3" />
                  <span>Enlarge</span>
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-white leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-stone-300 line-clamp-2">
                {item.description}
              </p>
              <div className="text-[11px] text-[#C9A27C] pt-1">
                Photo: {item.stylist}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#2C2C2C] text-white rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col lg:flex-row">
            
            {/* Close button */}
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image side */}
            <div className="lg:w-3/5 bg-black flex items-center justify-center">
              <img
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                className="photo-crisp max-h-[70vh] w-full object-contain"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Details side */}
            <div className="lg:w-2/5 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#C9A27C] font-semibold">
                  {activeLightboxItem.category}
                </span>
                <h2 className="text-2xl font-serif font-bold text-white">
                  {activeLightboxItem.title}
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {activeLightboxItem.description}
                </p>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
                  <div className="text-stone-400">Photo from:</div>
                  <div className="font-semibold text-[#E8D5B7]">{activeLightboxItem.stylist}</div>
                  <div className="text-stone-400 text-[11px] pt-1">
                    Wave Bar Salon, Karachi
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-stone-700">
                <button
                  onClick={() => {
                    setActiveLightboxItem(null);
                    openBookingWithService();
                  }}
                  className="w-full py-3.5 rounded-full bg-rose-gold-gradient hover:bg-rose-gold-gradient-hover text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request This Look</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
