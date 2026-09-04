import React from 'react';
import { ScreenType } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  bookingCount?: number;
  language?: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  bookingCount = 0,
  language = 'en'
}) => {
  // Hide bottom nav in checkout to minimize distraction and maximize completion flow
  if (currentScreen === 'checkout') {
    return null;
  }

  const t = TRANSLATIONS[language];

  const navItems = [
    {
      id: 'discover' as ScreenType,
      label: t.discover,
      icon: 'auto_awesome'
    },
    {
      id: 'explore' as ScreenType,
      label: t.explore,
      icon: 'grid_view'
    },
    {
      id: 'bookings' as ScreenType,
      label: t.bookings,
      icon: 'calendar_today',
      badge: bookingCount > 0 ? bookingCount : undefined
    },
    {
      id: 'pass' as ScreenType,
      label: t.pass,
      icon: 'loyalty'
    },
    {
      id: 'talk-to-us' as ScreenType,
      label: t.talkToUs,
      icon: 'forum'
    }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-40 pb-safe bg-[#fff8f6]/95 backdrop-blur-xl shadow-[0_-1px_10px_rgba(0,0,0,0.04)] border-t border-[#f5ece9]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive =
            currentScreen === item.id ||
            (item.id === 'explore' && currentScreen === 'service-detail');

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center w-16 h-12 transition-all gap-0.5 relative ${
                isActive
                  ? 'text-black font-semibold scale-105'
                  : 'text-[#47464a] hover:text-[#1f1b19]'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                {item.badge && (
                  <span className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#7e5448] text-white text-[10px] flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="font-label-caps text-[9px] tracking-wider uppercase truncate max-w-[60px]">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-black"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
