import React from 'react';
import {
  Share2, Heart, MessageCircle, BarChart3, TrendingUp,
  Cpu, Code2, Bot, Zap, ArrowUpRight, CheckCircle2,
  Layers, Terminal, Globe, Smartphone, ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

/* =========================================================================
   1. SMM VISUAL: Interactive Dashboard & Hand Touch Social Experience
   ========================================================================= */
export const SmmHeroVisual = () => {
  const { language } = useLanguage();

  return (
    <div className="relative w-full max-w-lg mx-auto select-none animate-fadeIn">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/25 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-rose-500/20 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Glass Card */}
      <div className="relative p-6 sm:p-7 rounded-3xl bg-slate-900/85 border border-pink-500/30 shadow-[0_20px_50px_rgba(236,72,153,0.25),0_10px_20px_rgba(15,23,42,0.8)] backdrop-blur-xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center border border-pink-500/30">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>SMM Growth Studio</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[10px] text-pink-300 font-mono">Instagram • TikTok • Reels</p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/30">
            VIRAL VIRTUOSO
          </span>
        </div>

        {/* Dashboard Content Mockup */}
        <div className="py-5 space-y-4">
          {/* Main Reach Metric with Hand-Touch Indicator */}
          <div className="relative p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">
                {language === 'ru' ? 'Органический охват (Reels)' : 'Organik qamrov (Reels)'}
              </span>
              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> +380%
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">482,500+</span>
              <span className="text-xs text-slate-400 font-medium">
                {language === 'ru' ? 'просмотров / нед.' : 'ko\'rish / hafta'}
              </span>
            </div>

            {/* Sparkline curve */}
            <svg className="w-full h-12 mt-2" viewBox="0 0 300 50" fill="none">
              <path
                d="M 0 45 Q 50 40 90 28 T 170 20 T 230 10 T 300 5"
                stroke="#EC4899"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M 0 45 Q 50 40 90 28 T 170 20 T 230 10 T 300 5 L 300 50 L 0 50 Z"
                fill="url(#smmGrad)"
                opacity="0.25"
              />
              <defs>
                <linearGradient id="smmGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Active touch dot */}
              <circle cx="230" cy="10" r="5" fill="#EC4899" className="animate-ping" />
              <circle cx="230" cy="10" r="4" fill="#FFFFFF" />
            </svg>

            {/* Simulated Interactive Touch Pointer */}
            <div className="absolute right-12 top-6 pointer-events-none hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-500/90 text-white text-[10px] font-bold shadow-lg shadow-pink-500/50 animate-bounce">
              <span>👆 Real-time Touch</span>
            </div>
          </div>

          {/* Social Stats Row */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <Heart className="w-4 h-4 text-rose-400 mx-auto mb-1" />
              <div className="text-sm font-bold text-white">45.8K</div>
              <div className="text-[10px] text-slate-400 font-medium">Reaksiyalar</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <MessageCircle className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <div className="text-sm font-bold text-white">3,420</div>
              <div className="text-[10px] text-slate-400 font-medium">Izohlar</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <div className="text-sm font-bold text-white">94.6%</div>
              <div className="text-[10px] text-slate-400 font-medium">ER Rate</div>
            </div>
          </div>

          {/* Incoming Customer Lead Notification */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-pink-950/40 via-slate-900 to-indigo-950/30 border border-pink-500/40">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-pink-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                ⚡️
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white">
                  {language === 'ru' ? 'Новая заявка из Instagram Direct' : 'Instagram Direct dan yangi mijoz'}
                </p>
                <p className="text-[10px] text-pink-300 font-mono">Bugun, 2 daqiqa oldin</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              Qabul qilindi
            </span>
          </div>
        </div>

        {/* Footer pill */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/70 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
            <span>Kreativ kontent & professional reels montaj</span>
          </span>
          <span className="font-mono text-pink-300 font-bold">100% KPI</span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   2. MARKETING VISUAL: Digital Tablet & Stylus Interface for Targeted Ads
   ========================================================================= */
export const MarketingHeroVisual = () => {
  const { language } = useLanguage();

  return (
    <div className="relative w-full max-w-lg mx-auto select-none animate-fadeIn">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600/30 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-purple-600/20 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Glass Card (Digital Tablet Screen) */}
      <div className="relative p-6 sm:p-7 rounded-3xl bg-slate-900/85 border border-indigo-500/35 shadow-[0_20px_50px_rgba(99,102,241,0.3),0_10px_20px_rgba(15,23,42,0.8)] backdrop-blur-xl overflow-hidden">
        {/* Tablet Top Bezel */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Target & Ad Analytics Tablet</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[10px] text-indigo-300 font-mono">Meta Ads • Google Ads • Yandex</p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            5.4x ROAS
          </span>
        </div>

        {/* Tablet Workspace */}
        <div className="py-5 space-y-4">
          {/* Main Funnel Performance Box */}
          <div className="relative p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">
                {language === 'ru' ? 'Воронка продаж и конверсия' : 'Sotuv voronkasi & Konversiya'}
              </span>
              <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md">
                ROAS 540%
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 my-2">
              <div>
                <span className="text-[10px] text-slate-400 block">Jami Lidlar</span>
                <span className="text-xl font-extrabold text-white">1,280+</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">O'rtacha CPL</span>
                <span className="text-xl font-extrabold text-cyan-400">$1.42</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Konversiya</span>
                <span className="text-xl font-extrabold text-emerald-400">12.8%</span>
              </div>
            </div>

            {/* Conversion Bars with Stylus Pointer */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Qamrov (Impressions)</span>
                <span className="text-white font-mono">142,000</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-[95%]" />
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span>Kliklar (CTR 4.8%)</span>
                <span className="text-white font-mono">6,816</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full w-[65%]" />
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span>Sotuvlar (Closed Deals)</span>
                <span className="text-white font-mono">164</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full w-[35%]" />
              </div>
            </div>

            {/* Stylus Indicator */}
            <div className="absolute right-4 bottom-3 hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-600/90 text-white text-[10px] font-bold shadow-lg shadow-indigo-600/50">
              <span>🖊 Stylus Active</span>
            </div>
          </div>

          {/* Geo Targeting & Real-Time Campaign Health */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
              <Globe className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400">Geo Lokatsiya</div>
                <div className="text-xs font-bold text-white">Toshkent & Regionlar</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400">Reklama Byudjeti</div>
                <div className="text-xs font-bold text-emerald-400">0% Bo'sh Xarajat</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer pill */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/70 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>A/B testlash & chuqur auditoriya tahlili</span>
          </span>
          <span className="font-mono text-indigo-300 font-bold">ROAS kafolati</span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. IT VISUAL: High-Tech Cyber-Ring, Code Terminal & Bot Automation
   ========================================================================= */
export const ItHeroVisual = () => {
  const { language } = useLanguage();

  return (
    <div className="relative w-full max-w-lg mx-auto select-none animate-fadeIn">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/25 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-emerald-500/20 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Glass Card */}
      <div className="relative p-6 sm:p-7 rounded-3xl bg-slate-900/85 border border-cyan-500/35 shadow-[0_20px_50px_rgba(6,182,212,0.25),0_10px_20px_rgba(15,23,42,0.8)] backdrop-blur-xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>IT Cyber Architecture & Bots</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <p className="text-[10px] text-cyan-300 font-mono">React • Node • CRM • Telegram API</p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            99.9% UPTIME
          </span>
        </div>

        {/* Visual Workspace: Cyber-Ring + Terminal */}
        <div className="py-5 space-y-4">
          {/* Cybernetic Code Terminal */}
          <div className="relative p-4 rounded-2xl bg-slate-950/90 border border-slate-800/90 font-mono text-xs overflow-hidden">
            {/* Terminal Top Window Dots */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-slate-400 font-sans text-[10px]">prox-core.config.ts</span>
              </div>
              <span className="text-cyan-400 text-[10px]">v2.6.0-stable</span>
            </div>

            {/* Code Lines */}
            <div className="space-y-1 text-[11px] text-slate-300 leading-relaxed">
              <p>
                <span className="text-purple-400">const</span>{' '}
                <span className="text-cyan-300">leadBot</span> ={' '}
                <span className="text-indigo-400">new</span> TelegramCRMIntegration({'{'}
              </p>
              <p className="pl-4">
                <span className="text-slate-400">autoCapture:</span>{' '}
                <span className="text-emerald-400">true</span>,
              </p>
              <p className="pl-4">
                <span className="text-slate-400">responseLatency:</span>{' '}
                <span className="text-amber-300">"&lt; 500ms"</span>,
              </p>
              <p className="pl-4">
                <span className="text-slate-400">syncWithBitrix24:</span>{' '}
                <span className="text-emerald-400">true</span>
              </p>
              <p>{'}'});</p>
              <p className="text-emerald-400 pt-1 flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>✓ Pipeline active: 0 dropped leads</span>
              </p>
            </div>

            {/* Cyber Ring SVG Overlay */}
            <div className="absolute -right-10 -bottom-10 w-36 h-36 pointer-events-none opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full animate-spin [animation-duration:12s]">
                <circle cx="50" cy="50" r="40" stroke="#06B6D4" strokeWidth="2" strokeDasharray="6 4" fill="none" />
                <circle cx="50" cy="50" r="28" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
              </svg>
            </div>
          </div>

          {/* Quick IT Modules */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
              <Bot className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400">Telegram Botlar</div>
                <div className="text-xs font-bold text-white">24/7 Avtomatlashtirish</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400">Veb-sayt Tezligi</div>
                <div className="text-xs font-bold text-amber-400">99+ Google PageSpeed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer pill */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/70 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Toza kod, CRM integratsiya & to'liq kafolat</span>
          </span>
          <span className="font-mono text-cyan-300 font-bold">PROX IT</span>
        </div>
      </div>
    </div>
  );
};
