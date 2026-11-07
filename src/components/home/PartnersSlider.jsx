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
    <section className="py-20 relative overflow-hidden bg-transparent border-t border-slate-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Handshake className="w-3.5 h-3.5" />
          {t('partners_badge')}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {t('partners_title')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          {t('partners_subtitle')}
        </p>
      </div>

      {/* Pure Logo-Only Infinite Auto-Scrolling Marquee with gradient mask */}
      <div className="relative w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
        <div className="animate-marquee items-center gap-14 sm:gap-20">
          {marqueePartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="shrink-0 flex items-center justify-center h-16 sm:h-20 bg-transparent border-none shadow-none"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-12 sm:max-h-14 w-auto object-contain opacity-75 hover:opacity-100 transition-opacity duration-300 filter brightness-110 drop-shadow-md"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Localized View All Partners Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => {
            onViewChange('partners');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1.5 hover:underline cursor-pointer group"
        >
          <span>{t('partners_view_all')}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
