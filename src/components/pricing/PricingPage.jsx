import React, { useState } from 'react';
import {
  Check, Zap, ArrowRight, Sparkles, Calculator, CheckCircle2, Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';

export const PricingPage = ({ onOpenConsultation }) => {
  const { language, t } = useLanguage();
  const { data, addLead } = useCMS();
  const smmTariffs = data.tariffs?.smm || [];
  const marketingTariff = data.tariffs?.marketing || {};
  const itTariff = data.tariffs?.it || {};

  // IT Calculator state
  const [selectedItType, setSelectedItType] = useState('Landing Page / Promo sayt');
  const [itName, setItName] = useState('');
  const [itPhone, setItPhone] = useState('+998 ');
  const [itNotes, setItNotes] = useState('');
  const [itSuccess, setItSuccess] = useState(false);
  const [itSubmitting, setItSubmitting] = useState(false);

  const handleItSubmit = async (e) => {
    e.preventDefault();
    if (!itName.trim() || itPhone.replace(/\D/g, '').length < 9) {
      alert(language === 'ru' ? "Пожалуйста, введите имя и корректный номер телефона." : "Iltimos, ismingiz va to'g'ri telefon raqamingizni kiriting.");
      return;
    }

    setItSubmitting(true);
    try {
      await addLead({
        name: itName,
        phone: itPhone,
        service: `IT Smeta: ${selectedItType}`,
        comment: itNotes || (language === 'ru' ? "Запрос сметы на IT-услуги" : "Foydalanuvchi IT xizmatlari bo'limidan bepul smeta hisob-kitobini so'radi."),
        source: 'IT Smeta kalkulyatori'
      });

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}

      setItSuccess(true);
      setItName('');
      setItPhone('+998 ');
      setItNotes('');
    } catch (err) {
      console.error(err);
    } finally {
      setItSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 space-y-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Zap className="w-3.5 h-3.5" />
          {t('pricing_badge')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {t('pricing_title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          {t('pricing_subtitle')}
        </p>
      </section>

      {/* 8.1 SMM Tariffs (Strict TZ Match) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-800 pb-5 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-pink-500" />
              <h2 className="text-2xl font-bold text-white">
                {t('pricing_smm_title')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              {t('pricing_smm_subtitle')}
            </p>
          </div>
        </div>

        {/* SMM 4 Cards - Pure TZ without fabricated discounts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {smmTariffs.map((plan) => {
            const duration =
              plan[`duration${language.charAt(0).toUpperCase() + language.slice(1)}`] ||
              plan.durationUz;
            const period =
              plan[`period${language.charAt(0).toUpperCase() + language.slice(1)}`] ||
              plan.periodUz;
            const features =
              plan[`features${language.charAt(0).toUpperCase() + language.slice(1)}`] ||
              plan.featuresUz ||
              [];

            return (
              <div
                key={plan.id}
                className="relative rounded-3xl p-6 sm:p-7 bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <h3 className="font-extrabold text-xl text-white mb-4">
                    {duration}
                  </h3>

                  <div className="flex items-baseline gap-1.5 mb-8">
                    <span className="text-4xl font-extrabold text-white tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-sm text-slate-400 font-medium">{period}</span>
                  </div>

                  {/* Included features */}
                  <ul className="space-y-3 mb-8">
                    {features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onOpenConsultation(`SMM: ${duration}`)}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-slate-800 hover:bg-pink-600 text-slate-200 hover:text-white border border-slate-700 hover:border-pink-500 transition-all cursor-pointer"
                >
                  {t('pricing_btn_order')}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8.2 Marketing Xizmati (Strict TZ Match) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-800 pb-5 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-indigo-500" />
              <h2 className="text-2xl font-bold text-white">
                {t('pricing_mkt_title')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              {language === 'ru'
                ? 'Начальная цена — от $2000 (рассчитывается индивидуально в зависимости от масштаба проекта).'
                : "Boshlang'ich narx — $2000 dan (loyiha hajmiga qarab individual hisoblanadi)."}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900/90 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h3 className="text-3xl font-extrabold text-white">
                {language === 'ru' ? 'Начальная цена — от $2000' : "Boshlang'ich narx — $2000 dan"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {language === 'ru'
                  ? '(рассчитывается индивидуально в зависимости от масштаба проекта).'
                  : '(loyiha hajmiga qarab individual hisoblanadi).'}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {language === 'ru'
                ? 'Комплексный маркетинг охватывает все 7 направлений, от SMM и таргетированной рекламы до брендинга, сквозной аналитики и аудита отдела продаж.'
                : "Marketing xizmati SMM, target reklama, brending, strategik konsalting, blogerlar bilan ishlash hamda sotuv jarayonlarini to'liq tizimli nazoratga olishni o'z ichiga oladi."}
            </p>

            <button
              onClick={() => onOpenConsultation('Marketing')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              {t('pricing_mkt_btn')}
            </button>
          </div>

          <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-3.5">
            <h4 className="text-sm font-bold text-white mb-2">
              {language === 'ru' ? 'В комплекс маркетинга входит:' : 'Tarif tarkibiga nimalar kiradi:'}
            </h4>
            {((language === 'ru' ? marketingTariff.includedRu : marketingTariff.includedUz) || [
              "SMM xizmatlaridagi barcha takliflar",
              "Target reklama (Google & Telegram Ads)",
              "Branding & Brandbook",
              "Marketing strategiya va konsalting",
              "Influencer marketing",
              "Sotuv bo'limi nazorati",
              "To'liq sotuvni nazoratga olish"
            ]).map((inc, iIdx) => (
              <div key={iIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{inc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8.3 IT Xizmatlari & Bepul Smeta Hisoblagich (Strict TZ Match) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-800 pb-5 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-cyan-500" />
              <h2 className="text-2xl font-bold text-white">
                {t('pricing_it_title')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              {t('pricing_it_subtitle')}
            </p>
          </div>
        </div>

        {/* 2-Column layout: IT categories list & Interactive Estimator Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Direction Cards */}
          <div className="lg:col-span-6 space-y-4">
            {(itTariff.categories || []).map((cat, cIdx) => {
              const name = cat[`name${language.charAt(0).toUpperCase() + language.slice(1)}`] || cat.nameUz;
              const estimate = cat[`estimate${language.charAt(0).toUpperCase() + language.slice(1)}`] || cat.estimateUz;
              const tag = cat[`tag${language.charAt(0).toUpperCase() + language.slice(1)}`] || cat.tagUz;

              return (
                <div
                  key={cIdx}
                  onClick={() => setSelectedItType(name)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedItType === name
                      ? 'bg-slate-900 border-cyan-500/80 ring-1 ring-cyan-500/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850/60'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      {tag}
                    </span>
                    <h4 className="text-sm font-bold text-white pt-1">
                      {name}
                    </h4>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-semibold text-slate-400 block">
                      {language === 'ru' ? 'Ориентировочный срок' : 'Taxminiy muddat'}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-200">
                      {estimate}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Embedded Smeta Form (Without Anti-spam Captcha) */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {t('pricing_it_calc_title')}
                </h3>
                <p className="text-xs text-slate-400">
                  {t('pricing_it_calc_desc')}
                </p>
              </div>
            </div>

            {itSuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-base">
                  {language === 'ru' ? 'Заявка на смету принята!' : "Smeta so'rovingiz qabul qilindi!"}
                </h4>
                <p className="text-xs text-slate-300">
                  {language === 'ru'
                    ? 'Наш IT-специалист свяжется с вами в течение 15 минут с детальным предложением.'
                    : "IT mutaxassisimiz 15 daqiqa ichida siz bilan bog'lanib, tanlangan loyiha bo'yicha batafsil tijorat taklifini yuboradi."}
                </p>
                <button
                  type="button"
                  onClick={() => setItSuccess(false)}
                  className="text-xs text-cyan-400 hover:underline pt-2 cursor-pointer"
                >
                  {language === 'ru' ? 'Рассчитать другой проект' : "Yana boshqa loyiha hisoblatish"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleItSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {language === 'ru' ? 'Выбранный тип проекта:' : 'Tanlangan loyiha turi:'}
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={selectedItType}
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-cyan-300 font-semibold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {t('form_name')} <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('form_name_placeholder')}
                      value={itName}
                      onChange={(e) => setItName(e.target.value)}
                      className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {t('form_phone')} <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+998 90 123 45 67"
                      value={itPhone}
                      onChange={(e) => setItPhone(e.target.value)}
                      className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t('form_comment')} ({language === 'ru' ? 'необязательно' : 'ixtiyoriy'}):
                  </label>
                  <textarea
                    rows="2"
                    placeholder={t('form_comment_placeholder')}
                    value={itNotes}
                    onChange={(e) => setItNotes(e.target.value)}
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={itSubmitting}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-300 hover:from-cyan-300 hover:to-indigo-200 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {itSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>{t('form_submitting')}</span>
                    </>
                  ) : (
                    <span>{t('pricing_it_btn')}</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
