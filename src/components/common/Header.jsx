import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';
import { ProxLogo } from './ProxLogo';

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (viewId, category = null) => {
    if (category && onSelectCategory) {
      onSelectCategory(category);
    }
    onViewChange(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: t('nav_home') },
    { id: 'about', label: t('nav_about') },
    { id: 'services', label: t('nav_services') },
    { id: 'tariffs', label: t('nav_tariffs') },
    { id: 'partners', label: t('nav_partners') },
    ...(data.portfolio?.showInNav ? [{ id: 'portfolio', label: t('nav_portfolio') }] : []),
    { id: 'contact', label: t('nav_contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer group select-none shrink-0"
            title="Prox Marketing Agency"
          >
            <ProxLogo className="h-10 sm:h-11 w-auto transition-transform group-hover:scale-[1.02]" />
          </div>

          {/* Desktop Navigation - Clean Click-Only Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/70 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md shadow-inner">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer relative ${
                  currentView === item.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Bar */}
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 backdrop-blur-2xl animate-fadeIn max-h-[85vh] overflow-y-auto">
          {/* Mobile Drawer Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="pb-3 mb-2 border-b border-slate-800/80 cursor-pointer flex items-center justify-between"
          >
            <ProxLogo className="h-9 w-auto" />
            <span className="text-[10px] text-indigo-400 font-mono">v1.0</span>
          </div>

          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentView === item.id
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Mobile CTA Button */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
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
