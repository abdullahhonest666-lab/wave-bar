import React from 'react';
import { useSalon } from '../context/SalonContext';
import {
  Calendar,
  Sparkles,
  Star,
  Clock,
  ArrowRight,
  ShieldCheck,
  Heart,
  Instagram,
  Check,
  Scissors,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    services,
    reviews,
    openBookingWithService,
    setActivePage,
    averageRating,
    totalReviewsCount,
  } = useSalon();

  const featuredServices = services.slice(0, 4);
  const featuredReviews = reviews.slice(0, 3);

  const instagramPosts = [
    {
      id: 1,
      image: '/images/salon_hair_balayage_copper_1793149644947.jpg',
      caption: 'Autumn rose-gold melting into soft copper waves. By @marcus.wavebar ✨',
      likes: '482',
    },
    {
      id: 2,
      image: '/images/salon_hair_styling_waves_1793149644985.jpg',
      caption: 'The unmistakable Wave Bar signature bounce. Clean, weightless, radiant.',
      likes: '629',
    },
    {
      id: 3,
      image: '/images/hero_salon_luxury_interior_1793149644642.jpg',
      caption: 'Our illuminated arched stations waiting for morning appointments ☕🕊️',
      likes: '840',
    },
    {
      id: 4,
      image: '/images/salon_interior_wash_lounge_1793149646187.jpg',
      caption: 'The Wash Sanctuary. Where scalp renewal meets restorative steam mist.',
      likes: '517',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#2C2C2C]">
        {/* Background Image with Measured Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_salon_luxury_interior_1793149644642.jpg"
            alt="Wave Bar Luxury Salon Interior"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C2C2C]/95 via-[#2C2C2C]/80 to-[#2C2C2C]/65" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,110,121,0.25),transparent_60%)]" />
        </div>

        {/* Animated flowing wave lines SVG in background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
          <svg
            className="w-[200%] h-full animate-wave-flow text-[#E8D5B7]"
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,192L60,176C120,160,240,128,360,138.7C480,149,600,203,720,208C840,213,960,171,1080,144C1200,117,1320,107,1380,101.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              fill="currentColor"
              fillOpacity="0.08"
            />
            <path
              d="M0,96L60,112C120,128,240,160,360,154.7C480,149,600,107,720,106.7C840,107,960,149,1080,165.3C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              fill="currentColor"
              fillOpacity="0.05"
            />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 py-20 text-center text-white space-y-8">
          
          {/* Editorial Kicker */}
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[#E8D5B7] font-medium">
            <span>Haute Hair Artistry</span>
            <span>·</span>
            <span>Beverly Hills Sanctuary</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-tight text-white text-balance leading-[1.15]">
            Where Fluid Wave Alchemy Meets{' '}
            <span className="italic font-normal text-rose-gold-gradient">
              Bespoke Hair Luxury
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto font-light leading-relaxed text-balance">
            Specializing in sculpted dimensional balayage, custom copper hues, restorative scalp therapies, and our signature mirror-finish waves.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openBookingWithService()}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-rose-gold-gradient hover:bg-rose-gold-gradient-hover text-white text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-xl shadow-[#B76E79]/20 hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-2.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Appointment</span>
            </button>
            <button
              onClick={() => {
                setActivePage('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#E8D5B7]/60 hover:border-white text-stone-200 hover:text-white text-sm font-medium tracking-wide transition-all backdrop-blur-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Bar Adjacency */}
          <div className="pt-8 border-t border-white/10 max-w-2xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-white">5.0 ★</span>
              <span className="text-stone-400">({totalReviewsCount} Verified Reviews)</span>
            </div>
            <div className="hidden sm:block text-stone-500">·</div>
            <div className="flex items-center gap-1.5 text-stone-300">
              <ShieldCheck className="w-4 h-4 text-[#C9A27C]" />
              <span>Certified Master Colorists</span>
            </div>
            <div className="hidden sm:block text-stone-500">·</div>
            <div className="flex items-center gap-1.5 text-stone-300">
              <Sparkles className="w-4 h-4 text-[#C9A27C]" />
              <span>Formaldehyde-Free Treatments</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE WAVE BAR METHOD / 4 PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B76E79] font-semibold">
            Salon Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C2C2C]">
            Crafted for Texture, Radiance & Hair Health
          </h2>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            Every appointment is an individualized masterclass in proportion, tone, and organic strand nourishment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              num: '01',
              title: 'The Signature Brush Wave',
              desc: 'Our proprietary brush-sculpting technique generates natural bounce and fluid movement that lasts days without stiffness.',
            },
            {
              num: '02',
              title: 'Rose-Gold & Copper Tone',
              desc: 'Custom-blended micro-pigments that enrich warm brunettes and illuminate blondes with dimensional copper reflections.',
            },
            {
              num: '03',
              title: 'Private Wash Sanctuary',
              desc: 'Full-reclining massage chairs, warm herbal steam mist, and soothing acoustics for profound scalp rejuvenation.',
            },
            {
              num: '04',
              title: 'Molecular Bond Defense',
              desc: 'Every coloring process is fortified with peptide bond builders to preserve 100% hair cuticle integrity.',
            },
          ].map((pillar) => (
            <div
              key={pillar.num}
              className="p-8 rounded-3xl bg-white border border-[#E8D5B7]/50 luxury-card-shadow luxury-card-shadow-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-3xl font-light text-rose-gold-gradient block mb-4">
                  {pillar.num}
                </span>
                <h3 className="text-lg font-semibold text-[#2C2C2C] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED SERVICES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B76E79] font-semibold">
              Curated Menu
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C2C2C] mt-2">
              Signature Rituals
            </h2>
          </div>
          <button
            onClick={() => {
              setActivePage('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold uppercase tracking-wider text-[#B76E79] hover:text-[#2C2C2C] transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
          >
            <span>View Complete Menu ({services.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-3xl bg-white border border-[#E8D5B7]/60 luxury-card-shadow luxury-card-shadow-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B6B6B] uppercase tracking-wider text-[11px] font-medium">
                    {service.category}
                  </span>
                  {service.badge && (
                    <span className="text-[10px] font-semibold text-[#B76E79] bg-[#E8D5B7]/25 px-2 py-0.5 rounded-full">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-[#2C2C2C] group-hover:text-[#B76E79] transition-colors">
                  {service.name}
                </h3>

                <p className="text-xs text-[#6B6B6B] leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8D5B7]/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#6B6B6B] block">Starting At</span>
                  <span className="text-lg font-bold text-[#2C2C2C] font-mono tabular-nums">
                    ${service.price}
                  </span>
                </div>
                <button
                  onClick={() => openBookingWithService(service.id)}
                  className="px-4 py-2 rounded-full bg-[#2C2C2C] group-hover:bg-rose-gold-gradient text-white text-xs font-semibold transition-all duration-300 cursor-pointer"
                >
                  Book Ritual
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. EDITORIAL SPOTLIGHT: BALAYAGE & SANCTUARY (Two Column Split) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#2C2C2C] rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 text-white">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9A27C] font-semibold">
              Signature Technique
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light leading-tight">
              The Copper & Rose Gold <br />
              <span className="font-normal italic text-rose-gold-gradient">
                Dimensional Glaze
              </span>
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed max-w-xl">
              Engineered exclusively at Wave Bar, this bespoke painting technique infuses warm honey, apricot, and soft rose-gold gloss into naturally flowing waves. The result is unparalleled depth under natural sunlight with low-maintenance regrowth.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-700 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C9A27C]" />
                <span>Zero harsh demarcation lines</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C9A27C]" />
                <span>Infused with botanical lipids</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C9A27C]" />
                <span>Personalized home gloss kit</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C9A27C]" />
                <span>Complimentary consultation</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => openBookingWithService('srv-3')}
                className="px-8 py-3.5 rounded-full bg-rose-gold-gradient hover:bg-rose-gold-gradient-hover text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
              >
                Reserve Balayage Experience
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/5]">
              <img
                src="/images/salon_hair_balayage_copper_1793149644947.jpg"
                alt="Wave Bar Copper Balayage Finish"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-4 rounded-xl text-xs border border-white/15">
                <div className="font-semibold text-white">Client Transformation</div>
                <div className="text-stone-400 text-[11px]">Bespoke Copper Glaze by Master Colorist Marcus Vance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CLIENT REVIEWS / TESTIMONIALS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
              <span className="font-bold text-[#2C2C2C] text-sm">5.0 / 5.0</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C2C2C]">
              Echoes of Satisfaction
            </h2>
          </div>
          <button
            onClick={() => {
              setActivePage('reviews');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold uppercase tracking-wider text-[#B76E79] hover:text-[#2C2C2C] transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
          >
            <span>Read All Verified Reviews</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-3xl bg-white border border-[#E8D5B7]/60 luxury-card-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#6B6B6B]">{rev.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#2C2C2C] leading-relaxed italic">
                  “{rev.comment}”
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8D5B7]/40">
                <div className="font-semibold text-xs text-[#2C2C2C]">
                  {rev.clientName}
                </div>
                <div className="text-[11px] text-[#B76E79]">
                  {rev.serviceName} · {rev.stylistName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INSTAGRAM FEED PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B76E79] font-semibold">
            <Instagram className="w-3.5 h-3.5" />
            <span>@wavebar__ on Instagram</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#2C2C2C]">
            Follow the Sanctuary
          </h2>
          <p className="text-xs text-[#6B6B6B]">
            Daily salon formulas, before-and-after transformations, and behind-the-scenes wave techniques.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/wavebar__"
              target="_blank"
              rel="noreferrer noopener"
              className="group relative rounded-2xl overflow-hidden aspect-square border border-[#E8D5B7]/50 shadow-xs block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white text-xs">
                <p className="line-clamp-2 text-[11px] mb-2">{post.caption}</p>
                <div className="flex items-center gap-1.5 text-[10px] text-[#E8D5B7]">
                  <Heart className="w-3 h-3 fill-current" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/wavebar__"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#B76E79] text-[#B76E79] hover:bg-[#B76E79] hover:text-white transition-colors text-xs font-semibold tracking-wider uppercase"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @wavebar__</span>
          </a>
        </div>
      </section>

      {/* 7. BOTTOM APPOINTMENT INVITATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#B76E79] via-[#C9A27C] to-[#D4AF87] p-8 sm:p-14 text-white text-center space-y-6 shadow-xl">
          <span className="text-xs uppercase tracking-[0.25em] text-white/90 font-semibold block">
            Begin Your Transformation
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light max-w-2xl mx-auto text-balance leading-tight">
            Reserve Your Wave Bar Salon Experience
          </h2>
          <p className="text-white/90 text-sm max-w-lg mx-auto font-light leading-relaxed">
            Appointments for signature balayage and cuts fill quickly. Reserve your preferred artist online today.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openBookingWithService()}
              className="px-8 py-4 rounded-full bg-[#2C2C2C] hover:bg-black text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-xl hover:scale-102 active:scale-98 cursor-pointer"
            >
              Book Your Appointment Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
