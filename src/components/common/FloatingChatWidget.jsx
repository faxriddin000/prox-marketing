import React, { useState } from 'react';
import { MessageCircle, X, Send, Phone, User, CheckCircle2, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';

export const FloatingChatWidget = () => {
  const { t } = useLanguage();
  const { data, addLead } = useCMS();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleQuickCallback = async (e) => {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, '').length < 9) {
      alert("Iltimos, ism va to'g'ri telefon raqamingizni kiriting.");
      return;
    }

    setLoading(true);
    try {
      await addLead({
        name,
        phone,
        service: 'Tezkor Chat / Aloqa',
        comment: 'Foydalanuvchi online yordamchi vidjeti orqali tezkor qo\'ng\'iroq so\'radi.'
      });
      setSubmitted(true);
      setName('');
      setPhone('+998 ');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const telegramLink = data.contact.telegramUrl || 'https://t.me/manager_prox';

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="relative group">
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white flex items-center justify-center shadow-xl shadow-indigo-600/30 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Open chat"
          >
            <MessageCircle className="w-7 h-7" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-ping" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
          </button>
          <span className="absolute right-16 top-2.5 px-3 py-1 bg-slate-900/90 text-slate-200 text-xs rounded-lg border border-slate-700/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            {t('chat_widget_tooltip')}
          </span>
        </div>
      )}

      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-slate-900 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white border border-white/20">
                  PX
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight">
                  {t('chat_widget_title')}
                </h4>
                <p className="text-[11px] text-indigo-200">
                  {t('chat_widget_subtitle')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4 text-sm">
            {/* Telegram Direct Option */}
            <a
              href={telegramLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 font-medium transition-all group"
            >
              <span className="flex items-center gap-2.5">
                <Send className="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
                <span>{t('chat_widget_tg_btn')}</span>
              </span>
              <ExternalLink className="w-4 h-4 opacity-75" />
            </a>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-800 w-full" />
              <span className="bg-slate-900 px-2 text-[11px] uppercase tracking-wider text-slate-500 absolute">
                yoki
              </span>
            </div>

            {/* Quick Callback Form */}
            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h5 className="font-semibold text-white text-sm">
                  So'rovingiz qabul qilindi!
                </h5>
                <p className="text-xs text-slate-300">
                  Mutaxassisimiz 10-15 daqiqa ichida siz bilan bog'lanadi.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-indigo-400 hover:underline pt-1"
                >
                  Yangi so'rov yuborish
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickCallback} className="space-y-3">
                <p className="text-xs font-semibold text-slate-300">
                  {t('chat_widget_callback_title')}
                </p>

                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Ismingiz"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+998 (__) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-xl font-medium text-xs text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30 disabled:opacity-50"
                >
                  {loading ? 'Yuborilmoqda...' : t('chat_widget_send')}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
