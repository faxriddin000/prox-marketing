import React, { useState } from 'react';
import {
  Compass, Video, CalendarCheck, Target, Award, BarChart3,
  CheckCircle2, Layers, Palette, Briefcase, Sparkles, UserCheck, ShieldAlert,
  Globe, Smartphone, CreditCard, Layout, Wrench, Bot, ArrowRight, Check
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

  const renderServiceCard = (item, categoryName, categoryTheme) => {
    const IconComp = iconMap[item.icon] || Sparkles;
    const title = item[`title${language.charAt(0).toUpperCase() + language.slice(1)}`] || item.titleUz;
    const desc = item[`desc${language.charAt(0).toUpperCase() + language.slice(1)}`] || item.descUz;

    return (
      <div
        key={item.id}
        className="group relative bg-slate-900/60 hover:bg-slate-850/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5"
      >
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryTheme.bg} border ${categoryTheme.border} flex items-center justify-center text-white`}>
              <IconComp className="w-6 h-6 text-white" />
            </div>
            <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${categoryTheme.badge}`}>
              {categoryName}
            </span>
          </div>

          <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-indigo-300 transition-colors">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
            {desc}
          </p>
        </div>

        <button
          onClick={() => onOpenConsultation(`${categoryName}: ${title}`)}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-indigo-600 hover:text-white border border-slate-700/80 hover:border-indigo-500 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>{t('services_btn_request')}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    );
  };

  const smmTheme = {
    bg: 'from-pink-600/30 to-rose-600/20',
    border: 'border-pink-500/30',
    badge: 'bg-pink-500/10 text-pink-400 border border-pink-500/20'
  };

  const mktTheme = {
    bg: 'from-indigo-600/30 to-purple-600/20',
    border: 'border-indigo-500/30',
    badge: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
  };

  const itTheme = {
    bg: 'from-cyan-600/30 to-blue-600/20',
    border: 'border-cyan-500/30',
    badge: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
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
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[11px] px-2 py-0.2 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-800'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* SMM Section */}
        {(activeTab === 'all' || activeTab === 'smm') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-pink-500" />
                  <span>SMM Xizmatlari (6 ta yo'nalish)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Strategiya, professional video, muntazam kontent va maqsadli target
                </p>
              </div>
              <span className="text-xs font-mono text-pink-400 hidden sm:inline">
                {smmList.length} ta xizmat
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {smmList.map((item) => renderServiceCard(item, 'SMM', smmTheme))}
            </div>
          </div>
        )}

        {/* Marketing Section */}
        {(activeTab === 'all' || activeTab === 'marketing') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span>Keng qamrovli Marketing (7 ta yo'nalish)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  SMM, target, brending, konsalting, blogerlar va sotuv bo'limi nazorati
                </p>
              </div>
              <span className="text-xs font-mono text-indigo-400 hidden sm:inline">
                {mktList.length} ta xizmat
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mktList.map((item) => renderServiceCard(item, 'Marketing', mktTheme))}
            </div>
          </div>
        )}

        {/* IT Services Section */}
        {(activeTab === 'all' || activeTab === 'it') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-cyan-500" />
                  <span>IT Xizmatlari & Dasturlash (6 ta yo'nalish)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Veb-saytlar, mobil ilovalar, to'lov tizimlari, UI/UX va AI Telegram-botlar
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 hidden sm:inline">
                {itList.length} ta xizmat
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itList.map((item) => renderServiceCard(item, 'IT', itTheme))}
            </div>
          </div>
        )}
      </section>

      {/* Bottom Consultation Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950/60 border border-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Qaysi xizmat sizning biznesingizga to'g'ri kelishini bilmayapsizmi?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Mutaxassislarimiz loyihangizni bepul o'rganib chiqadi va individual yo'l xaritasini tuzib beradi.
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
