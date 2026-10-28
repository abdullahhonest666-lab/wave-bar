import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';
import { X, Star } from 'lucide-react';

export const ReviewModal: React.FC = () => {
  const { isReviewModalOpen, setIsReviewModalOpen, stylists, services, submitReview } = useSalon();
  const [rating, setRating] = useState(5);
  const [clientName, setClientName] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [stylistName, setStylistName] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isReviewModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !comment.trim()) {
      setError('Please provide your name and your review feedback.');
      return;
    }
    setSubmitting(true);
    setError(null);
    const res = await submitReview({
      clientName,
      rating,
      serviceName: serviceName || (services[0]?.name ?? 'Signature Waves'),
      stylistName: stylistName || (stylists[0]?.name ?? 'Wave Bar Artist'),
      comment,
    });
    setSubmitting(false);
    if (res.success) {
      setIsReviewModalOpen(false);
      setClientName('');
      setComment('');
    } else {
      setError(res.error || 'Failed to submit review');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#E8D5B7] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8D5B7]/60 bg-white/60">
          <div>
            <h2 className="text-lg font-serif font-semibold text-[#2C2C2C]">
              Share Your Experience
            </h2>
            <p className="text-xs text-[#6B6B6B]">
              Your reflections help us preserve the highest standard of salon artistry.
            </p>
          </div>
          <button
            onClick={() => setIsReviewModalOpen(false)}
            className="p-2 text-[#6B6B6B] hover:text-[#2C2C2C]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {error}
            </div>
          )}

          {/* Star Rating */}
          <div className="space-y-1 text-center py-2">
            <span className="text-xs uppercase tracking-wider text-[#6B6B6B] font-semibold block">
              Rating
            </span>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#2C2C2C]">
              Your Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Vanessa Alcott"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8D5B7] bg-white text-sm text-[#2C2C2C] focus:outline-none focus:ring-1 focus:ring-[#B76E79]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2C2C]">
                Service Received
              </label>
              <select
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E8D5B7] bg-white text-xs text-[#2C2C2C] focus:outline-none focus:ring-1 focus:ring-[#B76E79]"
              >
                <option value="">Select Service...</option>
                {services.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2C2C]">
                Stylist
              </label>
              <select
                value={stylistName}
                onChange={(e) => setStylistName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E8D5B7] bg-white text-xs text-[#2C2C2C] focus:outline-none focus:ring-1 focus:ring-[#B76E79]"
              >
                <option value="">Select Stylist...</option>
                {stylists.map((st) => (
                  <option key={st.id} value={st.name}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#2C2C2C]">
              Your Review & Reflections *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Tell others about your hair transformation, the sanctuary atmosphere, and the results..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8D5B7] bg-white text-sm text-[#2C2C2C] focus:outline-none focus:ring-1 focus:ring-[#B76E79]"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(false)}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#6B6B6B] hover:text-[#2C2C2C]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-full bg-rose-gold-gradient hover:bg-rose-gold-gradient-hover text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'Publishing...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
