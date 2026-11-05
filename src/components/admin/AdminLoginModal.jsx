import React, { useState } from 'react';
import { Shield, X, Lock, User, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const AdminLoginModal = ({ isOpen, onClose, onSuccess }) => {
  const { login, loginAsDemo } = useAuth();
  const { t } = useLanguage();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('prox2026');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = login(username, password);
    if (res.success) {
      if (onSuccess) onSuccess();
      onClose();
    } else {
      setError(res.error);
    }
  };

  const handleDemo = (role) => {
    loginAsDemo(role);
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-xl"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6 space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto">
            <Shield className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-white">
            {t('admin_login_title')}
          </h3>
          <p className="text-xs text-slate-400">
            {t('admin_login_desc')}
          </p>
        </div>

        {/* Demo Fast Login Buttons */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 mb-6 space-y-2.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Tezkor testlash (1-klik orqali kirish):
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemo('admin')}
              className="py-2.5 px-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>Admin (To'liq)</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemo('editor')}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>Kontent-menejer</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Login (admin yoki editor):
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950/70 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Parol:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/70 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Kirish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
