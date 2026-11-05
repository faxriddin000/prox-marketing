import React from 'react';
import { Target, BarChart3, Users2, Rocket, Cpu, Headphones, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const UspSection = () => {
  const { t } = useLanguage();

  const usps = [
    {
      icon: Target,
      titleKey: 'usp_1_title',
      descKey: 'usp_1_desc',
      accent: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30'
    },
    {
      icon: BarChart3,
      titleKey: 'usp_2_title',
      descKey: 'usp_2_desc',
      accent: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      icon: Users2,
      titleKey: 'usp_3_title',
      descKey: 'usp_3_desc',
      accent: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30'
    },
    {
      icon: Rocket,
      titleKey: 'usp_4_title',
      descKey: 'usp_4_desc',
      accent: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30'
    },
    {
      icon: Cpu,
      titleKey: 'usp_5_title',
      descKey: 'usp_5_desc',
      accent: 'from-cyan-500/20 to-sky-500/20 text-cyan-400 border-cyan-500/30'
    },
    {
      icon: Headphones,
      titleKey: 'usp_6_title',
      descKey: 'usp_6_desc',
      accent: 'from-indigo-500/20 to-violet-500/20 text-indigo-400 border-indigo-500/30'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {t('usp_badge')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('usp_title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {t('usp_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {usps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-850/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.accent} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-indigo-300 transition-colors">
                  {t(item.titleKey)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {t(item.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
