import React from 'react';

interface RoyalLogoProps {
  className?: string;
  iconOnly?: boolean;
  light?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
  xl: 'w-24 h-24',
};

export function RoyalLogo({ className = "", iconOnly = false, light = false, size = 'md' }: RoyalLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/logo.png"
        alt="Royal Brand Woodworking"
        className={`${sizeMap[size]} object-contain rounded-sm`}
      />
      {!iconOnly && (
        <div className="flex flex-col">
          <span className={`font-serif font-bold text-xl md:text-2xl tracking-tight leading-none ${light ? 'text-white' : 'text-white'}`}>
            Royal Brand
          </span>
          <span className={`font-sans text-[8px] font-bold tracking-[0.2em] uppercase leading-normal mt-0.5 ${light ? 'text-royal-text-muted' : 'text-royal-text-muted'}`}>
            Woodworking & Cabinets
          </span>
        </div>
      )}
    </div>
  );
}
