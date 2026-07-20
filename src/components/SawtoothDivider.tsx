import React from 'react';

interface SawtoothDividerProps {
  color?: string; // Tailwind text color class, e.g., "text-royal-terracotta"
  position?: 'top' | 'bottom';
  invert?: boolean;
}

export function SawtoothDivider({ color = "text-royal-terracotta", position = "top", invert = false }: SawtoothDividerProps) {
  // SVG with a repeating sawtooth pattern: 30 teeth across 1200px width
  return (
    <div className={`w-full overflow-hidden leading-none relative z-10 ${position === 'top' ? '-mb-1' : '-mt-1'}`}>
      <svg
        viewBox="0 0 1200 24"
        className={`w-full h-6 fill-current ${color} ${invert ? 'transform rotate-180' : ''}`}
        preserveAspectRatio="none"
      >
        <path d="M0,0 L20,18 L40,0 L60,18 L80,0 L100,18 L120,0 L140,18 L160,0 L180,18 L200,0 L220,18 L240,0 L260,18 L280,0 L300,18 L320,0 L340,18 L360,0 L380,18 L400,0 L420,18 L440,0 L460,18 L480,0 L500,18 L520,0 L540,18 L560,0 L580,18 L600,0 L620,18 L640,0 L660,18 L680,0 L700,18 L720,0 L740,18 L760,0 L780,18 L800,0 L820,18 L840,0 L860,18 L880,0 L900,18 L920,0 L940,18 L960,0 L980,18 L1000,0 L1020,18 L1040,0 L1060,18 L1080,0 L1100,18 L1120,0 L1140,18 L1160,0 L1180,18 L1200,0 L1200,24 L0,24 Z" />
      </svg>
    </div>
  );
}
