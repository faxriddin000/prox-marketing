import React from 'react';
import { Handshake, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';

export const PartnersSlider = ({ onViewChange }) => {
  const { t } = useLanguage();
  const { data } = useCMS();
  const partners = data.partners || [];

  // Duplicate for seamless infinite marquee loop
  const marqueePartners = [...partners, ...partners];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0b1021] via-[#111832] to-[#0b1021] border-y border-indigo-950/60">
      {/* Subtle Central Radial Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[380px] bg-[rgba(99,102,241,0.15)] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[240px] bg-[rgba(6,182,212,0.12)] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center space-y-3 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm shadow-cyan-500/10">
          <Handshake className="w-3.5 h-3.5" />
          {t('partners_badge')}
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t('partners_title')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          {t('partners_subtitle')}
        </p>
      </div>

      {/* Infinite Auto-Scrolling Marquee with Harmonized Dark Glassmorphic Cards & Neon Glowing Edges */}
      <div className="relative w-full overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <div className="animate-marquee items-center gap-6 sm:gap-8 px-4">
          {marqueePartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="shrink-0 group p-[1.5px] rounded-2xl bg-gradient-to-tr from-[#4F46E5]/40 via-indigo-500/20 to-[#06B6D4]/40 hover:from-[#4F46E5] hover:to-[#06B6D4] shadow-[0_8px_25px_-5px_rgba(79,70,229,0.25),0_4px_12px_-4px_rgba(6,182,212,0.15)] hover:shadow-[0_12px_35px_rgba(79,70,229,0.4),0_8px_20px_rgba(6,182,212,0.3)] hover:-translate-y-1.5 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
            >
              {/* Harmonized Dark Glassmorphic Surface */}
              <div className="w-48 sm:w-56 h-28 sm:h-32 rounded-[15px] bg-slate-900/70 backdrop-blur-md flex flex-col items-center justify-center p-3 text-center border border-white/[0.04]">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-10 sm:max-h-12 max-w-[80%] object-contain filter brightness-110 drop-shadow-md group-hover:scale-105 transition-transform duration-300 mb-2"
                  loading="lazy"
                />
                {/* Partner Name cleanly displayed below logo */}
                <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors tracking-wide truncate max-w-full px-2">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sleek Gradient Pill CTA Button */}
      <div className="mt-10 text-center relative z-10">
        <button
          onClick={() => {
            onViewChange('partners');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 text-slate-950 font-semibold px-6 py-2.5 rounded-full shadow-[0_8px_25px_rgba(139,92,246,0.4)] hover:shadow-[0_12px_32px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
        >
          <span>{t('partners_view_all')}</span>
          <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
