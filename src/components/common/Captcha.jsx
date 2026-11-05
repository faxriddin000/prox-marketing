import React, { useState, useEffect } from 'react';
import { RotateCw, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Captcha = ({ onVerify, isVerified, resetTrigger }) => {
  const { t } = useLanguage();
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState(false);

  const generateProblem = () => {
    const ops = ['+', '-'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    const n1 = Math.floor(Math.random() * 10) + 5;
    const n2 = Math.floor(Math.random() * 5) + 1;
    
    setNum1(n1);
    setNum2(n2);
    setOperator(op);
    setUserAnswer('');
    setError(false);
    onVerify(false);
  };

  useEffect(() => {
    generateProblem();
  }, [resetTrigger]);

  const handleChange = (e) => {
    const val = e.target.value.trim();
    setUserAnswer(val);

    const correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;
    if (parseInt(val, 10) === correctAnswer) {
      setError(false);
      onVerify(true);
    } else {
      onVerify(false);
      if (val.length >= String(correctAnswer).length) {
        setError(true);
      } else {
        setError(false);
      }
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-3.5 space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5 font-medium text-slate-300">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          {t('form_captcha_label')}
        </span>
        <button
          type="button"
          onClick={generateProblem}
          title="Yangi misol"
          className="text-slate-400 hover:text-indigo-400 p-1 transition-colors flex items-center gap-1 text-[11px]"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Yangilash</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-slate-800/90 border border-slate-700 px-3.5 py-2 rounded-lg font-mono font-bold text-base text-indigo-300 tracking-wider select-none shadow-inner">
          {num1} {operator} {num2} = ?
        </div>
        <div className="flex-1 relative">
          <input
            type="number"
            value={userAnswer}
            onChange={handleChange}
            placeholder={t('form_captcha_placeholder')}
            className={`w-full bg-slate-950/80 border px-3 py-2 text-sm rounded-lg text-white placeholder-slate-500 focus:outline-none transition-all ${
              isVerified
                ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                : error
                ? 'border-rose-500 ring-2 ring-rose-500/20'
                : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
            }`}
          />
          {isVerified && (
            <span className="absolute right-2.5 top-2.5 text-xs font-semibold text-emerald-400 flex items-center gap-1">
              ✓ To'g'ri
            </span>
          )}
        </div>
      </div>
      {error && !isVerified && (
        <p className="text-[11px] text-rose-400 font-medium">
          Misol natijasi noto'g'ri. Qaytadan tekshiring.
        </p>
      )}
    </div>
  );
};
