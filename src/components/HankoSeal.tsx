import React from 'react';

interface HankoSealProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const HankoSeal: React.FC<HankoSealProps> = ({
  text = 'RJY',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7 text-[10px] border-[1.5px]',
    md: 'w-10 h-10 text-xs border-2',
    lg: 'w-14 h-14 text-sm border-2',
  };

  return (
    <div
      id="hanko-seal"
      className={`relative inline-flex items-center justify-center select-none font-serif font-bold tracking-widest text-[#B4473F] border-[#B4473F] rounded-[3px] bg-[#B4473F]/5 transition-transform hover:scale-105 ${sizeClasses[size]} ${className}`}
      title="Rainer Jackob Yawan Hanko Seal (判子)"
      style={{
        boxShadow: 'inset 0 0 0 1px rgba(180, 71, 63, 0.25)',
      }}
    >
      {/* Subtle organic imperfection corner dots */}
      <span className="relative z-10 leading-none">{text}</span>
      <span className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-[#F7F5F0] rounded-full pointer-events-none" />
      <span className="absolute -bottom-0.5 -left-0.5 w-1 h-1 bg-[#F7F5F0] rounded-full pointer-events-none" />
    </div>
  );
};
