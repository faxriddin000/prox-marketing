import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Handshake, Building2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';

export const PartnersSlider = ({ onViewChange }) => {
  const { language, t } = useLanguage();
  const { data } = useCMS();
  const partners = data.partners || [];
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-slate-950/80 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
              <Handshake className="w-3.5 h-3.5" />
              {t('partners_badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t('partners_title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              {t('partners_subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slider container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {partners.map((partner) => {
            const industry =
              partner[`industry${language.charAt(0).toUpperCase() + language.slice(1)}`] ||
              partner.industryUz;

            return (
              <div
                key={partner.id}
                className="snap-start shrink-0 w-64 sm:w-72 bg-slate-900/60 hover:bg-slate-850/80 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 group"
              >
                <div className="w-full h-20 bg-slate-950/70 rounded-xl mb-4 p-2 flex items-center justify-center border border-slate-800 overflow-hidden">
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <Building2 className="w-8 h-8 text-slate-600" />
                  )}
                </div>
                <h4 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                  {partner.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {industry}
                </p>
              </div>
            );
          })}
        </div>

        {/* View all partners button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              onViewChange('partners');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1.5 hover:underline"
          >
            <span>Barcha hamkorlar va ishonch kafolatlari</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
};
