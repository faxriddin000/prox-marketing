import React from 'react';
import { Handshake, Building2, CheckCircle2, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';

export const PartnersPage = ({ onOpenConsultation }) => {
  const { language, t } = useLanguage();
  const { data } = useCMS();
  const partners = data.partners || [];

  return (
    <div className="pt-32 pb-24 space-y-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Handshake className="w-3.5 h-3.5" />
          {t('partners_badge')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {t('partners_title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          {t('partners_subtitle')}
        </p>
      </section>

      {/* Grid of Partners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {partners.map((partner) => {
            const industry =
              partner[`industry${language.charAt(0).toUpperCase() + language.slice(1)}`] ||
              partner.industryUz;

            return (
              <div
                key={partner.id}
                className="bg-slate-900/60 hover:bg-slate-850/80 border border-slate-800 hover:border-slate-700 rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300 group hover:-translate-y-1 shadow-lg shadow-black/20"
              >
                <div className="w-full h-28 bg-slate-950/80 rounded-2xl mb-6 p-4 flex items-center justify-center border border-slate-800/80 group-hover:border-cyan-500/30 transition-colors">
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <Building2 className="w-12 h-12 text-slate-600" />
                  )}
                </div>

                <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors mb-1">
                  {partner.name}
                </h3>

                <p className="text-xs font-medium text-slate-400 mb-4">
                  {industry}
                </p>

                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-[11px] text-slate-400 ml-1">5.0 Hamkorlik</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto border border-indigo-500/30">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Sizning brendingiz ham shu ro'yxatda bo'lishini xohlaysizmi?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Biz har bir mijozimizning muvaffaqiyatini o'zimizning g'alabamiz deb bilamiz. Keling, sizning biznesingiz uchun ham daromadli strategiya tuzaylik.
          </p>
          <button
            onClick={() => onOpenConsultation('Hamkorlik')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <span>{t('hero_consult_btn')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
