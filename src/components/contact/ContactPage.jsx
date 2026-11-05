import React, { useState } from 'react';
import {
  Phone, Send, MapPin, Mail, CheckCircle2,
  User, Briefcase, MessageSquare, ExternalLink, ShieldCheck
} from 'lucide-react';
import { InstagramIcon } from '../common/Icons';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';
import { Captcha } from '../common/Captcha';

export const ContactPage = () => {
  const { language, t } = useLanguage();
  const { data, addLead } = useCMS();
  const contact = data.contact || {};

  const [formData, setFormData] = useState({
    name: '',
    phone: '+998 ',
    service: 'Marketing',
    comment: ''
  });

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaResetTrigger, setCaptchaResetTrigger] = useState(0);
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

    if (!isCaptchaVerified) {
      newErrors.captcha = t('form_error_captcha');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await addLead(formData);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      setIsSuccess(true);
      setFormData({
        name: '',
        phone: '+998 ',
        service: 'Marketing',
        comment: ''
      });
      setIsCaptchaVerified(false);
      setCaptchaResetTrigger((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 space-y-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Phone className="w-3.5 h-3.5" />
          {t('contact_badge')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {t('contact_title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          {t('contact_subtitle')}
        </p>
      </section>

      {/* Main Grid: Contact Channels & Lead Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Official Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">
              To'g'ridan-to'g'ri aloqa kanallari
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              O'zingizga qulay usulni tanlang, tezkor javob qaytaramiz.
            </p>

            {/* Phone */}
            <a
              href={`tel:${contact.phoneClean || '+998200260418'}`}
              className="group p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/50 flex items-center gap-4 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                  {t('contact_phone_label')}
                </span>
                <span className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {contact.phone || '+998 20 026 04 18'}
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-slate-300" />
            </a>

            {/* Telegram */}
            <a
              href={contact.telegramUrl || 'https://t.me/manager_prox'}
              target="_blank"
              rel="noreferrer"
              className="group p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-850 border border-slate-800 hover:border-sky-500/50 flex items-center gap-4 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Send className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                  {t('contact_telegram_label')}
                </span>
                <span className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                  {contact.telegram || '@manager_prox'}
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-slate-300" />
            </a>

            {/* Instagram */}
            <a
              href={contact.instagramUrl || 'https://instagram.com/prox_uz'}
              target="_blank"
              rel="noreferrer"
              className="group p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-850 border border-slate-800 hover:border-pink-500/50 flex items-center gap-4 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <InstagramIcon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                  {t('contact_instagram_label')}
                </span>
                <span className="text-base font-bold text-white group-hover:text-pink-300 transition-colors">
                  {contact.instagram || '@prox_uz'}
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-slate-300" />
            </a>

            {/* Conditional Office Address (Rendered as soon as set in Admin Panel) */}
            {contact.address && (
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center gap-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                    {t('contact_address_label')}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {contact.address}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Lead Capture Form */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {t('contact_form_title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {t('contact_form_desc')}
              </p>
            </div>

            {isSuccess ? (
              <div className="text-center py-8 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-500/5">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-2xl font-bold text-white">
                  {t('form_success_title')}
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  {t('form_success_desc')}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                  >
                    Yangi ariza yuborish
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
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
                      className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                    {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                  </div>

                  {/* Phone */}
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
                      className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                    {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                    {t('form_service')} <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="SMM">{t('form_service_smm')} (SMM)</option>
                    <option value="Marketing">{t('form_service_marketing')} (Marketing)</option>
                    <option value="IT">{t('form_service_it')} (IT xizmatlari)</option>
                  </select>
                </div>

                {/* Comment */}
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
                    className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Captcha */}
                <Captcha
                  onVerify={setIsCaptchaVerified}
                  isVerified={isCaptchaVerified}
                  resetTrigger={captchaResetTrigger}
                />
                {errors.captcha && <p className="text-xs text-rose-400">{errors.captcha}</p>}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 active:scale-[0.99] transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>{t('form_submitting')}</span>
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

      {/* Conditional Google Maps Iframe Container */}
      {contact.mapIframeUrl && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl h-80 sm:h-96">
            <iframe
              src={contact.mapIframeUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Prox Marketing Office Location"
            />
          </div>
        </section>
      )}
    </div>
  );
};
