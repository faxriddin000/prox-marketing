import React, { useState } from 'react';
import { Send, Phone, User, Briefcase, MessageSquare, CheckCircle2, Sparkles, Loader2, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';
import { TelegramIcon } from '../common/Icons';

export const CtaSection = () => {
  const { language, t } = useLanguage();
  const { addLead, data } = useCMS();

  const [formData, setFormData] = useState({
    name: '',
    phone: '+998 ',
    service: 'Marketing',
    comment: ''
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validatePhone = (phone) => {
    const clean = phone.replace(/\D/g, '');
    return clean.length >= 9 && clean.length <= 13;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('form_error_required');
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = t('form_error_phone');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const currentPayload = { ...formData, source: 'Bosh sahifa CTA bo\'limi' };
      await addLead(currentPayload);
      setSubmittedData(currentPayload);

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {}

      setIsSuccess(true);
      setFormData({
        name: '',
        phone: '+998 ',
        service: 'Marketing',
        comment: ''
      });
    } catch (err) {
      console.error(err);
      alert(language === 'ru' ? 'Ошибка отправки в Telegram.' : 'Telegramga yuborishda xatolik yuz berdi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form-section" className="py-24 relative overflow-hidden bg-slate-950">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              {t('contact_badge')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t('contact_form_title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {t('contact_form_desc')}
            </p>
          </div>

          {isSuccess ? (
            <div className="text-center py-6 space-y-4 animate-fadeIn">
              {/* Animated checkmark */}
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
                <div className="relative w-16 h-16 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
              </div>

              {/* Telegram confirmation badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <TelegramIcon className="w-3.5 h-3.5 fill-sky-400" />
                <span>{t('form_telegram_status')}</span>
              </div>

              <h3 className="text-2xl font-bold text-white">
                {t('form_success_title')}
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                {t('form_success_desc')}
              </p>

              {/* Submitted summary */}
              {submittedData && (
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-left text-xs space-y-1.5 max-w-md mx-auto">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 pb-1 border-b border-slate-800">
                    {language === 'ru' ? 'Сводка заявки:' : 'Ariza xulosasi:'}
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-400">{t('form_summary_name')}:</span>
                    <span className="font-semibold text-white">{submittedData.name}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-400">{t('form_summary_phone')}:</span>
                    <span className="font-mono font-semibold text-white">{submittedData.phone}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-400">{t('form_summary_service')}:</span>
                    <span className="font-semibold text-indigo-400">{submittedData.service}</span>
                  </div>
                </div>
              )}

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <a
                  href={data.contact?.telegramUrl || "https://t.me/manager_prox"}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs tracking-wide shadow-md shadow-sky-500/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <TelegramIcon className="w-4 h-4 fill-white" />
                  <span>{t('form_tg_direct')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all cursor-pointer"
                >
                  {language === 'ru' ? 'Отправить еще одну заявку' : 'Yana ariza qoldirish'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Field 1: Ism */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-400" />
                    {t('form_name')} <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('form_name_placeholder')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                  {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                </div>

                {/* Field 2: Telefon */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-indigo-400" />
                    {t('form_phone')} <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                  {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Field 3: Xizmat yoki Kurs tanlash */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                  {t('form_service')} <span className="text-rose-400">*</span>
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
                >
                  <option value="SMM">{t('form_service_smm')}</option>
                  <option value="Marketing">{t('form_service_marketing')}</option>
                  <option value="IT">{t('form_service_it')}</option>
                </select>
              </div>

              {/* Field 4: Izoh */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                  {t('form_comment')}
                </label>
                <textarea
                  rows="3"
                  placeholder={t('form_comment_placeholder')}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* Submit with Loading State */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-4 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 active:scale-[0.99] transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>{t('form_submitting')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('form_submit')}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
