import React from 'react';
import { LOGO_URL, USER_AVATAR } from '../data/mockData';
import { ScreenType } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onBack?: () => void;
  titleOverride?: string;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onOpenSkinAnalysis?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onBack,
  titleOverride,
  language,
  onToggleLanguage,
  onOpenSkinAnalysis
}) => {
  const isSubScreen = currentScreen === 'service-detail' || currentScreen === 'checkout';
  const t = TRANSLATIONS[language];

  const getScreenTitle = () => {
    if (titleOverride) return titleOverride;
    switch (currentScreen) {
      case 'discover':
        return t.discover;
      case 'explore':
        return t.explore;
      case 'service-detail':
        return language === 'zh' ? '疗程详情' : 'Service Detail';
      case 'checkout':
        return t.checkoutTitle;
      case 'bookings':
        return t.bookings;
      case 'pass':
        return t.pass;
      case 'talk-to-us':
        return t.talkToUs;
      case 'skin-analysis':
        return t.skinAnalysis;
      default:
        return 'Vélure';
    }
  };

  const navLinks: { screen: ScreenType; label: string; icon: string }[] = [
    { screen: 'discover', label: t.discover, icon: 'spa' },
    { screen: 'explore', label: t.explore, icon: 'explore' },
    { screen: 'bookings', label: t.bookings, icon: 'calendar_month' },
    { screen: 'pass', label: t.pass, icon: 'card_membership' },
    { screen: 'talk-to-us', label: t.talkToUs, icon: 'forum' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#fff8f6]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#efe6e4]/60 transition-all">
      <div className="max-w-7xl mx-auto h-22 md:h-26 px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Left: Back (if subscreen) and Single Vélure Logo */}
        <div className="flex items-center gap-3 min-w-0">
          {isSubScreen && (
            <button
              onClick={onBack || (() => onNavigate('discover'))}
              aria-label="Go back"
              className="w-10 h-10 -ml-2 flex items-center justify-center text-[#1f1b19] hover:text-black active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back_ios_new</span>
            </button>
          )}

          {/* Single Unified Vélure Logo - Scaled to twice the size of the function box */}
          <div
            onClick={() => onNavigate('discover')}
            className="flex items-center gap-2 cursor-pointer group py-1"
          >
            <img
              alt="Vélure"
              className="h-[72px] sm:h-[76px] md:h-[80px] w-auto object-contain flex-shrink-0 transition-transform group-hover:scale-105 drop-shadow-xs"
              src={LOGO_URL}
            />
          </div>

          {/* Title on mobile sub-screens only */}
          {isSubScreen && (
            <h1 className="font-serif text-base md:text-lg text-[#1f1b19] truncate font-medium ml-2 md:hidden">
              {getScreenTitle()}
            </h1>
          )}
        </div>

        {/* Center: Desktop Navigation Bar for Website Optimization */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = currentScreen === link.screen;
            return (
              <button
                key={link.screen}
                onClick={() => onNavigate(link.screen)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-black text-white shadow-xs'
                    : 'text-[#47464a] hover:text-[#1f1b19] hover:bg-[#efe6e4]/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {/* Skin Analysis Nav Button */}
          {onOpenSkinAnalysis && (
            <button
              onClick={onOpenSkinAnalysis}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-[#3A1720] text-[#DFB3A6] hover:bg-black transition-all flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
              {t.skinAnalysis}
            </button>
          )}
        </nav>

        {/* Right: Language Switcher, Search & User Avatar */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Language Preference Toggle (English / Chinese) */}
          <div className="flex items-center bg-[#efe6e4] p-0.5 rounded-full border border-[#e2d8d6]">
            <button
              onClick={() => onToggleLanguage('en')}
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                language === 'en'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-[#7e5448] hover:text-black'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onToggleLanguage('zh')}
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                language === 'zh'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-[#7e5448] hover:text-black'
              }`}
            >
              中文
            </button>
          </div>

          {!isSubScreen && (
            <>
              <button
                onClick={() => onNavigate('explore')}
                aria-label="Search"
                className="w-9 h-9 flex items-center justify-center text-[#1f1b19] hover:text-black transition-colors rounded-full hover:bg-[#efe6e4]"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
              </button>
              <button
                onClick={() => onNavigate('bookings')}
                aria-label="Notifications"
                className="w-9 h-9 flex items-center justify-center text-[#1f1b19] hover:text-black transition-colors relative rounded-full hover:bg-[#efe6e4]"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#7e5448]"></span>
              </button>
            </>
          )}

          <button
            onClick={() => onNavigate('pass')}
            aria-label="Beauty Pass Profile"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:ring-2 hover:ring-[#EBD9CC] transition-all ml-1"
          >
            <img
              alt="Elena Vance Profile"
              className="w-8 h-8 rounded-full object-cover border border-[#DFB3A6]"
              src={USER_AVATAR}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
