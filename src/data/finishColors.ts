// On-screen approximations of paint and stain colors for the live door preview.
// Real colors vary by screen and wood — Robert confirms with physical samples.

export interface PaintSwatch {
  label: string; // stored on the order, e.g. "SW 7008 Alabaster"
  name: string;
  hex: string;
}

// Popular cabinet colors that the supplier has pre-matched.
export const PAINT_SWATCHES: PaintSwatch[] = [
  { label: 'SW 7005 Pure White', name: 'Pure White', hex: '#EDECE6' },
  { label: 'SW 7008 Alabaster', name: 'Alabaster', hex: '#EDEAE0' },
  { label: 'BM OC-65 Chantilly Lace', name: 'Chantilly Lace', hex: '#F4F4EF' },
  { label: 'BM OC-17 White Dove', name: 'White Dove', hex: '#EFEDE4' },
  { label: 'BM OC-117 Simply White', name: 'Simply White', hex: '#F2F0E3' },
  { label: 'SW 7012 Creamy', name: 'Creamy', hex: '#EFE8DB' },
  { label: 'BM OC-45 Swiss Coffee', name: 'Swiss Coffee', hex: '#EDE7D9' },
  { label: 'SW 7014 Eider White', name: 'Eider White', hex: '#E2DED8' },
  { label: 'BM 2137-60 Gray Owl', name: 'Gray Owl', hex: '#D4D5CD' },
  { label: 'SW 6204 Sea Salt', name: 'Sea Salt', hex: '#CDD2CA' },
  { label: 'BM HC-173 Edgecomb Gray', name: 'Edgecomb Gray', hex: '#D7D0C2' },
  { label: 'BM HC-172 Revere Pewter', name: 'Revere Pewter', hex: '#CCC7B9' },
  { label: 'SW 7015 Repose Gray', name: 'Repose Gray', hex: '#CCC9C0' },
  { label: 'SW 7016 Mindful Gray', name: 'Mindful Gray', hex: '#BCB7AD' },
  { label: 'SW 7017 Dorian Gray', name: 'Dorian Gray', hex: '#ACA79E' },
  { label: 'SW 7018 Dovetail', name: 'Dovetail', hex: '#908A83' },
  { label: 'SW 6207 Retreat', name: 'Retreat', hex: '#7A7F6F' },
  { label: 'SW 6208 Pewter Green', name: 'Pewter Green', hex: '#5E6259' },
  { label: 'BM HC-188 Essex Green', name: 'Essex Green', hex: '#33403A' },
  { label: 'SW 7019 Gauntlet Gray', name: 'Gauntlet Gray', hex: '#78736E' },
  { label: 'BM HC-166 Kendall Charcoal', name: 'Kendall Charcoal', hex: '#686661' },
  { label: 'SW 7020 Black Fox', name: 'Black Fox', hex: '#4F4842' },
  { label: 'BM HC-154 Hale Navy', name: 'Hale Navy', hex: '#434B56' },
  { label: 'SW 6244 Naval', name: 'Naval', hex: '#2F3D4C' },
  { label: 'SW 6258 Tricorn Black', name: 'Tricorn Black', hex: '#2F2F30' },
];

// Stain tints by stain name ("Natural" uses the wood's own color).
export const STAIN_TINTS: Record<string, string> = {
  Mimosa: '#D9B77E', Honey: '#C9944F', Ginger: '#B9773F', Toffee: '#A9713F', 'Spiced Rum': '#8E5A33',
  Harvest: '#B9813F', Sangria: '#7A2F28', Copper: '#A65A2E', Cayenne: '#8C3B22', Bourbon: '#7A4524',
  Sedona: '#9A4E2C', Hawthorne: '#6E4A33', Kona: '#4A3324', Kodiak: '#5A4535', Charcoal: '#3E3B38',
  Crimson: '#6E2A24', Seaside: '#8A8C86', Beachwood: '#B5A48C', 'Harbor Mist': '#9C9890',
  Pecan: '#A8743F', Kaffe: '#6B4A30', Wheat: '#D8BC8A', Buckskin: '#C09A66', Cinnamon: '#9C5E35',
  Cider: '#A86A3A', Nutmeg: '#8A5A36', Truffle: '#5E4331', Cabernet: '#5A2A24', Merlot: '#622B26',
  'French Roast': '#3A2A20', Driftwood: '#9E9384', 'Coastal Fog': '#B9B4AA',
  Sorrel: '#8E4E33', Brandywine: '#6E3A2A', Bordeaux: '#5A2626', 'Coffee Bean': '#3E2C22', Java: '#4A3426',
  'Smoked Paprika': '#8A4A2E', Hazelnut: '#A07A50', Russet: '#8C4A2C', Gunstock: '#9A5A30', Woodbridge: '#7A5A3E',
};

// Find a swatch for whatever the customer typed or picked ("Alabaster", "sw 7008", "SW 7008 Alabaster").
export function findPaintSwatch(text: string): PaintSwatch | undefined {
  const t = text.trim().toLowerCase().replace(/\s+/g, ' ');
  if (!t) return undefined;
  return PAINT_SWATCHES.find(s => {
    const label = s.label.toLowerCase();
    const code = label.split(' ').slice(0, 2).join(' '); // "sw 7008"
    return label === t || s.name.toLowerCase() === t || t.includes(code) || t.includes(s.name.toLowerCase());
  });
}
