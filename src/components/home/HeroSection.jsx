import React from 'react';
import {
  ArrowRight, Sparkles, TrendingUp, CheckCircle, BarChart3,
  Share2, Code2, Layers, Bot, Zap, Star
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';

export const HeroSection = ({ onOpenConsultation, onViewChange, onSelectCategory }) => {
  const { language, t } = useLanguage();
  const { data } = useCMS();
  const hero = data.hero;

  const currentBadge = hero.badge[language] || hero.badge.uz;
  const currentTitle = hero.title[language] || hero.title.uz;
  const currentSubtitle = hero.subtitle[language] || hero.subtitle.uz;
  const currentCta = hero.ctaButton[language] || hero.ctaButton.uz;
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

          {/* Right Column: Clean Non-Overlapping Interactive Agency Showcase Dashboard */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-3xl bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950 p-5 sm:p-6 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-4">
                {/* Agency Live Dashboard Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/30">
                      PX
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">
                        Prox Growth Engine
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        {language === 'ru' ? 'Системное масштабирование' : 'Tizimli rivojlanish'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[10px] font-bold text-emerald-400">LIVE</span>
                  </div>
                </div>

                {/* Grid 1: SMM Performance Card */}
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/15 text-pink-400 border border-pink-500/20 flex items-center justify-center shrink-0">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        SMM & Virallik
                      </span>
                      <span className="text-sm font-extrabold text-white">
                        +320% {language === 'ru' ? 'Рост продаж' : "Sotuv o'sishi"}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                    450k+
                  </span>
                </div>

                {/* Grid 2: Target Ads ROI Card */}
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        Target & Ads
                      </span>
                      <span className="text-sm font-extrabold text-white">
                        5.4x {language === 'ru' ? 'Средний ROI' : "O'rtacha ROI"}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    Google & Meta
                  </span>
                </div>

                {/* Grid 3: IT & AI Automation Card */}
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        IT & Sun'iy Intellekt
                      </span>
                      <span className="text-sm font-extrabold text-white">
                        {language === 'ru' ? '100% Автоматизация' : "100% Avtomatlashtirish"}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    Web + Bot
                  </span>
                </div>

                {/* Bottom Trust Stat */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-400 px-1">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-white">5.0</span>
                    <span className="text-[11px] text-slate-400">
                      ({language === 'ru' ? 'Рейтинг качества' : 'Sifat ko\'rsatkichi'})
                    </span>
                  </div>
                  <span className="text-[11px] text-indigo-400 font-semibold">
                    proxmarketing.uz
                  </span>
                </div>
              </div>
            </div>
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
