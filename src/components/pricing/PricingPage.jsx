import React, { useState } from 'react';
import {
  Check, Zap, ArrowRight, Sparkles, HelpCircle, ShieldCheck,
  Calculator, Send, FileText, CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';

export const PricingPage = ({ onOpenConsultation }) => {
  const { language, t } = useLanguage();
  const { data, addLead } = useCMS();
  const smmTariffs = data.tariffs.smm || [];
  const marketingTariff = data.tariffs.marketing || {};
  const itTariff = data.tariffs.it || {};

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
      alert("Iltimos, ismingiz va to'g'ri telefon raqamingizni kiriting.");
      return;
    }

    setItSubmitting(true);
    try {
      await addLead({
        name: itName,
        phone: itPhone,
        service: `IT Smeta: ${selectedItType}`,
        comment: itNotes || 'Foydalanuvchi IT xizmatlari bo\'limidan bepul smeta hisob-kitobini so\'radi.'
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

      {/* 8.1 SMM Tariffs (Cards & Table) */}
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
          <span className="text-xs font-semibold text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20 self-start sm:self-auto">
            4 ta shaffof paket
          </span>
        </div>

        {/* SMM 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {smmTariffs.map((plan) => {
            const duration =
              plan[`duration${language.charAt(0).toUpperCase() + language.slice(1)}`] ||
              plan.durationUz;
            const savings =
              plan[`savings${language.charAt(0).toUpperCase() + language.slice(1)}`] ||
              plan.savingsUz;
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
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-gradient-to-b from-indigo-950/80 to-slate-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 -translate-y-2'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-850/60'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold text-[11px] px-3.5 py-0.5 rounded-full uppercase tracking-wider shadow-lg">
                    {t('pricing_popular_badge')}
                  </div>
                )}

                <div>
                  <h3 className="font-extrabold text-xl text-white mb-1">
                    {duration}
                  </h3>
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 font-semibold text-xs mb-6 border border-indigo-500/20">
                    {savings}
                  </div>

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
                  onClick={() => onOpenConsultation(`SMM: ${duration} (${plan.price})`)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    plan.isPopular
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {t('pricing_btn_order')}
                </button>
              </div>
            );
          })}
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 overflow-x-auto">
          <h3 className="text-lg font-bold text-white mb-4">
            Tariflarning taqqoslash jadvali
          </h3>
          <table className="w-full text-left text-xs min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4">Paket parametrlari</th>
                <th className="py-3 px-4">1 oylik</th>
                <th className="py-3 px-4">3 oylik paket</th>
                <th className="py-3 px-4 text-indigo-400 font-bold">6 oylik paket</th>
                <th className="py-3 px-4 text-emerald-400 font-bold">12 oylik paket</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">Oylik to'lov</td>
                <td className="py-3.5 px-4 font-bold">$1500</td>
                <td className="py-3.5 px-4 font-bold">$1350</td>
                <td className="py-3.5 px-4 font-bold text-indigo-300">$1200</td>
                <td className="py-3.5 px-4 font-bold text-emerald-300">$1000</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4">Mijoz tejovi</td>
                <td className="py-3.5 px-4 text-slate-500">—</td>
                <td className="py-3.5 px-4 text-indigo-400 font-semibold">$450 tejash</td>
                <td className="py-3.5 px-4 text-indigo-400 font-semibold">$1800 tejash</td>
                <td className="py-3.5 px-4 text-emerald-400 font-semibold">$6000 eng katta tejov</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4">SMM strategiya va yo'l xaritasi</td>
                <td className="py-3.5 px-4 text-emerald-400">✓ Standart</td>
                <td className="py-3.5 px-4 text-emerald-400">✓ Kengaytirilgan</td>
                <td className="py-3.5 px-4 text-emerald-400">✓ Chuqurlashtirilgan</td>
                <td className="py-3.5 px-4 text-emerald-400">✓ Yillik to'liq strategiya</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4">Instagram & FB target reklama</td>
                <td className="py-3.5 px-4 text-emerald-400">✓ Oylik</td>
                <td className="py-3.5 px-4 text-emerald-400">✓ A/B testlar</td>
                <td className="py-3.5 px-4 text-emerald-400">✓ A/B + Retargeting</td>
                <td className="py-3.5 px-4 text-emerald-400">✓ Maksimal scaling</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4">Telegram bot integratsiyasi</td>
                <td className="py-3.5 px-4 text-slate-600">—</td>
                <td className="py-3.5 px-4 text-slate-600">—</td>
                <td className="py-3.5 px-4 text-slate-400">Qo'shimcha kelishuv</td>
                <td className="py-3.5 px-4 text-emerald-400 font-semibold">✓ Paketga kiritilgan</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8.2 Marketing Tariffs */}
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
              {t('pricing_mkt_subtitle')}
            </p>
          </div>
          <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 self-start sm:self-auto">
            To'liq autsorsing
          </span>
        </div>

        <div className="bg-gradient-to-br from-slate-900/90 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kompleks marketing boshqaruvi</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-extrabold text-white">
                {marketingTariff.prefixUz || "Boshlang'ich narx —"} {marketingTariff.startingPrice || "$2000"} dan
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {marketingTariff.noteUz || "Loyiha hajmiga qarab individual hisoblanadi"}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Biznesingiz uchun alohida marketing bo'limi tuzish va shtat saqlashdan 3 barobar arzon va 5 barobar samaraliroq yechim. Barcha yo'nalishlar bitta professional jamoa qo'lida.
            </p>

            <button
              onClick={() => onOpenConsultation(`Marketing Kompleks ($2000 dan)`)}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Marketing taklifini buyurtma qilish
            </button>
          </div>

          <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-3.5">
            <h4 className="text-sm font-bold text-white mb-2">
              Tarif tarkibiga nimalar kiradi:
            </h4>
            {(marketingTariff.includedUz || []).map((inc, iIdx) => (
              <div key={iIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{inc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8.3 IT Xizmatlari & Bepul Smeta Hisoblagich */}
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
              {itTariff.noteUz || "Har bir loyiha individual buyurtma asosida kelishiladi"}
            </p>
          </div>
          <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 self-start sm:self-auto">
            Individual baholash
          </span>
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
                      Taxminiy muddat
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-200">
                      {estimate}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Embedded Smeta Form */}
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
                  Smeta so'rovingiz qabul qilindi!
                </h4>
                <p className="text-xs text-slate-300">
                  IT mutaxassisimiz 15 daqiqa ichida siz bilan bog'lanib, tanlangan loyiha bo'yicha batafsil tijorat taklifini yuboradi.
                </p>
                <button
                  type="button"
                  onClick={() => setItSuccess(false)}
                  className="text-xs text-cyan-400 hover:underline pt-2"
                >
                  Yana boshqa loyiha hisoblatish
                </button>
              </div>
            ) : (
              <form onSubmit={handleItSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Tanlangan loyiha turi:
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
                      Ismingiz <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Masalan: Sardor"
                      value={itName}
                      onChange={(e) => setItName(e.target.value)}
                      className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Telefon raqamingiz <span className="text-rose-400">*</span>
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
                    Loyiha talablari yoki izoh (ixtiyoriy):
                  </label>
                  <textarea
                    rows="2"
                    placeholder="Qanday funksiyalar kerak, o'xshash misol saytlar..."
                    value={itNotes}
                    onChange={(e) => setItNotes(e.target.value)}
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={itSubmitting}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-300 hover:from-cyan-300 hover:to-indigo-200 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 disabled:opacity-50 cursor-pointer"
                >
                  {itSubmitting ? 'Yuborilmoqda...' : t('pricing_it_btn')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
