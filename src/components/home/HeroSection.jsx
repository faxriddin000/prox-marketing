import React from 'react';
import {
  ArrowRight, Sparkles, TrendingUp, CheckCircle, BarChart3,
  Share2, Code2, Layers, Bot, Zap, Star, Image as ImageIcon
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';
import { UnifiedGrowthGraphic } from './UnifiedGrowthGraphic';

export const HeroSection = ({ onOpenConsultation, onViewChange, onSelectCategory }) => {
  const { language, t } = useLanguage();
  const { data, updateHero } = useCMS();
  const hero = data.hero || {};

  const currentBadge = hero.badge?.[language] || hero.badge?.uz || 'Raqamli marketing & IT ekotizimi';
  const currentTitle = hero.title?.[language] || hero.title?.uz || 'Biznesingizni tizimli rivojlantiring va sotuvlarni oshiring';
  const currentSubtitle = hero.subtitle?.[language] || hero.subtitle?.uz || 'Strategik SMM, maqsadli reklama va IT yechimlarini yagona o\'sish tizimiga birlashtiramiz.';
  const currentCta = hero.ctaButton?.[language] || hero.ctaButton?.uz || t('hero_consult_btn');
  const currentSecondary = hero.secondaryButton?.[language] || hero.secondaryButton?.uz || t('hero_services_btn');

  const handlePillarClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    onViewChange('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background radial orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Pillars & Action */}
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

            {/* Instant Value Proposition Service Pillars */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <button
                onClick={() => handlePillarClick('smm')}
                className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-pink-950/40 border border-slate-800 hover:border-pink-500/40 text-xs text-slate-200 transition-all cursor-pointer shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-pink-500 group-hover:scale-125 transition-transform" />
                <span className="font-semibold">{t('hero_pillar_smm')}</span>
              </button>

              <button
                onClick={() => handlePillarClick('marketing')}
                className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-500/40 text-xs text-slate-200 transition-all cursor-pointer shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
                <span className="font-semibold">{t('hero_pillar_mkt')}</span>
              </button>

              <button
                onClick={() => handlePillarClick('it')}
                className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-200 transition-all cursor-pointer shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                <span className="font-semibold">{t('hero_pillar_it')}</span>
              </button>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
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

            {/* Localized Trust Points */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{t('hero_trust_contract')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{t('hero_trust_reports')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{t('hero_trust_kpi')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Unified 3-Direction Growth Graphic or Dynamic Custom Banner Image */}
          <div className="lg:col-span-5 relative">
            {/* Quick Toggle for Banner / 3D Graphic */}
            {hero.bannerImage && hero.bannerImage.trim() !== '' && (
              <div className="flex justify-end mb-2">
                <button
                  type="button"
                  onClick={() => updateHero({ useCustomImage: !hero.useCustomImage })}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 text-indigo-300 border border-indigo-500/30 transition-all shadow-md cursor-pointer"
                  title="Grafika va rasm o'rtasida almashish"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>
                    {hero.useCustomImage
                      ? (language === 'ru' ? 'Показать 3D графику' : '3D grafikani ko\'rish')
                      : (language === 'ru' ? 'Показать баннер' : 'Maxsus rasmni ko\'rish')}
                  </span>
                </button>
              </div>
            )}

            {hero.useCustomImage && hero.bannerImage && hero.bannerImage.trim() !== '' ? (
              /* Custom Banner Image from CMS with Glassmorphic Neon Frame */
              <div className="relative group rounded-3xl p-[1.5px] bg-gradient-to-tr from-[#06B6D4] via-[#6366F1] to-[#8B5CF6] shadow-[0_20px_50px_rgba(99,102,241,0.35)] animate-fadeIn">
                <div className="relative rounded-[22px] overflow-hidden bg-slate-950/90 backdrop-blur-xl">
                  <img
                    src={hero.bannerImage}
                    alt="Prox Marketing Growth Banner"
                    className="w-full h-auto object-cover max-h-[460px] rounded-[22px] group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback if URL is invalid
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/60">
                    <span className="font-bold text-cyan-300">Prox Growth Engine</span>
                    <span className="font-mono text-[10px] text-slate-300">proxmarketing.uz</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Modern Dynamic 3D/SVG Unified Growth Engine Illustration */
              <UnifiedGrowthGraphic />
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-14 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
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
