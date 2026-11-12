import React from 'react';
import { Phone, Send, ShieldCheck, MapPin } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { ProxLogo } from './ProxLogo';
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
            <div>
              <ProxLogo className="h-11 w-auto" />
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              {t('footer_tagline')}
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">{t('footer_lang_label')}</span>
              <div className="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-xs">
                <button
                  onClick={() => setLanguage('uz')}
                  className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${
                    language === 'uz' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  UZ
                </button>
                <button
                  onClick={() => setLanguage('ru')}
                  className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${
                    language === 'ru' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
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
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav_home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onViewChange('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav_about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onViewChange('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav_services')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onViewChange('tariffs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav_tariffs')}
                </button>
              </li>
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
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t('services_tab_smm')} {t('footer_smm_count')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onViewChange('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t('services_tab_mkt')} {t('footer_mkt_count')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onViewChange('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t('services_tab_it')} {t('footer_it_count')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onViewChange('tariffs')}
                  className="hover:text-white transition-colors text-left text-indigo-400 font-semibold cursor-pointer"
                >
                  {t('footer_tariffs_link')}
                </button>
              </li>
            </ul>
          </div>

          {/* Official Contacts: Pure Solid White Icons AND Text */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footer_contacts')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={`tel:${data.contact?.phoneClean || '+998200260418'}`}
                  className="flex items-center gap-2.5 text-white hover:text-slate-300 transition-colors group"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span className="font-bold text-white tracking-wide">{data.contact?.phone || '+998 20 026 04 18'}</span>
                </a>
              </li>
              <li>
                <a
                  href={data.contact?.telegramUrl || 'https://t.me/manager_prox'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-white hover:text-slate-300 transition-colors group"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span className="font-bold text-white">{data.contact?.telegram || '@manager_prox'}</span>
                </a>
              </li>
              <li>
                <a
                  href={data.contact?.instagramUrl || 'https://instagram.com/prox_uz'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-white hover:text-slate-300 transition-colors group"
                >
                  <InstagramIcon className="w-4 h-4 text-white" />
                  <span className="font-bold text-white">{data.contact?.instagram || '@prox_uz'}</span>
                </a>
              </li>
              {data.contact?.address && (
                <li className="flex items-start gap-2.5 text-white">
                  <MapPin className="w-4 h-4 text-white mt-0.5 shrink-0" />
                  <span className="text-white">{data.contact.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar with subtle secret double-click admin trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p
            onDoubleClick={() => onOpenAdminLogin && onOpenAdminLogin()}
            className="cursor-default select-none"
          >
            © {new Date().getFullYear()} Prox Marketing Agency. {t('footer_rights')}
          </p>
          <div className="flex items-center gap-4">
            <span
              onDoubleClick={() => onOpenAdminLogin && onOpenAdminLogin()}
              className="text-slate-400 font-mono text-[11px] cursor-default select-none"
            >
              {t('footer_planned_domain')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
