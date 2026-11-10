import React from 'react';
import { Share2, BarChart3, Bot, Zap, Sparkles, TrendingUp, Cpu } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const UnifiedGrowthGraphic = () => {
  const { language } = useLanguage();

  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      {/* Ambient Radial Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-600/25 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-pink-500/20 rounded-full blur-[70px] pointer-events-none" />

      {/* Main Glassmorphic Container with Neon Edge */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800/90 shadow-[0_20px_50px_rgba(15,23,42,0.8),0_10px_30px_rgba(99,102,241,0.2)] backdrop-blur-xl overflow-hidden">
        
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Top Header Badge */}
        <div className="relative flex items-center justify-between pb-5 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {language === 'ru' ? 'Единый движок роста' : 'Yagona o\'sish tizimi'}
            </span>
          </div>
          <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            PROX 3-IN-1
          </span>
        </div>

        {/* Convergence Visual Area */}
        <div className="relative h-72 sm:h-80 flex items-center justify-center my-2">
          
          {/* SVG Animated Energy Conduits Connecting 3 Nodes to Center */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 320" fill="none">
            <defs>
              <linearGradient id="beamSmm" x1="50" y1="60" x2="200" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#EC4899" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="beamMkt" x1="350" y1="60" x2="200" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="beamIt" x1="200" y1="280" x2="200" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Connecting laser paths */}
            <path d="M 75 70 Q 130 110 190 150" stroke="url(#beamSmm)" strokeWidth="2.5" strokeDasharray="4 4" className="animate-pulse" />
            <path d="M 325 70 Q 270 110 210 150" stroke="url(#beamMkt)" strokeWidth="2.5" strokeDasharray="4 4" className="animate-pulse" />
            <path d="M 200 250 L 200 170" stroke="url(#beamIt)" strokeWidth="2.5" strokeDasharray="4 4" className="animate-pulse" />

            {/* Orbiting concentric rings around the core */}
            <circle cx="200" cy="160" r="48" stroke="#6366F1" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="6 6" />
            <circle cx="200" cy="160" r="76" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.2" />
          </svg>

          {/* Central 3D Glowing Core */}
          <div className="relative z-20 flex flex-col items-center justify-center">
            <div className="relative group p-1 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 shadow-[0_0_40px_rgba(99,102,241,0.6)] animate-pulse">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-950 flex flex-col items-center justify-center p-2 text-center border border-indigo-400/40">
                <Cpu className="w-6 h-6 text-cyan-400 mb-1" />
                <span className="text-xs font-black tracking-tight text-white">PROX CORE</span>
                <span className="text-[9px] font-mono text-indigo-300 font-bold">3X ENGINE</span>
              </div>
            </div>
            <div className="mt-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-[10px] font-bold text-indigo-300 shadow-md">
              ⚡️ {language === 'ru' ? 'Конвергенция' : 'Sinergiya'}
            </div>
          </div>

          {/* Satellite Node 1: SMM (Top Left) */}
          <div className="absolute top-2 left-2 z-10 flex flex-col items-center animate-bounce [animation-duration:4s]">
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-pink-500/50 shadow-[0_8px_20px_rgba(236,72,153,0.3)] flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </div>
              <div className="text-left pr-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400 block">01 SMM</span>
                <span className="text-xs font-extrabold text-white">+320% {language === 'ru' ? 'Охват' : 'Qamrov'}</span>
              </div>
            </div>
          </div>

          {/* Satellite Node 2: Marketing (Top Right) */}
          <div className="absolute top-2 right-2 z-10 flex flex-col items-center animate-bounce [animation-duration:4.5s] [animation-delay:0.5s]">
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-indigo-500/50 shadow-[0_8px_20px_rgba(99,102,241,0.3)] flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div className="text-left pr-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">02 MARKETING</span>
                <span className="text-xs font-extrabold text-white">5.4x ROI</span>
              </div>
            </div>
          </div>

          {/* Satellite Node 3: IT & AI Automation (Bottom Center) */}
          <div className="absolute bottom-1 z-10 flex flex-col items-center animate-bounce [animation-duration:5s] [animation-delay:1s]">
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-cyan-500/50 shadow-[0_8px_20px_rgba(6,182,212,0.3)] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="text-left pr-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">03 IT & BOTLAR</span>
                <span className="text-xs font-extrabold text-white">100% {language === 'ru' ? 'Автоматизация' : 'Avtomatlashtirish'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Feature Pill Summary */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] text-slate-300 font-medium">
              {language === 'ru' ? 'SMM + Таргет + IT боты' : 'SMM + Target + IT Botlar'}
            </span>
          </div>
          <span className="text-[11px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
            proxmarketing.uz
          </span>
        </div>

      </div>
    </div>
  );
};
