import React, { useState } from 'react';
import {
  Compass, Video, CalendarCheck, Target, Award, BarChart3,
  CheckCircle2, Layers, Palette, Briefcase, Sparkles, UserCheck, ShieldAlert,
  Globe, Smartphone, CreditCard, Layout, Wrench, Bot, ArrowRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';

export const ServicesPage = ({ activeCategory = 'all', onOpenConsultation }) => {
  const { language, t } = useLanguage();
  const { data } = useCMS();
  const [activeTab, setActiveTab] = useState(activeCategory || 'all');

  const smmList = data.services?.smm || [];
  const mktList = data.services?.marketing || [];
  const itList = data.services?.it || [];

  const iconMap = {
    Compass, Video, CalendarCheck, Target, Award, BarChart3,
    CheckCircle2, Layers, Palette, Briefcase, Sparkles, UserCheck, ShieldAlert,
    Globe, Smartphone, CreditCard, Figma: Layout, Layout, Wrench, Bot
  };

  const tabs = [
    { id: 'all', label: t('services_tab_all'), count: smmList.length + mktList.length + itList.length },
    { id: 'smm', label: t('services_tab_smm'), count: smmList.length },
    { id: 'marketing', label: t('services_tab_mkt'), count: mktList.length },
    { id: 'it', label: t('services_tab_it'), count: itList.length }
  ];

  const categoryThemes = {
    SMM: {
      accentLine: 'bg-gradient-to-r from-pink-500 to-rose-400',
      iconBox: 'bg-gradient-to-br from-pink-500/20 to-rose-500/10 text-pink-400 border-pink-500/30',
      watermark: 'text-pink-500/10 group-hover:text-pink-500/20',
      badge: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      sideHighlight: 'group-hover:border-l-pink-500',
      hoverGlow: 'group-hover:shadow-pink-500/10 group-hover:border-pink-500/40',
      btnHover: 'group-hover:bg-pink-600 group-hover:border-pink-500'
    },
    Marketing: {
      accentLine: 'bg-gradient-to-r from-indigo-500 to-purple-400',
      iconBox: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/10 text-indigo-400 border-indigo-500/30',
      watermark: 'text-indigo-500/10 group-hover:text-indigo-500/20',
      badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      sideHighlight: 'group-hover:border-l-indigo-500',
      hoverGlow: 'group-hover:shadow-indigo-500/10 group-hover:border-indigo-500/40',
      btnHover: 'group-hover:bg-indigo-600 group-hover:border-indigo-500'
    },
    IT: {
      accentLine: 'bg-gradient-to-r from-cyan-400 to-blue-500',
      iconBox: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
      watermark: 'text-cyan-500/10 group-hover:text-cyan-500/20',
      badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      sideHighlight: 'group-hover:border-l-cyan-400',
      hoverGlow: 'group-hover:shadow-cyan-500/10 group-hover:border-cyan-500/40',
      btnHover: 'group-hover:bg-cyan-600 group-hover:border-cyan-500'
    }
  };

  const renderServiceCard = (item, index, categoryName) => {
    const IconComp = iconMap[item.icon] || Sparkles;
    const title = item[`title${language.charAt(0).toUpperCase() + language.slice(1)}`] || item.titleUz;
    const desc = item[`desc${language.charAt(0).toUpperCase() + language.slice(1)}`] || item.descUz;
    const theme = categoryThemes[categoryName];
    const numberFormatted = String(index + 1).padStart(2, '0');

    return (
      <div
        key={item.id}
        className={`group relative rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl overflow-hidden backdrop-blur-xl border-l-4 border-l-transparent ${theme.sideHighlight} ${theme.hoverGlow}`}
      >
        {/* Animated Top Accent Glow Line */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme.accentLine}`} />

        {/* Numbered Watermark */}
        <div className={`absolute top-4 right-5 text-4xl sm:text-5xl font-black font-mono transition-colors duration-300 select-none pointer-events-none ${theme.watermark}`}>
          {numberFormatted}
        </div>

        {/* Card Content */}
        <div className="relative z-10">
          {/* Icon and Category Badge */}
          <div className="flex items-center justify-between mb-5">
            <div className={`w-12 h-12 rounded-2xl ${theme.iconBox} border flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
              <IconComp className="w-6 h-6" />
            </div>
            <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${theme.badge}`}>
              {categoryName}
            </span>
          </div>

          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
            {desc}
          </p>
        </div>

        {/* Refined Action Button with Side Sweep Effect */}
        <div className="relative z-10 pt-2">
          <button
            onClick={() => onOpenConsultation(`${categoryName}: ${title}`)}
            className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-200 bg-slate-800/90 hover:text-white border border-slate-700/80 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${theme.btnHover}`}
          >
            <span>{t('services_btn_request')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-32 pb-24 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          {t('services_badge')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {t('services_title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          {t('services_subtitle')}
        </p>

        {/* Tab Filters */}
        <div className="pt-8 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105 font-bold'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* SMM Section (6 Cards) */}
        {(activeTab === 'all' || activeTab === 'smm') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-pink-500" />
                  <span>
                    {language === 'ru' ? 'SMM Услуги (6 услуг)' : "SMM Xizmatlari (6 ta xizmat)"}
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'ru'
                    ? 'Стратегия, создание контента, управление постами, рекламные кампании, имидж бренда, аналитика и отчетность'
                    : "Strategiya, kontent yaratish, post boshqaruvi, reklama kampaniyalari, brend imiji, analitika va hisobot"}
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-pink-400 hidden sm:inline">
                {smmList.length} {language === 'ru' ? 'услуг' : 'xizmat'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {smmList.map((item, idx) => renderServiceCard(item, idx, 'SMM'))}
            </div>
          </div>
        )}

        {/* Marketing Section (7 Cards) */}
        {(activeTab === 'all' || activeTab === 'marketing') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span>
                    {language === 'ru' ? 'Маркетинг (7 направлений)' : "Marketing (7 ta yo'nalish)"}
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'ru'
                    ? 'Все предложения SMM, таргет, брендинг, стратегия и консалтинг, инфлюенс-маркетинг, контроль отдела продаж'
                    : "SMM takliflari, target reklama, brending, strategiya va konsalting, blogerlar bilan ishlash, to'liq sotuv nazorati"}
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-400 hidden sm:inline">
                {mktList.length} {language === 'ru' ? 'направлений' : "yo'nalish"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mktList.map((item, idx) => renderServiceCard(item, idx, 'Marketing'))}
            </div>
          </div>
        )}

        {/* IT Services Section (6 Cards) */}
        {(activeTab === 'all' || activeTab === 'it') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-cyan-500" />
                  <span>
                    {language === 'ru' ? 'IT Услуги (6 направлений)' : "IT Xizmatlari (6 ta yo'nalish)"}
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'ru'
                    ? 'Разработка сайтов, мобильные приложения, интеграция платежных систем, UI/UX, техподдержка, AI и боты'
                    : "Veb-saytlar, mobil ilovalar, to'lov tizimlari, UI/UX dizayn, texnik qo'llab-quvvatlash, sun'iy intellekt va botlar"}
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 hidden sm:inline">
                {itList.length} {language === 'ru' ? 'направлений' : "yo'nalish"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itList.map((item, idx) => renderServiceCard(item, idx, 'IT'))}
            </div>
          </div>
        )}
      </section>

      {/* Bottom Consultation Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {language === 'ru'
                ? 'Нужна помощь в выборе подходящих услуг?'
                : "Qaysi xizmat sizning biznesingizga mos kelishini bilmayapsizmi?"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              {language === 'ru'
                ? 'Наши специалисты бесплатно проанализируют ваш бизнес и составят пошаговую стратегию роста.'
                : "Mutaxassislarimiz loyihangizni bepul tahlil qilib, individual rivojlanish rejasini taqdim etadi."}
            </p>
          </div>
          <button
            onClick={() => onOpenConsultation('Umumiy tanlov')}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            {t('hero_consult_btn')}
          </button>
        </div>
      </section>
    </div>
  );
};
