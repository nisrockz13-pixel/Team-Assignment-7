import React, { useState } from 'react';
import { Treatment } from '../types';
import { TREATMENTS } from '../data/mockData';
import { Language, TRANSLATIONS } from '../utils/translations';

interface SkinAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSelectTreatment: (treatment: Treatment) => void;
}

export const SkinAnalysisModal: React.FC<SkinAnalysisModalProps> = ({
  isOpen,
  onClose,
  language,
  onSelectTreatment
}) => {
  const [step, setStep] = useState<'quiz' | 'result'>('quiz');
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // State answers
  const [selectedSkinType, setSelectedSkinType] = useState('combination');
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>(['dehydration', 'redness']);
  const [selectedLifestyle, setSelectedLifestyle] = useState<string[]>(['ac_office', 'screen_stress']);
  const [sensitivityLevel, setSensitivityLevel] = useState('moderate');

  if (!isOpen) return null;

  const t = TRANSLATIONS[language];

  const questions = [
    {
      id: 'skinType',
      title: language === 'zh' ? '1. 您的主要皮表天然出油与水合类型？' : '1. What is your primary baseline dermal type?',
      subtitle: language === 'zh' ? '洗脸后不涂护肤品30分钟后的直观感觉' : 'How your skin behaves 30 mins after gentle cleansing without products',
      options: [
        { id: 'dry', label: language === 'zh' ? '紧绷干涩 / 易起皮屑' : 'Dry & Tight (Prone to flaking)', icon: 'water_drop' },
        { id: 'oily', label: language === 'zh' ? '全脸泛油 / 毛孔明显' : 'Oily & Shiny (Congested pores)', icon: 'oil_barrel' },
        { id: 'combination', label: language === 'zh' ? 'T区泛油，两颊偏干' : 'Combination (T-Zone oil, dry cheeks)', icon: 'balance' },
        { id: 'sensitive', label: language === 'zh' ? '极度脆弱 / 易泛红刺痛' : 'Sensitive & Reactive (Stinging/redness)', icon: 'shield_with_heart' },
        { id: 'normal', label: language === 'zh' ? '健康平衡 / 细腻柔和' : 'Balanced & Normal', icon: 'spa' }
      ]
    },
    {
      id: 'concerns',
      title: language === 'zh' ? '2. 您当前最迫切希望改善的肌肤诉求？' : '2. What are your primary skin concerns right now?',
      subtitle: language === 'zh' ? '可多选（最多选3项）' : 'Select up to 3 priority concerns',
      multiple: true,
      options: [
        { id: 'dehydration', label: language === 'zh' ? '缺水暗沉与假性干纹' : 'Dehydration & Dull Lack of Glow', icon: 'opacity' },
        { id: 'redness', label: language === 'zh' ? '屏障受损与潮红敏感' : 'Barrier Damage & Rosacea Redness', icon: 'local_fire_department' },
        { id: 'antiaging', label: language === 'zh' ? '轮廓松弛与细纹加深' : 'Loss of Firmness & Deepening Lines', icon: 'hourglass_empty' },
        { id: 'pigmentation', label: language === 'zh' ? '色斑与晒后色素沉淀' : 'Sunspots & Hyperpigmentation', icon: 'contrast' },
        { id: 'pores', label: language === 'zh' ? '毛孔粗大与油脂黑头' : 'Enlarged Pores & Blackheads', icon: 'grain' }
      ]
    },
    {
      id: 'lifestyle',
      title: language === 'zh' ? '3. 影响您肌肤微生态的日常环境因素？' : '3. What daily environmental stressors affect you?',
      subtitle: language === 'zh' ? '评估光老化与角质氧化速度' : 'Assessing oxidative photo-damage and barrier stress',
      multiple: true,
      options: [
        { id: 'sun', label: language === 'zh' ? '长时间户外与强烈紫外线' : 'High UV / Tropical Sun Exposure', icon: 'wb_sunny' },
        { id: 'ac_office', label: language === 'zh' ? '长期处于空调干燥室内' : 'Continuous Air-Conditioned Air', icon: 'ac_unit' },
        { id: 'screen_stress', label: language === 'zh' ? '熬夜高压与蓝光屏幕辐射' : 'Late Nights & Screen Blue Light', icon: 'devices' },
        { id: 'pollution', label: language === 'zh' ? '城市粉尘与频繁差旅飞行' : 'Urban Smog & Frequent Air Travel', icon: 'flight_takeoff' }
      ]
    }
  ];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setStep('result');
    }
  };

  const handleRetest = () => {
    setStep('quiz');
    setCurrentQuestion(0);
  };

  // Derive customized recommendations
  const matchedTreatments = TREATMENTS.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#fff8f6] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#efe6e4] flex flex-col relative">
        {/* Header */}
        <div className="sticky top-0 bg-[#fff8f6]/95 backdrop-blur-md px-6 py-4 border-b border-[#efe6e4] flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#3A1720] text-[#DFB3A6] flex items-center justify-center font-serif text-sm">
              V
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-base font-semibold text-[#1f1b19]">
                {t.skinAnalysisTitle}
              </span>
              <span className="text-[10px] text-[#7e5448] font-medium tracking-wide">
                {t.skinProfileBadge}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#efe6e4]/60 hover:bg-[#efe6e4] flex items-center justify-center transition-colors text-[#1f1b19]"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {step === 'quiz' ? (
            <div className="flex flex-col gap-6">
              {/* Progress Indicator */}
              <div className="flex items-center justify-between gap-2">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      idx <= currentQuestion ? 'bg-black' : 'bg-[#efe6e4]'
                    }`}
                  />
                ))}
              </div>

              {/* Question Text */}
              <div className="flex flex-col gap-1">
                <h3 className="font-serif text-lg font-semibold text-[#1f1b19]">
                  {questions[currentQuestion].title}
                </h3>
                <p className="text-xs text-[#7e5448]">{questions[currentQuestion].subtitle}</p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {questions[currentQuestion].options.map((opt) => {
                  const isMultiple = questions[currentQuestion].multiple;
                  const isSelected = isMultiple
                    ? currentQuestion === 1
                      ? selectedConcerns.includes(opt.id)
                      : selectedLifestyle.includes(opt.id)
                    : selectedSkinType === opt.id;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        if (isMultiple) {
                          if (currentQuestion === 1) {
                            setSelectedConcerns((prev) =>
                              prev.includes(opt.id)
                                ? prev.filter((i) => i !== opt.id)
                                : [...prev, opt.id]
                            );
                          } else {
                            setSelectedLifestyle((prev) =>
                              prev.includes(opt.id)
                                ? prev.filter((i) => i !== opt.id)
                                : [...prev, opt.id]
                            );
                          }
                        } else {
                          setSelectedSkinType(opt.id);
                        }
                      }}
                      className={`p-4 rounded-2xl flex items-center gap-3 text-left transition-all border ${
                        isSelected
                          ? 'bg-black text-white border-black shadow-md'
                          : 'bg-white text-[#1f1b19] border-[#efe6e4] hover:border-black/40'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-[#fbf2ef] text-[#7e5448]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">{opt.icon}</span>
                      </div>
                      <span className="text-xs font-semibold leading-snug">{opt.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-[#efe6e4]">
                <button
                  type="button"
                  disabled={currentQuestion === 0}
                  onClick={() => setCurrentQuestion((prev) => prev - 1)}
                  className="px-4 py-2 text-xs font-semibold text-[#7e5448] disabled:opacity-30 hover:underline"
                >
                  {t.back}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-black text-white rounded-full text-xs font-bold hover:bg-[#7e5448] transition-colors shadow-sm"
                >
                  {currentQuestion === questions.length - 1
                    ? language === 'zh'
                      ? '生成诊断报告'
                      : 'Generate Diagnostic'
                    : language === 'zh'
                    ? '下一步'
                    : 'Next Step'}
                </button>
              </div>
            </div>
          ) : (
            /* Diagnostic Result View */
            <div className="flex flex-col gap-6 animate-in fade-in">
              {/* Score & Diagnosis Card */}
              <div className="bg-gradient-to-br from-[#1f1b19] via-[#3A1720] to-[#121214] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-widest text-[#DFB3A6] font-bold">
                      {t.primaryDiagnosis}
                    </span>
                    <h4 className="font-serif text-xl font-medium text-white">
                      {language === 'zh'
                        ? '表皮轻度缺水伴微循环滞涩'
                        : 'Barrier Stress & Micro-Circulatory Fatigue'}
                    </h4>
                    <p className="text-xs text-white/80 max-w-md mt-1 leading-relaxed">
                      {language === 'zh'
                        ? '受长时间空调干燥与屏幕蓝光氧化影响，角质层天然保湿因子(NMF)加速挥发，需补充细胞级深层冷疗锁水与淋巴抚触。'
                        : 'Air-conditioned dryness and oxidative screen exposure accelerate trans-epidermal water loss. Sub-zero thermal stabilization and lymphatic drainage will restore cellular glow.'}
                    </p>
                  </div>

                  {/* Health Gauge */}
                  <div className="flex flex-col items-center justify-center p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 min-w-[100px] flex-shrink-0">
                    <span className="font-serif text-3xl font-bold text-[#DFB3A6]">84</span>
                    <span className="text-[10px] uppercase text-white/70 tracking-wider">
                      {t.skinHealthScore}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bespoke AM / PM Regimen */}
              <div className="bg-white p-5 rounded-2xl border border-[#efe6e4] shadow-xs flex flex-col gap-4">
                <h5 className="font-serif text-sm font-semibold text-[#1f1b19] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#7e5448] text-[18px]">
                    routine
                  </span>
                  {t.tailoredRegimen}
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-[#fbf2ef] p-3.5 rounded-xl border border-[#efe6e4]">
                    <span className="font-bold text-[#7a5146] block mb-1">{t.amRoutine}</span>
                    <p className="text-[#47464a] leading-relaxed">
                      {language === 'zh'
                        ? '低泡氨基酸洁面 ➔ 依克多因屏障活肤水 ➔ 寡肽微囊精华 ➔ 广谱抗光老物理防晒 SPF50+'
                        : 'Amino Acid Gentle Cleanse ➔ Ectoin Barrier Essence ➔ Peptide Micro-Mist ➔ Broad Spectrum Physical SPF50+'}
                    </p>
                  </div>
                  <div className="bg-[#fbf2ef] p-3.5 rounded-xl border border-[#efe6e4]">
                    <span className="font-bold text-[#7a5146] block mb-1">{t.pmRoutine}</span>
                    <p className="text-[#47464a] leading-relaxed">
                      {language === 'zh'
                        ? '植物脂质净肤油 ➔ 4D玻尿酸冰凝修护霜 ➔ 细胞级淋巴刮痧轻抚'
                        : 'Botanical Lipid Cleansing Balm ➔ 4D Hyaluronic Ice Gel Cream ➔ Gentle Lymphatic Acupressure Sweep'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommended Vélure Rituals */}
              <div className="flex flex-col gap-3">
                <h5 className="font-serif text-sm font-semibold text-[#1f1b19]">
                  {t.recommendedRituals}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {matchedTreatments.map((treat) => (
                    <div
                      key={treat.id}
                      className="bg-white p-3.5 rounded-2xl border border-[#efe6e4] shadow-xs flex items-center justify-between gap-3"
                    >
                      <img
                        src={treat.image}
                        alt={treat.title}
                        className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-xs font-semibold text-[#1f1b19] truncate">
                          {treat.title}
                        </span>
                        <span className="text-[11px] text-[#7e5448]">
                          ${treat.price} • {treat.durationMins} mins
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          onSelectTreatment(treat);
                          onClose();
                        }}
                        className="px-3 py-1.5 bg-black text-white text-[11px] font-bold rounded-lg hover:bg-[#7e5448] transition-colors flex-shrink-0"
                      >
                        {t.bookNow}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-[#efe6e4]">
                <button
                  onClick={handleRetest}
                  className="text-xs font-semibold text-[#7e5448] hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">refresh</span>
                  {t.retestSkin}
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-black text-white rounded-full text-xs font-bold hover:bg-[#7e5448] transition-colors"
                >
                  {t.close}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
