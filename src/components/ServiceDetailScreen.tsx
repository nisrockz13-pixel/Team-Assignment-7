import React, { useState } from 'react';
import { Treatment, Specialist, AddOnItem } from '../types';
import { ADD_ONS, SPECIALISTS, REVIEWS, MAP_IMAGE_URL } from '../data/mockData';

interface ServiceDetailScreenProps {
  treatment: Treatment;
  onProceedToCheckout: (
    treatment: Treatment,
    specialist: Specialist,
    selectedAddOns: AddOnItem[],
    calculatedPrice: number,
    calculatedDuration: number
  ) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onBack: () => void;
}

export const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({
  treatment,
  onProceedToCheckout,
  wishlist,
  onToggleWishlist,
  onBack
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'protocol' | 'specialists' | 'reviews'>('overview');
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist>(SPECIALISTS[0]);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const galleryImages = treatment.gallery && treatment.gallery.length > 0
    ? [
        {
          src: treatment.gallery[0],
          caption: 'Treatment in Session'
        },
        {
          src: treatment.gallery[1] || treatment.image,
          caption: 'Private Suite 04'
        },
        {
          src: treatment.gallery[2] || treatment.image,
          caption: 'Clinical Results'
        }
      ]
    : [
        {
          src: treatment.image,
          caption: 'Treatment in Session'
        },
        {
          src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnjavBwwTwJPSbGfO42okVtdmOj62dlsXN2kGHsYQlDPEWw22eLngGNN_NIYPB8dK7L5VLOuoyK78CBdfkgkTL0ji5XgbAPynhb_zRt9GP-TOGLylYnkUPhWalp1d-iYgAskedn2UeACaHVMHpnNtNVk0Ag1C3ibKr0Bn6-p5AxievM6BHPTQUJH1j_UGU0bJd_ohvqBdjjiGpcdGIZa3J8VSC1D3JrXdESCT2iVmuEC1b8-PHjyDlGg',
          caption: 'Private Suite 04'
        },
        {
          src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYIwDm2vDVPdYCdY-w0gfyWrn1OwqgIdcpFEZUj4sWZYhOC412zZ5lnirIRia4z9W7CbZZ8lqsEVHNKAbWhR_esw2-yJZGb4-SRSyzLvIlBtn8Pin_JIF3kZNhOcVdtmboolovtIKMxMQ3vttNp9ROt22BO84YCg4w6DQL0uVvzv-nwgiHP_YJRnHg2iLfLhHjj36mfZ6ccjZ18FChLnNyF4SixakiQ_1qWZYMF6yfk5NdtfFzQdWkig',
          caption: 'Clinical Results'
        }
      ];

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedAddOnObjects = ADD_ONS.filter((item) => selectedAddOnIds.includes(item.id));

  const totalAdditionalPrice = selectedAddOnObjects.reduce((acc, curr) => acc + curr.price, 0);
  const totalAdditionalDuration = selectedAddOnObjects.reduce((acc, curr) => acc + curr.durationMins, 0);

  const finalPrice = treatment.price + totalAdditionalPrice;
  const finalDuration = treatment.durationMins + totalAdditionalDuration;

  const isBookmarked = wishlist.includes(treatment.id);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: treatment.title,
          text: treatment.description,
          url: window.location.href
        });
      } catch (err) {
        // user cancelled or share failed
      }
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setToastMessage('Link copied to clipboard!');
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  return (
    <div className="flex flex-col w-full pb-32">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Hero Media Carousel */}
      <div className="relative w-full overflow-hidden bg-[#efe6e4]">
        <div
          className="flex w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {galleryImages.map((img, idx) => (
            <div key={idx} className="min-w-full relative aspect-[4/5] bg-[#efe6e4]">
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              <span className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white font-label-caps text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                {img.caption}
              </span>
            </div>
          ))}
        </div>

        {/* Floating Top Control Badges */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button
            onClick={() => onToggleWishlist(treatment.id)}
            aria-label="Save to wishlist"
            className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center shadow-md active:scale-95 transition-all ${
              isBookmarked
                ? 'bg-white text-[#8C2626]'
                : 'bg-[#fff8f6]/85 text-[#1f1b19] hover:bg-white'
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              favorite
            </span>
          </button>
          <button
            onClick={handleShare}
            aria-label="Share service"
            className="w-10 h-10 rounded-full bg-[#fff8f6]/85 backdrop-blur-md text-[#1f1b19] flex items-center justify-center shadow-md active:scale-95 transition-all hover:bg-white"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full z-10">
          {galleryImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Badges Strip */}
      <div className="px-4 md:px-6 pt-4 flex flex-wrap items-center gap-1.5">
        <div className="flex items-center gap-1 bg-[#efe6e4] text-[#1f1b19] px-2.5 py-1 rounded-full shadow-xs">
          <span
            className="material-symbols-outlined text-[#C59B27] text-[15px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
          <span className="font-label-caps text-[10px] uppercase tracking-wider font-semibold">
            Vélure Verified
          </span>
        </div>
        <div className="flex items-center gap-1 bg-[#ffc8b9] text-[#7a5146] px-2.5 py-1 rounded-full shadow-xs">
          <span className="material-symbols-outlined text-[15px]">diamond</span>
          <span className="font-label-caps text-[10px] uppercase tracking-wider font-semibold">
            Beauty Pass Partner
          </span>
        </div>
        <div className="flex items-center gap-1 bg-black text-white px-2.5 py-1 rounded-full shadow-xs">
          <span className="material-symbols-outlined text-[15px]">workspace_premium</span>
          <span className="font-label-caps text-[10px] uppercase tracking-wider font-semibold">
            Award Winner ’24
          </span>
        </div>
      </div>

      {/* Title & Atelier */}
      <div className="px-4 md:px-6 pt-3">
        <p className="font-label-caps text-[10px] text-[#7e5448] uppercase tracking-widest mb-1 font-bold">
          {treatment.subtitle}
        </p>
        <h1 className="font-serif text-2xl md:text-3xl text-[#1f1b19] tracking-tight font-medium">
          {treatment.title}
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-[#47464a]">
            {treatment.atelier} • {treatment.location}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#c8c6ca]"></span>
          <div className="flex items-center gap-1">
            <span
              className="material-symbols-outlined text-[#C59B27] text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="text-xs font-bold text-[#1f1b19]">{treatment.rating}</span>
            <span className="text-xs text-[#47464a]">({treatment.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Pricing and points reward box */}
      <div className="mx-4 md:mx-6 mt-4 p-4 bg-[#fbf2ef] rounded-2xl shadow-xs border border-[#efe6e4] flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl text-[#1f1b19] font-semibold">
              ${treatment.price}
            </span>
            <span className="text-xs text-[#47464a]">• {treatment.durationMins} mins</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-[#7e5448] text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px]">stars</span>
            <span>Earn {treatment.price * 2} Beauty Pass points</span>
          </div>
        </div>

        <div className="bg-[#e9e1de] px-3 py-1.5 rounded-xl flex flex-col items-center justify-center">
          <span className="font-label-caps text-[9px] text-[#2E6B4F] uppercase font-bold">
            Instant Confirm
          </span>
          <span className="text-[11px] text-[#47464a] mt-0.5">Flexible 24h cancel</span>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="mt-5 px-4 md:px-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {(
            [
              { id: 'overview', label: 'Overview' },
              { id: 'protocol', label: 'Protocol & Steps' },
              { id: 'specialists', label: 'Specialists' },
              { id: 'reviews', label: 'Reviews' }
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all font-semibold ${
                activeTab === tab.id
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-[#f5ece9] text-[#47464a] hover:text-[#1f1b19]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="px-4 md:px-6 mt-4 animate-fade-in">
          <p className="text-xs md:text-sm text-[#47464a] leading-relaxed">
            {treatment.description}
          </p>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="p-3.5 bg-white rounded-2xl shadow-xs border border-[#efe6e4] flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#ffc8b9] text-[#7a5146] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">ac_unit</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1f1b19]">Cryo Chill Flush</h4>
                <p className="text-[11px] text-[#47464a] mt-0.5">
                  Rapid lymphatic micro-circulation
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-2xl shadow-xs border border-[#efe6e4] flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EBD9CC] text-[#1f1b19] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">water_drop</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1f1b19]">Deep Dermis Plump</h4>
                <p className="text-[11px] text-[#47464a] mt-0.5">
                  Tri-molecular hyaluronic infusion
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Protocol & Steps */}
      {activeTab === 'protocol' && (
        <div className="px-4 md:px-6 mt-4 space-y-3 animate-fade-in">
          {[
            {
              step: '01',
              title: 'Double Cleanse & Enzymatic Peel',
              desc: 'Dissolves surface cellular buildup with papaya enzymes and botanical oils without perturbing barrier moisture.'
            },
            {
              step: '02',
              title: 'Sub-zero Cryo Infusion & Peptide Serum',
              desc: 'Controlled -30°C pressurized cold vapor drives active matrixyl peptides deeply into dermal layers for immediate tautness.'
            },
            {
              step: '03',
              title: 'Targeted Lymphatic Drainage',
              desc: 'Sculpting acupressure glass wand massage clears submandibular fluid buildup and redefines facial contours.'
            },
            {
              step: '04',
              title: 'Collagen Hydro-Jelly Mask & Neck Massage',
              desc: 'Cooling occlusive mask seals hydration while a décolleté tension-relief massage promotes profound tranquility.'
            }
          ].map((item) => (
            <div
              key={item.step}
              className="p-4 bg-white rounded-2xl shadow-xs border border-[#efe6e4] flex gap-3.5 items-start"
            >
              <span className="font-serif text-lg font-bold text-[#7e5448] flex-shrink-0">
                {item.step}
              </span>
              <div>
                <h4 className="text-xs md:text-sm font-bold text-[#1f1b19]">{item.title}</h4>
                <p className="text-xs text-[#47464a] mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Specialists */}
      {activeTab === 'specialists' && (
        <div className="px-4 md:px-6 mt-4 space-y-3 animate-fade-in">
          <p className="text-xs text-[#47464a] mb-2">
            Select your preferred practitioner for this appointment:
          </p>

          {SPECIALISTS.slice(0, 2).map((sp) => {
            const isSelected = selectedSpecialist.id === sp.id;
            return (
              <label
                key={sp.id}
                onClick={() => setSelectedSpecialist(sp)}
                className={`flex items-center justify-between p-3.5 rounded-2xl shadow-xs cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-[#fbf2ef] border-black'
                    : 'bg-white border-[#efe6e4] hover:border-[#47464a]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={sp.avatar}
                    alt={sp.name}
                    className="w-12 h-12 rounded-full object-cover shadow-xs border border-white"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs md:text-sm font-bold text-[#1f1b19]">{sp.name}</h4>
                      <span
                        className={`font-label-caps text-[9px] px-2 py-0.5 rounded-full ${
                          sp.roleType === 'Lead'
                            ? 'bg-[#ffc8b9] text-[#7a5146]'
                            : 'bg-[#efe6e4] text-[#1f1b19]'
                        }`}
                      >
                        {sp.roleType}
                      </span>
                    </div>
                    <p className="text-xs text-[#47464a]">
                      {sp.title} • {sp.experienceYears} yrs exp
                    </p>
                  </div>
                </div>

                <input
                  type="radio"
                  name="specialist-choice"
                  checked={isSelected}
                  onChange={() => setSelectedSpecialist(sp)}
                  className="w-5 h-5 accent-black cursor-pointer"
                />
              </label>
            );
          })}
        </div>
      )}

      {/* Tab: Reviews */}
      {activeTab === 'reviews' && (
        <div className="px-4 md:px-6 mt-4 animate-fade-in">
          <div className="p-4 bg-white rounded-2xl shadow-xs border border-[#efe6e4]">
            <div className="flex items-center justify-between mb-3 border-b border-[#f5ece9] pb-2">
              <div className="flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[#C59B27] text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="text-sm font-bold text-[#1f1b19]">{treatment.rating}</span>
                <span className="text-xs text-[#47464a]">out of 5</span>
              </div>
              <span className="font-label-caps text-[10px] text-[#7e5448] font-bold">
                98% would rebook
              </span>
            </div>

            <div className="space-y-3">
              {REVIEWS.map((rev) => (
                <div key={rev.id} className="bg-[#fbf2ef] p-3 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1f1b19]">{rev.author}</span>
                    <span className="text-[10px] text-[#47464a]">{rev.date}</span>
                  </div>
                  <p className="text-xs text-[#47464a] mt-1 italic leading-relaxed">
                    “{rev.comment}”
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Popular Add-ons (Customize Treatment) */}
      <div className="mt-6 px-4 md:px-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-lg text-[#1f1b19] font-medium">Popular Add-ons</h3>
          <span className="font-label-caps text-[10px] text-[#7e5448] uppercase font-bold">
            Customize Treatment
          </span>
        </div>

        <div className="space-y-2.5">
          {ADD_ONS.map((addon) => {
            const isChecked = selectedAddOnIds.includes(addon.id);
            return (
              <label
                key={addon.id}
                className={`flex items-center justify-between p-3.5 rounded-2xl shadow-xs cursor-pointer active:scale-[0.99] transition-all border ${
                  isChecked
                    ? 'bg-[#fbf2ef] border-black'
                    : 'bg-white border-[#efe6e4] hover:border-black'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleAddOn(addon.id)}
                    className="w-5 h-5 accent-black cursor-pointer rounded"
                  />
                  <div>
                    <div className="text-xs md:text-sm font-semibold text-[#1f1b19]">
                      {addon.name}
                    </div>
                    <p className="text-xs text-[#47464a]">{addon.description}</p>
                  </div>
                </div>
                <span className="text-xs md:text-sm font-bold text-[#1f1b19]">
                  +${addon.price}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Studio Perks & Amenities */}
      <div className="mt-6 px-4 md:px-6">
        <h3 className="font-serif text-lg text-[#1f1b19] font-medium mb-3">
          Studio Perks &amp; Amenities
        </h3>
        <div className="p-4 bg-[#fbf2ef] rounded-2xl shadow-xs border border-[#efe6e4] space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#efe6e4] flex items-center justify-center text-[#1f1b19] flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">local_parking</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1f1b19]">Valet Parking Available</h4>
              <p className="text-xs text-[#47464a]">Complimentary 2-hour underground valet service</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#efe6e4] flex items-center justify-center text-[#1f1b19] flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">local_cafe</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1f1b19]">Botanical Tea Lounge</h4>
              <p className="text-xs text-[#47464a]">
                Signature post-treatment antioxidant herbal infusions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#efe6e4] flex items-center justify-center text-[#1f1b19] flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">door_front</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1f1b19]">Private Treatment Suites</h4>
              <p className="text-xs text-[#47464a]">
                Acoustically isolated suites with ambient air purification
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Studio Location */}
      <div className="mt-6 px-4 md:px-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-serif text-lg text-[#1f1b19] font-medium">Studio Location</h3>
          <span className="text-xs text-[#7e5448] font-bold">0.8 miles away</span>
        </div>

        <div
          className="w-full h-44 bg-cover bg-center rounded-2xl relative overflow-hidden shadow-sm flex items-end p-3 border border-[#efe6e4]"
          style={{ backgroundImage: `url('${MAP_IMAGE_URL}')` }}
        >
          <div className="w-full bg-white/90 backdrop-blur-md p-3 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#1f1b19]">The Skin Atelier Sanctuary</p>
              <p className="text-[11px] text-[#47464a]">28 Orchard Blvd, Level 03</p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-3 py-1.5 rounded-full font-label-caps text-[10px] uppercase flex items-center gap-1 shadow-xs hover:bg-neutral-800"
            >
              <span className="material-symbols-outlined text-[14px]">directions</span>
              <span>Map</span>
            </a>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#fff8f6]/95 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.06)] border-t border-[#efe6e4] px-4 md:px-6 py-3 pb-safe flex items-center justify-between gap-4">
        <div className="flex flex-col min-w-0">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-2xl font-semibold text-[#1f1b19]">
              ${finalPrice}
            </span>
            <span className="text-xs text-[#47464a]">• {finalDuration} mins</span>
          </div>
          <span className="font-label-caps text-[9px] text-[#7e5448] uppercase truncate max-w-[140px]">
            With {selectedSpecialist.name}
          </span>
        </div>

        <button
          onClick={() =>
            onProceedToCheckout(
              treatment,
              selectedSpecialist,
              selectedAddOnObjects,
              finalPrice,
              finalDuration
            )
          }
          className="flex-1 max-w-[240px] h-12 bg-black hover:bg-neutral-900 text-white rounded-full font-label-caps text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all font-bold"
        >
          <span>Select Date &amp; Time</span>
          <span className="material-symbols-outlined text-[18px]">calendar_month</span>
        </button>
      </div>
    </div>
  );
};
