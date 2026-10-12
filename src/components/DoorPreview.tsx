import { useId } from 'react';
import { formatInches } from '../lib/fractions';
import { findPaintSwatch, STAIN_TINTS } from '../data/finishColors';

const SPECIES_COLORS: Record<string, { base: string; dark: string; grain: string }> = {
  'Paint-Grade Hardwood': { base: '#d9c9a8', dark: '#c4b28e', grain: '#d9c9a8' },
  Maple: { base: '#e6d3b0', dark: '#cdb88f', grain: '#b39a70' },
  Cherry: { base: '#a45f3e', dark: '#864a2e', grain: '#6b3820' },
  'Alder (Clear)': { base: '#c98f62', dark: '#ab7448', grain: '#8e5b34' },
  'Alder (Knotty)': { base: '#c48a5c', dark: '#a56d42', grain: '#7a4a28' },
  Beech: { base: '#dcb98f', dark: '#c29e73', grain: '#a38058' },
  'Red Oak': { base: '#c99a74', dark: '#ab7b55', grain: '#8c5e3c' },
  'White Oak': { base: '#c8a97e', dark: '#a98a60', grain: '#8a6c45' },
  'White Oak (Rift)': { base: '#c9ab82', dark: '#ad8f66', grain: '#937552' },
  Walnut: { base: '#6b4a33', dark: '#523726', grain: '#3a2619' },
};
const DEFAULT_WOOD = { base: '#cdb08a', dark: '#ae916b', grain: '#8f7350' };

// Shift a #rrggbb color toward black (amount < 0) or white (amount > 0).
function shade(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v: number) => Math.round(amount < 0 ? v * (1 + amount) : v + (255 - v) * amount);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(ch);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

const fromBase = (base: string, painted: boolean) => ({ base, dark: shade(base, -0.12), grain: shade(base, -0.32), painted });

function colorsFor(species: string, finish: string, finishColor: string) {
  if (finish === 'Painted' || finish === 'Glazed / Distressed') {
    return fromBase(findPaintSwatch(finishColor)?.hex ?? '#ebe8e1', true);
  }
  if (finish === 'Primed') return fromBase('#dededa', true);
  const wood = SPECIES_COLORS[species] ?? DEFAULT_WOOD;
  if (finish === 'Stained' && STAIN_TINTS[finishColor]) return fromBase(STAIN_TINTS[finishColor], false);
  if (finish === 'Clear Coat') return { ...wood, base: shade(wood.base, -0.05), painted: false }; // clear coat deepens the tone a little
  if (finish === 'Clear Coat — Dead Flat' || finish === 'Unfinished') return { ...wood, base: shade(wood.base, 0.06), painted: false };
  return { ...wood, painted: species === 'Paint-Grade Hardwood' };
}

interface DoorPreviewProps {
  doorStyle: string;
  panelStyle: string;
  species: string;
  finish: string;
  edgeProfile: string;
  finishColor?: string;
  compact?: boolean; // small thumbnail: no dimension marks
  widthIn?: number | null;
  heightIn?: number | null;
}

export function DoorPreview({ doorStyle, panelStyle, species, finish, edgeProfile, finishColor = '', compact = false, widthIn, heightIn }: DoorPreviewProps) {
  const uid = useId().replace(/:/g, '');
  const c = colorsFor(species, finish, finishColor);
  const glass = panelStyle === 'Glass-Ready';

  const wIn = widthIn && widthIn > 0 ? widthIn : 18;
  const hIn = heightIn && heightIn > 0 ? heightIn : 30;

  const boxW = 220;
  const boxH = 260;
  const scale = Math.min(boxW / wIn, boxH / hIn);
  const w = wIn * scale;
  const h = hIn * scale;
  const x = (300 - w) / 2 + 10;
  const y = (320 - h) / 2 + 10;

  const isSlab = doorStyle === 'Slab';
  const f = Math.max(10, Math.min(w, h) * 0.17); // frame (stile/rail) width
  const edgeInset = edgeProfile && edgeProfile !== 'Square' ? 3 : 0;

  const grain = `url(#grain-${uid})`;
  const fill = `url(#wood-${uid})`;

  return (
    <svg viewBox="0 0 320 340" className="w-full h-auto" role="img" aria-label="Preview of your door">
      <defs>
        <linearGradient id={`wood-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.base} />
          <stop offset="100%" stopColor={c.dark} />
        </linearGradient>
        <pattern id={`grain-${uid}`} width="60" height="180" patternUnits="userSpaceOnUse" patternTransform="rotate(2)">
          <path d="M6,0 C14,40 4,90 8,180" fill="none" stroke={c.grain} strokeWidth="0.8" opacity="0.35" />
          <path d="M24,0 C20,60 32,120 24,180" fill="none" stroke={c.grain} strokeWidth="1" opacity="0.25" />
          <path d="M44,0 C52,50 38,110 46,180" fill="none" stroke={c.grain} strokeWidth="0.7" opacity="0.3" />
        </pattern>
      </defs>

      {/* Door body */}
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke="rgba(0,0,0,0.45)" strokeWidth="1.5" className="transition-all duration-300" />
      {!c.painted && <rect x={x} y={y} width={w} height={h} fill={grain} pointerEvents="none" />}

      {/* Edge profile hint */}
      {edgeInset > 0 && (
        <rect x={x + edgeInset} y={y + edgeInset} width={w - edgeInset * 2} height={h - edgeInset * 2} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      )}

      {!isSlab && (
        <>
          {/* Frame joints */}
          {doorStyle === 'Mitered 5-Piece' ? (
            <g stroke="rgba(0,0,0,0.35)" strokeWidth="1">
              <line x1={x} y1={y} x2={x + f} y2={y + f} />
              <line x1={x + w} y1={y} x2={x + w - f} y2={y + f} />
              <line x1={x} y1={y + h} x2={x + f} y2={y + h - f} />
              <line x1={x + w} y1={y + h} x2={x + w - f} y2={y + h - f} />
            </g>
          ) : (
            <g stroke="rgba(0,0,0,0.35)" strokeWidth="1">
              <line x1={x + f} y1={y} x2={x + f} y2={y + f} />
              <line x1={x + w - f} y1={y} x2={x + w - f} y2={y + f} />
              <line x1={x + f} y1={y + h} x2={x + f} y2={y + h - f} />
              <line x1={x + w - f} y1={y + h} x2={x + w - f} y2={y + h - f} />
            </g>
          )}

          {/* Panel */}
          <rect
            x={x + f}
            y={y + f}
            width={w - f * 2}
            height={h - f * 2}
            fill={fill}
            stroke="rgba(0,0,0,0.45)"
            strokeWidth={panelStyle === 'Shaker' ? 2 : 1.2}
            strokeDasharray={panelStyle === 'Other' ? '4 3' : undefined}
            style={{ filter: 'brightness(0.88)' }}
          />
          {!c.painted && !glass && <rect x={x + f} y={y + f} width={w - f * 2} height={h - f * 2} fill={grain} opacity="0.7" pointerEvents="none" />}

          {glass && (
            <g pointerEvents="none">
              <rect x={x + f} y={y + f} width={w - f * 2} height={h - f * 2} fill="#1a2329" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
              <rect x={x + f} y={y + f} width={w - f * 2} height={h - f * 2} fill="#a9c2cc" opacity="0.22" />
              <line x1={x + f + (w - f * 2) * 0.2} y1={y + h - f} x2={x + f + (w - f * 2) * 0.75} y2={y + f} stroke="#ffffff" strokeOpacity="0.18" strokeWidth="6" />
              <line x1={x + f + (w - f * 2) * 0.45} y1={y + h - f} x2={x + f + (w - f * 2) * 0.95} y2={y + f + (h - f * 2) * 0.15} stroke="#ffffff" strokeOpacity="0.1" strokeWidth="3" />
            </g>
          )}

          {panelStyle === 'Raised' && (() => {
            const b = Math.min(14, (w - f * 2) * 0.18, (h - f * 2) * 0.18);
            const ix = x + f;
            const iy = y + f;
            const iw = w - f * 2;
            const ih = h - f * 2;
            return (
              <g>
                <rect x={ix + b} y={iy + b} width={iw - b * 2} height={ih - b * 2} fill={fill} stroke="rgba(0,0,0,0.25)" strokeWidth="1" style={{ filter: 'brightness(1.06)' }} />
                {!c.painted && <rect x={ix + b} y={iy + b} width={iw - b * 2} height={ih - b * 2} fill={grain} opacity="0.8" pointerEvents="none" />}
                <g stroke="rgba(0,0,0,0.25)" strokeWidth="1">
                  <line x1={ix} y1={iy} x2={ix + b} y2={iy + b} />
                  <line x1={ix + iw} y1={iy} x2={ix + iw - b} y2={iy + b} />
                  <line x1={ix} y1={iy + ih} x2={ix + b} y2={iy + ih - b} />
                  <line x1={ix + iw} y1={iy + ih} x2={ix + iw - b} y2={iy + ih - b} />
                </g>
              </g>
            );
          })()}
        </>
      )}

      {!compact && (
        <>
      {/* Dimension lines */}
      <g stroke="#c9a47a" strokeWidth="1.2">
        <line x1={x} y1={y - 12} x2={x + w} y2={y - 12} />
        <line x1={x} y1={y - 16} x2={x} y2={y - 8} />
        <line x1={x + w} y1={y - 16} x2={x + w} y2={y - 8} />
        <line x1={x - 12} y1={y} x2={x - 12} y2={y + h} />
        <line x1={x - 16} y1={y} x2={x - 8} y2={y} />
        <line x1={x - 16} y1={y + h} x2={x - 8} y2={y + h} />
      </g>
      <text x={x + w / 2} y={y - 20} fill="#c9a47a" textAnchor="middle" fontSize="11" fontWeight="700">{widthIn ? formatInches(widthIn) : 'W'}</text>
      <text x={x - 22} y={y + h / 2} fill="#c9a47a" textAnchor="middle" fontSize="11" fontWeight="700" transform={`rotate(-90 ${x - 22} ${y + h / 2})`}>{heightIn ? formatInches(heightIn) : 'H'}</text>
        </>
      )}
    </svg>
  );
}
