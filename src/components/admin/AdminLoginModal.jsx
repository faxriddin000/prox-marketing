import React, { useState, useEffect } from 'react';
import { Shield, X, Lock, User, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ProxLogo } from '../common/ProxLogo';

export const AdminLoginModal = ({ isOpen, onClose, onSuccess }) => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Always reset fields to completely empty whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      setUsername('');
      setPassword('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !username.trim() || !password || !password.trim()) {
      setError("❌ Noto'g'ri login yoki parol!");
      return;
    }

    const res = login(username, password);
    if (res.success) {
      if (onSuccess) onSuccess();
      onClose();
    } else {
      setError(res.error || "❌ Noto'g'ri login yoki parol!");
      setPassword('');
    }
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
          <div className="flex justify-center mb-3">
            <ProxLogo className="h-12 w-auto" />
          </div>
          <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" />
            <span>{t('admin_login_title')}</span>
          </h3>
          <p className="text-xs text-slate-400">
            {t('admin_login_desc')}
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Login:
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                autoComplete="off"
                name="auth_username_field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Foydalanuvchi nomi"
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
                autoComplete="new-password"
                name="auth_password_field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
