import React from 'react';

interface RoyalLogoProps {
  className?: string;
  iconOnly?: boolean;
  light?: boolean;
}

export function RoyalLogo({ className = "", iconOnly = false, light = false }: RoyalLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative flex items-center justify-center w-10 h-10 rounded-lg ${light ? 'bg-white text-royal-terracotta shadow-md' : 'bg-royal-terracotta text-white'} shadow-sm`}>
        {/* Crown & Woodworking detail SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20,62 L35,30 L50,45 L65,30 L80,62 Z" fill="currentColor" fillOpacity="0.15" />
          <line x1="15" y1="74" x2="85" y2="74" strokeWidth="10" />
          <line x1="25" y1="62" x2="75" y2="62" />
        </svg>
      </div>
      {!iconOnly && (
        <div className="flex flex-col">
          <span className={`font-serif font-bold text-xl md:text-2.5xl tracking-tight leading-none ${light ? 'text-white' : 'text-royal-charcoal'}`}>
            Royal Brand
          </span>
          <span className={`font-sans text-[8px] font-bold tracking-[0.2em] uppercase leading-normal mt-0.5 ${light ? 'text-white/70' : 'text-royal-stone'}`}>
            Woodworking & Cabinets
          </span>
        </div>
      )}
    </div>
  );
}
