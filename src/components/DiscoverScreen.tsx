import React, { useState, useEffect } from 'react';
import { Treatment, Specialist, ScreenType } from '../types';
import { TREATMENTS, SPECIALISTS } from '../data/mockData';
import { Language, TRANSLATIONS } from '../utils/translations';

interface DiscoverScreenProps {
  onSelectTreatment: (treatment: Treatment) => void;
  onQuickBook: (treatment: Treatment) => void;
  onNavigate: (screen: ScreenType) => void;
  onSelectCategory: (category: string) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  language: Language;
  onOpenSkinAnalysis?: () => void;
}

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({
  onSelectTreatment,
  onQuickBook,
  onNavigate,
  onSelectCategory,
  wishlist,
  onToggleWishlist,
  language,
  onOpenSkinAnalysis
}) => {
  const t = TRANSLATIONS[language];

  // Live countdown for Flash Studio Drop
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const heroTreatments = [
    {
      id: 'cryo-facial',
      tag: 'Beauty Pass Exclusive',
      subtag: 'Limited Edition',
      title: 'Glow Into Spring: Signature Cryo & Hydra-Glow',
      description: 'Deep cellular hydration paired with rapid lymphatic cooling for red-carpet sculpted luminosity.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrIsVEVJkMHouTMYvvtw69JykwDyLQ1sDX49ySigF9lzWqmhMZskvxspnGUd1BpN0C_ikyoBaPcOb2vyRs24VqVs8eXS_gsTHgigRNfh2Ka94hUviVajhw-N3FpA9_yzbOatvsYJr8NRteWRV8CG-_afz9r_CTGs7-nfhVmh4VMPioGfcq0wRgi9LPDxVTlB-esK-kOTLC65z5ASa1_s4x4_g56ZWgM_iQsGaQsCQWOzEZwh3urX7PVw',
      cta: 'Book • 2x Points'
    },
    {
      id: 'japanese-head-spa',
      tag: 'Sanctuary Spotlight',
      subtag: 'Award Winning',
      title: 'Botanical Waterfall Head Spa & Scalp Detox',
      description: 'Holistic hydro-massage with soothing warm herbal rain ring and acupressure scalp release.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFtR0FqosvWimgWem1kbwcUPHtoTEPBf0q2Wu38JiC-6CKkQnn8NiH5hZlHn5NTgExh0fw_FaszxY2zIxuLIhEIPAVFhRbc4Lvcm_sQ4-wFcURx2nwflfpDapCztq4AkrUU_HQJOJE4Yi5UACbtGt4RkH29owblWoLKf9HRb3clgdrRlKX8gS94dHTn2T98uutrL2oLgXIeZx-gBmR5FpqzNrWB7I-j31RrQnlcE5QOHycZz14l9vHcA',
      cta: 'Book Ritual'
    }
  ];

  const currentHero = heroTreatments[heroSlide];
  const cryoTreatment = TREATMENTS.find((t) => t.id === 'cryo-facial') || TREATMENTS[0];
  const headSpaTreatment = TREATMENTS.find((t) => t.id === 'japanese-head-spa') || TREATMENTS[1];

  const categories = [
    { name: 'Facials', label: t.facials, icon: 'spa', active: true },
    { name: 'Hair Spa', label: t.hairSpa, icon: 'dry_cleaning', active: false },
    { name: 'Lashes', label: t.lashes, icon: 'visibility', active: false },
    { name: 'Massage', label: t.massage, icon: 'self_improvement', active: false },
    { name: 'Nail Bar', label: t.nailBar, icon: 'brush', active: false },
    { name: 'Aesthetics', label: t.aesthetics, icon: 'medical_services', active: false }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSelectCategory(searchQuery.trim());
      onNavigate('explore');
    }
  };

  return (
    <div className="flex flex-col w-full pb-24 space-y-6 max-w-7xl mx-auto">
      {/* Search & Intelligent Scan Bar */}
      <section className="px-4 md:px-8 pt-2">
        <form
          onSubmit={handleSearchSubmit}
          className="w-full bg-white rounded-full p-1.5 shadow-sm border border-[#efe6e4] flex items-center justify-between"
        >
          <div className="flex items-center gap-2 flex-1 min-w-0 pl-3">
            <span className="material-symbols-outlined text-[20px] text-[#47464a] flex-shrink-0">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-transparent text-[#1f1b19] text-sm placeholder:text-[#47464a]/60 focus:outline-none truncate"
            />
          </div>
          <div className="flex items-center gap-1 pr-1">
            <button
              type="button"
              onClick={() => {
                setSearchQuery('Cryo Facial');
                onSelectCategory('Facials');
                onNavigate('explore');
              }}
              title="Voice Search"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#47464a] hover:text-black hover:bg-[#f5ece9] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectTreatment(cryoTreatment);
              }}
              title="Beauty Lens & Barcode Scan"
              className="w-9 h-9 rounded-full bg-[#f5ece9] flex items-center justify-center text-[#1f1b19] hover:bg-[#efe6e4] transition-colors"
            >
              <span className="material-symbols-outlined text-[19px]">photo_camera</span>
            </button>
          </div>
        </form>
      </section>

      {/* CURATED CATEGORIES MOVED TO TOP */}
      <section className="flex flex-col space-y-3 px-4 md:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#7e5448]">auto_awesome_mosaic</span>
            <h2 className="font-serif text-xl md:text-2xl text-[#1f1b19] font-medium">{t.categories}</h2>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="font-label-caps text-xs uppercase tracking-wider text-[#7e5448] font-bold hover:underline"
          >
            {t.viewAll} →
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 py-1">
          {categories.map((cat, idx) => (
            <button
              key={cat.name}
              onClick={() => {
                onSelectCategory(cat.name);
                onNavigate('explore');
              }}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-[#efe6e4] hover:border-black shadow-xs hover:shadow-md transition-all group active:scale-95"
            >
              <div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-2 transition-all ${
                  idx === 0
                    ? 'bg-black text-white'
                    : 'bg-[#fbf2ef] text-[#7e5448] group-hover:bg-black group-hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[24px] md:text-[26px]">{cat.icon}</span>
              </div>
              <span className="text-xs font-semibold text-[#1f1b19] text-center truncate w-full">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Interactive Skin Profile Analysis Feature Banner */}
      {onOpenSkinAnalysis && (
        <section className="px-4 md:px-8">
          <div className="w-full bg-gradient-to-r from-[#1f1b19] via-[#3A1720] to-[#251319] rounded-2xl p-4 md:p-6 text-white shadow-md border border-[#DFB3A6]/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#DFB3A6]/20 border border-[#DFB3A6]/40 flex items-center justify-center text-[#DFB3A6] flex-shrink-0">
                <span className="material-symbols-outlined text-[28px]">biotech</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-label-caps text-[9px] uppercase tracking-widest text-[#DFB3A6] font-bold">
                    {t.skinProfileBadge}
                  </span>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-white/90">
                    2 mins
                  </span>
                </div>
                <h3 className="font-serif text-base md:text-lg font-semibold text-white mt-0.5">
                  {t.skinAnalysisTitle}
                </h3>
                <p className="text-xs text-white/75 line-clamp-1 max-w-xl">
                  {t.skinAnalysisSubtitle}
                </p>
              </div>
            </div>

            <button
              onClick={onOpenSkinAnalysis}
              className="w-full md:w-auto px-5 py-2.5 rounded-full bg-[#DFB3A6] text-[#1f1b19] hover:bg-white text-xs font-bold tracking-wide transition-all shadow-sm flex items-center justify-center gap-1.5 flex-shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
              {t.takeAnalysisBtn}
            </button>
          </div>
        </section>
      )}

      {/* Editorial Hero Carousel (Spring Focus) */}
      <section className="px-4 md:px-8">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-md bg-[#3A1720] aspect-[4/5] md:aspect-[21/9] flex flex-col justify-end transition-all">
          {/* Background Treatment Editorial Image */}
          <img
            src={currentHero.image}
            alt={currentHero.title}
            className="absolute inset-0 w-full h-full object-cover object-center mix-blend-luminosity opacity-70 transition-opacity duration-700"
          />
          {/* Rich Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3A1720] via-[#3A1720]/60 to-transparent"></div>

          {/* Content Container */}
          <div className="relative z-10 p-6 flex flex-col space-y-2 text-white">
            {/* Tag & VIP Marker */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-[#C59B27] text-white font-label-caps text-[10px] uppercase tracking-widest shadow-sm">
                {currentHero.tag}
              </span>
              <span className="font-label-caps text-[10px] tracking-widest uppercase text-[#EBD9CC] opacity-90">
                {currentHero.subtag}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-2xl md:text-3xl font-semibold leading-tight text-white tracking-tight pt-1">
              {currentHero.title}
            </h1>
            <p className="text-xs md:text-sm text-[#EBD9CC]/90 line-clamp-2 pt-0.5 max-w-lg">
              {currentHero.description}
            </p>

            {/* CTAs and Points Perk */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  const target = heroSlide === 0 ? cryoTreatment : headSpaTreatment;
                  onSelectTreatment(target);
                }}
                className="flex-1 max-w-xs bg-white text-black h-12 rounded-full font-label-caps text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:bg-[#FAF7F5] active:scale-95 transition-all font-bold"
              >
                <span>{currentHero.cta}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <button
                onClick={() => onToggleWishlist(currentHero.id)}
                aria-label="Save to Wishlist"
                className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center active:scale-90 transition-all ${
                  wishlist.includes(currentHero.id)
                    ? 'bg-[#C59B27] text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">
                  {wishlist.includes(currentHero.id) ? 'bookmark' : 'bookmark_border'}
                </span>
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="flex items-center justify-center gap-1.5 pt-2">
              <button
                onClick={() => setHeroSlide(0)}
                aria-label="Slide 1"
                className={`h-1 rounded-full transition-all ${
                  heroSlide === 0 ? 'w-6 bg-white' : 'w-2 bg-white/40'
                }`}
              />
              <button
                onClick={() => setHeroSlide(1)}
                aria-label="Slide 2"
                className={`h-1 rounded-full transition-all ${
                  heroSlide === 1 ? 'w-6 bg-white' : 'w-2 bg-white/40'
                }`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sephora-Inspired Beauty Pass Rewards & Tier Passport */}
      <section className="px-4 md:px-6">
        <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-[#efe6e4] flex flex-col gap-3">
          {/* Top Tier Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-serif text-sm tracking-widest font-bold shadow-xs">
                V
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-[#1f1b19]">Black Member</span>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#C59B27]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <span className="text-xs text-[#47464a]">Elena Vance</span>
              </div>
            </div>
            <div className="text-right cursor-pointer" onClick={() => onNavigate('pass')}>
              <span className="font-serif text-2xl text-[#1f1b19] font-semibold tracking-tight">
                480
              </span>
              <span className="font-label-caps text-[10px] uppercase text-[#47464a] ml-1">
                pts
              </span>
            </div>
          </div>

          {/* Tier Progress Micro Bar */}
          <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-[#f5ece9] rounded-full overflow-hidden">
              <div className="h-full bg-black rounded-full transition-all" style={{ width: '80%' }}></div>
            </div>
            <div className="flex justify-between items-center text-[#47464a] text-[11px]">
              <span>
                Spend $20 to unlock <strong className="text-[#1f1b19]">$20 Off Voucher</strong>
              </span>
              <span className="font-semibold text-black">500 pts needed</span>
            </div>
          </div>

          {/* Quick Perk Tray */}
          <div className="bg-[#fbf2ef] rounded-xl p-3 flex items-center justify-between border border-[#ffc8b9]/40">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="material-symbols-outlined text-[20px] text-[#7e5448] flex-shrink-0">
                card_giftcard
              </span>
              <p className="text-xs text-[#1f1b19] truncate">
                Complimentary Scalp Diagnostic ready to redeem
              </p>
            </div>
            <button
              onClick={() => onNavigate('pass')}
              className="flex-shrink-0 text-[#7e5448] font-label-caps text-xs uppercase tracking-wider pl-2 font-bold hover:underline"
            >
              Pass →
            </button>
          </div>
        </div>
      </section>

      {/* Flash Deal of the Week (Limited Window) */}
      <section className="px-4 md:px-6">
        <div className="w-full bg-[#ffc8b9]/40 rounded-2xl p-4 shadow-sm border border-[#ffc8b9] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[20px] text-[#8C2626] animate-pulse">
                timer
              </span>
              <span className="font-label-caps text-[11px] uppercase tracking-widest text-[#7a5146] font-bold">
                Flash Studio Drop
              </span>
            </div>
            {/* Live Countdown UI */}
            <div className="flex items-center gap-1 font-label-caps text-xs text-[#7a5146]">
              <span className="bg-white px-2 py-0.5 rounded text-[#1f1b19] font-bold shadow-xs">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              :
              <span className="bg-white px-2 py-0.5 rounded text-[#1f1b19] font-bold shadow-xs">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              :
              <span className="bg-white px-2 py-0.5 rounded text-[#1f1b19] font-bold shadow-xs">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#f5ece9] shadow-sm">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFtR0FqosvWimgWem1kbwcUPHtoTEPBf0q2Wu38JiC-6CKkQnn8NiH5hZlHn5NTgExh0fw_FaszxY2zIxuLIhEIPAVFhRbc4Lvcm_sQ4-wFcURx2nwflfpDapCztq4AkrUU_HQJOJE4Yi5UACbtGt4RkH29owblWoLKf9HRb3clgdrRlKX8gS94dHTn2T98uutrL2oLgXIeZx-gBmR5FpqzNrWB7I-j31RrQnlcE5QOHycZz14l9vHcA"
                alt="Botanical Deep Scalp Reset"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-label-caps text-[10px] uppercase text-[#7e5448] font-bold">
                35% Off Today Only
              </span>
              <h3 className="font-serif text-base font-semibold text-[#1f1b19] truncate">
                Botanical Deep Scalp Reset
              </h3>
              <p className="text-xs text-[#47464a] line-clamp-1">
                Studio Nōh, Mayfair • 75 mins
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="font-serif text-lg text-[#1f1b19] font-bold">$115</span>
                <span className="text-xs text-[#47464a] line-through">$180</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onQuickBook(headSpaTreatment)}
            className="w-full h-11 rounded-full bg-black text-white font-label-caps text-xs uppercase tracking-widest flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all font-bold hover:bg-neutral-800"
          >
            <span>Claim Slot Before Expiry</span>
          </button>
        </div>
      </section>

      {/* Trending Treatments Near You */}
      <section className="flex flex-col space-y-2">
        <div className="px-4 md:px-6 flex items-baseline justify-between">
          <div>
            <h2 className="font-serif text-xl text-[#1f1b19] font-medium">Trending Treatments</h2>
            <p className="text-xs text-[#47464a]">
              Highly requested appointments in Orchard &amp; Downtown
            </p>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="font-label-caps text-xs uppercase tracking-wider text-[#7e5448] font-bold flex-shrink-0 hover:underline"
          >
            See 24+
          </button>
        </div>

        {/* Cards Scroll Container */}
        <div className="flex overflow-x-auto gap-4 px-4 md:px-6 no-scrollbar pb-2">
          {TREATMENTS.slice(0, 4).map((item) => (
            <article
              key={item.id}
              className="w-[280px] flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-sm border border-[#efe6e4] flex flex-col group hover:shadow-md transition-all"
            >
              {/* Media Container */}
              <div
                className="relative w-full aspect-[4/3] bg-[#f5ece9] cursor-pointer"
                onClick={() => onSelectTreatment(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Rating badge */}
                <div className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <span
                    className="material-symbols-outlined text-[14px] text-[#C59B27]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-xs font-bold text-[#1f1b19]">{item.rating}</span>
                  <span className="text-[10px] text-[#47464a]">({item.reviewCount})</span>
                </div>
                {/* Wishlist Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(item.id);
                  }}
                  aria-label="Wishlist"
                  className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center active:scale-75 transition-all shadow-xs ${
                    wishlist.includes(item.id)
                      ? 'bg-white text-[#8C2626]'
                      : 'bg-white/80 text-[#1f1b19] hover:bg-white'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={wishlist.includes(item.id) ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    favorite
                  </span>
                </button>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                <div
                  className="cursor-pointer"
                  onClick={() => onSelectTreatment(item)}
                >
                  <span className="font-label-caps text-[10px] uppercase text-[#47464a] tracking-wider line-clamp-1">
                    {item.atelier} • {item.distance}
                  </span>
                  <h3 className="font-serif text-base text-[#1f1b19] leading-snug line-clamp-1 mt-0.5 font-medium">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#47464a] mt-1 line-clamp-1">
                    {item.durationMins} mins • {item.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#f5ece9]">
                  <div className="flex flex-col">
                    <span className="font-label-caps text-[9px] text-[#47464a] uppercase">
                      Starts at
                    </span>
                    <span className="font-serif text-base text-[#1f1b19] font-bold">
                      ${item.price}
                    </span>
                  </div>
                  <button
                    onClick={() => onQuickBook(item)}
                    className="h-9 px-4 rounded-full bg-black text-white font-label-caps text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all font-bold"
                  >
                    Book
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Curated Top Artisans & Specialists */}
      <section className="flex flex-col space-y-2">
        <div className="px-4 md:px-6 flex items-baseline justify-between">
          <div>
            <h2 className="font-serif text-xl text-[#1f1b19] font-medium">Master Practitioners</h2>
            <p className="text-xs text-[#47464a]">
              Handpicked beauty artisans with exceptional acclaim
            </p>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="font-label-caps text-xs uppercase tracking-wider text-[#7e5448] font-bold hover:underline"
          >
            Discover
          </button>
        </div>

        <div className="flex overflow-x-auto gap-3 px-4 md:px-6 no-scrollbar pb-1">
          {SPECIALISTS.map((specialist) => (
            <div
              key={specialist.id}
              className="w-[230px] flex-shrink-0 bg-white rounded-2xl p-4 shadow-sm border border-[#efe6e4] flex flex-col items-center text-center hover:border-black transition-all"
            >
              <div className="relative w-20 h-20 rounded-full overflow-hidden mb-2">
                <img
                  src={specialist.avatar}
                  alt={specialist.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute bottom-0 right-0 w-4 h-4 rounded-full shadow-xs border-2 border-white ${
                    specialist.status === 'online' ? 'bg-[#2E6B4F]' : 'bg-[#B87A28]'
                  }`}
                />
              </div>
              <h4 className="text-base text-[#1f1b19] font-bold">{specialist.name}</h4>
              <span className="font-label-caps text-[10px] uppercase text-[#7e5448] font-semibold">
                {specialist.title}
              </span>
              <span className="text-xs text-[#47464a] mt-0.5">{specialist.atelier}</span>

              {/* Slot Badge */}
              <div className="w-full mt-3 bg-[#fbf2ef] py-1.5 px-2 rounded-full flex items-center justify-center gap-1.5 text-[#1f1b19] font-label-caps text-[10px] uppercase">
                <span
                  className={`material-symbols-outlined text-[14px] ${
                    specialist.status === 'online' ? 'text-[#2E6B4F]' : 'text-[#B87A28]'
                  }`}
                >
                  {specialist.status === 'online' ? 'schedule' : 'event_busy'}
                </span>
                <span>{specialist.slotTime}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Quotable Delight Module */}
      <section className="px-4 md:px-6">
        <div className="w-full bg-[#F4EFEB] rounded-2xl p-6 flex flex-col items-center text-center space-y-2 border border-[#EBD9CC]">
          <span className="material-symbols-outlined text-[28px] text-[#7e5448]">format_quote</span>
          <p className="font-serif text-base md:text-lg text-[#1f1b19] italic max-w-sm">
            “Self-care is not an indulgence; it is the discipline of restoration.”
          </p>
          <span className="font-label-caps text-[10px] uppercase tracking-widest text-[#47464a] pt-1">
            Vélure Beauty Manifesto • Vol. 14
          </span>
        </div>
      </section>
    </div>
  );
};
