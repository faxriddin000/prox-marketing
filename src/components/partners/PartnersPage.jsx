import React from 'react';
import { Handshake, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';

export const PartnersPage = ({ onOpenConsultation }) => {
  const { language, t } = useLanguage();
  const { data } = useCMS();
  const partners = data.partners || [];
  const marqueePartners = [...partners, ...partners];

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

      {/* Infinite Logo Marquee with Frosted Glass Neon Cards */}
      <section className="relative w-full overflow-hidden py-8 bg-gradient-to-b from-[#0b1021] via-[#111832] to-[#0b1021] border-y border-indigo-950/60 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[rgba(99,102,241,0.15)] rounded-full blur-3xl pointer-events-none" />
        <div className="animate-marquee items-center gap-6 sm:gap-8 px-4">
          {marqueePartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="shrink-0 group p-[1.5px] rounded-2xl bg-gradient-to-tr from-[#06B6D4] via-[#6366F1] to-[#8B5CF6] shadow-[0_10px_30px_-5px_rgba(99,102,241,0.35),0_8px_20px_-6px_rgba(6,182,212,0.25)] hover:shadow-[0_15px_40px_rgba(99,102,241,0.55),0_10px_25px_rgba(6,182,212,0.4)] hover:-translate-y-1.5 hover:scale-[1.03] transition-all duration-300"
            >
              <div className="w-44 sm:w-52 h-24 sm:h-28 rounded-[15px] bg-white/[0.07] backdrop-blur-md flex items-center justify-center p-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 sm:max-h-14 max-w-[82%] object-contain filter brightness-110 drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clean Frosted Logo Showcase Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center py-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="w-full group p-[1.5px] rounded-2xl bg-gradient-to-tr from-[#06B6D4] via-[#6366F1] to-[#8B5CF6] shadow-[0_10px_30px_-5px_rgba(99,102,241,0.35),0_8px_20px_-6px_rgba(6,182,212,0.25)] hover:shadow-[0_15px_40px_rgba(99,102,241,0.55),0_10px_25px_rgba(6,182,212,0.4)] hover:-translate-y-1.5 hover:scale-[1.03] transition-all duration-300"
            >
              <div className="w-full h-24 sm:h-28 rounded-[15px] bg-white/[0.07] backdrop-blur-md flex items-center justify-center p-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 w-auto object-contain filter brightness-110 drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto border border-indigo-500/30">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {language === 'ru'
              ? 'Хотите видеть свой бренд среди наших партнеров?'
              : "Sizning brendingiz ham shu ro'yxatda bo'lishini xohlaysizmi?"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            {language === 'ru'
              ? 'Мы измеряем наш успех результатами наших клиентов. Давайте создадим прибыльную стратегию для вашего бизнеса.'
              : "Biz har bir mijozimizning muvaffaqiyatini o'zimizning g'alabamiz deb bilamiz. Keling, sizning biznesingiz uchun ham daromadli strategiya tuzaylik."}
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
