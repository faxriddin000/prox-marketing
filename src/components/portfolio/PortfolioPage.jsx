import React from 'react';
import { Briefcase, Clock, Sparkles, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';

export const PortfolioPage = ({ onOpenConsultation }) => {
  const { language, t } = useLanguage();
  const { data } = useCMS();
  const portfolio = data.portfolio || { comingSoonMode: true, items: [] };

  return (
    <div className="pt-32 pb-24 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Briefcase className="w-3.5 h-3.5" />
          {t('portfolio_badge')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {t('portfolio_title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          {t('portfolio_subtitle')}
        </p>
      </section>

      {/* Main Content: "Tez orada" state (as required by TZ 6.6) or Case Studies */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {portfolio.comingSoonMode || !portfolio.items || portfolio.items.length === 0 ? (
          <div className="relative bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-16 text-center space-y-6 overflow-hidden shadow-2xl">
            {/* Glowing orb */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 space-y-6 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto ring-8 ring-indigo-500/5">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>

              <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs uppercase tracking-wider border border-indigo-500/30">
                {language === 'ru' ? 'Скоро' : 'Tez orada'}
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {t('portfolio_coming_title')}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t('portfolio_coming_desc')}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onOpenConsultation('Keyslar va Natijalar')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  {t('portfolio_coming_btn')}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolio.items.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all group"
              >
                <div className="aspect-[16/9] bg-slate-950 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-indigo-300 border border-slate-700">
                    {item.client}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                    <span>{item.resultMetric}</span>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
