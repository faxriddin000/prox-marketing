import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';

export const PricingPreview = ({ onViewChange, onOpenConsultation }) => {
  const { language, t } = useLanguage();
  const { data } = useCMS();
  const smmTariffs = data.tariffs?.smm || [];
  const marketingTariff = data.tariffs?.marketing || {};

  return (
    <section className="py-24 relative overflow-hidden bg-slate-900/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Zap className="w-3.5 h-3.5" />
            {t('pricing_badge')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('pricing_title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {t('pricing_subtitle')}
          </p>
        </div>

        {/* SMM 4 Package Cards (Strict 100% TZ structure, No fabricated discounts or badges) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {smmTariffs.map((plan) => {
            const duration =
              plan[`duration${language.charAt(0).toUpperCase() + language.slice(1)}`] ||
              plan.durationUz;
            const period =
              plan[`period${language.charAt(0).toUpperCase() + language.slice(1)}`] ||
              plan.periodUz;

            return (
              <div
                key={plan.id}
                className="relative rounded-3xl p-6 bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <h3 className="font-extrabold text-lg text-white mb-4">
                    {duration}
                  </h3>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{period}</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenConsultation(`SMM: ${duration}`)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white border border-slate-700 hover:border-indigo-500 transition-all cursor-pointer"
                >
                  {t('pricing_btn_order')}
                </button>
              </div>
            );
          })}
        </div>

        {/* Marketing & IT Callout - Strict TZ Match */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8">
          {/* Marketing Box */}
          <div className="space-y-3 pr-0 md:pr-4 border-b md:border-b-0 md:border-r border-slate-800/80 pb-6 md:pb-0">
            <h4 className="text-xl font-bold text-white">
              {t('pricing_mkt_title')}
            </h4>
            <div className="space-y-1">
              <p className="text-base sm:text-lg font-bold text-white">
                {language === 'ru'
                  ? 'Начальная цена — от $2000'
                  : "Boshlang'ich narx — $2000 dan"}
              </p>
              <p className="text-xs text-slate-400">
                {language === 'ru'
                  ? '(рассчитывается индивидуально в зависимости от масштаба проекта)'
                  : "(loyiha hajmiga qarab individual hisoblanadi)"}
              </p>
            </div>
            <button
              onClick={() => onOpenConsultation('Marketing')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 pt-2 cursor-pointer group"
            >
              <span>{t('pricing_btn_order')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* IT Box */}
          <div className="space-y-3 pl-0 md:pl-4">
            <h4 className="text-xl font-bold text-white">
              {t('pricing_it_title')}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              {t('pricing_it_subtitle')}
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  onViewChange('tariffs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer group"
              >
                <span>{t('pricing_it_btn')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
