import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, ArrowUpRight, Shield, Sparkles, ChevronDown,
  Share2, TrendingUp, Code2, Check, Zap, Target,
  Building2, Users, ArrowRight, ShieldCheck, HelpCircle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';

export const Header = ({
  currentView,
  onViewChange,
  onSelectCategory,
  onOpenConsultation,
  onOpenAdminLogin
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { data } = useCMS();
  const { isAuthenticated, currentUser } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Active hover dropdown on desktop: null | 'services' | 'tariffs' | 'about'
  const [activeDropdown, setActiveDropdown] = useState(null);
  const closeTimeoutRef = useRef(null);

  // Mobile accordion states
  const [mobileAccordions, setMobileAccordions] = useState({
    services: false,
    tariffs: false,
    about: false
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menuKey) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180); // Smooth debounce bridge so cursor transition never flickers
  };

  const handleNavClick = (viewId, category = null) => {
    if (category && onSelectCategory) {
      onSelectCategory(category);
    }
    onViewChange(viewId);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMobileAccordion = (key) => {
    setMobileAccordions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-black/40 py-2.5'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 to-cyan-300 text-lg tracking-wider">
                  PX
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                  PROX
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Agency
                </span>
              </div>
              <span className="block text-[10px] text-slate-400 tracking-wider font-mono">
                proxmarketing.uz
              </span>
            </div>
          </div>

          {/* Desktop Navigation with Hover Mega-Menus */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/70 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-xl shadow-inner">
            {/* 1. Bosh sahifa */}
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                currentView === 'home'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t('nav_home')}
            </button>

            {/* 2. Biz haqimizda with Hover Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleNavClick('about')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                  currentView === 'about'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>{t('nav_about')}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    activeDropdown === 'about' ? 'rotate-180 text-indigo-400' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* About Dropdown Menu */}
              <div
                className={`absolute top-full left-0 pt-3 w-72 transition-all duration-300 ease-out origin-top-left ${
                  activeDropdown === 'about'
                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
              >
                {/* Seamless hover bridge padding above card */}
                <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl p-3 shadow-2xl backdrop-blur-2xl space-y-1 overflow-hidden ring-1 ring-white/10">
                  <div
                    onClick={() => handleNavClick('about')}
                    className="p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer group flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                        Agentlik tavsifi
                      </p>
                      <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                        Prox Marketing strategiyasi va yo'nalishi
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => handleNavClick('about')}
                    className="p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer group flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                        Missiya va qadriyatlar
                      </p>
                      <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                        Shaffoflik, natijadorlik va doimiy o'sish
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => handleNavClick('partners')}
                    className="p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer group flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        Hamkorlarimiz & Ishonch
                      </p>
                      <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                        Bizga ishongan yirik bizneslar
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Xizmatlar with 3-Column Hover MEGA-MENU */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleNavClick('services', 'all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                  currentView === 'services'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>{t('nav_services')}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    activeDropdown === 'services' ? 'rotate-180 text-indigo-400' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Services Mega-Menu Dropdown */}
              <div
                className={`absolute top-full -left-28 pt-3 w-[780px] transition-all duration-300 ease-out origin-top ${
                  activeDropdown === 'services'
                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
              >
                {/* Seamless hover bridge padding above card */}
                <div className="bg-slate-900/95 border border-slate-700/80 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10 overflow-hidden">
                  {/* Top Header inside Mega-Menu */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        {t('services_title')}
                      </h4>
                    </div>
                    <button
                      onClick={() => handleNavClick('services', 'all')}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 hover:underline"
                    >
                      <span>Barcha 19 ta xizmatlar ro'yxati</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 3 Columns for 3 Directions */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* SMM Column */}
                    <div
                      onClick={() => handleNavClick('services', 'smm')}
                      className="p-4 rounded-2xl bg-slate-950/60 hover:bg-slate-850/90 border border-slate-800/90 hover:border-pink-500/40 transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 rounded-xl bg-pink-500/15 text-pink-400 border border-pink-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Share2 className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                            6 xizmat
                          </span>
                        </div>
                        <h5 className="font-bold text-sm text-white group-hover:text-pink-300 transition-colors mb-1.5">
                          SMM Xizmatlari
                        </h5>
                        <p className="text-[11px] text-slate-400 leading-snug mb-3">
                          Ijtimoiy tarmoqlarda strategiya, video, kreativ dizayn va target reklama
                        </p>
                        <ul className="space-y-1.5 text-[11px] text-slate-300">
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                            <span>Strategiya & Kontent</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                            <span>Target (Insta & FB)</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                            <span>Oylik analitika & hisobot</span>
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4 flex items-center gap-1 text-[11px] font-bold text-pink-400 group-hover:translate-x-1 transition-transform">
                        <span>SMM bo'limiga o'tish</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>

                    {/* Marketing Column */}
                    <div
                      onClick={() => handleNavClick('services', 'marketing')}
                      className="p-4 rounded-2xl bg-slate-950/60 hover:bg-slate-850/90 border border-slate-800/90 hover:border-indigo-500/40 transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <TrendingUp className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                            7 yo'nalish
                          </span>
                        </div>
                        <h5 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors mb-1.5">
                          Keng qamrovli Marketing
                        </h5>
                        <p className="text-[11px] text-slate-400 leading-snug mb-3">
                          Barcha SMM, brending, Google & Telegram Ads, sotuv bo'limi nazorati
                        </p>
                        <ul className="space-y-1.5 text-[11px] text-slate-300">
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                            <span>Google & Telegram Ads</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                            <span>Branding & Brandbook</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                            <span>Sotuv bo'limi nazorati</span>
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4 flex items-center gap-1 text-[11px] font-bold text-indigo-400 group-hover:translate-x-1 transition-transform">
                        <span>Marketing bo'limiga o'tish</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>

                    {/* IT Services Column */}
                    <div
                      onClick={() => handleNavClick('services', 'it')}
                      className="p-4 rounded-2xl bg-slate-950/60 hover:bg-slate-850/90 border border-slate-800/90 hover:border-cyan-500/40 transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Code2 className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            6 yo'nalish
                          </span>
                        </div>
                        <h5 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                          IT Yechimlari & Dasturlash
                        </h5>
                        <p className="text-[11px] text-slate-400 leading-snug mb-3">
                          Veb-saytlar, mobil ilovalar, to'lov tizimlari va sun'iy intellekt botlari
                        </p>
                        <ul className="space-y-1.5 text-[11px] text-slate-300">
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>Sayt & Mobil ilovalar</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>To'lov tizimlari (Payme/Click)</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>AI Chatbot & Telegram bot</span>
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4 flex items-center gap-1 text-[11px] font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                        <span>IT bo'limiga o'tish</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Tariflar with Hover Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('tariffs')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleNavClick('tariffs')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                  currentView === 'tariffs'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>{t('nav_tariffs')}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    activeDropdown === 'tariffs' ? 'rotate-180 text-indigo-400' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Tariffs Dropdown Menu */}
              <div
                className={`absolute top-full -left-12 pt-3 w-[460px] transition-all duration-300 ease-out origin-top ${
                  activeDropdown === 'tariffs'
                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
              >
                {/* Seamless hover bridge padding above card */}
                <div className="bg-slate-900/95 border border-slate-700/80 rounded-3xl p-5 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10 space-y-2.5 overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 px-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Shaffof narxlar va paketlar
                    </span>
                    <span className="text-[11px] text-indigo-400 font-semibold">
                      Yashirin to'lovlarsiz
                    </span>
                  </div>

                  <div
                    onClick={() => handleNavClick('tariffs')}
                    className="p-3 rounded-2xl bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800/80 transition-all cursor-pointer group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-pink-500/15 text-pink-400 flex items-center justify-center shrink-0">
                        <Share2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-xs text-white group-hover:text-pink-300 transition-colors">
                            SMM Paketlari
                          </h5>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-pink-500/10 text-pink-400">
                            4 ta paket
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                          $1000 dan $1500 gacha / oy (33% gacha tejash)
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
                  </div>

                  <div
                    onClick={() => handleNavClick('tariffs')}
                    className="p-3 rounded-2xl bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800/80 transition-all cursor-pointer group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-xs text-white group-hover:text-indigo-300 transition-colors">
                            Keng qamrovli Marketing
                          </h5>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400">
                            Autsorsing
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                          Boshlang'ich narx — $2000 dan (individual tahlil)
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </div>

                  <div
                    onClick={() => handleNavClick('tariffs')}
                    className="p-3 rounded-2xl bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800/80 transition-all cursor-pointer group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-xs text-white group-hover:text-cyan-300 transition-colors">
                            IT Xizmatlari
                          </h5>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400">
                            Bepul smeta
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                          Sayt, ilova va botlar uchun 15 daqiqada hisob-kitob
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Hamkorlarimiz */}
            <button
              onClick={() => handleNavClick('partners')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                currentView === 'partners'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t('nav_partners')}
            </button>

            {/* 6. Portfolio / Keyslar (Conditional per CMS toggle) */}
            {data.portfolio?.showInNav && (
              <button
                onClick={() => handleNavClick('portfolio')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  currentView === 'portfolio'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {t('nav_portfolio')}
              </button>
            )}

            {/* 7. Aloqa */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                currentView === 'contact'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t('nav_contact')}
            </button>
          </nav>

          {/* Right Action Bar (Language Switcher, Admin shortcut, Consultation CTA) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-900/80 rounded-xl p-1 border border-slate-800 text-xs font-medium">
              <button
                onClick={() => setLanguage('uz')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  language === 'uz'
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                UZ
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  language === 'ru'
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                RU
              </button>
            </div>

            {/* Admin shortcut button */}
            <button
              onClick={() => {
                if (isAuthenticated) {
                  onViewChange('admin');
                } else {
                  onOpenAdminLogin();
                }
              }}
              title="Admin Panel (CMS)"
              className={`p-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'admin'
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 ring-1 ring-indigo-500/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden xl:inline">
                {isAuthenticated ? (currentUser?.role === 'admin' ? 'Admin' : 'Editor') : 'Admin'}
              </span>
            </button>

            {/* Free Consultation CTA */}
            <button
              onClick={onOpenConsultation}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-xs tracking-wide shadow-md shadow-indigo-600/25 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('nav_cta')}</span>
            </button>
          </div>

          {/* Mobile Menu Button & Language Switcher */}
          <div className="flex md:hidden items-center gap-2">
            <div className="flex items-center bg-slate-900/80 rounded-lg p-0.5 border border-slate-800 text-xs">
              <button
                onClick={() => setLanguage('uz')}
                className={`px-2 py-1 rounded text-[11px] ${
                  language === 'uz' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                UZ
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2 py-1 rounded text-[11px] ${
                  language === 'ru' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                RU
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with Accordion Sub-Menus */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 backdrop-blur-2xl animate-fadeIn max-h-[85vh] overflow-y-auto">
          {/* 1. Home */}
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              currentView === 'home'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            {t('nav_home')}
          </button>

          {/* 2. Biz haqimizda Accordion */}
          <div className="rounded-xl border border-slate-800/60 overflow-hidden bg-slate-900/40">
            <div className="flex items-center justify-between px-4 py-2.5">
              <button
                onClick={() => handleNavClick('about')}
                className={`text-sm font-medium text-left ${
                  currentView === 'about' ? 'text-indigo-400 font-bold' : 'text-slate-300'
                }`}
              >
                {t('nav_about')}
              </button>
              <button
                onClick={() => toggleMobileAccordion('about')}
                className="p-1 text-slate-400 hover:text-white"
                aria-label="Toggle About submenu"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileAccordions.about ? 'rotate-180 text-indigo-400' : ''
                  }`}
                />
              </button>
            </div>
            {mobileAccordions.about && (
              <div className="px-4 pb-3 pt-1 space-y-1.5 border-t border-slate-800/60 bg-slate-950/60">
                <button
                  onClick={() => handleNavClick('about')}
                  className="w-full text-left py-1.5 px-3 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/80"
                >
                  • Agentlik tavsifi
                </button>
                <button
                  onClick={() => handleNavClick('about')}
                  className="w-full text-left py-1.5 px-3 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/80"
                >
                  • Missiya va qadriyatlar
                </button>
                <button
                  onClick={() => handleNavClick('partners')}
                  className="w-full text-left py-1.5 px-3 rounded-lg text-xs text-cyan-400 hover:text-cyan-300 hover:bg-slate-800/80"
                >
                  • Hamkorlarimiz ro'yxati
                </button>
              </div>
            )}
          </div>

          {/* 3. Xizmatlar Accordion */}
          <div className="rounded-xl border border-slate-800/60 overflow-hidden bg-slate-900/40">
            <div className="flex items-center justify-between px-4 py-2.5">
              <button
                onClick={() => handleNavClick('services', 'all')}
                className={`text-sm font-medium text-left ${
                  currentView === 'services' ? 'text-indigo-400 font-bold' : 'text-slate-300'
                }`}
              >
                {t('nav_services')}
              </button>
              <button
                onClick={() => toggleMobileAccordion('services')}
                className="p-1 text-slate-400 hover:text-white"
                aria-label="Toggle Services submenu"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileAccordions.services ? 'rotate-180 text-indigo-400' : ''
                  }`}
                />
              </button>
            </div>
            {mobileAccordions.services && (
              <div className="px-4 pb-3 pt-1 space-y-1.5 border-t border-slate-800/60 bg-slate-950/60">
                <button
                  onClick={() => handleNavClick('services', 'smm')}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs text-pink-300 hover:bg-slate-800/80 flex items-center justify-between"
                >
                  <span>SMM Xizmatlari</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-pink-500/10 text-pink-400">6 ta</span>
                </button>
                <button
                  onClick={() => handleNavClick('services', 'marketing')}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs text-indigo-300 hover:bg-slate-800/80 flex items-center justify-between"
                >
                  <span>Keng qamrovli Marketing</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400">7 ta</span>
                </button>
                <button
                  onClick={() => handleNavClick('services', 'it')}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs text-cyan-300 hover:bg-slate-800/80 flex items-center justify-between"
                >
                  <span>IT Yechimlari & Dasturlash</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400">6 ta</span>
                </button>
                <button
                  onClick={() => handleNavClick('services', 'all')}
                  className="w-full text-left py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
                >
                  &rarr; Barcha 19 ta xizmatni ko'rish
                </button>
              </div>
            )}
          </div>

          {/* 4. Tariflar Accordion */}
          <div className="rounded-xl border border-slate-800/60 overflow-hidden bg-slate-900/40">
            <div className="flex items-center justify-between px-4 py-2.5">
              <button
                onClick={() => handleNavClick('tariffs')}
                className={`text-sm font-medium text-left ${
                  currentView === 'tariffs' ? 'text-indigo-400 font-bold' : 'text-slate-300'
                }`}
              >
                {t('nav_tariffs')}
              </button>
              <button
                onClick={() => toggleMobileAccordion('tariffs')}
                className="p-1 text-slate-400 hover:text-white"
                aria-label="Toggle Tariffs submenu"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileAccordions.tariffs ? 'rotate-180 text-indigo-400' : ''
                  }`}
                />
              </button>
            </div>
            {mobileAccordions.tariffs && (
              <div className="px-4 pb-3 pt-1 space-y-1.5 border-t border-slate-800/60 bg-slate-950/60">
                <button
                  onClick={() => handleNavClick('tariffs')}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs text-pink-300 hover:bg-slate-800/80"
                >
                  • SMM Paketlari ($1000 - $1500 / oy)
                </button>
                <button
                  onClick={() => handleNavClick('tariffs')}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs text-indigo-300 hover:bg-slate-800/80"
                >
                  • Keng qamrovli Marketing ($2000 dan)
                </button>
                <button
                  onClick={() => handleNavClick('tariffs')}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs text-cyan-300 hover:bg-slate-800/80"
                >
                  • IT xizmatlari bepul smeta hisoblagich
                </button>
              </div>
            )}
          </div>

          {/* 5. Hamkorlarimiz */}
          <button
            onClick={() => handleNavClick('partners')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              currentView === 'partners'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            {t('nav_partners')}
          </button>

          {/* 6. Portfolio */}
          {data.portfolio?.showInNav && (
            <button
              onClick={() => handleNavClick('portfolio')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentView === 'portfolio'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {t('nav_portfolio')}
            </button>
          )}

          {/* 7. Aloqa */}
          <button
            onClick={() => handleNavClick('contact')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              currentView === 'contact'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            {t('nav_contact')}
          </button>

          {/* Mobile Admin & CTA Buttons */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                if (isAuthenticated) {
                  onViewChange('admin');
                } else {
                  onOpenAdminLogin();
                }
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-medium bg-slate-900 text-indigo-300 border border-indigo-500/30 flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-indigo-400" />
              <span>Admin Panel {isAuthenticated ? `(${currentUser?.role})` : ''}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 text-center shadow-lg shadow-indigo-600/30"
            >
              {t('hero_consult_btn')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
