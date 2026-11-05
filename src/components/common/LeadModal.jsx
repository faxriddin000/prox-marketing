import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Phone, User, Briefcase, MessageSquare, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';
import { Captcha } from './Captcha';

export const LeadModal = ({ isOpen, onClose, initialService = '' }) => {
  const { t, language } = useLanguage();
  const { addLead, data } = useCMS();

  const [formData, setFormData] = useState({
    name: '',
    phone: '+998 ',
    service: initialService || 'Marketing',
    comment: ''
  });

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaResetTrigger, setCaptchaResetTrigger] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setErrors({});
      setIsCaptchaVerified(false);
      setCaptchaResetTrigger((prev) => prev + 1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

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

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // fallback if canvas-confetti is not loaded
      }

      setIsSuccess(true);
      setFormData({
        name: '',
        phone: '+998 ',
        service: initialService || 'Marketing',
        comment: ''
      });
    } catch (err) {
      console.error(err);
      alert('Xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 p-2 rounded-xl transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-500/5">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              {t('form_success_title')}
            </h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              {t('form_success_desc')}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={data.contact.telegramUrl || "https://t.me/manager_prox"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium text-sm transition-all shadow-lg shadow-sky-500/25"
              >
                <span>Telegramda yozish</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-all"
              >
                Yopish
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
                {t('contact_badge')}
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {t('contact_form_title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {t('contact_form_desc')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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

              {/* Service Select */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                  {t('form_service')} <span className="text-rose-400">*</span>
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
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
                  rows="2"
                  placeholder={t('form_comment_placeholder')}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* Captcha */}
              <Captcha
                onVerify={setIsCaptchaVerified}
                isVerified={isCaptchaVerified}
                resetTrigger={captchaResetTrigger}
              />
              {errors.captcha && <p className="text-xs text-rose-400">{errors.captcha}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 active:scale-[0.99] transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
          </div>
        )}
      </div>
    </div>
  );
};
