import React, { useState } from 'react';
import {
  ArrowRight, Sparkles, TrendingUp, CheckCircle, BarChart3,
  Share2, Code2, Bot, Zap, Image as ImageIcon
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';
import { SmmHeroVisual, MarketingHeroVisual, ItHeroVisual } from './HeroDirectionVisuals';
import { UnifiedGrowthGraphic } from './UnifiedGrowthGraphic';

export const HeroSection = ({ onOpenConsultation, onViewChange, onSelectCategory }) => {
  const { language, t } = useLanguage();
  const { data, updateHero } = useCMS();
  const hero = data.hero || {};

  // Active direction state: 'smm' | 'marketing' | 'it'
  const [activeDirection, setActiveDirection] = useState('smm');

  const currentBadge = hero.badge?.[language] || hero.badge?.uz || 'Raqamli marketing & IT ekotizimi';
  const currentTitle = hero.title?.[language] || hero.title?.uz || 'Biznesingizni tizimli rivojlantiring va sotuvlarni oshiring';
  const currentCta = hero.ctaButton?.[language] || hero.ctaButton?.uz || t('hero_consult_btn');
  const currentSecondary = hero.secondaryButton?.[language] || hero.secondaryButton?.uz || t('hero_services_btn');

  // Direction-specific dynamic copy
  const directionCopy = {
    smm: {
      titleUz: "SMM Xizmatlari",
      titleRu: "SMM Услуги",
      subUz: "Viral reels, kreativ kontent va brend obro'sini oshirish orqali maqsadli auditoriyani faol xaridorga aylantiramiz.",
      subRu: "Вирусные Reels, креативный контент и рост узнаваемости бренда для превращения целевой аудитории в постоянных клиентов.",
      color: "pink",
    },
    marketing: {
      titleUz: "Marketing & Target",
      titleRu: "Маркетинг & Таргет",
      subUz: "Meta Ads, Google va Yandex orqali aniq maqsadli auditoriyaga chiqamiz va kafolatlangan yuqori ROI ta'minlaymiz.",
      subRu: "Таргетированная реклама в Meta, Google и Яндекс с точным попаданием в целевую аудиторию и высоким ROI.",
      color: "indigo",
    },
    it: {
      titleUz: "IT & Avtomatlashtirish",
      titleRu: "IT & Автоматизация",
      subUz: "Yuqori tezlikdagi zamonaviy veb-saytlar, Telegram botlar va CRM avtomatlashtirish orqali biznesingizni raqamlashtiramiz.",
      subRu: "Быстрые современные веб-сайты, Telegram-боты и CRM-автоматизация для цифровизации процессов и роста продаж.",
      color: "cyan",
    }
  };

  const currentActiveCopy = directionCopy[activeDirection] || directionCopy.smm;
  const dynamicSubtitle = language === 'ru' ? currentActiveCopy.subRu : currentActiveCopy.subUz;

  // Render matching visual component
  const renderVisual = () => {
    switch (activeDirection) {
      case 'marketing':
        return <MarketingHeroVisual />;
      case 'it':
        return <ItHeroVisual />;
      case 'smm':
      default:
        return <SmmHeroVisual />;
    }
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Dynamic Background Atmosphere Glow matching active tab */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[150px] pointer-events-none transition-all duration-700 ${
          activeDirection === 'smm'
            ? 'bg-pink-600/15'
            : activeDirection === 'marketing'
            ? 'bg-indigo-600/20'
            : 'bg-cyan-500/15'
        }`}
      />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Interactive Tabs & Action */}
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

            {/* Interactive Direction Tabs / Buttons */}
            <div className="pt-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                {language === 'ru' ? 'Выберите направление для обзора:' : 'Yo\'nalishni tanlang va natijani ko\'ring:'}
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                {/* 1. SMM Tab */}
                <button
                  type="button"
                  onClick={() => setActiveDirection('smm')}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeDirection === 'smm'
                      ? 'bg-pink-600/20 text-pink-300 border-2 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.35)] scale-105'
                      : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-pink-500/40'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${activeDirection === 'smm' ? 'bg-pink-400 animate-ping' : 'bg-pink-500'}`} />
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{language === 'ru' ? 'SMM Услуги' : 'SMM Xizmatlari'}</span>
                </button>

                {/* 2. Marketing Tab */}
                <button
                  type="button"
                  onClick={() => setActiveDirection('marketing')}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeDirection === 'marketing'
                      ? 'bg-indigo-600/25 text-indigo-300 border-2 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.35)] scale-105'
                      : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-indigo-500/40'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${activeDirection === 'marketing' ? 'bg-indigo-400 animate-ping' : 'bg-indigo-500'}`} />
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>{language === 'ru' ? 'Маркетинг & Таргет' : 'Marketing & Target'}</span>
                </button>

                {/* 3. IT Tab */}
                <button
                  type="button"
                  onClick={() => setActiveDirection('it')}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeDirection === 'it'
                      ? 'bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] scale-105'
                      : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-cyan-500/40'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${activeDirection === 'it' ? 'bg-cyan-300 animate-ping' : 'bg-cyan-400'}`} />
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{language === 'ru' ? 'IT & Автоматизация' : 'IT & Avtomatlashtirish'}</span>
                </button>
              </div>
            </div>

            {/* Dynamic Direction Description */}
            <div className="min-h-[56px] flex items-center justify-center lg:justify-start">
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed transition-all duration-300">
                {dynamicSubtitle}
              </p>
            </div>

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
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(activeDirection);
                  onViewChange('services');
                }}
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

          {/* Right Column: Direction-specific Dynamic Visual Asset */}
          <div className="lg:col-span-5 relative">
            {renderVisual()}
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-14 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {hero.stats?.map((stat, idx) => (
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
