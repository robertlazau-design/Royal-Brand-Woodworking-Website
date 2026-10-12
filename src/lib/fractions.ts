// Parse the ways people write tape-measure sizes: "15", "15.375", "15 3/8",
// "15-3/8", "3/8", with or without a trailing " or "in".
export function parseInches(raw: string): number | null {
  const s = raw.trim().replace(/(\s*(inches|inch|in|"|”|''))$/i, '').trim();
  if (!s) return null;

  if (/^\d+(\.\d+)?$|^\.\d+$/.test(s)) return parseFloat(s);

  const mixed = s.match(/^(\d+)\s*[- ]\s*(\d+)\s*\/\s*(\d+)$/);
  if (mixed) {
    const whole = Number(mixed[1]);
    const num = Number(mixed[2]);
    const den = Number(mixed[3]);
    return den ? whole + num / den : null;
  }

  const frac = s.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (frac) {
    const num = Number(frac[1]);
    const den = Number(frac[2]);
    return den ? num / den : null;
  }

  return null;
}

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}

// 15.375 -> 15 3/8"  (rounded to the nearest 1/16")
export function formatInches(value: number): string {
  const sixteenths = Math.round(value * 16);
  const whole = Math.floor(sixteenths / 16);
  const rem = sixteenths % 16;
  if (rem === 0) return `${whole}"`;
  const g = gcd(rem, 16);
  const frac = `${rem / g}/${16 / g}`;
  return whole ? `${whole} ${frac}"` : `${frac}"`;
}
