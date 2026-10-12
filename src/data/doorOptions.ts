// Everything the customer can pick on the Custom Cabinet Door Order Form.
// Edit these lists to change what appears on /order — no other code changes needed.
// Every list ends with an "Other" choice that opens a text box.

export interface Option {
  value: string;
  label: string;
  hint?: string;
}

export const DOOR_TYPES: Option[] = [
  { value: 'Cabinet Doors', label: 'Cabinet Doors', hint: 'Kitchen, bath & furniture' },
  { value: 'Drawer Fronts', label: 'Drawer Fronts' },
  { value: 'Interior Doors', label: 'Interior Doors', hint: 'Passage, closet & pantry' },
  { value: 'Other', label: 'Other', hint: 'Describe what you need' },
];

// Which door types customers can order right now. Starting with cabinet doors only —
// add 'Drawer Fronts' and/or 'Interior Doors' here to switch them on (their questions are already built).
export const ENABLED_DOOR_TYPES = ['Cabinet Doors'];
export const AVAILABLE_DOOR_TYPES = DOOR_TYPES.filter(t => t.value === 'Other' ? ENABLED_DOOR_TYPES.length > 1 : ENABLED_DOOR_TYPES.includes(t.value));

export const DOOR_STYLES: Option[] = [
  { value: 'Mitered 5-Piece', label: 'Mitered 5-Piece', hint: 'Frame corners joined at 45°' },
  { value: 'Cope & Stick 5-Piece', label: 'Cope & Stick 5-Piece', hint: 'Classic square-cornered frame' },
  { value: 'Slab', label: 'Slab', hint: 'One solid flat piece, no frame' },
  { value: 'Other', label: 'Other', hint: 'Describe what you need' },
];

// Matches the client's paper form: Flat / Raised / Shaker / Other
export const PANEL_STYLES: Option[] = [
  { value: 'Flat', label: 'Flat', hint: 'Flat recessed panel' },
  { value: 'Raised', label: 'Raised', hint: 'Bevelled, raised centre' },
  { value: 'Shaker', label: 'Shaker', hint: 'Square inside edge, flat panel' },
  { value: 'Glass-Ready', label: 'Glass-Ready', hint: 'Open frame for glass (glass not included)' },
  { value: 'Other', label: 'Other' },
];

// Lines up with what Robert's door supplier stocks.
export const PAINT_GRADE = 'Paint-Grade Hardwood';
export const WOOD_SPECIES: Option[] = [
  { value: PAINT_GRADE, label: 'Paint-Grade Hardwood (for painted doors)' },
  { value: 'Maple', label: 'Maple' },
  { value: 'Cherry', label: 'Cherry' },
  { value: 'Alder (Clear)', label: 'Alder — Clear' },
  { value: 'Alder (Knotty)', label: 'Alder — Knotty' },
  { value: 'Beech', label: 'Beech' },
  { value: 'Red Oak', label: 'Red Oak' },
  { value: 'White Oak', label: 'White Oak' },
  { value: 'White Oak (Rift)', label: 'White Oak — Rift Cut (straight grain)' },
  { value: 'Walnut', label: 'Walnut' },
  { value: 'Other', label: 'Other' },
];

export const FINISHES: Option[] = [
  { value: 'Unfinished', label: 'Unfinished', hint: 'Sanded, ready for your finish' },
  { value: 'Primed', label: 'Primed', hint: 'Just scuff-sand and paint' },
  { value: 'Painted', label: 'Painted', hint: 'Any Sherwin-Williams or Benjamin Moore color' },
  { value: 'Stained', label: 'Stained', hint: 'Choose from colors for your wood' },
  { value: 'Clear Coat', label: 'Clear Coat', hint: 'Natural wood color' },
  { value: 'Clear Coat — Dead Flat', label: 'Clear — Ultra Matte', hint: 'Looks like raw, unfinished wood' },
  { value: 'Glazed / Distressed', label: 'Glazed / Distressed', hint: 'Aged, farmhouse looks' },
  { value: 'Other', label: 'Other' },
];

// Paint-grade wood is made to be painted — it doesn't take stain or clear coats well.
export const PAINT_GRADE_FINISHES = new Set(['Unfinished', 'Primed', 'Painted', 'Glazed / Distressed', 'Other']);

// Finishes that need a colour name typed in.
export const FINISHES_NEEDING_COLOR = new Set(['Stained', 'Painted', 'Glazed / Distressed', 'Other']);

// Stain colors by wood, from the supplier's stain program. Woods not listed get a free-text box.
export const STAINS_BY_SPECIES: Record<string, string[]> = {
  'Alder (Clear)': ['Natural', 'Mimosa', 'Honey', 'Ginger', 'Toffee', 'Spiced Rum', 'Harvest', 'Sangria', 'Copper', 'Cayenne', 'Bourbon', 'Sedona', 'Hawthorne', 'Kona', 'Kodiak', 'Charcoal', 'Crimson', 'Seaside', 'Beachwood', 'Harbor Mist'],
  Maple: ['Natural', 'Pecan', 'Mimosa', 'Kaffe', 'Wheat', 'Buckskin', 'Cinnamon', 'Cider', 'Nutmeg', 'Truffle', 'Cabernet', 'Merlot', 'Sedona', 'French Roast', 'Driftwood', 'Coastal Fog'],
  Cherry: ['Natural', 'Harvest', 'Pecan', 'Ginger', 'Spiced Rum', 'Sorrel', 'Sedona', 'Brandywine', 'Bordeaux', 'Coffee Bean', 'Java', 'French Roast', 'Driftwood', 'Coastal Fog'],
  Beech: ['Natural', 'Pecan', 'Buckskin', 'Cinnamon', 'Cider', 'Nutmeg', 'Truffle', 'Kaffe', 'Cabernet', 'Merlot', 'Sedona', 'French Roast'],
  'Red Oak': ['Natural', 'Smoked Paprika', 'Hazelnut', 'Harvest', 'Brandywine', 'Russet', 'Sorrel', 'Gunstock', 'Woodbridge', 'Java', 'Coffee Bean', 'French Roast'],
};
STAINS_BY_SPECIES['Alder (Knotty)'] = STAINS_BY_SPECIES['Alder (Clear)'];

export const EDGE_PROFILES: Option[] = [
  { value: 'Square', label: 'Square' },
  { value: 'Eased', label: 'Eased (light round-over)' },
  { value: 'Bevel / Chamfer', label: 'Bevel / Chamfer' },
  { value: 'Ogee', label: 'Ogee' },
  { value: 'Cove', label: 'Cove' },
  { value: 'Bead', label: 'Bead' },
  { value: 'Other', label: 'Other' },
];

export type HingeSide = 'L' | 'R' | 'Pair' | 'None';

export const HINGE_OPTIONS: { value: HingeSide; label: string; title: string }[] = [
  { value: 'L', label: 'L', title: 'Hinges on the left (viewed from the front)' },
  { value: 'R', label: 'R', title: 'Hinges on the right (viewed from the front)' },
  { value: 'Pair', label: 'Pair', title: 'Two doors meeting in one opening (one left, one right)' },
  { value: 'None', label: 'None', title: 'No hinge — drawer front or fixed panel' },
];

export type MeasurementType = 'Exact Door Size' | 'Opening Size';

// Sanity limits for a single door, in inches.
export const MIN_DIMENSION = 2;
export const MAX_DIMENSION = 96;

/* ───── Fit & hardware ───── */
// "Not sure" is always allowed — Robert confirms these before building.

export const CABINET_THICKNESS: Option[] = [
  { value: '3/4"', label: '3/4"', hint: 'Standard' },
  { value: '7/8"', label: '7/8"' },
  { value: '1"', label: '1"', hint: 'Heavy duty' },
  { value: 'Not sure', label: 'Not sure' },
];

export const INTERIOR_THICKNESS: Option[] = [
  { value: '1 3/8"', label: '1 3/8"', hint: 'Most interior doors' },
  { value: '1 3/4"', label: '1 3/4"', hint: 'Solid / heavier doors' },
  { value: 'Not sure', label: 'Not sure' },
];

export const CABINET_TYPES: Option[] = [
  { value: 'Face Frame', label: 'Face Frame', hint: 'A wood frame around each opening' },
  { value: 'Frameless', label: 'Frameless', hint: 'No frame — box edges show (European)' },
  { value: 'Not sure', label: 'Not sure' },
];

export const OVERLAYS: Option[] = [
  { value: 'Full Overlay', label: 'Full Overlay', hint: 'Door covers almost all of the frame' },
  { value: 'Partial Overlay', label: 'Partial Overlay', hint: 'Some frame shows around the door' },
  { value: 'Inset', label: 'Inset', hint: 'Door sits inside the frame, flush' },
  { value: 'Not sure', label: 'Not sure' },
];

export const HINGE_BORING: Option[] = [
  { value: 'Drill for concealed hinges', label: 'Yes, drill hinge cups', hint: '35mm holes for hidden (European) hinges' },
  { value: 'No drilling', label: 'No drilling', hint: "I'll drill them or use other hinges" },
  { value: 'Not sure', label: 'Not sure' },
];

export const FRAME_WIDTHS: Option[] = [
  { value: 'Standard (2 1/4")', label: 'Standard — 2 1/4"', hint: 'Most common' },
  { value: 'Wide (3")', label: 'Wide — 3"', hint: 'Bolder, traditional look' },
  { value: 'Slim (1/2" – 1")', label: 'Slim — 1/2" to 1"', hint: 'Modern "Euro Shaker"' },
  { value: 'Custom', label: 'Custom width', hint: 'Tell us the width' },
  { value: 'Not sure', label: 'Not sure' },
];

export const PULL_HOLES: Option[] = [
  { value: 'No holes', label: 'No holes', hint: "I'll drill them myself" },
  { value: 'Knobs', label: 'Yes — knobs', hint: 'One hole' },
  { value: 'Pulls', label: 'Yes — pulls', hint: 'Two holes — tell us the spacing' },
  { value: 'Not sure', label: 'Not sure' },
];

export const INTERIOR_HANGING: Option[] = [
  { value: 'Slab only', label: 'Door only (slab)', hint: 'Fits your existing frame' },
  { value: 'Prehung', label: 'Prehung', hint: 'Door comes hung in a new frame' },
  { value: 'Not sure', label: 'Not sure' },
];

export const LOCK_BORE: Option[] = [
  { value: 'Bore for knob/lever (2 3/8" backset)', label: 'Yes — 2 3/8" backset', hint: 'Most common' },
  { value: 'Bore for knob/lever (2 3/4" backset)', label: 'Yes — 2 3/4" backset' },
  { value: 'No bore', label: 'No hole' },
  { value: 'Not sure', label: 'Not sure' },
];

export const DELIVERY: Option[] = [
  { value: 'Pickup', label: 'Pick up at the shop', hint: 'NE Portland' },
  { value: 'Delivery', label: 'Deliver to me', hint: 'Robert will quote delivery' },
];
