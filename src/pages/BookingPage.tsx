import React, { useState, useMemo } from 'react';
import { Calendar, Clock, CreditCard, ChevronRight, ChevronLeft, MapPin, User, Phone, Mail, FileText, Shield, CheckCircle } from 'lucide-react';

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
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_HEADERS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// Simulated booked-out dates (random scatter for realism)
const BOOKED_DATES = new Set([3, 12, 18, 25]);

export function BookingPage() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedFullDate, setSelectedFullDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [animDir, setAnimDir] = useState<'left' | 'right' | null>(null);

  // Contact info state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  /* ── month grid ── */
  const calendarGrid = useMemo(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const prevMonthDays = getDaysInMonth(viewYear, viewMonth - 1);

    const cells: { date: number; month: number; year: number; isCurrentMonth: boolean; isToday: boolean; isPast: boolean; isWeekend: boolean; isBooked: boolean }[] = [];

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
        isPast: dt < new Date(today.getFullYear(), today.getMonth(), today.getDate()),
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
        isPast: dt < new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        isWeekend: dt.getDay() === 0 || dt.getDay() === 6,
        isBooked: BOOKED_DATES.has(d),
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
        isPast: dt < new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        isWeekend: dt.getDay() === 0 || dt.getDay() === 6,
        isBooked: false,
      });
    }

    return cells;
  }, [viewYear, viewMonth]);

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
  function goToToday() {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
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

  /* ── can the user book past the month limit? ── */
  const maxMonth = today.getMonth() + 3; // allow 3 months ahead
  const canGoNext = viewYear < today.getFullYear() + 1 || (viewYear === today.getFullYear() && viewMonth < Math.min(maxMonth, 11));
  const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  /* ── formatted selected date ── */
  const formattedDate = selectedFullDate
    ? selectedFullDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : null;

  /* ── step state ── */
  const step = !selectedFullDate ? 1 : !selectedTime ? 2 : 3;

  return (
    <section className="py-24 bg-royal-bg text-royal-text min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <img src="/logo.png" alt="Royal Brand Woodworking" className="w-16 h-16 object-contain mx-auto mb-6" />
          <div className="flex items-center justify-center gap-4 text-royal-gold mb-4">
            <div className="w-12 h-[1px] bg-royal-gold" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Reserve a Consultation</span>
            <div className="w-12 h-[1px] bg-royal-gold" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-6 tracking-wide uppercase">
            Book an On-Site Estimate
          </h2>
          <p className="text-royal-text-muted text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Robert personally visits your location to assess the project, take precise measurements, and discuss design options.
            <br/><br/>
            <strong className="text-white">Estimates are billed at $150/hr</strong>. Please select a date and time to reserve your consultation.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-0 mb-12 max-w-lg mx-auto">
          {[
            { num: 1, label: 'Select Date' },
            { num: 2, label: 'Choose Time' },
            { num: 3, label: 'Your Details' },
          ].map((s, i) => (
            <React.Fragment key={s.num}>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                  step >= s.num
                    ? 'bg-royal-gold text-white shadow-[0_0_20px_rgba(201,164,122,0.3)]'
                    : 'border border-royal-border text-royal-text-muted'
                }`}>
                  {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                </div>
                <span className={`text-[10px] uppercase tracking-wider font-bold transition-colors ${
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
                <p className="text-[11px] text-royal-text-muted mt-1 uppercase tracking-wider">
                  {getDaysInMonth(viewYear, viewMonth) - Array.from(BOOKED_DATES).filter(d => d <= getDaysInMonth(viewYear, viewMonth)).length} days available
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={goToToday}
                  className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold border border-royal-border text-royal-text-muted hover:border-royal-gold hover:text-royal-gold transition-all"
                >
                  Today
                </button>
                <button
                  onClick={goToPrevMonth}
                  disabled={!canGoPrev}
                  className="p-2 hover:text-royal-gold text-royal-text-muted transition-colors disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/5 rounded"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNextMonth}
                  disabled={!canGoNext}
                  className="p-2 hover:text-royal-gold text-royal-text-muted transition-colors disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/5 rounded"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAY_HEADERS.map((dh) => (
                <div key={dh} className={`text-center text-[10px] uppercase tracking-wider font-bold py-2 ${
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
                      relative aspect-square flex flex-col items-center justify-center text-sm rounded-lg transition-all duration-200
                      ${!cell.isCurrentMonth ? 'opacity-15 cursor-default' : ''}
                      ${cell.isCurrentMonth && cell.isPast ? 'opacity-25 cursor-not-allowed line-through' : ''}
                      ${cell.isCurrentMonth && cell.isWeekend && !cell.isPast ? 'opacity-30 cursor-not-allowed' : ''}
                      ${cell.isCurrentMonth && cell.isBooked ? 'opacity-30 cursor-not-allowed' : ''}
                      ${selected ? 'bg-royal-gold text-white font-bold shadow-[0_0_24px_rgba(201,164,122,0.35)] scale-110 z-10' : ''}
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
                      <span className="absolute bottom-1 text-[7px] uppercase tracking-wider text-red-400/70 font-bold">Full</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-royal-border">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-royal-gold" />
                <span className="text-[10px] text-royal-text-muted uppercase tracking-wider">Today</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-royal-gold shadow-[0_0_8px_rgba(201,164,122,0.5)]" />
                <span className="text-[10px] text-royal-text-muted uppercase tracking-wider">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="text-[10px] text-royal-text-muted uppercase tracking-wider">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                <span className="text-[10px] text-royal-text-muted uppercase tracking-wider">Fully Booked</span>
              </div>
            </div>

            {/* Time Slots — shown after date is selected */}
            {selectedFullDate && (
              <div className="mt-8 pt-6 border-t border-royal-border" style={{ animation: 'fadeSlideUp 0.4s ease-out' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-sans text-sm text-white uppercase tracking-wider font-bold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-royal-gold" /> Available Times
                  </h3>
                  <span className="text-[10px] text-royal-text-muted uppercase tracking-wider">
                    {formattedDate}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {timeSlots.map((slot, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-4 px-3 text-center transition-all border rounded-lg group ${
                        selectedTime === slot.time
                          ? 'bg-royal-gold text-white border-royal-gold shadow-[0_0_20px_rgba(201,164,122,0.25)]'
                          : 'bg-transparent text-white border-royal-border hover:border-royal-gold hover:bg-white/5'
                      }`}
                    >
                      <div className="text-sm font-bold">{slot.time}</div>
                      <div className={`text-[9px] uppercase tracking-wider mt-1 ${
                        selectedTime === slot.time ? 'text-white/80' : 'text-royal-text-muted'
                      }`}>{slot.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ─── Right Sidebar (2 cols) ─── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Summary Card */}
            <div className="bg-royal-charcoal border border-royal-border p-6">
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
                  <div className="flex justify-between items-center text-sm font-bold mt-3">
                    <span className="text-white">Deposit Required</span>
                    <span className="text-royal-gold text-lg">$150.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Project Details */}
            <div className={`bg-royal-charcoal border border-royal-border p-6 transition-all duration-500 ${
              step >= 3 ? 'opacity-100' : 'opacity-40 pointer-events-none'
            }`}>
              <h3 className="font-sans text-sm text-white uppercase tracking-wider font-bold mb-6 pb-3 border-b border-royal-border flex items-center gap-2">
                <User className="w-4 h-4 text-royal-gold" /> Your Details
              </h3>
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-text-muted/50" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-transparent border border-royal-border text-white pl-10 pr-4 py-3 focus:outline-none focus:border-royal-gold transition-colors text-sm rounded"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-text-muted/50" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-transparent border border-royal-border text-white pl-10 pr-4 py-3 focus:outline-none focus:border-royal-gold transition-colors text-sm rounded"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-text-muted/50" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-transparent border border-royal-border text-white pl-10 pr-4 py-3 focus:outline-none focus:border-royal-gold transition-colors text-sm rounded"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-royal-text-muted/50" />
                  <input
                    type="text"
                    placeholder="Project Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full bg-transparent border border-royal-border text-white pl-10 pr-4 py-3 focus:outline-none focus:border-royal-gold transition-colors text-sm rounded"
                  />
                </div>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-royal-text-muted/50" />
                  <textarea
                    placeholder="Brief project description (optional)"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-transparent border border-royal-border text-white pl-10 pr-4 py-3 focus:outline-none focus:border-royal-gold transition-colors text-sm rounded resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className={`bg-royal-charcoal border border-royal-border p-6 transition-all duration-500 ${
              step >= 3 ? 'opacity-100' : 'opacity-40 pointer-events-none'
            }`}>
              <h3 className="font-sans text-sm text-white uppercase tracking-wider font-bold mb-6 pb-3 border-b border-royal-border flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-royal-gold" /> Payment
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full bg-transparent border border-royal-border text-white px-4 py-3 focus:outline-none focus:border-royal-gold transition-colors text-sm rounded"
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full bg-transparent border border-royal-border text-white px-4 py-3 focus:outline-none focus:border-royal-gold transition-colors text-sm rounded"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full bg-transparent border border-royal-border text-white px-4 py-3 focus:outline-none focus:border-royal-gold transition-colors text-sm rounded"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full bg-transparent border border-royal-border text-white px-4 py-3 focus:outline-none focus:border-royal-gold transition-colors text-sm rounded"
                  />
                </div>
              </div>

              <button className="w-full mt-6 py-4 bg-royal-gold text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all rounded flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                Confirm & Pay $150
              </button>
              <p className="text-center text-[10px] text-royal-text-muted mt-3 tracking-wide uppercase flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" /> Secure payment · 256-bit encryption
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
