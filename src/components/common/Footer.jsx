import React from 'react';
import { Phone, Send, ArrowUpRight, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';

export const Footer = ({ onViewChange, onOpenAdminLogin }) => {
  const { language, setLanguage, t } = useLanguage();
  const { data } = useCMS();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 to-cyan-300 text-sm">
                  PX
                </div>
              </div>
              <div>
                <span className="font-extrabold text-white text-lg tracking-tight">
                  PROX MARKETING
                </span>
                <span className="block text-[11px] text-indigo-400 font-mono">
                  proxmarketing.uz
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              {t('footer_tagline')}
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="text-xs text-slate-500">Til / Язык:</span>
              <div className="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-xs">
                <button
                  onClick={() => setLanguage('uz')}
                  className={`px-2 py-0.5 rounded text-[11px] ${
                    language === 'uz' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  UZ
                </button>
                <button
                  onClick={() => setLanguage('ru')}
                  className={`px-2 py-0.5 rounded text-[11px] ${
                    language === 'ru' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  RU
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footer_quick_links')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onViewChange('home')}
                  className="hover:text-white transition-colors"
                >
                  {t('nav_home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onViewChange('about')}
                  className="hover:text-white transition-colors"
                >
                  {t('nav_about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onViewChange('services')}
                  className="hover:text-white transition-colors"
                >
                  {t('nav_services')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onViewChange('tariffs')}
                  className="hover:text-white transition-colors"
                >
                  {t('nav_tariffs')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onViewChange('partners')}
                  className="hover:text-white transition-colors"
                >
                  {t('nav_partners')}
                </button>
              </li>
              {data.portfolio?.showInNav && (
                <li>
                  <button
                    onClick={() => onViewChange('portfolio')}
                    className="hover:text-white transition-colors"
                  >
                    {t('nav_portfolio')}
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Services Offered */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footer_services')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onViewChange('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  {t('services_tab_smm')} (6 ta xizmat)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onViewChange('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  {t('services_tab_mkt')} (7 ta yo'nalish)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onViewChange('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  {t('services_tab_it')} (6 ta yo'nalish)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onViewChange('tariffs')}
                  className="hover:text-white transition-colors text-left text-indigo-400 font-medium"
                >
                  Barcha paketlar va tariflar &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Official Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footer_contacts')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={`tel:${data.contact.phoneClean || '+998200260418'}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-indigo-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-indigo-400" />
                  <span className="font-semibold">{data.contact.phone || '+998 20 026 04 18'}</span>
                </a>
              </li>
              <li>
                <a
                  href={data.contact.telegramUrl || 'https://t.me/manager_prox'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-sky-400 transition-colors"
                >
                  <Send className="w-4 h-4 text-sky-400" />
                  <span>{data.contact.telegram || '@manager_prox'}</span>
                </a>
              </li>
              <li>
                <a
                  href={data.contact.instagramUrl || 'https://instagram.com/prox_uz'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-pink-400 transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-400" />
                  <span>{data.contact.instagram || '@prox_uz'}</span>
                </a>
              </li>
              {data.contact.address && (
                <li className="flex items-start gap-2 text-slate-400">
                  <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>{data.contact.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Prox Marketing Agency. {t('footer_rights')}</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-500 font-mono text-[11px]">
              {t('footer_planned_domain')}
            </span>
            <span className="text-slate-700">|</span>
            <button
              onClick={onOpenAdminLogin}
              className="text-slate-500 hover:text-indigo-400 transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Kirish</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
