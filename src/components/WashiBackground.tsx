import React from 'react';

export const WashiBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Subtle paper grain */}
      <div className="absolute inset-0 washi-grain opacity-40" />

      {/* Decorative Enso (円相) Calligraphic Watermark Circle in Hero background (5-8% opacity) */}
      <svg
        className="absolute -top-20 -right-20 md:top-12 md:right-12 w-[340px] h-[340px] md:w-[600px] md:h-[600px] text-[#263B50] opacity-[0.05] transition-opacity"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100,18 C145,18 182,55 182,100 C182,143 147,178 103,181 C58,184 21,148 18,103 C15,58 48,22 92,19"
          stroke="currentColor"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="480 30"
        />
        {/* Secondary organic dry-brush feathering */}
        <path
          d="M95,25 C135,26 172,60 172,100 C172,138 140,170 102,172 C68,174 30,144 26,108 C23,72 52,30 88,26"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>

      {/* Very faint bottom-left decorative wave accent */}
      <svg
        className="absolute bottom-20 -left-20 w-80 h-80 text-[#263B50] opacity-[0.02]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </div>
  );
};
