import React, { useState, useMemo, useRef, useEffect } from 'react';
import { submitToWeb3Forms } from '../lib/submitForm';
import { BUSINESS, LEAD_SOURCES } from '../data/business';
import { Calendar, Clock, ChevronRight, ChevronLeft, MapPin, User, Phone, Mail, FileText, Shield, CheckCircle, CalendarCheck, RotateCcw, Send, Search } from 'lucide-react';
import { smallPhoto } from '../lib/images';

/* ───── helpers ───── */
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay(); // 0=Sun
}
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
const SHOP_TIME_ZONE = 'America/Los_Angeles';
// Today's date in Portland, so a visitor whose phone is set to another time zone
// (or who is travelling) sees the same open days the shop does.
function portlandToday() {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: SHOP_TIME_ZONE, year: 'numeric', month: 'numeric', day: 'numeric' })
    .formatToParts(new Date());
  const part = (type: string) => Number(parts.find(p => p.type === type)?.value);
  return new Date(part('year'), part('month') - 1, part('day'));
}
function isWeekendDay(d: Date) {
  return d.getDay() === 0 || d.getDay() === 6;
}
// No same-day visits and no weekends: the first day a customer can pick.
function firstOpenDay(today: Date) {
  const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  while (isWeekendDay(d)) d.setDate(d.getDate() + 1);
  return d;
}
const monthIndex = (year: number, month: number) => year * 12 + month;
const MONTHS_AHEAD = 3;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
type Field = 'name' | 'email' | 'phone' | 'address';
const FIELD_ORDER: Field[] = ['name', 'email', 'phone', 'address'];
const FIELD_NAMES: Record<Field, string> = { name: 'your name', email: 'email', phone: 'phone number', address: 'project address' };

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_HEADERS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];


const LABEL_CLASS = 'block text-xs text-royal-text-muted uppercase tracking-wider font-bold mb-1.5';

// "name", "name and email", "name, email and phone number"
function listOf(items: string[]) {
  return items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

function DetailField({
  id, label, icon, error, inputRef, ...props
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  error?: string | false;
  inputRef: (el: HTMLInputElement | null) => void;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS}>{label} <span className="text-royal-gold">*</span></label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-royal-text-muted/50 pointer-events-none">{icon}</span>
        <input
          id={id}
          ref={inputRef}
          required
          aria-invalid={!!error || undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
          className={`w-full bg-transparent border text-white pl-10 pr-4 py-3 focus:outline-none focus:border-royal-gold transition-colors text-base sm:text-sm scroll-mt-28 ${
            error ? 'border-red-400/70' : 'border-royal-border'
          }`}
        />
      </div>
      {error && <p id={`${id}-error`} className="text-red-300 text-xs mt-1.5">{error}</p>}
    </div>
  );
}

export function BookingPage() {
  const [today] = useState(portlandToday);
  const firstOpen = useMemo(() => firstOpenDay(today), [today]);
  // Open on the month with the first bookable day (e.g. on Oct 30 that's November, not an all-grey October).
  const [viewYear, setViewYear] = useState(firstOpen.getFullYear());
  const [viewMonth, setViewMonth] = useState(firstOpen.getMonth());
  const [selectedFullDate, setSelectedFullDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [animDir, setAnimDir] = useState<'left' | 'right' | null>(null);

  // Contact info state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [foundUs, setFoundUs] = useState('');

  // Verification flow state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Fields show their problem once the customer leaves them, or all at once after they press Send.
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [triedSend, setTriedSend] = useState(false);
  // The request already sent, if they come back and pick a different time.
  const [previousRequest, setPreviousRequest] = useState<string | null>(null);
  const fieldRefs = useRef<Partial<Record<Field, HTMLInputElement | null>>>({});

  // On phones the next step appears below the fold — glide to it so the tap visibly "does something".
  const timesRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const isNarrow = () => window.matchMedia('(max-width: 1023px)').matches;
  useEffect(() => {
    if (selectedFullDate && isNarrow()) timesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [selectedFullDate]);
  useEffect(() => {
    if (selectedTime && isNarrow()) detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [selectedTime]);

  /* ── month grid ── */
  const calendarGrid = useMemo(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const prevMonthDays = getDaysInMonth(viewYear, viewMonth - 1);

    const cells: { date: number; month: number; year: number; isCurrentMonth: boolean; isToday: boolean; isPast: boolean; isWeekend: boolean; isBooked: boolean }[] = [];
    // No same-day visits: the earliest day a customer can pick is tomorrow.
    const firstBookable = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const lastBookable = new Date(today.getFullYear(), today.getMonth() + MONTHS_AHEAD + 1, 0);

    // Previous month trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const dt = new Date(viewYear, viewMonth - 1, d);
      cells.push({
        date: d,
        month: viewMonth - 1,
        year: viewYear,
        isCurrentMonth: false,
        isToday: isSameDay(dt, today),
        isPast: dt < firstBookable || dt > lastBookable,
        isWeekend: dt.getDay() === 0 || dt.getDay() === 6,
        isBooked: false,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dt = new Date(viewYear, viewMonth, d);
      cells.push({
        date: d,
        month: viewMonth,
        year: viewYear,
        isCurrentMonth: true,
        isToday: isSameDay(dt, today),
        isPast: dt < firstBookable || dt > lastBookable,
        isWeekend: dt.getDay() === 0 || dt.getDay() === 6,
        isBooked: false,
      });
    }

    // Next month leading days to fill 6 rows
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const dt = new Date(viewYear, viewMonth + 1, d);
      cells.push({
        date: d,
        month: viewMonth + 1,
        year: viewYear,
        isCurrentMonth: false,
        isToday: isSameDay(dt, today),
        isPast: dt < firstBookable || dt > lastBookable,
        isWeekend: dt.getDay() === 0 || dt.getDay() === 6,
        isBooked: false,
      });
    }

    return cells;
  }, [viewYear, viewMonth, today]);

  /* ── navigation ── */
  function goToPrevMonth() {
    setAnimDir('right');
    setTimeout(() => setAnimDir(null), 300);
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function goToNextMonth() {
    setAnimDir('left');
    setTimeout(() => setAnimDir(null), 300);
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }
  function goToSoonest() {
    setViewYear(firstOpen.getFullYear());
    setViewMonth(firstOpen.getMonth());
  }

  /* ── date selection ── */
  function handleDateClick(cell: typeof calendarGrid[0]) {
    if (cell.isPast || cell.isWeekend || cell.isBooked || !cell.isCurrentMonth) return;
    const d = new Date(cell.year, cell.month, cell.date);
    if (selectedFullDate && isSameDay(d, selectedFullDate)) {
      setSelectedFullDate(null);
      setSelectedTime(null);
    } else {
      setSelectedFullDate(d);
      setSelectedTime(null);
    }
  }

  function isSelected(cell: typeof calendarGrid[0]) {
    if (!selectedFullDate) return false;
    return selectedFullDate.getFullYear() === cell.year && selectedFullDate.getMonth() === cell.month && selectedFullDate.getDate() === cell.date;
  }

  const timeSlots = [
    { time: '08:00 AM', label: 'Early Morning' },
    { time: '09:30 AM', label: 'Morning' },
    { time: '11:00 AM', label: 'Late Morning' },
    { time: '01:00 PM', label: 'Afternoon' },
    { time: '02:30 PM', label: 'Mid Afternoon' },
    { time: '04:00 PM', label: 'Late Afternoon' },
  ];

  /* ── months the customer can page through: the first open month to 3 months past this one ── */
  const viewIndex = monthIndex(viewYear, viewMonth);
  const canGoNext = viewIndex < monthIndex(today.getFullYear(), today.getMonth()) + MONTHS_AHEAD;
  const canGoPrev = viewIndex > monthIndex(firstOpen.getFullYear(), firstOpen.getMonth());

  /* ── formatted selected date ── */
  const formattedDate = selectedFullDate
    ? selectedFullDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : null;

  /* ── step state ── */
  const step = isSubmitted ? 4 : !selectedFullDate ? 1 : !selectedTime ? 2 : 3;

  /* ── form validation ── */
  const fieldErrors: Partial<Record<Field, string>> = {};
  if (!name.trim()) fieldErrors.name = 'Please enter your name';
  if (!email.trim()) fieldErrors.email = 'Please enter your email';
  else if (!EMAIL_RE.test(email.trim())) fieldErrors.email = 'That email doesn’t look right (like name@example.com)';
  const phoneDigits = phone.replace(/\D/g, '');
  if (!phoneDigits) fieldErrors.phone = 'Please enter your phone number';
  else if (phoneDigits.length < 10) fieldErrors.phone = 'Enter a 10-digit phone number';
  if (!address.trim()) fieldErrors.address = 'Please enter the project address';
  const missing = FIELD_ORDER.filter(f => fieldErrors[f]);
  const showError = (f: Field) => (triedSend || touched[f]) && fieldErrors[f];

  /* ── submit handler ── */
  async function handleSubmitRequest(e?: React.FormEvent) {
    e?.preventDefault();
    if (isSubmitting || !selectedFullDate || !selectedTime) return;
    if (missing.length) {
      // Say what's missing and put the cursor on the first one, rather than a greyed-out button.
      setTriedSend(true);
      const first = fieldRefs.current[missing[0]];
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      first?.focus({ preventScroll: true });
      return;
    }

    const when = `${selectedFullDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at ${selectedTime}`;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitToWeb3Forms({
        // A second request after "Choose a Different Date" is marked so it isn't mistaken for a new customer.
        subject: `${previousRequest ? 'Updated ' : ''}Estimate Request — ${name.trim()} — ${when}`,
        from_name: name.trim(),
        ...(previousRequest ? { update: `Replaces their earlier request for ${previousRequest}` } : {}),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        notes,
        found_us: foundUs || 'Not answered',
        requested_date: formattedDate ?? '',
        requested_time: selectedTime,
      });
      setPreviousRequest(when);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong submitting the form.');
    } finally {
      setIsSubmitting(false);
    }
  }

  /* ── reschedule handler ── */
  function handleReschedule() {
    setIsSubmitted(false);
    setSelectedFullDate(null);
    setSelectedTime(null);
    setSubmitError(null);
    setTriedSend(false);
    // Keep the contact info so they don't have to re-enter it
  }

  /* ── Submitted Confirmation Screen ── */
  if (isSubmitted) {
    return (
      <section className="py-14 md:py-24 bg-royal-bg text-royal-text min-h-screen">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12" style={{ animation: 'fadeSlideUp 0.6s ease-out' }}>
            <div className="w-20 h-20 rounded-full bg-royal-gold/15 flex items-center justify-center mx-auto mb-8 border border-royal-gold/30">
              <CalendarCheck className="w-10 h-10 text-royal-gold" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-4 tracking-wide uppercase">
              Request Submitted
            </h2>
            <p className="text-royal-text-muted text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto">
              Your consultation request has been sent to Robert for review. He will verify availability and confirm your appointment.
            </p>
          </div>

          {/* Confirmation Details Card */}
          <div className="bg-royal-charcoal border border-royal-border p-8 mb-6" style={{ animation: 'fadeSlideUp 0.6s ease-out 0.1s both' }}>
            <h3 className="font-sans text-sm text-white uppercase tracking-wider font-bold mb-6 pb-3 border-b border-royal-border flex items-center gap-2">
              <Shield className="w-4 h-4 text-royal-gold" /> Pending Verification
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-light">
                <span className="text-royal-text-muted">Status</span>
                <span className="text-yellow-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                  Awaiting Confirmation
                </span>
              </div>
              <div className="flex justify-between items-center text-sm font-light">
                <span className="text-royal-text-muted">Requested Date</span>
                <span className="text-white">{formattedDate}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-light">
                <span className="text-royal-text-muted">Requested Time</span>
                <span className="text-white">{selectedTime}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-light">
                <span className="text-royal-text-muted">Duration</span>
                <span className="text-white">~1–2 hours</span>
              </div>
              <div className="border-t border-royal-border pt-4 space-y-3">
                <div className="flex justify-between items-center text-sm font-light">
                  <span className="text-royal-text-muted">Name</span>
                  <span className="text-white">{name}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-light">
                  <span className="text-royal-text-muted">Email</span>
                  <span className="text-white">{email}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-light">
                  <span className="text-royal-text-muted">Phone</span>
                  <span className="text-white">{phone}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-light">
                  <span className="text-royal-text-muted">Location</span>
                  <span className="text-white">{address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="bg-royal-charcoal border border-royal-border p-8 mb-6" style={{ animation: 'fadeSlideUp 0.6s ease-out 0.2s both' }}>
            <h3 className="font-sans text-sm text-white uppercase tracking-wider font-bold mb-6 pb-3 border-b border-royal-border flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-royal-gold" /> What Happens Next
            </h3>
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-royal-gold/15 flex items-center justify-center shrink-0 border border-royal-gold/30">
                  <span className="text-royal-gold text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="text-white text-sm font-bold mb-1">Availability Verification</p>
                  <p className="text-royal-text-muted text-xs font-light leading-relaxed">Robert will review your requested date and time to confirm availability.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-royal-gold/15 flex items-center justify-center shrink-0 border border-royal-gold/30">
                  <span className="text-royal-gold text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="text-white text-sm font-bold mb-1">Confirmation or Reschedule</p>
                  <p className="text-royal-text-muted text-xs font-light leading-relaxed">You'll receive a confirmation email, or be offered alternative available dates if your requested slot is unavailable.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-royal-gold/15 flex items-center justify-center shrink-0 border border-royal-gold/30">
                  <span className="text-royal-gold text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="text-white text-sm font-bold mb-1">Invoice Sent</p>
                  <p className="text-royal-text-muted text-xs font-light leading-relaxed">Once confirmed, Robert will send you a consultation invoice. No payment is required until your appointment is verified.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4" style={{ animation: 'fadeSlideUp 0.6s ease-out 0.3s both' }}>
            <button
              onClick={handleReschedule}
              className="flex-1 py-4 bg-transparent text-white font-bold text-xs uppercase tracking-wider border border-royal-border hover:border-royal-gold hover:text-royal-gold transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Choose a Different Date
            </button>
          </div>

          <p className="text-center text-xs text-royal-text-muted mt-6 tracking-wide uppercase">
            Robert will reply to {email} to confirm
          </p>
        </div>

        {/* Inline CSS for animations */}
        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>
    );
  }

  return (
    <section className="py-14 md:py-24 bg-royal-bg text-royal-text min-h-screen relative overflow-hidden">
      {/* Background ambient image */}
      <div className="absolute top-0 left-0 right-0 h-96 z-0 overflow-hidden pointer-events-none">
        <img
          src={smallPhoto("/photos/web/planed-hardwood-boards.jpg")}
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-royal-bg/40 via-royal-bg/85 to-royal-bg" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <img src="/logo-sm.png" alt="Royal Brand Woodworking" className="w-16 h-16 object-contain mx-auto mb-6" />
          <div className="flex items-center justify-center gap-4 text-royal-gold mb-4">
            <div className="w-12 h-[1px] bg-royal-gold" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Book an Estimate</span>
            <div className="w-12 h-[1px] bg-royal-gold" />
          </div>
          <h1 className="font-serif text-3xl md:text-5xl text-white font-bold mb-6 tracking-wide uppercase">
            Have Robert Come Take a Look
          </h1>
          <p className="text-royal-text-muted text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Robert comes to your home or business, measures, and talks through your project with you.
            <br/><br/>
            <strong className="text-white">The visit is $150 an hour.</strong> Pick a day and time below — Robert will confirm by email before anything is charged.
            <br/><br/>
            <span className="inline-block px-4 py-2 border border-royal-gold/40 bg-royal-gold/10 text-white">Your time is valuable. If you go ahead with the project, <strong className="text-royal-gold">your $150 estimate fee is credited toward it.</strong></span>
            <br/><br/>
            Rather talk first? Call <a href={BUSINESS.phoneHref} className="text-royal-gold font-bold hover:underline">{BUSINESS.phoneDisplay}</a>.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-0 mb-12 max-w-lg mx-auto">
          {[
            { num: 1, label: 'Pick a Day' },
            { num: 2, label: 'Pick a Time' },
            { num: 3, label: 'Your Details' },
          ].map((s, i) => (
            <React.Fragment key={s.num}>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                  step >= s.num
                    ? 'bg-royal-gold text-royal-charcoal shadow-[0_0_20px_rgba(201,164,122,0.3)]'
                    : 'border border-royal-border text-royal-text-muted'
                }`}>
                  {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                </div>
                <span className={`text-xs uppercase tracking-wider font-bold transition-colors ${
                  step >= s.num ? 'text-royal-gold' : 'text-royal-text-muted'
                }`}>{s.label}</span>
              </div>
              {i < 2 && (
                <div className={`flex-1 h-[1px] mx-4 mb-6 transition-colors duration-500 ${
                  step > s.num ? 'bg-royal-gold' : 'bg-royal-border'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* ─── Calendar Panel (3 cols) ─── */}
          <div className="lg:col-span-3 bg-royal-charcoal border border-royal-border p-6 md:p-8">
            {/* Month Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-royal-border">
              <div>
                <h3 className="font-serif text-2xl text-white font-bold">
                  {MONTH_NAMES[viewMonth]} <span className="text-royal-gold">{viewYear}</span>
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={goToSoonest}
                  className="px-3 py-1.5 text-xs uppercase tracking-wider font-bold border border-royal-border text-royal-text-muted hover:border-royal-gold hover:text-royal-gold transition-all"
                >
                  Soonest
                </button>
                <button
                  onClick={goToPrevMonth}
                  disabled={!canGoPrev}
                  aria-label="Previous month"
                  className="p-2 hover:text-royal-gold text-royal-text-muted transition-colors disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/5 rounded"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNextMonth}
                  disabled={!canGoNext}
                  aria-label="Next month"
                  className="p-2 hover:text-royal-gold text-royal-text-muted transition-colors disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/5 rounded"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAY_HEADERS.map((dh) => (
                <div key={dh} className={`text-center text-xs uppercase tracking-wider font-bold py-2 ${
                  dh === 'Sun' || dh === 'Sat' ? 'text-royal-text-muted/40' : 'text-royal-text-muted'
                }`}>
                  {dh}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div
              className="grid grid-cols-7 gap-1"
              style={{
                animation: animDir ? `calSlide${animDir === 'left' ? 'Left' : 'Right'} 0.3s ease-out` : undefined,
              }}
            >
              {calendarGrid.map((cell, i) => {
                const disabled = cell.isPast || cell.isWeekend || cell.isBooked || !cell.isCurrentMonth;
                const selected = isSelected(cell);

                return (
                  <button
                    key={i}
                    onClick={() => handleDateClick(cell)}
                    disabled={disabled}
                    className={`
                      relative aspect-square flex flex-col items-center justify-center text-sm transition-all duration-200
                      ${!cell.isCurrentMonth ? 'opacity-15 cursor-default' : ''}
                      ${cell.isCurrentMonth && cell.isPast ? 'opacity-25 cursor-not-allowed line-through' : ''}
                      ${cell.isCurrentMonth && cell.isWeekend && !cell.isPast ? 'opacity-30 cursor-not-allowed' : ''}
                      ${cell.isCurrentMonth && cell.isBooked ? 'opacity-30 cursor-not-allowed' : ''}
                      ${selected ? 'bg-royal-gold text-royal-charcoal font-bold shadow-[0_0_24px_rgba(201,164,122,0.35)] scale-110 z-10' : ''}
                      ${cell.isCurrentMonth && !disabled && !selected ? 'hover:bg-white/10 hover:scale-105 text-white cursor-pointer' : ''}
                    `}
                  >
                    <span>{cell.date}</span>
                    {/* Today indicator */}
                    {cell.isToday && (
                      <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${selected ? 'bg-white' : 'bg-royal-gold'}`} />
                    )}
                    {/* Booked indicator */}
                    {cell.isBooked && cell.isCurrentMonth && (
                      <span className="absolute bottom-1 text-xs uppercase tracking-wider text-red-400/70 font-bold">Full</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-royal-border">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-royal-gold" />
                <span className="text-xs text-royal-text-muted uppercase tracking-wider">Today</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-royal-gold shadow-[0_0_8px_rgba(201,164,122,0.5)]" />
                <span className="text-xs text-royal-text-muted uppercase tracking-wider">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="text-xs text-royal-text-muted uppercase tracking-wider">Available</span>
              </div>
            </div>

            {/* Time Slots — shown after date is selected */}
            {selectedFullDate && (
              <div ref={timesRef} className="mt-8 pt-6 border-t border-royal-border scroll-mt-24" style={{ animation: 'fadeSlideUp 0.4s ease-out' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-sans text-sm text-white uppercase tracking-wider font-bold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-royal-gold" /> Available Times
                  </h3>
                  <span className="text-xs text-royal-text-muted uppercase tracking-wider">
                    {formattedDate}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {timeSlots.map((slot, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-4 px-3 text-center transition-all border group ${
                        selectedTime === slot.time
                          ? 'bg-royal-gold text-royal-charcoal border-royal-gold shadow-[0_0_20px_rgba(201,164,122,0.25)]'
                          : 'bg-transparent text-white border-royal-border hover:border-royal-gold hover:bg-white/5'
                      }`}
                    >
                      <div className="text-sm font-bold">{slot.time}</div>
                      <div className={`text-xs uppercase tracking-wider mt-1 ${
                        selectedTime === slot.time ? 'text-royal-charcoal/80' : 'text-royal-text-muted'
                      }`}>{slot.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ─── Right Sidebar (2 cols) ─── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Booking Summary Card (between the details and Send on phones, first on desktop) */}
            <div className="order-2 lg:order-1 bg-royal-charcoal border border-royal-border p-6">
              <h3 className="font-sans text-sm text-white uppercase tracking-wider font-bold mb-6 pb-3 border-b border-royal-border flex items-center gap-2">
                <Calendar className="w-4 h-4 text-royal-gold" /> Booking Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-light">
                  <span className="text-royal-text-muted">Service</span>
                  <span className="text-white">On-Site Estimate</span>
                </div>
                <div className="flex justify-between items-center text-sm font-light">
                  <span className="text-royal-text-muted">Date</span>
                  <span className={`${selectedFullDate ? 'text-white' : 'text-royal-text-muted/50 italic'}`}>
                    {selectedFullDate
                      ? selectedFullDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-light">
                  <span className="text-royal-text-muted">Time</span>
                  <span className={`${selectedTime ? 'text-white' : 'text-royal-text-muted/50 italic'}`}>
                    {selectedTime || 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-light">
                  <span className="text-royal-text-muted">Duration</span>
                  <span className="text-white">~1–2 hours</span>
                </div>
                <div className="border-t border-royal-border pt-4">
                  <div className="flex justify-between items-center text-sm font-light">
                    <span className="text-royal-text-muted">Rate</span>
                    <span className="text-white">$150.00 / hour</span>
                  </div>
                   <div className="flex items-start gap-2 mt-3 p-3 bg-royal-gold/5 border border-royal-gold/20">
                    <Shield className="w-4 h-4 text-royal-gold shrink-0 mt-0.5" />
                    <p className="text-xs text-royal-text-muted leading-relaxed">
                      <span className="text-royal-gold font-bold">No payment required now.</span> An invoice will be sent after Robert confirms your appointment. If you go ahead with the project, the $150 is credited toward it.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Project Details */}
            <div ref={detailsRef} inert={step < 3} className={`order-1 lg:order-2 scroll-mt-24 bg-royal-charcoal border border-royal-border p-6 transition-all duration-500 ${
              step >= 3 ? 'opacity-100' : 'opacity-40 pointer-events-none'
            }`}>
              <h3 className="font-sans text-sm text-white uppercase tracking-wider font-bold mb-6 pb-3 border-b border-royal-border flex items-center gap-2">
                <User className="w-4 h-4 text-royal-gold" /> Your Details
              </h3>
              {/* A real <form> with autocomplete names lets phones offer to fill name, email, phone and address. */}
              <form id="booking-form" onSubmit={handleSubmitRequest} noValidate className="space-y-4">
                <DetailField id="booking-name" label="Full name" icon={<User className="w-4 h-4" />} error={showError('name')}
                  inputRef={el => { fieldRefs.current.name = el; }}
                  type="text" name="name" autoComplete="name" placeholder="Jane Smith"
                  value={name} onChange={e => setName(e.target.value)} onBlur={() => setTouched(t => ({ ...t, name: true }))} />
                <DetailField id="booking-email" label="Email" icon={<Mail className="w-4 h-4" />} error={showError('email')}
                  inputRef={el => { fieldRefs.current.email = el; }}
                  type="email" name="email" autoComplete="email" inputMode="email" autoCapitalize="off" spellCheck={false} placeholder="you@example.com"
                  value={email} onChange={e => setEmail(e.target.value)} onBlur={() => setTouched(t => ({ ...t, email: true }))} />
                <DetailField id="booking-phone" label="Phone" icon={<Phone className="w-4 h-4" />} error={showError('phone')}
                  inputRef={el => { fieldRefs.current.phone = el; }}
                  type="tel" name="tel" autoComplete="tel" inputMode="tel" placeholder="(503) 555-0123"
                  value={phone} onChange={e => setPhone(e.target.value)} onBlur={() => setTouched(t => ({ ...t, phone: true }))} />
                <DetailField id="booking-address" label="Project address" icon={<MapPin className="w-4 h-4" />} error={showError('address')}
                  inputRef={el => { fieldRefs.current.address = el; }}
                  type="text" name="street-address" autoComplete="street-address" placeholder="Street, city"
                  value={address} onChange={e => setAddress(e.target.value)} onBlur={() => setTouched(t => ({ ...t, address: true }))} />
                <div>
                  <label htmlFor="booking-notes" className={LABEL_CLASS}>Project description <span className="normal-case font-normal tracking-normal">(optional)</span></label>
                  <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-royal-text-muted/50" />
                  <textarea
                    id="booking-notes"
                    name="notes"
                    placeholder="What are you thinking of building?"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-transparent border border-royal-border text-white pl-10 pr-4 py-3 focus:outline-none focus:border-royal-gold transition-colors text-base sm:text-sm resize-none"
                  />
                  </div>
                </div>
                <div>
                  <label htmlFor="booking-found-us" className={LABEL_CLASS}>How did you find us? <span className="normal-case font-normal tracking-normal">(optional)</span></label>
                  <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-text-muted/50 pointer-events-none" />
                  <select
                    id="booking-found-us"
                    value={foundUs}
                    onChange={e => setFoundUs(e.target.value)}
                    className={`w-full bg-royal-charcoal border border-royal-border pl-10 pr-10 py-3 focus:outline-none focus:border-royal-gold transition-colors text-base sm:text-sm appearance-none cursor-pointer ${foundUs ? 'text-white' : 'text-royal-text-muted'}`}
                  >
                    <option value="">Choose one</option>
                    {LEAD_SOURCES.map(s => <option key={s} value={s} className="text-white">{s}</option>)}
                  </select>
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 w-4 h-4 text-royal-text-muted pointer-events-none" />
                  </div>
                </div>
              </form>
            </div>

            {/* Submit for Verification */}
            <div inert={step < 3} className={`order-3 bg-royal-charcoal border border-royal-border p-6 transition-all duration-500 ${
              step >= 3 ? 'opacity-100' : 'opacity-40 pointer-events-none'
            }`}>
              <h3 className="font-sans text-sm text-white uppercase tracking-wider font-bold mb-6 pb-3 border-b border-royal-border flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-royal-gold" /> Confirm & Submit
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 p-3 bg-white/[0.02] border border-royal-border">
                  <CheckCircle className="w-4 h-4 text-royal-gold shrink-0 mt-0.5" />
                  <p className="text-xs text-royal-text-muted leading-relaxed">
                    Robert will review your request and confirm availability within <span className="text-white font-bold">24 hours</span>.
                  </p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/[0.02] border border-royal-border">
                  <RotateCcw className="w-4 h-4 text-royal-gold shrink-0 mt-0.5" />
                  <p className="text-xs text-royal-text-muted leading-relaxed">
                    If your selected date doesn't work, you'll be offered <span className="text-white font-bold">alternative available dates</span> to reschedule.
                  </p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/[0.02] border border-royal-border">
                  <Send className="w-4 h-4 text-royal-gold shrink-0 mt-0.5" />
                  <p className="text-xs text-royal-text-muted leading-relaxed">
                    Once confirmed, an <span className="text-white font-bold">invoice for the consultation</span> will be sent to your email.
                  </p>
                </div>
              </div>

              {triedSend && missing.length > 0 && (
                <p className="mb-4 p-3 border border-red-400/40 bg-red-400/5 text-red-200 text-xs" role="alert">
                  Please {missing.some(f => !{ name, email, phone, address }[f].trim()) ? 'add' : 'check'} {listOf(missing.map(f => FIELD_NAMES[f]))} above.
                </p>
              )}
              {submitError && (
                <p className="mb-4 p-3 border border-red-400/40 bg-red-400/5 text-red-200 text-xs" role="alert">{submitError}</p>
              )}
              <button
                type="submit"
                form="booking-form"
                disabled={isSubmitting}
                className="w-full py-4 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 bg-royal-gold text-royal-charcoal hover:bg-white hover:text-black cursor-pointer disabled:opacity-60 disabled:cursor-wait"
              >
                <CalendarCheck className="w-4 h-4" />
                {isSubmitting ? 'Sending…' : 'Send My Request'}
              </button>
              <p className="text-center text-xs text-royal-text-muted mt-3 tracking-wide uppercase flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" /> No payment required · Invoice sent after confirmation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inline CSS for calendar animations */}
      <style>{`
        @keyframes calSlideLeft {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes calSlideRight {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

