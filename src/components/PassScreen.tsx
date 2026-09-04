import React from 'react';
import { USER_AVATAR } from '../data/mockData';
import { ScreenType } from '../types';

interface PassScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const PassScreen: React.FC<PassScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full px-4 md:px-6 pb-28 gap-5 pt-2">
      {/* Digital VIP Passport Card */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-[#1b1b1d] via-[#3A1720] to-[#121214] text-white p-6 border border-white/10">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <img
              src={USER_AVATAR}
              alt="Elena Vance"
              className="w-12 h-12 rounded-full object-cover border-2 border-[#DFB3A6]"
            />
            <div className="flex flex-col">
              <span className="font-label-caps text-[10px] uppercase tracking-widest text-[#EBD9CC]">
                Member Passport
              </span>
              <h2 className="font-serif text-lg font-bold">Elena Vance</h2>
            </div>
          </div>
          <span className="font-label-caps text-[10px] bg-[#C59B27] text-white px-2.5 py-1 rounded-full uppercase tracking-wider font-bold shadow-xs">
            Black Tier
          </span>
        </div>

        {/* Points Display */}
        <div className="mt-8 flex justify-between items-end">
          <div>
            <span className="text-xs text-[#EBD9CC]">Available Points Balance</span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-4xl font-bold tracking-tight">1,240</span>
              <span className="font-label-caps text-xs text-[#EBD9CC] uppercase">pts</span>
            </div>
          </div>
          <span className="text-[11px] text-[#EBD9CC]/80 font-mono">ID: VEL-9042-88</span>
        </div>

        {/* Progress Bar to Platinum Tier */}
        <div className="mt-4 space-y-1.5">
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: '82%' }}></div>
          </div>
          <div className="flex justify-between text-[11px] text-[#EBD9CC]">
            <span>260 pts to Platinum Concierge</span>
            <span className="font-semibold">1,500 pts goal</span>
          </div>
        </div>
      </div>

      {/* Redeemable Perks Grid */}
      <div className="flex flex-col gap-3">
        <h3 className="font-serif text-lg font-medium text-[#1f1b19]">Available Vouchers</h3>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#efe6e4] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ffc8b9] text-[#7a5146] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">card_giftcard</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1f1b19]">Complimentary Scalp Diagnostic</h4>
              <p className="text-[11px] text-[#47464a]">
                Valid at L'Étoile &amp; Studio Nōh • No minimum spend
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="px-3 py-1.5 rounded-full bg-black text-white font-label-caps text-[10px] uppercase font-bold flex-shrink-0"
          >
            Redeem
          </button>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#efe6e4] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EBD9CC] text-[#7a5146] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">redeem</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1f1b19]">$20 Off Any Cryo Protocol</h4>
              <p className="text-[11px] text-[#47464a]">
                Code BEAUTY20 auto-applied on treatments over $100
              </p>
            </div>
          </div>
          <span className="font-label-caps text-[10px] text-[#2E6B4F] font-bold">Active</span>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#efe6e4] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#efe6e4] text-[#1f1b19] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">local_bar</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1f1b19]">Birthday Champagne &amp; Facial</h4>
              <p className="text-[11px] text-[#47464a]">Unlocks in birthday month</p>
            </div>
          </div>
          <span className="font-label-caps text-[10px] text-[#47464a]">Locked</span>
        </div>
      </div>

      {/* Tier Benefits Overview */}
      <div className="bg-[#fbf2ef] rounded-2xl p-4 border border-[#efe6e4]">
        <h4 className="font-serif text-sm font-bold text-[#1f1b19] mb-2">Black Member Privileges</h4>
        <ul className="text-xs text-[#47464a] space-y-2">
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#2E6B4F]">check</span>
            <span>Earn 2x points on all cryotherapy and signature rituals</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#2E6B4F]">check</span>
            <span>Priority access to flash studio drops &amp; guest master artisans</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#2E6B4F]">check</span>
            <span>Complimentary 2-hour valet parking at Orchard and Marina Bay</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
