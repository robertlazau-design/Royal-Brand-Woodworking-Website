import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User, Building2, Phone, Mail, FolderOpen, CalendarDays, CheckCircle, ChevronLeft, ChevronRight,
  Plus, Copy, Trash2, Send, Printer, RotateCcw, AlertCircle, Ruler, Info, Pencil,
} from 'lucide-react';
import { DoorPreview } from '../components/DoorPreview';
import {
  DOOR_TYPES, DOOR_STYLES, PANEL_STYLES, WOOD_SPECIES, FINISHES, FINISHES_NEEDING_COLOR, EDGE_PROFILES,
  HINGE_OPTIONS, MIN_DIMENSION, MAX_DIMENSION, type HingeSide, type MeasurementType, type Option,
  CABINET_THICKNESS, INTERIOR_THICKNESS, CABINET_TYPES, OVERLAYS, HINGE_BORING, FRAME_WIDTHS,
  INTERIOR_HANGING, LOCK_BORE, DELIVERY, PULL_HOLES, PAINT_GRADE, PAINT_GRADE_FINISHES, STAINS_BY_SPECIES,
} from '../data/doorOptions';
import { parseInches, formatInches } from '../lib/fractions';
import { submitToWeb3Forms } from '../lib/submitForm';
import { BUSINESS } from '../data/business';

/* ───── types & state ───── */

interface DoorRow {
  id: string;
  qty: string;
  width: string;
  height: string;
  hinge: HingeSide | '';
  notes: string;
}

interface OrderState {
  name: string;
  company: string;
  phone: string;
  email: string;
  project: string;
  doorType: string;
  doorTypeOther: string;
  doorStyle: string;
  doorStyleOther: string;
  panelStyle: string;
  panelStyleOther: string;
  species: string;
  speciesOther: string;
  finish: string;
  finishColor: string;
  finishCustom: boolean; // stain typed in rather than picked from the list
  edge: string;
  edgeOther: string;
  doorReference: string;
  // Fit & hardware
  thickness: string;
  cabinetType: string;
  overlay: string;
  overlayAmount: string;
  hingeBoring: string;
  frameWidth: string;
  frameWidthCustom: string;
  hanging: string;
  jambWidth: string;
  lockBore: string;
  pullHoles: string;
  pullSpacing: string;
  // Door list + logistics
  measurement: MeasurementType | '';
  rows: DoorRow[];
  orderNotes: string;
  neededBy: string;
  delivery: string;
  deliveryAddress: string;
}

const newRow = (): DoorRow => ({
  id: Math.random().toString(36).slice(2, 10),
  qty: '1',
  width: '',
  height: '',
  hinge: '',
  notes: '',
});

const emptyOrder = (): OrderState => ({
  name: '', company: '', phone: '', email: '', project: '',
  doorType: '', doorTypeOther: '',
  doorStyle: '', doorStyleOther: '',
  panelStyle: '', panelStyleOther: '',
  species: '', speciesOther: '',
  finish: '', finishColor: '', finishCustom: false,
  edge: '', edgeOther: '', doorReference: '',
  thickness: '', cabinetType: '', overlay: '', overlayAmount: '', hingeBoring: '',
  frameWidth: '', frameWidthCustom: '', hanging: '', jambWidth: '', lockBore: '', pullHoles: '', pullSpacing: '',
  measurement: '',
  rows: [newRow(), newRow(), newRow()],
  orderNotes: '',
  neededBy: '', delivery: '', deliveryAddress: '',
});

const isInterior = (o: OrderState) => o.doorType === 'Interior Doors';
const hasFrame = (o: OrderState) => o.doorStyle !== 'Slab';
const needsHinges = (o: OrderState) => o.doorType !== 'Drawer Fronts';

// Fit & hardware answers that apply to this order, as label → value (blank ones skipped).
function fitSummary(o: OrderState): [string, string][] {
  const rows: [string, string][] = [['Thickness', o.thickness]];
  if (isInterior(o)) {
    rows.push(['Hanging', o.hanging]);
    if (o.hanging === 'Prehung' && o.jambWidth.trim()) rows.push(['Jamb Width', o.jambWidth.trim()]);
    rows.push(['Lockset Hole', o.lockBore]);
  } else {
    rows.push(['Cabinet Type', o.cabinetType]);
    rows.push(['Overlay', o.overlay + (o.overlayAmount.trim() ? ` (${o.overlayAmount.trim()})` : '')]);
    if (needsHinges(o)) rows.push(['Hinge Holes', o.hingeBoring]);
  }
  if (!isInterior(o)) rows.push(['Knob / Pull Holes', o.pullHoles === 'Pulls' && o.pullSpacing.trim() ? `Pulls, ${o.pullSpacing.trim()} spacing` : o.pullHoles]);
  if (hasFrame(o)) rows.push(['Frame Width', o.frameWidth === 'Custom' ? `Custom: ${o.frameWidthCustom.trim()}` : o.frameWidth]);
  return rows.filter(([, v]) => v);
}

const DRAFT_KEY = 'rbw-door-order-draft-v2';

function loadDraft(): OrderState {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<OrderState>;
      const base = emptyOrder();
      return { ...base, ...parsed, rows: parsed.rows?.length ? parsed.rows : base.rows };
    }
  } catch { /* storage unavailable — start fresh */ }
  return emptyOrder();
}

function saveDraft(order: OrderState) {
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(order)); } catch { /* ignore */ }
}

function clearDraft() {
  try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
}

/* ───── derived helpers ───── */

const withOther = (value: string, other: string) => (value === 'Other' ? `Other: ${other.trim()}` : value);

function specSummary(o: OrderState) {
  return {
    doorType: withOther(o.doorType, o.doorTypeOther),
    doorStyle: withOther(o.doorStyle, o.doorStyleOther),
    panelStyle: o.doorStyle === 'Slab' ? 'N/A (slab door)' : withOther(o.panelStyle, o.panelStyleOther),
    species: withOther(o.species, o.speciesOther),
    finish: FINISHES_NEEDING_COLOR.has(o.finish) ? `${o.finish}: ${o.finishColor.trim()}` : o.finish,
    edge: withOther(o.edge, o.edgeOther),
  };
}

const isRowBlank = (r: DoorRow) => !r.width.trim() && !r.height.trim() && !r.notes.trim() && !r.hinge;

function rowErrors(r: DoorRow) {
  const errs: Partial<Record<'qty' | 'width' | 'height' | 'hinge', string>> = {};
  const q = Number(r.qty);
  if (!Number.isInteger(q) || q < 1) errs.qty = 'Qty must be 1 or more';
  for (const key of ['width', 'height'] as const) {
    const v = parseInches(r[key]);
    if (!r[key].trim()) errs[key] = 'Required';
    else if (v === null) errs[key] = 'Use a number like 15 3/8';
    else if (v < MIN_DIMENSION || v > MAX_DIMENSION) errs[key] = `Between ${MIN_DIMENSION}" and ${MAX_DIMENSION}"`;
  }
  if (!r.hinge) errs.hinge = 'Pick a hinge side';
  return errs;
}

// "2026-11-03" -> "November 3, 2026" (parsed as a local date, not UTC)
function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function stepErrors(step: number, o: OrderState): string[] {
  const e: string[] = [];
  if (step === 1) {
    if (!o.name.trim()) e.push('name');
    if (o.phone.replace(/\D/g, '').length < 10) e.push('phone');
    if (!EMAIL_RE.test(o.email.trim())) e.push('email');
  }
  if (step === 2) {
    if (!o.doorType || (o.doorType === 'Other' && !o.doorTypeOther.trim())) e.push('doorType');
    if (!o.doorStyle || (o.doorStyle === 'Other' && !o.doorStyleOther.trim())) e.push('doorStyle');
    if (o.doorStyle !== 'Slab' && (!o.panelStyle || (o.panelStyle === 'Other' && !o.panelStyleOther.trim()))) e.push('panelStyle');
    if (!o.species || (o.species === 'Other' && !o.speciesOther.trim())) e.push('species');
    if (!o.finish || (FINISHES_NEEDING_COLOR.has(o.finish) && !o.finishColor.trim())) e.push('finish');
    if (!o.edge || (o.edge === 'Other' && !o.edgeOther.trim())) e.push('edge');
  }
  if (step === 3) {
    if (!o.thickness) e.push('thickness');
    if (isInterior(o)) {
      if (!o.hanging) e.push('hanging');
      if (!o.lockBore) e.push('lockBore');
    } else {
      if (!o.cabinetType) e.push('cabinetType');
      if (!o.overlay) e.push('overlay');
      if (needsHinges(o) && !o.hingeBoring) e.push('hingeBoring');
      if (!o.pullHoles) e.push('pullHoles');
    }
    if (hasFrame(o) && (!o.frameWidth || (o.frameWidth === 'Custom' && !o.frameWidthCustom.trim()))) e.push('frameWidth');
  }
  if (step === 4) {
    if (!o.measurement) e.push('measurement');
    const filled = o.rows.filter(r => !isRowBlank(r));
    if (filled.length === 0) e.push('rows-empty');
    if (filled.some(r => Object.keys(rowErrors(r)).length > 0)) e.push('rows');
    if (!o.delivery) e.push('delivery');
    if (o.delivery === 'Delivery' && !o.deliveryAddress.trim()) e.push('deliveryAddress');
  }
  return e;
}

// One readable line per size — email clients don't keep fixed-width columns aligned.
function buildDoorList(rows: DoorRow[]) {
  return rows
    .map((r, i) => {
      const w = formatInches(parseInches(r.width)!);
      const h = formatInches(parseInches(r.height)!);
      const hinge = r.hinge === 'None' ? 'no hinge' : r.hinge === 'Pair' ? 'pair (L + R)' : `hinge ${r.hinge}`;
      return `${i + 1}) Qty ${r.qty} — ${w} W × ${h} H — ${hinge}${r.notes.trim() ? ` — ${r.notes.trim()}` : ''}`;
    })
    .join('\n');
}

const STEPS = [
  { num: 1, label: 'Your Info' },
  { num: 2, label: 'Door Specs' },
  { num: 3, label: 'Fit & Hardware' },
  { num: 4, label: 'Door List' },
  { num: 5, label: 'Review & Send' },
];

/* ───── small UI pieces ───── */

const inputBase =
  'w-full bg-royal-bg border text-white px-3.5 py-3 text-sm focus:outline-none focus:border-royal-gold transition-colors placeholder:text-royal-text-muted/40';

function fieldBorder(invalid: boolean) {
  return invalid ? 'border-red-400/70' : 'border-royal-border';
}

function FieldLabel({ children, required, htmlFor }: { children: React.ReactNode; required?: boolean; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-[11px] font-bold text-royal-text-muted uppercase tracking-wider mb-2">
      {children} {required && <span className="text-royal-gold">*</span>}
    </label>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-red-300 text-[11px] mt-1.5 flex items-center gap-1">
      <AlertCircle className="w-3 h-3 shrink-0" /> {children}
    </p>
  );
}

function IconInput({
  icon, id, invalid, ...props
}: { icon: React.ReactNode; id: string; invalid?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-royal-text-muted/50 pointer-events-none">{icon}</span>
      <input id={id} {...props} className={`${inputBase} pl-10 ${fieldBorder(!!invalid)}`} />
    </div>
  );
}

function ChoiceCards({
  options, value, onChange, columns = 'grid-cols-2 sm:grid-cols-4', invalid,
}: { options: Option[]; value: string; onChange: (v: string) => void; columns?: string; invalid?: boolean }) {
  return (
    <div className={`grid ${columns} gap-2`} role="radiogroup">
      {options.map(opt => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={opt.label}
            onClick={() => onChange(opt.value)}
            className={`text-left p-3 border transition-all ${
              selected
                ? 'border-royal-gold bg-royal-gold/10 shadow-[0_0_14px_rgba(201,164,122,0.15)]'
                : `${invalid ? 'border-red-400/50' : 'border-royal-border'} bg-royal-bg hover:border-royal-gold/60`
            }`}
          >
            <span className="flex items-center justify-between gap-2">
              <span className={`text-sm font-bold ${selected ? 'text-white' : 'text-gray-200'}`}>{opt.label}</span>
              <span className={`w-3.5 h-3.5 rounded-full border shrink-0 ${selected ? 'border-royal-gold bg-royal-gold' : 'border-royal-border'}`} />
            </span>
            {opt.hint && <span className="block text-[11px] text-royal-text-muted mt-1 leading-snug">{opt.hint}</span>}
          </button>
        );
      })}
    </div>
  );
}

function SpecSelect({
  id, options, value, onChange, invalid,
}: { id: string; options: Option[]; value: string; onChange: (v: string) => void; invalid?: boolean }) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`${inputBase} ${fieldBorder(!!invalid)} appearance-none cursor-pointer pr-10`}
      >
        <option value="" disabled>Select…</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronRight className="w-4 h-4 rotate-90 absolute right-3.5 top-1/2 -translate-y-1/2 text-royal-text-muted pointer-events-none" />
    </div>
  );
}

function MeasureDiagram({ kind }: { kind: MeasurementType }) {
  return kind === 'Exact Door Size' ? (
    <svg viewBox="0 0 80 64" className="w-20 h-16 shrink-0" aria-hidden>
      <rect x="22" y="10" width="36" height="46" fill="#c9a47a" fillOpacity="0.25" stroke="#c9a47a" strokeWidth="1.5" />
      <rect x="29" y="17" width="22" height="32" fill="none" stroke="#c9a47a" strokeOpacity="0.6" />
      <path d="M22 5 H58 M22 2 V8 M58 2 V8" stroke="#fff" strokeWidth="1.2" />
      <path d="M15 10 V56 M12 10 H18 M12 56 H18" stroke="#fff" strokeWidth="1.2" />
    </svg>
  ) : (
    <svg viewBox="0 0 80 64" className="w-20 h-16 shrink-0" aria-hidden>
      <rect x="16" y="4" width="48" height="56" fill="none" stroke="#a1a1aa" strokeWidth="5" />
      <rect x="18.5" y="6.5" width="43" height="51" fill="#000" fillOpacity="0.4" />
      <path d="M19 32 H61 M19 29 V35 M61 29 V35" stroke="#fff" strokeWidth="1.2" />
      <path d="M40 7 V57 M37 7 H43 M37 57 H43" stroke="#fff" strokeWidth="1.2" />
    </svg>
  );
}

/* ───── page ───── */

export function OrderPage() {
  const [order, setOrder] = useState<OrderState>(loadDraft);
  const [step, setStep] = useState(1);
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ order: OrderState; date: string } | null>(null);

  const orderDate = useMemo(
    () => new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    [],
  );

  useEffect(() => { if (!submitted) saveDraft(order); }, [order, submitted]);
  // On step change, bring the progress bar (not the page header) to the top of the screen.
  const stepperRef = useRef<HTMLOListElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    if (submitted) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    stepperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step, submitted]);

  const set = <K extends keyof OrderState>(key: K, value: OrderState[K]) =>
    setOrder(o => ({ ...o, [key]: value }));

  // Switching wood can invalidate the finish (paint-grade can't be stained) or the stain color list.
  const changeSpecies = (species: string) =>
    setOrder(o => {
      const next = { ...o, species };
      if (species === PAINT_GRADE && o.finish && !PAINT_GRADE_FINISHES.has(o.finish)) {
        next.finish = '';
        next.finishColor = '';
      }
      if (o.finish === 'Stained' && !o.finishCustom) next.finishColor = '';
      return next;
    });

  const changeFinish = (finish: string) =>
    setOrder(o => ({ ...o, finish, finishColor: finish === o.finish ? o.finishColor : '', finishCustom: false }));

  const updateRow = (id: string, patch: Partial<DoorRow>) =>
    setOrder(o => ({ ...o, rows: o.rows.map(r => (r.id === id ? { ...r, ...patch } : r)) }));

  const addRow = (after?: DoorRow) =>
    setOrder(o => {
      const row = after ? { ...after, id: newRow().id } : newRow();
      if (!after) return { ...o, rows: [...o.rows, row] };
      const idx = o.rows.findIndex(r => r.id === after.id);
      const rows = [...o.rows];
      rows.splice(idx + 1, 0, row);
      return { ...o, rows };
    });

  const removeRow = (id: string) =>
    setOrder(o => ({ ...o, rows: o.rows.length > 1 ? o.rows.filter(r => r.id !== id) : [newRow()] }));

  const errors = stepErrors(step, order);
  const err = (key: string) => showErrors && errors.includes(key);

  const filledRows = order.rows.filter(r => !isRowBlank(r));
  const totalDoors = filledRows.reduce((n, r) => n + (Number(r.qty) || 0), 0);

  const firstSized = filledRows.find(r => parseInches(r.width) && parseInches(r.height));
  const previewW = firstSized ? parseInches(firstSized.width) : null;
  const previewH = firstSized ? parseInches(firstSized.height) : null;

  function goNext() {
    if (errors.length) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStep(s => Math.min(STEPS.length, s + 1));
  }

  function goTo(target: number) {
    // Allow jumping back freely; jumping forward only through valid steps.
    if (target < step) { setShowErrors(false); setStep(target); return; }
    for (let s = step; s < target; s++) {
      if (stepErrors(s, order).length) { setStep(s); setShowErrors(true); return; }
    }
    setShowErrors(false);
    setStep(target);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);
    const specs = specSummary(order);
    const rows = order.rows.filter(r => !isRowBlank(r));
    try {
      await submitToWeb3Forms({
        subject: `${specs.doorType} Order — ${order.name.trim()}${order.project.trim() ? ` — ${order.project.trim()}` : ''} (${totalDoors} doors)`,
        from_name: 'Royal Brand Woodworking — Door Order Form',
        name: order.name.trim(),
        company: order.company.trim() || '-',
        phone: order.phone.trim(),
        email: order.email.trim(),
        job_project_name: order.project.trim() || '-',
        order_date: orderDate,
        door_type: specs.doorType,
        door_style: specs.doorStyle,
        panel_style: specs.panelStyle,
        wood_species_material: specs.species,
        finish_color: specs.finish,
        profile_edge_detail: specs.edge,
        door_reference: order.doorReference.trim() || '-',
        fit_and_hardware: fitSummary(order).map(([l, v]) => `${l}: ${v}`).join('\n'),
        measurements_are: order.measurement,
        total_doors: String(totalDoors),
        door_list: buildDoorList(rows),
        order_notes: order.orderNotes.trim() || '-',
        pickup_or_delivery: order.delivery === 'Delivery' ? `Delivery to: ${order.deliveryAddress.trim()}` : order.delivery,
        needed_by: order.neededBy ? formatDate(order.neededBy) : 'No deadline given',
      });
      setSubmitted({ order: { ...order, rows }, date: orderDate });
      clearDraft();
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function startNewOrder() {
    clearDraft();
    setOrder(emptyOrder());
    setSubmitted(null);
    setShowErrors(false);
    setStep(1);
  }

  /* ── confirmation ── */
  if (submitted) {
    const s = submitted.order;
    const n = s.rows.reduce((t, r) => t + Number(r.qty), 0);
    return (
      <>
        <section className="py-24 bg-royal-bg text-royal-text min-h-screen print:hidden">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-royal-gold/15 flex items-center justify-center mx-auto mb-8 border border-royal-gold/30">
              <CheckCircle className="w-10 h-10 text-royal-gold" />
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-white font-bold mb-4 tracking-wide uppercase">Order Received</h1>
            <p className="text-royal-text-muted text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto mb-10">
              Thanks, <span className="text-white font-semibold">{s.name.split(' ')[0]}</span>. Your order for{' '}
              <span className="text-white font-semibold">{n} {n === 1 ? 'door' : 'doors'}</span> was sent to Robert. He'll review every
              measurement and contact you at <span className="text-royal-gold">{s.phone}</span> or{' '}
              <span className="text-white">{s.email}</span> with pricing and a build timeline. Nothing is built until you approve the quote.
            </p>
            <p className="text-sm text-royal-text-muted max-w-lg mx-auto -mt-6 mb-10 p-4 border border-royal-gold/30 bg-royal-gold/5">
              <strong className="text-white">Have photos of your cabinets or old doors?</strong> Text them to{' '}
              <a href={BUSINESS.phoneHref} className="text-royal-gold">{BUSINESS.phoneDisplay}</a> or email{' '}
              <a href={`mailto:${BUSINESS.email}`} className="text-royal-gold break-all">{BUSINESS.email}</a> with your name — it helps Robert get everything right.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.print()}
                className="px-8 py-3.5 bg-royal-gold text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print / Save a Copy
              </button>
              <button
                onClick={startNewOrder}
                className="px-8 py-3.5 border border-royal-border text-white font-bold text-xs uppercase tracking-wider hover:border-royal-gold hover:text-royal-gold transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Start a New Order
              </button>
            </div>
          </div>
        </section>
        <PrintableOrder order={s} date={submitted.date} />
      </>
    );
  }

  const specs = specSummary(order);

  return (
    <>
      <section className="py-20 md:py-24 bg-royal-bg text-royal-text min-h-screen relative overflow-hidden print:hidden">
        {/* Ambient header image */}
        <div className="absolute top-0 left-0 right-0 h-96 z-0 overflow-hidden pointer-events-none">
          <img src="/photos/web/wide-belt-sander-exit.jpg" alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-royal-bg/40 via-royal-bg/85 to-royal-bg" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 text-royal-gold mb-4">
              <div className="w-12 h-[1px] bg-royal-gold" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Royal Brand Custom Doors</span>
              <div className="w-12 h-[1px] bg-royal-gold" />
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-white font-bold mb-5 tracking-wide uppercase">
              Custom Door Order
            </h1>
            <p className="text-royal-text-muted text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Tell us the style, wood and finish once, then list every door you need. Robert checks each measurement and
              contacts you with a quote — <span className="text-white">nothing is built or charged until you approve it.</span>
            </p>
          </div>

          {/* Stepper */}
          <ol ref={stepperRef} className="scroll-mt-24 flex items-start justify-center mb-10 max-w-2xl mx-auto">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.num}>
                <li>
                  <button type="button" onClick={() => goTo(s.num)} className="flex flex-col items-center gap-2 group">
                    <span
                      className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        step === s.num
                          ? 'bg-royal-gold text-white shadow-[0_0_20px_rgba(201,164,122,0.3)]'
                          : step > s.num
                            ? 'bg-royal-gold/20 text-royal-gold border border-royal-gold/40'
                            : 'border border-royal-border text-royal-text-muted group-hover:border-royal-gold/50'
                      }`}
                    >
                      {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                    </span>
                    <span className={`text-[9px] md:text-[10px] uppercase tracking-wider font-bold text-center ${step >= s.num ? 'text-royal-gold' : 'text-royal-text-muted'}`}>
                      {s.label}
                    </span>
                  </button>
                </li>
                {i < STEPS.length - 1 && (
                  <li aria-hidden className={`flex-1 h-[1px] mt-[18px] md:mt-5 mx-2 md:mx-4 ${step > s.num ? 'bg-royal-gold' : 'bg-royal-border'}`} />
                )}
              </React.Fragment>
            ))}
          </ol>

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* ─── Main panel ─── */}
            <div className={`${step === 4 ? 'lg:col-span-12' : 'lg:col-span-8'} bg-royal-charcoal border border-royal-border p-5 sm:p-8`}>
              {showErrors && errors.length > 0 && (
                <div className="mb-6 p-3.5 border border-red-400/40 bg-red-400/5 text-red-200 text-sm flex items-start gap-2.5" role="alert">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>A few things need attention before you continue — they're highlighted below.</span>
                </div>
              )}

              {/* STEP 1 — customer info */}
              {step === 1 && (
                <div>
                  <StepTitle n={1} title="Your Information" sub="So Robert can reach you about this order." />
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                      <FieldLabel htmlFor="name" required>Customer Name</FieldLabel>
                      <IconInput id="name" icon={<User className="w-4 h-4" />} autoComplete="name" placeholder="Full name"
                        value={order.name} onChange={e => set('name', e.target.value)} invalid={err('name')} />
                      {err('name') && <ErrorText>Please enter your name</ErrorText>}
                    </div>
                    <div>
                      <FieldLabel htmlFor="phone" required>Phone</FieldLabel>
                      <IconInput id="phone" icon={<Phone className="w-4 h-4" />} type="tel" autoComplete="tel" placeholder="(503) 555-0123"
                        value={order.phone} onChange={e => set('phone', e.target.value)} invalid={err('phone')} />
                      {err('phone') && <ErrorText>Enter a 10-digit phone number</ErrorText>}
                    </div>
                    <div>
                      <FieldLabel htmlFor="email" required>Email</FieldLabel>
                      <IconInput id="email" icon={<Mail className="w-4 h-4" />} type="email" autoComplete="email" placeholder="you@example.com"
                        value={order.email} onChange={e => set('email', e.target.value)} invalid={err('email')} />
                      {err('email') && <ErrorText>Enter a valid email address</ErrorText>}
                    </div>
                    <div>
                      <FieldLabel htmlFor="company">Company <span className="normal-case font-normal tracking-normal">(optional)</span></FieldLabel>
                      <IconInput id="company" icon={<Building2 className="w-4 h-4" />} autoComplete="organization" placeholder="Contractor or business name"
                        value={order.company} onChange={e => set('company', e.target.value)} />
                    </div>
                    <div>
                      <FieldLabel htmlFor="project">Job / Project Name <span className="normal-case font-normal tracking-normal">(optional)</span></FieldLabel>
                      <IconInput id="project" icon={<FolderOpen className="w-4 h-4" />} placeholder="e.g. Miller kitchen remodel"
                        value={order.project} onChange={e => set('project', e.target.value)} />
                    </div>
                    <div className="sm:col-span-2 flex items-center gap-2 text-xs text-royal-text-muted">
                      <CalendarDays className="w-4 h-4 text-royal-gold" /> Order date: <span className="text-white">{orderDate}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 — door specifications */}
              {step === 2 && (
                <div>
                  <StepTitle n={2} title="Door Specifications" sub="These apply to every door in this order. Need a different style? Place a second order or add a note." />

                  {/* Mobile preview */}
                  <div className="lg:hidden max-w-[220px] mx-auto mb-6 border border-royal-border bg-royal-bg p-2">
                    <DoorPreview doorStyle={order.doorStyle} panelStyle={order.panelStyle} species={order.species} finish={order.finish} edgeProfile={order.edge} />
                  </div>

                  <div className="space-y-7">
                    <div>
                      <FieldLabel required>What Are You Ordering?</FieldLabel>
                      <ChoiceCards options={DOOR_TYPES} value={order.doorType} onChange={v => set('doorType', v)} invalid={err('doorType')} />
                      {order.doorType === 'Other' && (
                        <input className={`${inputBase} ${fieldBorder(err('doorType'))} mt-2`} placeholder="What kind of door?"
                          value={order.doorTypeOther} onChange={e => set('doorTypeOther', e.target.value)} />
                      )}
                      {err('doorType') && <ErrorText>Choose what you're ordering{order.doorType === 'Other' ? ' and describe it' : ''}</ErrorText>}
                    </div>

                    <div>
                      <FieldLabel required>Door Style</FieldLabel>
                      <ChoiceCards options={DOOR_STYLES} value={order.doorStyle} onChange={v => set('doorStyle', v)} invalid={err('doorStyle')} />
                      {order.doorStyle === 'Other' && (
                        <input className={`${inputBase} ${fieldBorder(err('doorStyle'))} mt-2`} placeholder="Describe the door style"
                          value={order.doorStyleOther} onChange={e => set('doorStyleOther', e.target.value)} />
                      )}
                      {err('doorStyle') && <ErrorText>Choose a door style{order.doorStyle === 'Other' ? ' and describe it' : ''}</ErrorText>}
                    </div>

                    {order.doorStyle !== 'Slab' && (
                      <div>
                        <FieldLabel required>Panel Style</FieldLabel>
                        <ChoiceCards options={PANEL_STYLES} value={order.panelStyle} onChange={v => set('panelStyle', v)} invalid={err('panelStyle')} />
                        {order.panelStyle === 'Other' && (
                          <input className={`${inputBase} ${fieldBorder(err('panelStyle'))} mt-2`} placeholder="Describe the panel (e.g. glass-ready, beadboard)"
                            value={order.panelStyleOther} onChange={e => set('panelStyleOther', e.target.value)} />
                        )}
                        {err('panelStyle') && <ErrorText>Choose a panel style{order.panelStyle === 'Other' ? ' and describe it' : ''}</ErrorText>}
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <FieldLabel htmlFor="species" required>Wood Species / Material</FieldLabel>
                        <SpecSelect id="species" options={WOOD_SPECIES} value={order.species} onChange={changeSpecies} invalid={err('species')} />
                        {order.species === 'Other' && (
                          <input className={`${inputBase} ${fieldBorder(err('species'))} mt-2`} placeholder="Which wood or material?"
                            value={order.speciesOther} onChange={e => set('speciesOther', e.target.value)} />
                        )}
                        {err('species') && <ErrorText>Choose a wood or material</ErrorText>}
                      </div>
                      <div>
                        <FieldLabel htmlFor="edge" required>Profile / Edge Detail</FieldLabel>
                        <SpecSelect id="edge" options={EDGE_PROFILES} value={order.edge} onChange={v => set('edge', v)} invalid={err('edge')} />
                        {order.edge === 'Other' && (
                          <input className={`${inputBase} ${fieldBorder(err('edge'))} mt-2`} placeholder="Describe the edge profile"
                            value={order.edgeOther} onChange={e => set('edgeOther', e.target.value)} />
                        )}
                        {err('edge') && <ErrorText>Choose an edge profile</ErrorText>}
                      </div>
                    </div>

                    <div>
                      <FieldLabel required>Finish / Color</FieldLabel>
                      <ChoiceCards
                        options={order.species === PAINT_GRADE ? FINISHES.filter(f => PAINT_GRADE_FINISHES.has(f.value)) : FINISHES}
                        value={order.finish} onChange={changeFinish} columns="grid-cols-2 sm:grid-cols-4" invalid={err('finish')} />
                      {order.species === PAINT_GRADE && (
                        <p className="text-[11px] text-royal-text-muted mt-1.5">Paint-grade wood is made for painting, so stain and clear coats aren't offered.</p>
                      )}
                      {order.finish === 'Stained' && STAINS_BY_SPECIES[order.species] && (
                        <div className="relative mt-2">
                          <select
                            aria-label="Stain color"
                            value={order.finishCustom ? '__other' : order.finishColor}
                            onChange={e => e.target.value === '__other'
                              ? setOrder(o => ({ ...o, finishCustom: true, finishColor: '' }))
                              : setOrder(o => ({ ...o, finishCustom: false, finishColor: e.target.value }))}
                            className={`${inputBase} ${fieldBorder(err('finish'))} appearance-none cursor-pointer pr-10`}
                          >
                            <option value="" disabled>Choose a stain color for {order.species}…</option>
                            {STAINS_BY_SPECIES[order.species].map(c => <option key={c} value={c}>{c}</option>)}
                            <option value="__other">Something else — I'll type it</option>
                          </select>
                          <ChevronRight className="w-4 h-4 rotate-90 absolute right-3.5 top-1/2 -translate-y-1/2 text-royal-text-muted pointer-events-none" />
                        </div>
                      )}
                      {FINISHES_NEEDING_COLOR.has(order.finish) && !(order.finish === 'Stained' && STAINS_BY_SPECIES[order.species] && !order.finishCustom) && (
                        <input className={`${inputBase} ${fieldBorder(err('finish'))} mt-2`}
                          placeholder={
                            order.finish === 'Stained' ? 'Stain color name (or describe the color you want)'
                            : order.finish === 'Painted' ? 'Sherwin-Williams or Benjamin Moore color name or number (e.g. SW 7008 Alabaster)'
                            : order.finish === 'Glazed / Distressed' ? 'Describe the look (e.g. white paint with a brown glaze)'
                            : 'Describe the finish'}
                          value={order.finishColor} onChange={e => set('finishColor', e.target.value)} />
                      )}
                      {err('finish') && <ErrorText>Choose a finish{FINISHES_NEEDING_COLOR.has(order.finish) ? ' and pick or enter the color' : ''}</ErrorText>}
                    </div>

                    <div>
                      <FieldLabel htmlFor="doorReference">Have a Specific Door in Mind? <span className="normal-case font-normal tracking-normal">(optional)</span></FieldLabel>
                      <input id="doorReference" className={`${inputBase} border-royal-border`}
                        placeholder="Model number, a link to a photo, or describe it"
                        value={order.doorReference} onChange={e => set('doorReference', e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 — fit & hardware */}
              {step === 3 && (
                <div>
                  <StepTitle n={3} title="Fit & Hardware"
                    sub={isInterior(order)
                      ? 'How the doors will hang. Not sure? Pick "Not sure" — Robert will go over it with you.'
                      : 'How the doors fit your cabinets. Not sure? Pick "Not sure" — Robert will go over it with you.'} />

                  <div className="space-y-7">
                    <div>
                      <FieldLabel required>Door Thickness</FieldLabel>
                      <ChoiceCards options={isInterior(order) ? INTERIOR_THICKNESS : CABINET_THICKNESS} value={order.thickness}
                        onChange={v => set('thickness', v)} invalid={err('thickness')} />
                      {err('thickness') && <ErrorText>Choose a thickness</ErrorText>}
                    </div>

                    {isInterior(order) ? (
                      <>
                        <div>
                          <FieldLabel required>Door Only or Prehung?</FieldLabel>
                          <ChoiceCards options={INTERIOR_HANGING} value={order.hanging} onChange={v => set('hanging', v)}
                            columns="grid-cols-1 sm:grid-cols-3" invalid={err('hanging')} />
                          {order.hanging === 'Prehung' && (
                            <input className={`${inputBase} border-royal-border mt-2`} placeholder='Wall / jamb width, if you know it (e.g. 4 9/16")'
                              value={order.jambWidth} onChange={e => set('jambWidth', e.target.value)} />
                          )}
                          {err('hanging') && <ErrorText>Choose one</ErrorText>}
                        </div>
                        <div>
                          <FieldLabel required>Hole for a Knob or Lever?</FieldLabel>
                          <ChoiceCards options={LOCK_BORE} value={order.lockBore} onChange={v => set('lockBore', v)} invalid={err('lockBore')} />
                          <p className="text-[11px] text-royal-text-muted mt-1.5">Backset is the distance from the door edge to the centre of the knob — match your other doors.</p>
                          {err('lockBore') && <ErrorText>Choose one</ErrorText>}
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <FieldLabel required>Cabinet Type</FieldLabel>
                          <ChoiceCards options={CABINET_TYPES} value={order.cabinetType} onChange={v => set('cabinetType', v)}
                            columns="grid-cols-1 sm:grid-cols-3" invalid={err('cabinetType')} />
                          {err('cabinetType') && <ErrorText>Choose a cabinet type</ErrorText>}
                        </div>
                        <div>
                          <FieldLabel required>How Do the Doors Sit?</FieldLabel>
                          <ChoiceCards options={OVERLAYS} value={order.overlay} onChange={v => set('overlay', v)} invalid={err('overlay')} />
                          {(order.overlay === 'Full Overlay' || order.overlay === 'Partial Overlay') && (
                            <input className={`${inputBase} border-royal-border mt-2`}
                              placeholder='How much the door overlaps the frame on each side, if you know it (e.g. 1/2")'
                              value={order.overlayAmount} onChange={e => set('overlayAmount', e.target.value)} />
                          )}
                          {err('overlay') && <ErrorText>Choose how the doors sit</ErrorText>}
                        </div>
                        {needsHinges(order) && <div>
                          <FieldLabel required>Drill Hinge Holes?</FieldLabel>
                          <ChoiceCards options={HINGE_BORING} value={order.hingeBoring} onChange={v => set('hingeBoring', v)}
                            columns="grid-cols-1 sm:grid-cols-3" invalid={err('hingeBoring')} />
                          {err('hingeBoring') && <ErrorText>Choose one</ErrorText>}
                        </div>}
                        <div>
                          <FieldLabel required>Drill Knob or Pull Holes?</FieldLabel>
                          <ChoiceCards options={PULL_HOLES} value={order.pullHoles} onChange={v => set('pullHoles', v)} invalid={err('pullHoles')} />
                          {order.pullHoles === 'Pulls' && (
                            <input className={`${inputBase} border-royal-border mt-2`}
                              placeholder='Distance between the two screw holes, if you know it (e.g. 3 3/4" or 128mm)'
                              value={order.pullSpacing} onChange={e => set('pullSpacing', e.target.value)} />
                          )}
                          {err('pullHoles') && <ErrorText>Choose one</ErrorText>}
                        </div>
                      </>
                    )}

                    {hasFrame(order) && (
                      <div>
                        <FieldLabel required>Frame Width</FieldLabel>
                        <ChoiceCards options={FRAME_WIDTHS} value={order.frameWidth} onChange={v => set('frameWidth', v)} invalid={err('frameWidth')} />
                        {order.frameWidth === 'Custom' && (
                          <input className={`${inputBase} ${fieldBorder(err('frameWidth'))} mt-2`} placeholder='Width of the frame pieces (e.g. 2 1/4")'
                            value={order.frameWidthCustom} onChange={e => set('frameWidthCustom', e.target.value)} />
                        )}
                        {err('frameWidth') && <ErrorText>Choose a frame width{order.frameWidth === 'Custom' ? ' and enter it' : ''}</ErrorText>}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4 — door list */}
              {step === 4 && (
                <div>
                  <StepTitle n={4} title="Door List" sub="One line per size. Fractions are fine — type 15 3/8 or 15.375." />

                  <FieldLabel required>Measurements Are</FieldLabel>
                  <div className="grid sm:grid-cols-2 gap-3 mb-2" role="radiogroup">
                    {(['Exact Door Size', 'Opening Size'] as MeasurementType[]).map(kind => {
                      const selected = order.measurement === kind;
                      return (
                        <button key={kind} type="button" role="radio" aria-checked={selected} onClick={() => set('measurement', kind)}
                          className={`flex items-center gap-3 p-3 border text-left transition-all ${
                            selected ? 'border-royal-gold bg-royal-gold/10' : `${err('measurement') ? 'border-red-400/50' : 'border-royal-border'} bg-royal-bg hover:border-royal-gold/60`
                          }`}>
                          <MeasureDiagram kind={kind} />
                          <span>
                            <span className="flex items-center gap-2 text-sm font-bold text-white">
                              <span className={`w-3.5 h-3.5 rounded-full border ${selected ? 'border-royal-gold bg-royal-gold' : 'border-royal-border'}`} />
                              {kind}
                            </span>
                            <span className="block text-[11px] text-royal-text-muted mt-1 leading-snug">
                              {kind === 'Exact Door Size'
                                ? 'The finished size of each door. We build exactly what you enter.'
                                : 'The inside of the cabinet opening. Robert works out the door size and overlay.'}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {err('measurement') && <ErrorText>Tell us which kind of measurement you're giving</ErrorText>}

                  <div className="flex items-start gap-2 text-[11px] text-royal-text-muted mt-4 mb-3 p-3 bg-white/[0.02] border border-royal-border">
                    <Info className="w-3.5 h-3.5 text-royal-gold shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Width</strong> is side to side, <strong className="text-white">height</strong> is top to bottom.
                      {isInterior(order)
                        ? <> Swing side is the hinge side as the door opens toward you. Choose <strong className="text-white">Pair</strong> for double doors.</>
                        : <> Hinge side is as you face the front of the door. Choose <strong className="text-white">Pair</strong> for two doors sharing one opening (enter the opening once), or <strong className="text-white">None</strong> for drawer fronts.</>}
                    </span>
                  </div>

                  <details className="mb-6 border border-royal-border bg-white/[0.02] group">
                    <summary className="cursor-pointer select-none p-3 text-xs font-bold text-royal-gold uppercase tracking-wider flex items-center gap-2">
                      <Ruler className="w-3.5 h-3.5" /> How to measure
                      <ChevronRight className="w-3.5 h-3.5 ml-auto transition-transform group-open:rotate-90" />
                    </summary>
                    <ul className="px-4 pb-4 space-y-2 text-xs text-royal-text-muted leading-relaxed list-disc pl-8">
                      <li>Use a metal tape and measure to the nearest <strong className="text-white">1/16"</strong>.</li>
                      <li><strong className="text-white">Replacing doors?</strong> Measure the old doors themselves and choose "Exact Door Size". It's the most reliable way.</li>
                      <li><strong className="text-white">Measuring openings?</strong> Measure inside the frame at the top, middle and bottom, and use the smallest number.</li>
                      <li>Measure every door, even ones that look the same — older cabinets often vary.</li>
                      <li>Write width first, then height.</li>
                      <li>Photos help a lot. After you send this, text or email photos of your cabinets to Robert at {BUSINESS.phoneDisplay} or {BUSINESS.email}.</li>
                    </ul>
                  </details>

                  {/* Column headers (desktop) */}
                  <div className="hidden md:grid grid-cols-[1.5rem_4rem_minmax(6.5rem,1fr)_minmax(6.5rem,1fr)_11rem_minmax(8rem,1.6fr)_4.5rem] gap-2 px-1 mb-2 text-[10px] font-bold uppercase tracking-wider text-royal-text-muted">
                    <span>#</span><span>Qty</span><span>Width</span><span>Height</span><span>{isInterior(order) ? 'Swing L/R' : 'Hinge L/R'}</span><span>Notes</span><span />
                  </div>

                  <div className="space-y-3 md:space-y-2">
                    {order.rows.map((row, i) => {
                      const blank = isRowBlank(row);
                      const re = showErrors && !blank ? rowErrors(row) : {};
                      const w = parseInches(row.width);
                      const h = parseInches(row.height);
                      return (
                        <div key={row.id}
                          className="grid grid-cols-[3.5rem_1fr_1fr] md:grid-cols-[1.5rem_4rem_minmax(6.5rem,1fr)_minmax(6.5rem,1fr)_11rem_minmax(8rem,1.6fr)_4.5rem] gap-2 items-start p-3 md:p-1 border border-royal-border md:border-0 bg-royal-bg md:bg-transparent">
                          <span className="hidden md:flex h-11 items-center text-xs text-royal-text-muted font-mono">{i + 1}</span>

                          <div>
                            <span className="md:hidden block text-[10px] uppercase tracking-wider text-royal-text-muted font-bold mb-1">Qty</span>
                            <input aria-label={`Line ${i + 1} quantity`} type="number" min={1} inputMode="numeric" value={row.qty}
                              onChange={e => updateRow(row.id, { qty: e.target.value })}
                              className={`${inputBase} ${fieldBorder(!!re.qty)} px-2 text-center h-11`} />
                          </div>

                          {(['width', 'height'] as const).map(dim => {
                            const parsed = dim === 'width' ? w : h;
                            return (
                              <div key={dim}>
                                <span className="md:hidden block text-[10px] uppercase tracking-wider text-royal-text-muted font-bold mb-1">{dim}</span>
                                <div className="relative">
                                  <input aria-label={`Line ${i + 1} ${dim} in inches`} placeholder={dim === 'width' ? '15 3/8' : '30'} value={row[dim]}
                                    onChange={e => updateRow(row.id, { [dim]: e.target.value })}
                                    className={`${inputBase} ${fieldBorder(!!re[dim])} pr-7 h-11`} />
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-royal-text-muted/60 text-sm pointer-events-none">"</span>
                                </div>
                                {re[dim] ? (
                                  <p className="text-red-300 text-[10px] mt-1">{re[dim]}</p>
                                ) : parsed !== null && row[dim].trim() !== formatInches(parsed).replace('"', '') ? (
                                  <p className="text-royal-gold/80 text-[10px] mt-1">= {formatInches(parsed)}</p>
                                ) : null}
                              </div>
                            );
                          })}

                          <div className="col-span-3 md:col-span-1">
                            <span className="md:hidden block text-[10px] uppercase tracking-wider text-royal-text-muted font-bold mb-1">{isInterior(order) ? 'Swing side' : 'Hinge side'}</span>
                            <div className={`grid grid-cols-4 border h-11 ${re.hinge ? 'border-red-400/70' : 'border-royal-border'}`} role="radiogroup" aria-label={`Line ${i + 1} hinge side`}>
                              {HINGE_OPTIONS.map(opt => (
                                <button key={opt.value} type="button" role="radio" aria-checked={row.hinge === opt.value} title={opt.title}
                                  onClick={() => updateRow(row.id, { hinge: opt.value })}
                                  className={`text-xs font-bold transition-colors ${
                                    row.hinge === opt.value ? 'bg-royal-gold text-white' : 'text-royal-text-muted hover:text-white hover:bg-white/5'
                                  }`}>
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                            {re.hinge && <p className="text-red-300 text-[10px] mt-1">{re.hinge}</p>}
                          </div>

                          <div className="col-span-3 md:col-span-1">
                            <span className="md:hidden block text-[10px] uppercase tracking-wider text-royal-text-muted font-bold mb-1">Notes</span>
                            <input aria-label={`Line ${i + 1} notes`} placeholder="Optional — e.g. sink base, glass" value={row.notes}
                              onChange={e => updateRow(row.id, { notes: e.target.value })}
                              onKeyDown={e => { if (e.key === 'Enter' && i === order.rows.length - 1) { e.preventDefault(); addRow(); } }}
                              className={`${inputBase} border-royal-border h-11`} />
                          </div>

                          <div className="col-span-3 md:col-span-1 flex md:h-11 items-center justify-end gap-1">
                            <button type="button" onClick={() => addRow(row)} title="Duplicate this line" aria-label={`Duplicate line ${i + 1}`}
                              className="p-2 text-royal-text-muted hover:text-royal-gold transition-colors flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold">
                              <Copy className="w-4 h-4" /><span className="md:hidden">Duplicate</span>
                            </button>
                            <button type="button" onClick={() => removeRow(row.id)} title="Remove this line" aria-label={`Remove line ${i + 1}`}
                              className="p-2 text-royal-text-muted hover:text-red-400 transition-colors flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold">
                              <Trash2 className="w-4 h-4" /><span className="md:hidden">Remove</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {err('rows-empty') && <ErrorText>Add at least one door to your list</ErrorText>}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
                    <button type="button" onClick={() => addRow()}
                      className="px-5 py-3 border border-dashed border-royal-gold/50 text-royal-gold font-bold text-xs uppercase tracking-wider hover:bg-royal-gold/10 transition-all flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" /> Add Another Size
                    </button>
                    <p className="text-xs text-royal-text-muted text-center sm:text-right">
                      <span className="text-white font-bold">{totalDoors}</span> {totalDoors === 1 ? 'door' : 'doors'} on{' '}
                      <span className="text-white font-bold">{filledRows.length}</span> {filledRows.length === 1 ? 'line' : 'lines'}
                    </p>
                  </div>

                  <div className="mt-8">
                    <FieldLabel htmlFor="orderNotes">Notes for the whole order <span className="normal-case font-normal tracking-normal">(optional)</span></FieldLabel>
                    <textarea id="orderNotes" rows={3} value={order.orderNotes} onChange={e => set('orderNotes', e.target.value)}
                      placeholder="Grain direction, anything that's different about certain doors…"
                      className={`${inputBase} border-royal-border resize-y`} />
                  </div>

                  <div className="mt-8 grid sm:grid-cols-2 gap-5">
                    <div>
                      <FieldLabel required>Pickup or Delivery?</FieldLabel>
                      <ChoiceCards options={DELIVERY} value={order.delivery} onChange={v => set('delivery', v)} columns="grid-cols-1" invalid={err('delivery')} />
                      {order.delivery === 'Delivery' && (
                        <input className={`${inputBase} ${fieldBorder(err('deliveryAddress'))} mt-2`} placeholder="Delivery address or ZIP code" autoComplete="street-address"
                          value={order.deliveryAddress} onChange={e => set('deliveryAddress', e.target.value)} />
                      )}
                      {err('delivery') && <ErrorText>Choose pickup or delivery</ErrorText>}
                      {err('deliveryAddress') && <ErrorText>Enter where to deliver</ErrorText>}
                    </div>
                    <div>
                      <FieldLabel htmlFor="neededBy">Need Them By <span className="normal-case font-normal tracking-normal">(optional)</span></FieldLabel>
                      <input id="neededBy" type="date" value={order.neededBy} onChange={e => set('neededBy', e.target.value)}
                        className={`${inputBase} border-royal-border [color-scheme:dark]`} />
                      <p className="text-[11px] text-royal-text-muted mt-1.5">Most orders take 2–3 weeks once sizes are confirmed.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5 — review */}
              {step === 5 && (
                <div>
                  <StepTitle n={5} title="Review & Send" sub="Check everything below. You can jump back to any section to fix it." />

                  <ReviewSection title="Customer" onEdit={() => goTo(1)}>
                    <ReviewRow label="Name" value={order.name} />
                    {order.company.trim() && <ReviewRow label="Company" value={order.company} />}
                    <ReviewRow label="Phone" value={order.phone} />
                    <ReviewRow label="Email" value={order.email} />
                    {order.project.trim() && <ReviewRow label="Job / Project" value={order.project} />}
                    <ReviewRow label="Order Date" value={orderDate} />
                  </ReviewSection>

                  <ReviewSection title="Door Specifications" onEdit={() => goTo(2)}>
                    <ReviewRow label="Ordering" value={specs.doorType} />
                    <ReviewRow label="Door Style" value={specs.doorStyle} />
                    <ReviewRow label="Panel Style" value={specs.panelStyle} />
                    <ReviewRow label="Wood / Material" value={specs.species} />
                    <ReviewRow label="Finish / Color" value={specs.finish} />
                    <ReviewRow label="Profile / Edge" value={specs.edge} />
                    {order.doorReference.trim() && <ReviewRow label="Door in Mind" value={order.doorReference} />}
                  </ReviewSection>

                  <ReviewSection title="Fit & Hardware" onEdit={() => goTo(3)}>
                    {fitSummary(order).map(([label, value]) => <React.Fragment key={label}><ReviewRow label={label} value={value} /></React.Fragment>)}
                  </ReviewSection>

                  <ReviewSection title={`Door List — ${order.measurement}`} onEdit={() => goTo(4)}>
                    <div className="overflow-x-auto -mx-1">
                      <table className="w-full text-sm min-w-[460px]">
                        <thead>
                          <tr className="text-[10px] uppercase tracking-wider text-royal-text-muted text-left border-b border-royal-border">
                            <th className="py-2 px-1 font-bold">Qty</th>
                            <th className="py-2 px-1 font-bold">Width</th>
                            <th className="py-2 px-1 font-bold">Height</th>
                            <th className="py-2 px-1 font-bold">Hinge</th>
                            <th className="py-2 px-1 font-bold">Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filledRows.map(r => (
                            <tr key={r.id} className="border-b border-royal-border/60">
                              <td className="py-2.5 px-1 text-white font-bold">{r.qty}</td>
                              <td className="py-2.5 px-1 text-white font-mono">{formatInches(parseInches(r.width)!)}</td>
                              <td className="py-2.5 px-1 text-white font-mono">{formatInches(parseInches(r.height)!)}</td>
                              <td className="py-2.5 px-1 text-white">{r.hinge}</td>
                              <td className="py-2.5 px-1 text-royal-text-muted">{r.notes || '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-royal-text-muted mt-3">
                      Total: <span className="text-white font-bold">{totalDoors} {totalDoors === 1 ? 'door' : 'doors'}</span>
                    </p>
                    {order.orderNotes.trim() && <ReviewRow label="Order Notes" value={order.orderNotes} />}
                    <ReviewRow label={order.delivery === 'Delivery' ? 'Deliver To' : 'Pickup / Delivery'} value={order.delivery === 'Delivery' ? order.deliveryAddress : order.delivery} />
                    {order.neededBy && <ReviewRow label="Needed By" value={formatDate(order.neededBy)} />}
                  </ReviewSection>

                  <div className="p-4 bg-royal-gold/5 border border-royal-gold/20 text-xs text-royal-text-muted leading-relaxed flex gap-3">
                    <Ruler className="w-4 h-4 text-royal-gold shrink-0 mt-0.5" />
                    <span>
                      Robert reviews every measurement before cutting. You'll get a quote and timeline by phone or email —
                      <span className="text-white"> no payment is taken through this form.</span>
                    </span>
                  </div>

                  {submitError && (
                    <div className="mt-5 p-3.5 border border-red-400/40 bg-red-400/5 text-red-200 text-sm flex items-start gap-2.5" role="alert">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{submitError} Your order is saved on this device, so you can try again.</span>
                    </div>
                  )}
                </div>
              )}

              {/* Nav buttons */}
              <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-royal-border">
                {step > 1 ? (
                  <button type="button" onClick={() => goTo(step - 1)}
                    className="px-5 py-3.5 border border-royal-border text-white font-bold text-xs uppercase tracking-wider hover:border-royal-gold hover:text-royal-gold transition-all flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : <span />}
                {step < STEPS.length ? (
                  <button type="button" onClick={goNext}
                    className="px-7 py-3.5 bg-royal-gold text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all flex items-center gap-2">
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button type="button" onClick={handleSubmit} disabled={submitting}
                    className="px-7 py-3.5 bg-royal-gold text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-wait">
                    <Send className="w-4 h-4" /> {submitting ? 'Sending…' : 'Send Order to Robert'}
                  </button>
                )}
              </div>
            </div>

            {/* ─── Sidebar summary ─── */}
            <aside className={`${step === 4 ? 'hidden' : 'hidden lg:block'} lg:col-span-4 sticky top-24 space-y-4`}>
              <div className="bg-royal-charcoal border border-royal-border p-6">
                <h3 className="text-[11px] text-royal-gold uppercase tracking-[0.15em] font-bold mb-4 text-center">Your Door</h3>
                <div className="bg-royal-bg border border-royal-border p-2 mb-5">
                  <DoorPreview doorStyle={order.doorStyle} panelStyle={order.panelStyle} species={order.species}
                    finish={order.finish} edgeProfile={order.edge} widthIn={previewW} heightIn={previewH} />
                </div>
                <dl className="space-y-2.5 text-xs">
                  {[
                    ['Type', order.doorType && specs.doorType],
                    ['Style', order.doorStyle && specs.doorStyle],
                    ['Panel', order.doorStyle && order.doorStyle !== 'Slab' ? order.panelStyle && specs.panelStyle : order.doorStyle ? '—' : ''],
                    ['Wood', order.species && specs.species],
                    ['Finish', order.finish && specs.finish],
                    ['Edge', order.edge && specs.edge],
                    ['Thickness', order.thickness],
                    ['Doors', totalDoors ? `${totalDoors} on ${filledRows.length} ${filledRows.length === 1 ? 'line' : 'lines'}` : ''],
                  ].map(([label, value]) => (
                    <div key={label as string} className="flex justify-between gap-4">
                      <dt className="text-royal-text-muted">{label}</dt>
                      <dd className={`text-right ${value ? 'text-white' : 'text-royal-text-muted/40 italic'}`}>{value || 'Not chosen'}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="bg-royal-charcoal border border-royal-border p-5 text-xs text-royal-text-muted leading-relaxed">
                <p className="text-white font-bold mb-1.5">Not sure about something?</p>
                Pick your best guess and add a note — Robert confirms every detail before building. Prefer to have him measure?{' '}
                <Link to="/booking" className="text-royal-gold hover:underline">Book an on-site estimate</Link>.
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

/* ───── review + print helpers ───── */

function StepTitle({ n, title, sub }: { n: number; title: string; sub: string }) {
  return (
    <div className="mb-7 pb-4 border-b border-royal-border">
      <p className="text-[10px] text-royal-gold uppercase tracking-[0.2em] font-bold mb-1">Step {n} of {STEPS.length}</p>
      <h2 className="font-serif text-2xl text-white font-bold tracking-wide uppercase">{title}</h2>
      <p className="text-royal-text-muted text-xs mt-1.5">{sub}</p>
    </div>
  );
}

function ReviewSection({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="mb-6 p-5 bg-royal-bg border border-royal-border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs text-white uppercase tracking-wider font-bold">{title}</h3>
        <button type="button" onClick={onEdit} className="text-[10px] uppercase tracking-wider font-bold text-royal-gold hover:text-white flex items-center gap-1">
          <Pencil className="w-3 h-3" /> Edit
        </button>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 text-sm">
      <span className="text-royal-text-muted shrink-0">{label}</span>
      <span className="text-white text-right break-words min-w-0">{value}</span>
    </div>
  );
}

// Black-on-white copy laid out like the shop's paper order form. Only visible when printing.
function PrintableOrder({ order, date }: { order: OrderState; date: string }) {
  const specs = specSummary(order);
  const line = (label: string, value: string) => (
    <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid #999', padding: '4px 0' }}>
      <strong style={{ minWidth: 170 }}>{label}:</strong> <span>{value || '—'}</span>
    </div>
  );
  return (
    <div className="hidden print:block" style={{ color: '#000', background: '#fff', fontFamily: 'Arial, sans-serif', fontSize: 12, padding: 24 }}>
      <h1 style={{ fontSize: 18, fontWeight: 700, textAlign: 'center', marginBottom: 4 }}>CUSTOM DOOR ORDER FORM</h1>
      <p style={{ textAlign: 'center', marginBottom: 16 }}>Royal Brand Woodworking · Portland, OR</p>
      {line('Customer Name', order.name)}
      {line('Company', order.company)}
      {line('Phone', order.phone)}
      {line('Email', order.email)}
      {line('Job / Project Name', order.project)}
      {line('Order Date', date)}
      <h2 style={{ fontSize: 14, fontWeight: 700, margin: '16px 0 4px' }}>DOOR SPECIFICATIONS</h2>
      {line('Door Type', specs.doorType)}
      {line('Door Style', specs.doorStyle)}
      {line('Wood Species / Material', specs.species)}
      {line('Finish / Color', specs.finish)}
      {line('Profile / Edge Detail', specs.edge)}
      {line('Panel Style', specs.panelStyle)}
      {order.doorReference.trim() && line('Door Reference', order.doorReference)}
      {fitSummary(order).map(([l, v]) => <React.Fragment key={l}>{line(l, v)}</React.Fragment>)}
      {line('Measurements Are', order.measurement)}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        <thead>
          <tr>
            {['Qty', 'Width', 'Height', 'Hinge L/R', 'Notes'].map(h => (
              <th key={h} style={{ border: '1px solid #000', padding: 4, textAlign: 'left' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {order.rows.map(r => (
            <tr key={r.id}>
              <td style={{ border: '1px solid #000', padding: 4 }}>{r.qty}</td>
              <td style={{ border: '1px solid #000', padding: 4 }}>{formatInches(parseInches(r.width)!)}</td>
              <td style={{ border: '1px solid #000', padding: 4 }}>{formatInches(parseInches(r.height)!)}</td>
              <td style={{ border: '1px solid #000', padding: 4 }}>{r.hinge}</td>
              <td style={{ border: '1px solid #000', padding: 4 }}>{r.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {order.orderNotes.trim() && <p style={{ marginTop: 12 }}><strong>Notes:</strong> {order.orderNotes}</p>}
      <p style={{ marginTop: 8 }}><strong>Pickup / Delivery:</strong> {order.delivery === 'Delivery' ? `Delivery to ${order.deliveryAddress}` : order.delivery}</p>
      {order.neededBy && <p style={{ marginTop: 4 }}><strong>Needed By:</strong> {formatDate(order.neededBy)}</p>}
    </div>
  );
}
