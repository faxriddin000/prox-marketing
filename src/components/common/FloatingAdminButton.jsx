import React from 'react';
import { Lock } from 'lucide-react';

export const FloatingAdminButton = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="relative group">
        <button
          type="button"
          onClick={onClick}
          className="w-12 h-12 rounded-2xl bg-slate-900/80 hover:bg-slate-850/95 text-slate-400 hover:text-white border border-slate-700/60 hover:border-indigo-500/50 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
          aria-label="Admin Panel Login"
          title="Admin Panel"
        >
          <Lock className="w-5 h-5 group-hover:text-indigo-400 group-hover:rotate-12 transition-all duration-300" />
        </button>

        {/* Subtle hover tooltip */}
        <span className="absolute right-14 top-2.5 px-2.5 py-1 bg-slate-950/90 text-slate-300 text-[11px] font-medium rounded-lg border border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl backdrop-blur-md">
          Admin Panel
        </span>
      </div>
    </div>
  );
};
