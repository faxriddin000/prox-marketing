import React from 'react';
import { ArrowRight, Zap, Check } from 'lucide-react';
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

        {/* SMM 4 Package Cards with Crossed-Out Old Prices & Discount Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {smmTariffs.map((plan) => {
            const duration =
              plan[`duration${language.charAt(0).toUpperCase() + language.slice(1)}`] ||
              plan.durationUz;
            const period =
              plan[`period${language.charAt(0).toUpperCase() + language.slice(1)}`] ||
              plan.periodUz;
            const features =
              plan[`features${language.charAt(0).toUpperCase() + language.slice(1)}`] ||
              plan.featuresUz ||
              [];

            const oldPrice =
              plan.oldPrice ||
              (plan.id === 'smm-pack-1' ? '$1800' : plan.id === 'smm-pack-3' ? '$1700' : plan.id === 'smm-pack-6' ? '$1600' : '$1500');

            const discountBadge =
              plan[`discountBadge${language.charAt(0).toUpperCase() + language.slice(1)}`] ||
              plan.discountBadgeUz ||
              (plan.id === 'smm-pack-1' ? '-17% FOYDA' : plan.id === 'smm-pack-3' ? '-20% CHEGIRMA' : plan.id === 'smm-pack-6' ? '-25% FOYDA' : '-33% ENG KATTA CHEGIRMA');

            return (
              <div
                key={plan.id}
                className="group relative rounded-3xl p-6 bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 hover:border-indigo-500/60 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(99,102,241,0.35)]"
              >
                <div>
                  <h3 className="font-extrabold text-lg text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {duration}
                  </h3>

                  {/* Strikethrough Old Price & Eye-Catching Discount Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-slate-500 line-through">
                      {oldPrice}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/30">
                      {discountBadge}
                    </span>
                  </div>

                  {/* Active Price */}
                  <div className="flex items-baseline gap-1 mb-5">
                    <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{period}</span>
                  </div>

                  {/* Included features list */}
                  <ul className="space-y-2.5 mb-6">
                    {features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Gradient CTA "Buyurtma berish" button */}
                <button
                  onClick={() => onOpenConsultation(`SMM: ${duration}`)}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 active:scale-[0.98] transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t('pricing_btn_order')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
