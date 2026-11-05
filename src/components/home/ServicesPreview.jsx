import React from 'react';
import { ArrowRight, Share2, TrendingUp, Code2, Check, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';

export const ServicesPreview = ({ onViewChange, onSelectCategory }) => {
  const { language, t } = useLanguage();
  const { data } = useCMS();

  const previewCards = [
    {
      id: 'smm',
      title: 'SMM Xizmatlari',
      badge: '6 ta xizmat',
      icon: Share2,
      color: 'from-pink-500/20 to-rose-500/10 text-pink-400 border-pink-500/30',
      btnColor: 'hover:border-pink-500/50 hover:text-pink-300',
      desc: language === 'ru'
        ? 'Комплексное ведение социальных сетей, вирусный контент, точный таргет и формирование устойчивого имиджа бренда.'
        : 'Ijtimoiy tarmoqlarda professional strategiya, sifatli video/storislar, target reklama va brend obro\'sini mustahkamlash.',
      features: language === 'ru'
        ? ['Разработка стратегии', 'Контент и моушн-дизайн', 'Таргетинг в Instagram & Facebook']
        : ['Strategiya ishlab chiqish', 'Kontent va kreativ dizayn', 'Instagram & FB target reklama']
    },
    {
      id: 'marketing',
      title: 'Keng qamrovli Marketing',
      badge: '7 ta yo\'nalish',
      icon: TrendingUp,
      color: 'from-indigo-500/20 to-purple-500/10 text-indigo-400 border-indigo-500/30',
      btnColor: 'hover:border-indigo-500/50 hover:text-indigo-300',
      desc: language === 'ru'
        ? 'Полный маркетинговый аутсорсинг: брендинг, работа с блогерами, реклама в Google/Telegram и аудит отдела продаж.'
        : 'To\'liq marketing autsorsingi: brending, blogerlar bilan ishlash, Google & Telegram Ads hamda sotuv bo\'limi nazorati.',
      features: language === 'ru'
        ? ['Все предложения SMM', 'Google Ads & Telegram Ads', 'Контроль отдела продаж']
        : ['SMM dagi barcha takliflar', 'Google Ads & Telegram Ads', 'Sotuv bo\'limi nazorati']
    },
    {
      id: 'it',
      title: 'IT Yechimlari & Dasturlash',
      badge: '6 ta yo\'nalish',
      icon: Code2,
      color: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
      btnColor: 'hover:border-cyan-500/50 hover:text-cyan-300',
      desc: language === 'ru'
        ? 'Разработка современных веб-сайтов, мобильных приложений, интеграция платежных систем и создание умных AI ботов.'
        : 'Landing page, korporativ saytlar, mobil ilovalar, zamonaviy to\'lov tizimlari va sun\'iy intellekt botlari yaratish.',
      features: language === 'ru'
        ? ['Веб-сайты и мобильные приложения', 'Payme/Click интеграции', 'Telegram и AI чат-боты']
        : ['Veb-sayt va mobil ilovalar', 'To\'lov tizimlari integratsiyasi', 'Sun\'iy intellekt va botlar']
    }
  ];

  const handleDetailsClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    onViewChange('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-slate-950/50 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            {t('services_badge')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('services_title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {t('services_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="group relative rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
              >
                <div>
                  {/* Top line with Icon and Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} border flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {card.desc}
                  </p>

                  {/* Highlights list */}
                  <ul className="space-y-2.5 mb-8">
                    {card.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleDetailsClick(card.id)}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-850 border border-slate-700/80 flex items-center justify-center gap-2 transition-all cursor-pointer ${card.btnColor}`}
                >
                  <span>{t('services_btn_details')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
