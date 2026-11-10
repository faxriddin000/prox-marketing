import React from 'react';

export const ProxLogo = ({ className = "h-12 w-auto" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 420 100"
    className={className}
    fill="none"
  >
    <defs>
      <linearGradient id="proxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="50%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#6366F1" floodOpacity="0.4" />
      </filter>
    </defs>

    {/* PX Icon Box */}
    <rect x="16" y="14" width="72" height="72" rx="18" fill="url(#proxGrad)" filter="url(#glow)" />
    <rect x="17" y="15" width="70" height="70" rx="17" stroke="#A5B4FC" strokeOpacity="0.4" strokeWidth="2" />

    {/* PX Letters */}
    <text x="52" y="61" fontFamily="Inter, Arial, sans-serif" fontWeight="900" fontSize="32" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">
      PX
    </text>

    {/* Brand Name */}
    <text x="106" y="48" fontFamily="Inter, Arial, sans-serif" fontWeight="900" fontSize="26" fill="#FFFFFF" letterSpacing="0.5">
      PROX MARKETING
    </text>

    {/* Domain Subtitle */}
    <text x="106" y="72" fontFamily="monospace, Inter, sans-serif" fontWeight="600" fontSize="15" fill="#818CF8" letterSpacing="1.5">
      proxmarketing.uz
    </text>
  </svg>
);
