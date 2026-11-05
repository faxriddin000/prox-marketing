import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, CheckCircle, ShieldAlert, Award, Star } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';

export const HeroSection = ({ onOpenConsultation, onViewChange }) => {
  const { language, t } = useLanguage();
  const { data } = useCMS();
  const hero = data.hero;

  const currentBadge = hero.badge[language] || hero.badge.uz;
  const currentTitle = hero.title[language] || hero.title.uz;
  const currentSubtitle = hero.subtitle[language] || hero.subtitle.uz;
  const currentCta = hero.ctaButton[language] || hero.ctaButton.uz;
  const currentSecondary = hero.secondaryButton?.[language] || hero.secondaryButton?.uz || t('hero_services_btn');

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>{currentBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              <span className="block">{currentTitle}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {currentSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>{currentCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onViewChange('services')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 font-semibold text-sm transition-all cursor-pointer"
              >
                <span>{currentSecondary}</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Shaffof shartnoma</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Haftalik hisobotlar</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Kafolatlangan KPI</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup / Interactive Agency Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative card */}
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-950/90 p-1 border border-slate-700/70 shadow-2xl backdrop-blur-xl">
                {/* Banner image or graphic */}
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-900">
                  <img
                    src={hero.bannerImage || "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80"}
                    alt="Prox Marketing Agency"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Floating live badge */}
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 rounded-xl px-3 py-1.5 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                    <span className="text-xs font-semibold text-white">Live ROI Dashboard</span>
                  </div>

                  {/* Highlight pill inside banner */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-slate-400 font-medium">Bozordagi tajriba</p>
                      <p className="text-sm font-bold text-white">Digital Marketing & IT</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>5.0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stat Widget */}
              <div className="absolute -bottom-6 -left-6 bg-slate-900/95 border border-indigo-500/30 rounded-2xl p-4 shadow-xl backdrop-blur-xl hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">O'rtacha natija</p>
                  <p className="text-base font-extrabold text-white">+320% Sotuv o'sishi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {hero.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 text-center transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-300 to-cyan-300">
                {stat.value}
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                {stat[`label${language.charAt(0).toUpperCase() + language.slice(1)}`] || stat.labelUz}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
