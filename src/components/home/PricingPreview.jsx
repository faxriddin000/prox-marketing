import React from 'react';
import { ArrowRight, Check, Zap, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';

export const PricingPreview = ({ onViewChange, onOpenConsultation }) => {
  const { language, t } = useLanguage();
  const { data } = useCMS();
  const smmTariffs = data.tariffs.smm || [];
  const marketingTariff = data.tariffs.marketing || {};

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

        {/* 4 SMM Tier Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {smmTariffs.map((plan) => {
            const duration =
              plan[`duration${language.charAt(0).toUpperCase() + language.slice(1)}`] ||
              plan.durationUz;
            const savings =
              plan[`savings${language.charAt(0).toUpperCase() + language.slice(1)}`] ||
              plan.savingsUz;
            const period =
              plan[`period${language.charAt(0).toUpperCase() + language.slice(1)}`] ||
              plan.periodUz;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-gradient-to-b from-indigo-950/70 to-slate-900/90 border-2 border-indigo-500 shadow-xl shadow-indigo-500/15 -translate-y-1'
                    : 'bg-slate-900/70 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white font-bold text-[11px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                    {t('pricing_popular_badge')}
                  </div>
                )}

                <div>
                  <h3 className="font-bold text-base text-white mb-1">
                    {duration}
                  </h3>
                  <p className="text-xs text-indigo-400 font-semibold mb-4">
                    {savings}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-extrabold text-white tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-400">{period}</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenConsultation('SMM')}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    plan.isPopular
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {t('pricing_btn_order')}
                </button>
              </div>
            );
          })}
        </div>

        {/* Marketing & IT Callout Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/90 border border-slate-800 rounded-2xl p-6 sm:p-8">
          {/* Marketing box */}
          <div className="space-y-3 pr-0 md:pr-4 border-b md:border-b-0 md:border-r border-slate-800/80 pb-6 md:pb-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
              Keng ko'lamli yechim
            </span>
            <h4 className="text-xl font-bold text-white">
              {t('pricing_mkt_title')}
            </h4>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-slate-400">
                {marketingTariff.prefixUz || "Boshlang'ich narx"}:
              </span>
              <span className="text-2xl font-extrabold text-white">
                {marketingTariff.startingPrice || "$2000"} dan
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {marketingTariff.noteUz || "Loyiha hajmiga qarab individual hisoblanadi"}
            </p>
            <button
              onClick={() => onOpenConsultation('Marketing')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 pt-2"
            >
              <span>Marketing taklifini olish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* IT box */}
          <div className="space-y-3 pl-0 md:pl-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
              Dasturiy yechimlar
            </span>
            <h4 className="text-xl font-bold text-white">
              {t('pricing_it_title')}
            </h4>
            <p className="text-sm text-slate-300">
              Har bir loyiha (sayt, mobil ilova, bot) individual buyurtma asosida baholanadi.
            </p>
            <p className="text-xs text-slate-400">
              Biznesingiz talablariga mos bepul texnik hisob-kitob va smeta taqdim etamiz.
            </p>
            <button
              onClick={() => {
                onViewChange('tariffs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 pt-2"
            >
              <span>Bepul smeta hisoblagichiga o'tish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
