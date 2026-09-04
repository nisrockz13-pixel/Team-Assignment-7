import React, { useState, useMemo } from 'react';
import { Treatment, ScreenType } from '../types';
import { TREATMENTS, MAP_IMAGE_URL } from '../data/mockData';

interface ExploreScreenProps {
  onSelectTreatment: (treatment: Treatment) => void;
  onQuickBook: (treatment: Treatment) => void;
  onNavigate: (screen: ScreenType) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onSelectTreatment,
  onQuickBook,
  onNavigate,
  selectedCategory,
  onSelectCategory,
  wishlist,
  onToggleWishlist
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState('recommended');
  const [searchFilter, setSearchFilter] = useState(
    selectedCategory !== 'All' ? selectedCategory : 'Central District • Luxury Facials & Spa'
  );
  const [activeFilterDistance, setActiveFilterDistance] = useState(true);
  const [activeFilterRating, setActiveFilterRating] = useState(true);
  const [activeFilterPrice, setActiveFilterPrice] = useState(false);
  const [activeFilterToday, setActiveFilterToday] = useState(true);
  const [selectedPinId, setSelectedPinId] = useState<string>('cryo-facial');

  const filteredTreatments = useMemo(() => {
    let result = [...TREATMENTS];

    // Filter category if not "All"
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(
        (t) =>
          t.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          t.title.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Filter rating 4.8+
    if (activeFilterRating) {
      result = result.filter((t) => t.rating >= 4.8);
    }

    // Filter under $150
    if (activeFilterPrice) {
      result = result.filter((t) => t.price <= 150);
    }

    // Filter available today
    if (activeFilterToday) {
      result = result.filter((t) => t.availableToday);
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'duration') {
      result.sort((a, b) => a.durationMins - b.durationMins);
    }

    return result;
  }, [selectedCategory, activeFilterRating, activeFilterPrice, activeFilterToday, sortBy]);

  const activeFiltersCount =
    (activeFilterDistance ? 1 : 0) +
    (activeFilterRating ? 1 : 0) +
    (activeFilterPrice ? 1 : 0) +
    (activeFilterToday ? 1 : 0);

  const selectedTreatmentForPin =
    TREATMENTS.find((t) => t.id === selectedPinId) || filteredTreatments[0] || TREATMENTS[0];

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Sticky Discovery Bar */}
      <section className="sticky top-16 z-30 bg-[#fff8f6]/95 backdrop-blur-md px-4 md:px-6 pt-2 pb-3 shadow-xs border-b border-[#f5ece9] flex flex-col gap-2.5">
        {/* Search Query Bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 flex items-center bg-[#efe6e4] px-3.5 py-2 rounded-full min-w-0">
            <span className="material-symbols-outlined text-[#7e5448] text-[18px] mr-2 flex-shrink-0">
              search
            </span>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-label-caps text-[9px] text-[#47464a] uppercase tracking-widest leading-tight">
                Searching in
              </span>
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="font-semibold text-xs md:text-sm text-[#1f1b19] truncate bg-transparent focus:outline-none"
              />
            </div>
            {searchFilter && (
              <button
                onClick={() => {
                  setSearchFilter('');
                  onSelectCategory('All');
                }}
                aria-label="Clear filter"
                className="w-6 h-6 rounded-full bg-[#f5ece9] flex items-center justify-center text-[#47464a] hover:text-[#1f1b19] transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            )}
          </div>

          {/* View Switcher (List vs Map) */}
          <div className="flex bg-[#efe6e4] p-1 rounded-full items-center flex-shrink-0">
            <button
              onClick={() => setViewMode('list')}
              aria-label="List View"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                viewMode === 'list'
                  ? 'bg-black text-white shadow-xs'
                  : 'text-[#47464a] hover:text-black'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              aria-label="Map View"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                viewMode === 'map'
                  ? 'bg-black text-white shadow-xs'
                  : 'text-[#47464a] hover:text-black'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">map</span>
            </button>
          </div>
        </div>

        {/* Active Filter Chips Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => {
              // reset or toggle all
              setActiveFilterDistance((p) => !p);
              setActiveFilterRating(true);
            }}
            className="flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-full flex-shrink-0 shadow-xs transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-[14px]">tune</span>
            <span className="text-xs font-semibold">Filters ({activeFiltersCount})</span>
          </button>

          {activeFilterDistance && (
            <button
              onClick={() => setActiveFilterDistance(false)}
              className="flex items-center gap-1.5 bg-[#ffc8b9] text-[#7a5146] px-3 py-1.5 rounded-full flex-shrink-0 transition-transform active:scale-95"
            >
              <span className="text-xs font-semibold">Distance: &lt; 5km</span>
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}

          {activeFilterRating && (
            <button
              onClick={() => setActiveFilterRating(false)}
              className="flex items-center gap-1.5 bg-[#ffc8b9] text-[#7a5146] px-3 py-1.5 rounded-full flex-shrink-0 transition-transform active:scale-95"
            >
              <span
                className="material-symbols-outlined text-[#C59B27] text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="text-xs font-semibold">Rating: 4.8+</span>
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}

          <button
            onClick={() => setActiveFilterPrice((p) => !p)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full flex-shrink-0 transition-transform active:scale-95 ${
              activeFilterPrice
                ? 'bg-[#ffc8b9] text-[#7a5146] font-semibold'
                : 'bg-[#efe6e4] text-[#1f1b19]'
            }`}
          >
            <span className="text-xs">Under $150</span>
            {activeFilterPrice && (
              <span className="material-symbols-outlined text-[14px]">close</span>
            )}
          </button>

          <button
            onClick={() => setActiveFilterToday((p) => !p)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full flex-shrink-0 transition-transform active:scale-95 ${
              activeFilterToday
                ? 'bg-[#ffc8b9] text-[#7a5146] font-semibold'
                : 'bg-[#efe6e4] text-[#1f1b19]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B4F]"></span>
            <span className="text-xs">Available Today</span>
          </button>
        </div>

        {/* Sort Dropdown & Quick Count */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <span className="font-label-caps text-[10px] text-[#47464a] uppercase tracking-wider">
              Sort by:
            </span>
            <div className="relative inline-block">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent text-xs font-bold text-[#1f1b19] pr-5 py-0.5 focus:outline-none cursor-pointer"
              >
                <option value="recommended">Recommended by Vélure</option>
                <option value="nearest">Nearest to Me</option>
                <option value="price-low">Price: Low to High</option>
                <option value="rating">Top Rated (4.9+)</option>
                <option value="duration">Fastest Duration</option>
              </select>
              <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-[#1f1b19] pointer-events-none text-[16px]">
                expand_more
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[#47464a]">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span className="font-label-caps text-[10px] uppercase tracking-wider font-semibold">
              Concierge Verified
            </span>
          </div>
        </div>
      </section>

      {/* Map View Mode */}
      {viewMode === 'map' ? (
        <div className="px-4 md:px-6 mt-3 flex flex-col gap-4">
          <div className="relative w-full h-[380px] md:h-[480px] rounded-2xl overflow-hidden shadow-md border border-[#efe6e4] bg-[#efe6e4]">
            {/* Map visual background */}
            <img
              src={MAP_IMAGE_URL}
              alt="Singapore Central District Map"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />

            {/* Interactive Pins */}
            {TREATMENTS.map((t, idx) => {
              const pinPositions = [
                { top: '35%', left: '42%' },
                { top: '55%', left: '60%' },
                { top: '40%', left: '50%' },
                { top: '65%', left: '30%' },
                { top: '30%', left: '48%' },
                { top: '50%', left: '38%' }
              ];
              const pos = pinPositions[idx % pinPositions.length];
              const isSelected = selectedPinId === t.id;

              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedPinId(t.id)}
                  style={{ top: pos.top, left: pos.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-black text-white ring-4 ring-[#DFB3A6] scale-110 z-20'
                      : 'bg-white text-[#1f1b19] hover:bg-black hover:text-white z-10'
                  }`}
                >
                  <span className="font-serif">${t.price}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Pin Bottom Card preview */}
          {selectedTreatmentForPin && (
            <div className="bg-white rounded-2xl p-4 shadow-md border border-[#efe6e4] flex items-center justify-between gap-3">
              <div
                className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                onClick={() => onSelectTreatment(selectedTreatmentForPin)}
              >
                <img
                  src={selectedTreatmentForPin.image}
                  alt={selectedTreatmentForPin.title}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-label-caps text-[9px] uppercase text-[#7e5448] font-bold">
                    {selectedTreatmentForPin.atelier} • {selectedTreatmentForPin.distance}
                  </span>
                  <h4 className="font-serif text-sm font-semibold text-[#1f1b19] truncate">
                    {selectedTreatmentForPin.title}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-[#47464a] mt-0.5">
                    <span className="font-bold text-black">${selectedTreatmentForPin.price}</span>
                    <span>• {selectedTreatmentForPin.durationMins} mins</span>
                    <span className="text-[#C59B27] font-bold ml-1">★ {selectedTreatmentForPin.rating}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onQuickBook(selectedTreatmentForPin)}
                className="px-4 py-2 rounded-full bg-black text-white font-label-caps text-xs uppercase tracking-wider font-bold shadow-xs hover:bg-neutral-800 flex-shrink-0"
              >
                Book
              </button>
            </div>
          )}
        </div>
      ) : (
        /* List View Mode (Matching Image 6 directly) */
        <main className="px-4 md:px-6 flex flex-col gap-6 mt-3">
          {filteredTreatments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#efe6e4] p-6">
              <span className="material-symbols-outlined text-[36px] text-[#47464a]">spa</span>
              <p className="font-serif text-lg text-[#1f1b19] mt-2">No matching treatments found</p>
              <p className="text-xs text-[#47464a] mt-1">Try resetting your filter parameters</p>
              <button
                onClick={() => {
                  setActiveFilterPrice(false);
                  setActiveFilterRating(false);
                  onSelectCategory('All');
                }}
                className="mt-4 px-4 py-2 bg-black text-white text-xs uppercase tracking-wider rounded-full font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredTreatments.map((treatment) => {
              const isBookmarked = wishlist.includes(treatment.id);

              return (
                <article
                  key={treatment.id}
                  className="bg-white rounded-2xl shadow-[0_4px_24px_-4px_rgba(18,18,20,0.06)] border border-[#efe6e4] overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-lg"
                >
                  {/* Media Header */}
                  <div className="relative w-full h-56 overflow-hidden">
                    <img
                      src={treatment.image}
                      alt={treatment.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

                    {/* Top Media Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      {treatment.badge && (
                        <span
                          className={`px-2.5 py-1 rounded-full font-label-caps text-[10px] uppercase tracking-wider font-bold shadow-xs flex items-center gap-1 ${
                            treatment.badgeType === 'plum'
                              ? 'bg-[#3A1720] text-white'
                              : treatment.badgeType === 'gold'
                              ? 'bg-[#C59B27] text-white'
                              : 'bg-white/90 backdrop-blur-md text-black'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              treatment.badgeType === 'plum'
                                ? 'bg-[#DFB3A6]'
                                : treatment.badgeType === 'gold'
                                ? 'bg-white'
                                : 'bg-[#2E6B4F]'
                            }`}
                          />
                          {treatment.badge}
                        </span>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(treatment.id);
                        }}
                        aria-label="Bookmark treatment"
                        className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors shadow-xs ${
                          isBookmarked
                            ? 'bg-white text-[#8C2626]'
                            : 'bg-white/90 text-[#1f1b19] hover:text-[#8C2626]'
                        }`}
                      >
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : {}}
                        >
                          favorite
                        </span>
                      </button>
                    </div>

                    {/* Inset Distance & Rating */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                      <div className="flex flex-col">
                        <span className="font-label-caps text-[10px] uppercase tracking-widest text-[#EBD9CC]">
                          {treatment.location} • {treatment.distance}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className="material-symbols-outlined text-[#C59B27] text-[16px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          <span className="text-sm font-bold">{treatment.rating}</span>
                          <span className="text-xs text-[#e9e1de]">({treatment.reviewCount})</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="font-label-caps text-[9px] uppercase tracking-widest text-[#EBD9CC]">
                          Treatment Duration
                        </span>
                        <span className="text-xs font-semibold">{treatment.durationMins} mins</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="p-4 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-caps text-[10px] tracking-widest text-[#7e5448] font-bold uppercase">
                          {treatment.atelier}
                        </span>
                        <h3 className="font-serif text-lg text-[#1f1b19] mt-0.5 leading-snug font-medium">
                          {treatment.title}
                        </h3>
                      </div>
                      <div className="flex flex-col items-end flex-shrink-0">
                        <span className="font-serif text-lg text-[#1f1b19] font-bold">
                          ${treatment.price}
                        </span>
                        <span className="font-label-caps text-[9px] text-[#47464a] uppercase">
                          Inclusive
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#47464a] line-clamp-2">{treatment.description}</p>

                    {/* Perks / Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {treatment.instantConfirm && (
                        <span className="bg-[#f5ece9] px-2.5 py-1 rounded-full font-label-caps text-[10px] text-[#47464a] font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px] text-[#7e5448]">
                            verified
                          </span>
                          Instant Confirmation
                        </span>
                      )}
                      <span className="bg-[#efe6e4] px-2.5 py-1 rounded-full font-label-caps text-[10px] text-[#3A1720] font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-[#7e5448]">
                          loyalty
                        </span>
                        Beauty Pass 2x Points
                      </span>
                    </div>

                    {/* Available Times Slots Pills */}
                    <div className="bg-[#fbf2ef] rounded-xl p-2.5 mt-1 flex flex-col gap-1.5 border border-[#efe6e4]">
                      <div className="flex items-center justify-between">
                        <span className="font-label-caps text-[10px] text-[#47464a] uppercase font-bold tracking-wider">
                          Today's Openings
                        </span>
                        <span className="font-label-caps text-[10px] text-[#2E6B4F] font-semibold">
                          Next: in 45m
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {treatment.slots.map((slot, sIdx) => {
                          const isInactive = slot === '8:30 PM';
                          return (
                            <button
                              key={sIdx}
                              disabled={isInactive}
                              onClick={() => onQuickBook(treatment)}
                              className={`flex-1 py-1.5 rounded-lg text-xs font-bold text-center transition-colors shadow-xs ${
                                isInactive
                                  ? 'bg-[#efe6e4] text-[#47464a] line-through opacity-50 cursor-not-allowed'
                                  : 'bg-white text-[#1f1b19] hover:bg-black hover:text-white'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-2 pt-2 border-t border-[#f5ece9]">
                      <button
                        onClick={() => onSelectTreatment(treatment)}
                        className="flex-1 bg-[#efe6e4] text-[#1f1b19] py-2.5 rounded-full font-label-caps text-xs uppercase tracking-wider font-bold hover:bg-[#e9e1de] transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => onQuickBook(treatment)}
                        className="flex-1 bg-black text-white py-2.5 rounded-full font-label-caps text-xs uppercase tracking-wider font-bold shadow-sm hover:bg-neutral-800 transition-all active:scale-[0.98]"
                      >
                        Quick Book
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </main>
      )}

      {/* Bottom Floating Filter Summary Pill */}
      <div className="fixed bottom-20 left-0 right-0 z-40 flex justify-center pointer-events-none px-4">
        <div
          onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
          className="pointer-events-auto bg-black/95 backdrop-blur-xl text-white px-5 py-2.5 rounded-full shadow-[0_12px_36px_-4px_rgba(18,18,20,0.3)] flex items-center gap-3 active:scale-95 transition-all cursor-pointer border border-white/10"
        >
          <span className="material-symbols-outlined text-[18px] text-[#DFB3A6]">
            auto_awesome
          </span>
          <span className="text-xs tracking-wider font-semibold">
            Showing {filteredTreatments.length * 8} curated treatments
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#DFB3A6]"></span>
          <span className="font-label-caps text-[10px] uppercase text-[#DFB3A6] font-bold">
            Central
          </span>
        </div>
      </div>
    </div>
  );
};
