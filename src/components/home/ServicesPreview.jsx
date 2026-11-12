import React from 'react';
import { ArrowRight, Share2, BarChart3, Code2, Check, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';

export const ServicesPreview = ({ onViewChange, onSelectCategory }) => {
  const { language, t } = useLanguage();
  const { data } = useCMS();

  const previewCards = [
    {
      id: 'smm',
      number: '01',
      title: language === 'ru' ? 'SMM Услуги' : 'SMM Xizmatlari',
      badge: language === 'ru' ? '6 услуг' : '6 ta xizmat',
      icon: Share2,
      borderGlow: 'hover:border-pink-500/60 hover:shadow-pink-500/10',
      badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      iconColor: 'bg-gradient-to-br from-pink-500/20 to-rose-500/10 text-pink-400 border-pink-500/30',
      btnHover: 'hover:bg-pink-600 hover:border-pink-500',
      features: (data.services?.smm || []).slice(0, 4).map((item) =>
        item[`title${language.charAt(0).toUpperCase() + language.slice(1)}`] || item.titleUz
      )
    },
    {
      id: 'marketing',
      number: '02',
      title: language === 'ru' ? 'Комплексный Маркетинг' : 'Marketing Xizmatlari',
      badge: language === 'ru' ? '5 услуг' : '5 ta xizmat',
      icon: BarChart3,
      borderGlow: 'hover:border-indigo-500/60 hover:shadow-indigo-500/10',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      iconColor: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/10 text-indigo-400 border-indigo-500/30',
      btnHover: 'hover:bg-indigo-600 hover:border-indigo-500',
      features: (data.services?.marketing || []).slice(0, 4).map((item) =>
        item[`title${language.charAt(0).toUpperCase() + language.slice(1)}`] || item.titleUz
      )
    },
    {
      id: 'it',
      number: '03',
      title: language === 'ru' ? 'IT и Автоматизация' : 'IT Xizmatlari',
      badge: language === 'ru' ? '6 услуг' : '6 ta xizmat',
      icon: Code2,
      borderGlow: 'hover:border-cyan-500/60 hover:shadow-cyan-500/10',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      iconColor: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
      btnHover: 'hover:bg-cyan-600 hover:border-cyan-500',
      features: (data.services?.it || []).slice(0, 4).map((item) =>
        item[`title${language.charAt(0).toUpperCase() + language.slice(1)}`] || item.titleUz
      )
    }
  ];

  const handleDetailsClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    onViewChange('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-slate-950/60 relative border-t border-slate-900 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            {t('services_badge')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('services_title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {t('services_subtitle')}
          </p>
        </div>

        {/* 3 Full-Width Columns Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {previewCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`group relative rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl hover:-translate-y-1.5 hover:shadow-2xl ${card.borderGlow}`}
              >
                <div>
                  {/* Top Bar with Numbered Badge & Elevated Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className={`w-14 h-14 rounded-2xl ${card.iconColor} border flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-2xl font-black font-mono text-slate-700 select-none">
                        {card.number}
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white mb-4 group-hover:text-indigo-300 transition-colors">
                    {card.title}
                  </h3>

                  {/* Authentic TZ Features List */}
                  <ul className="space-y-3 mb-8">
                    {card.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleDetailsClick(card.id)}
                  className={`w-full py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-slate-800/90 border border-slate-700/80 flex items-center justify-center gap-2 transition-all cursor-pointer ${card.btnHover}`}
                >
                  <span>{t('services_btn_details')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
