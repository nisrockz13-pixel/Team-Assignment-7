import React, { useState, useRef, useEffect } from 'react';
import { ScreenType, Treatment } from '../types';
import { TREATMENTS } from '../data/mockData';
import { Language, TRANSLATIONS } from '../utils/translations';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  treatmentAction?: Treatment;
  suggestedAction?: {
    label: string;
    action: () => void;
  };
}

interface ConsultancyChatBotProps {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
  onSelectTreatment: (treatment: Treatment) => void;
  onOpenSkinAnalysis: () => void;
}

export const ConsultancyChatBot: React.FC<ConsultancyChatBotProps> = ({
  language,
  onNavigate,
  onSelectTreatment,
  onOpenSkinAnalysis
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[language];

  const initialGreeting: Message = {
    id: 'welcome',
    sender: 'bot',
    text:
      language === 'zh'
        ? '您好，尊贵的贵宾。我是 Vélure 私享美肤与头皮微循环顾问。无论您想咨询肌肤屏障修护、预约 2026 年未来 3 个月的专属席位，或是需要针对特定肤况推荐护理，我都在此为您提供专业指导。'
        : 'Welcome to Vélure. I am your personal dermal aesthetic & scalp concierge. How may I assist your beauty rituals today? Feel free to ask about bespoke treatments, skin barrier advice, or booking up to 3 months in advance for 2026.',
    time: 'Just now'
  };

  const [messages, setMessages] = useState<Message[]>([initialGreeting]);

  // Update initial greeting when language changes if no conversation yet
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'welcome') {
      setMessages([initialGreeting]);
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const quickChips =
    language === 'zh'
      ? [
          '敏感泛红适合什么护理？',
          '头皮紧绷脱发推荐？',
          '冷冻细胞再生面部效果如何？',
          '如何提前3个月预约2026年席位？',
          '做个智能肤质诊断'
        ]
      : [
          'Best facial for redness & sensitive skin?',
          'Scalp tension & hair thinning therapy?',
          'What are Cryo-Facial benefits?',
          'Can I book 3 months ahead for 2026?',
          'Analyze my skin profile'
        ];

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Contextual bot response engine
    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = '';
      let treatmentAction: Treatment | undefined;
      let suggestedAction: { label: string; action: () => void } | undefined;

      const cryo = TREATMENTS.find((t) => t.id === 'cryo-facial') || TREATMENTS[0];
      const headSpa = TREATMENTS.find((t) => t.id === 'japanese-head-spa') || TREATMENTS[1];

      if (lower.includes('skin') && (lower.includes('analys') || lower.includes('profile') || lower.includes('quiz') || lower.includes('测肤') || lower.includes('诊断') || lower.includes('肤质'))) {
        reply =
          language === 'zh'
            ? '我们提供临床级量肤诊断！该测试综合皮表屏障、微生态、水油配比与日光暴露指数，为您量身定制专属方案。'
            : 'Our clinical-grade Skin Profile Analysis evaluates lipid barrier integrity, oxidative stress, hydration, and UV exposure to craft your bespoke protocol.';
        suggestedAction = {
          label: language === 'zh' ? '✨ 开启量肤分析' : '✨ Start Skin Analysis',
          action: () => {
            setIsOpen(false);
            onOpenSkinAnalysis();
          }
        };
      } else if (lower.includes('cryo') || lower.includes('facial') || lower.includes('冷冻') || lower.includes('面部') || lower.includes('glow')) {
        reply =
          language === 'zh'
            ? '推荐我们的【细胞赋活极速冷冻面部护理】(Cellular Renewal Cryo-Facial)。由 Dr. Aris Thorne 主理，采用 -160°C 医用冷疗纯氧微渗透，可即刻抚平细纹，收敛毛孔并重塑面部下颌线轮廓。'
            : 'We highly recommend our Cellular Renewal Cryo-Facial ($180). Led by Dr. Aris Thorne, it utilizes sub-zero pure oxygen micro-infusion paired with soothing lymphatic drainage for immediate firming and red-carpet radiance.';
        treatmentAction = cryo;
      } else if (lower.includes('scalp') || lower.includes('head') || lower.includes('hair') || lower.includes('头皮') || lower.includes('水疗') || lower.includes('脱发')) {
        reply =
          language === 'zh'
            ? '针对头皮疲惫与微循环不畅，首推【日式温水瀑布头部水疗 & 深层排毒】(Japanese Head Spa)。由毛发专家 Master Hina Sato 操作，采用草本瀑布雨环与穴位减压按摩。'
            : "For deep cranial tension and follicle revitalization, our Japanese Head Spa & Scalp Detox ($120) by trichologist Master Hina Sato is unparalleled. Features botanical waterfall hydro-rings and targeted acupressure.";
        treatmentAction = headSpa;
      } else if (lower.includes('2026') || lower.includes('month') || lower.includes('advance') || lower.includes('提前') || lower.includes('预约') || lower.includes('calendar') || lower.includes('日历')) {
        reply =
          language === 'zh'
            ? '是的！我们的预约系统已全面支持 2026 年提前 3 个月预订（覆盖 2026年9月、10月、11月及12月）。您可以提前锁定心仪主理人的黄金私享档期。'
            : 'Yes! Our calendar now allows 3 months advance booking for 2026 (September, October, November, and December 2026). You can secure premium suites and artisan slots well ahead of time.';
        suggestedAction = {
          label: language === 'zh' ? '前往探索预约' : 'Browse All Treatments',
          action: () => {
            setIsOpen(false);
            onNavigate('explore');
          }
        };
      } else if (lower.includes('sensitive') || lower.includes('redness') || lower.includes('敏感') || lower.includes('泛红')) {
        reply =
          language === 'zh'
            ? '敏感屏障受损肌肤建议避免强酸换肤。推荐温和冷疗舒缓配合依克多因(Ectoin)与低分子玻尿酸导入，快速镇静消退潮红。'
            : 'For sensitive skin and barrier reactivity, we recommend sub-zero cellular soothing infused with Ectoin and Centella peptides to extinguish erythema and strengthen lipid bilayers.';
        treatmentAction = cryo;
      } else {
        reply =
          language === 'zh'
            ? '感谢您的垂询。Vélure 拥有全球甄选的高定面部、头皮水疗与芳疗仪式。您可以随时在上方查看精选分类，或直接点击下方专属肤质诊断获取精确指引。'
            : 'Thank you for reaching out. Vélure combines holistic touch with dermal technology. Would you like to take our 2-minute diagnostic or explore our top-rated rituals?';
        suggestedAction = {
          label: language === 'zh' ? '进行智能量肤' : 'Take Skin Analysis',
          action: () => {
            setIsOpen(false);
            onOpenSkinAnalysis();
          }
        };
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        treatmentAction,
        suggestedAction
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Vélure Live Consultancy"
          className="group relative flex items-center gap-2 bg-[#1f1b19] text-white px-4 py-3 rounded-full shadow-xl hover:bg-black active:scale-95 transition-all border border-[#DFB3A6]/40 backdrop-blur-md"
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[22px] text-[#DFB3A6] group-hover:rotate-12 transition-transform">
              support_agent
            </span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#4BB543] border-2 border-[#1f1b19] animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#4BB543] border-2 border-[#1f1b19]" />
          </div>

          <span className="text-xs font-semibold tracking-wide hidden sm:inline">
            {t.askConsultant}
          </span>
        </button>
      </div>

      {/* Chat Window Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-8 z-50 flex flex-col sm:w-[410px] sm:h-[580px] bg-white sm:rounded-3xl shadow-2xl border border-[#efe6e4] overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1f1b19] via-[#2d1b22] to-[#1a181b] text-white px-5 py-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#3A1720] border border-[#DFB3A6] flex items-center justify-center text-[#DFB3A6] font-serif text-lg">
                  V
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#4BB543] border-2 border-[#1f1b19]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm font-semibold tracking-tight">
                  {t.consultancyTitle}
                </span>
                <span className="text-[10px] text-[#DFB3A6] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4BB543]" />
                  {t.consultancyOnline}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white/80"
              aria-label="Close Chat"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Quick Inquiry Chips Banner */}
          <div className="bg-[#FAF7F5] border-b border-[#efe6e4] px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-[#7e5448] flex-shrink-0 tracking-wider">
              {t.quickQuestions}:
            </span>
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="text-[11px] bg-white text-[#1f1b19] px-2.5 py-1 rounded-full border border-[#efe6e4] hover:border-black whitespace-nowrap flex-shrink-0 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fffaf8]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-black text-white rounded-tr-xs'
                      : 'bg-white text-[#1f1b19] shadow-xs border border-[#efe6e4] rounded-tl-xs'
                  }`}
                >
                  <p>{m.text}</p>

                  {/* Optional Action Card */}
                  {m.treatmentAction && (
                    <div className="mt-2.5 pt-2 border-t border-[#f5ece9] flex items-center justify-between gap-3 bg-[#fbf2ef] p-2 rounded-xl">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={m.treatmentAction.image}
                          alt={m.treatmentAction.title}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-[11px] text-[#1f1b19] truncate">
                            {m.treatmentAction.title}
                          </span>
                          <span className="text-[10px] text-[#7e5448]">
                            ${m.treatmentAction.price} • {m.treatmentAction.durationMins}m
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (m.treatmentAction) {
                            onSelectTreatment(m.treatmentAction);
                            setIsOpen(false);
                          }
                        }}
                        className="bg-black text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex-shrink-0 hover:bg-[#7e5448] transition-colors"
                      >
                        {language === 'zh' ? '查看详情' : 'View Ritual'}
                      </button>
                    </div>
                  )}

                  {m.suggestedAction && (
                    <button
                      onClick={m.suggestedAction.action}
                      className="mt-2 w-full py-1.5 px-3 bg-black text-white rounded-xl text-[11px] font-bold hover:bg-[#7e5448] transition-colors"
                    >
                      {m.suggestedAction.label}
                    </button>
                  )}
                </div>
                <span className="text-[9px] text-[#7e5448]/70 px-1 mt-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white border border-[#efe6e4] px-3 py-2 rounded-2xl rounded-tl-xs w-16 shadow-xs">
                <span className="w-1.5 h-1.5 bg-[#7e5448] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#7e5448] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-[#7e5448] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-[#efe6e4] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.typeMessagePlaceholder}
              className="flex-1 bg-[#FAF7F5] text-xs text-[#1f1b19] px-3.5 py-2.5 rounded-full border border-[#efe6e4] focus:outline-none focus:border-black"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#7e5448] transition-colors flex-shrink-0"
              aria-label={t.send}
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
};
