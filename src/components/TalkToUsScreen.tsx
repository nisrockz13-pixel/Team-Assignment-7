import React, { useEffect } from 'react';
import { ScreenType } from '../types';

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: {
        reload: boolean;
        config?: (this: any) => void;
      }) => void;
    };
    disqus_config?: (this: any) => void;
  }
}

interface TalkToUsScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

const PAGE_URL = 'https://velure-new.disqus.com/talk-to-us';
const PAGE_IDENTIFIER = 'velure-new-talk-to-us';

export const TalkToUsScreen: React.FC<TalkToUsScreenProps> = ({ onNavigate }) => {
  useEffect(() => {
    const configFn = function (this: any) {
      if (!this) return;
      this.page = this.page || {};
      this.page.url = PAGE_URL;
      this.page.identifier = PAGE_IDENTIFIER;
      this.page.title = 'Talk to Us • Vélure Beauty & Wellness';
    };

    // Assign global config
    window.disqus_config = configFn;

    const reloadDisqus = () => {
      try {
        if (window.DISQUS && document.getElementById('disqus_thread')) {
          window.DISQUS.reset({
            reload: true,
            config: configFn
          });
        }
      } catch (err) {
        console.warn('Disqus reset non-fatal notice:', err);
      }
    };

    let timer: NodeJS.Timeout | null = null;

    if (window.DISQUS) {
      // In SPA, if Disqus is already loaded, reset and reload the thread
      timer = setTimeout(reloadDisqus, 60);
    } else {
      // Check if script tag is already in DOM
      const existingScript = document.querySelector('script[src*="velure-new.disqus.com/embed.js"]');
      if (existingScript) {
        existingScript.addEventListener('load', reloadDisqus, { once: true });
      } else {
        // Initial embed script injection
        const d = document;
        const s = d.createElement('script');
        s.src = 'https://velure-new.disqus.com/embed.js';
        s.setAttribute('data-timestamp', (+new Date()).toString());
        s.async = true;
        s.onerror = (err) => {
          console.warn('Disqus embed script load failed:', err);
        };
        (d.head || d.body).appendChild(s);
      }
    }

    // Embed count script if not present
    const existingCountScript = document.getElementById('dsq-count-scr') as HTMLScriptElement | null;
    if (!existingCountScript) {
      const countScript = document.createElement('script');
      countScript.id = 'dsq-count-scr';
      countScript.src = 'https://velure-new.disqus.com/count.js';
      countScript.async = true;
      countScript.onerror = (err) => {
        console.warn('Disqus count script load failed:', err);
      };
      (document.head || document.body).appendChild(countScript);
    } else if (existingCountScript.src.indexOf('velure-new') === -1) {
      existingCountScript.src = 'https://velure-new.disqus.com/count.js';
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      const container = document.getElementById('disqus_thread');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="flex flex-col w-full px-4 md:px-6 pb-28 gap-5 pt-2">
      {/* Editorial Header Banner */}
      <section className="bg-gradient-to-br from-[#1f1b19] via-[#3A1720] to-[#121214] text-white rounded-3xl p-6 shadow-md border border-white/10 relative overflow-hidden">
        <div className="flex flex-col relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#DFB3A6] animate-pulse"></span>
            <span className="font-label-caps text-[10px] uppercase tracking-widest text-[#EBD9CC] font-bold">
              Concierge &amp; Community Forum
            </span>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight">
            Talk to Us
          </h2>

          <p className="text-xs md:text-sm text-[#EBD9CC] mt-2 leading-relaxed max-w-lg">
            Whether inquiring about personalized skincare protocols, private suite reservations,
            or sharing feedback with our artisans, our concierge desk and beauty community are here for you.
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-label-caps text-[10px] text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-[#DFB3A6]">support_agent</span>
              15-Min Response Guarantee
            </span>
            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-label-caps text-[10px] text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-[#C59B27]">verified</span>
              Direct Artisan Guidance
            </span>
          </div>
        </div>

        {/* Decorative background watermark */}
        <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[180px]">forum</span>
        </div>
      </section>

      {/* Quick Concierge Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-[#efe6e4] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#fbf2ef] text-[#7e5448] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">chat</span>
          </div>
          <div className="min-w-0">
            <span className="font-label-caps text-[9px] uppercase tracking-wider text-[#7e5448] font-bold block">
              Live Discussions
            </span>
            <p className="text-xs font-semibold text-[#1f1b19] truncate">Disqus Community</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-[#efe6e4] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#fbf2ef] text-[#7e5448] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">call</span>
          </div>
          <div className="min-w-0">
            <span className="font-label-caps text-[9px] uppercase tracking-wider text-[#7e5448] font-bold block">
              Atelier Desk
            </span>
            <p className="text-xs font-semibold text-[#1f1b19] truncate">+65 6738 8900</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-[#efe6e4] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#fbf2ef] text-[#7e5448] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">mail</span>
          </div>
          <div className="min-w-0">
            <span className="font-label-caps text-[9px] uppercase tracking-wider text-[#7e5448] font-bold block">
              Private Concierge
            </span>
            <p className="text-xs font-semibold text-[#1f1b19] truncate">concierge@velure.com</p>
          </div>
        </div>
      </div>

      {/* Disqus Thread Embed Container */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-[#efe6e4] flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#f5ece9] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#7e5448]">forum</span>
            <h3 className="font-serif text-lg font-semibold text-[#1f1b19]">
              Guest Comments &amp; Inquiries
            </h3>
          </div>
          <span className="font-label-caps text-[10px] bg-[#fbf2ef] text-[#7e5448] px-2.5 py-1 rounded-full font-bold">
            Powered by Disqus
          </span>
        </div>

        {/* The Disqus container */}
        <div className="min-h-[320px] w-full">
          <div id="disqus_thread" className="w-full"></div>
          <noscript>
            Please enable JavaScript to view the{' '}
            <a href="https://disqus.com/?ref_noscript" className="text-black underline font-semibold">
              comments powered by Disqus.
            </a>
          </noscript>
        </div>
      </div>
    </div>
  );
};
