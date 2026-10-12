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
  { value: 'Other', label: 'Other' },
];

export const WOOD_SPECIES: Option[] = [
  { value: 'White Oak', label: 'White Oak' },
  { value: 'Red Oak', label: 'Red Oak' },
  { value: 'Hard Maple', label: 'Hard Maple' },
  { value: 'Paint-Grade Maple', label: 'Paint-Grade Maple' },
  { value: 'Walnut', label: 'Walnut' },
  { value: 'Cherry', label: 'Cherry' },
  { value: 'Alder', label: 'Alder' },
  { value: 'MDF (paint grade)', label: 'MDF (paint grade)' },
  { value: 'Other', label: 'Other' },
];

export const FINISHES: Option[] = [
  { value: 'Unfinished', label: 'Unfinished', hint: 'Sanded, ready for your finish' },
  { value: 'Primed', label: 'Primed', hint: 'Ready to paint' },
  { value: 'Clear Coat', label: 'Clear Coat', hint: 'Natural wood colour' },
  { value: 'Stained', label: 'Stained', hint: 'Tell us the stain colour' },
  { value: 'Painted', label: 'Painted', hint: 'Tell us the paint colour' },
  { value: 'Other', label: 'Other' },
];

// Finishes that need a colour name typed in.
export const FINISHES_NEEDING_COLOR = new Set(['Stained', 'Painted', 'Other']);

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
  { value: 'Standard', label: 'Standard', hint: "Robert's usual frame width" },
  { value: 'Narrow', label: 'Narrow / Slim', hint: 'Thin modern frame' },
  { value: 'Custom', label: 'Custom width', hint: 'Tell us the width' },
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
