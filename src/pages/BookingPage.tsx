import React, { useState } from 'react';
import { Calendar, Clock, CreditCard, ChevronRight, ChevronLeft } from 'lucide-react';

export function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Dummy data for next week
  const today = new Date();
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1); // start tomorrow
    return {
      dayOfWeek: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      fullDate: d,
      isAvailable: d.getDay() !== 0 && d.getDay() !== 6 // Mon-Fri only
    };
  });
  
  const timeSlots = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM'];

  return (
    <section className="py-24 bg-royal-bg text-royal-text min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
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

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calendar Selection */}
          <div className="bg-royal-charcoal border border-royal-border p-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-royal-border">
              <h3 className="font-sans text-lg text-white uppercase tracking-wider font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-royal-gold" /> Select a Day
              </h3>
              <div className="flex gap-2">
                <button className="p-1 hover:text-royal-gold text-royal-text-muted transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                <button className="p-1 hover:text-royal-gold text-royal-text-muted transition-colors"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-8">
              {days.map((d, i) => (
                <div key={i} className="text-center">
                  <div className="text-[10px] text-royal-text-muted uppercase font-bold mb-2">{d.dayOfWeek}</div>
                  <button
                    onClick={() => d.isAvailable && setSelectedDate(d.date)}
                    disabled={!d.isAvailable}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all ${
                      !d.isAvailable ? 'opacity-30 cursor-not-allowed' :
                      selectedDate === d.date ? 'bg-royal-gold text-white font-bold shadow-lg' : 'bg-transparent border border-royal-border hover:border-royal-gold text-white'
                    }`}
                  >
                    {d.date}
                  </button>
                </div>
              ))}
            </div>

            {selectedDate && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                <h3 className="font-sans text-sm text-royal-text-muted uppercase tracking-wider font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-royal-gold" /> Available Times
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 text-xs uppercase tracking-wider font-bold transition-all border ${
                        selectedTime === time ? 'bg-royal-gold text-white border-royal-gold' : 'bg-transparent text-white border-royal-border hover:border-royal-gold'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Payment & Confirmation */}
          <div className={`bg-royal-charcoal border border-royal-border p-8 transition-opacity duration-500 ${selectedDate && selectedTime ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
            <h3 className="font-sans text-lg text-white uppercase tracking-wider font-bold mb-8 pb-4 border-b border-royal-border flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-royal-gold" /> Payment Details
            </h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-center text-sm font-light">
                <span className="text-royal-text-muted">Service</span>
                <span className="text-white">On-Site Estimate</span>
              </div>
              <div className="flex justify-between items-center text-sm font-light">
                <span className="text-royal-text-muted">Rate</span>
                <span className="text-white">$150.00 / hour</span>
              </div>
              <div className="flex justify-between items-center text-sm font-light border-b border-royal-border pb-6">
                <span className="text-royal-text-muted">Deposit Required</span>
                <span className="text-white font-bold">$150.00</span>
              </div>
            </div>

            <div className="space-y-4">
              <input type="text" placeholder="Cardholder Name" className="w-full bg-transparent border border-royal-border text-white p-4 focus:outline-none focus:border-royal-gold transition-colors text-sm" />
              <input type="text" placeholder="Card Number" className="w-full bg-transparent border border-royal-border text-white p-4 focus:outline-none focus:border-royal-gold transition-colors text-sm" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" className="w-full bg-transparent border border-royal-border text-white p-4 focus:outline-none focus:border-royal-gold transition-colors text-sm" />
                <input type="text" placeholder="CVC" className="w-full bg-transparent border border-royal-border text-white p-4 focus:outline-none focus:border-royal-gold transition-colors text-sm" />
              </div>
            </div>

            <button className="w-full mt-8 py-4 bg-royal-gold text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all">
              Confirm & Pay $150
            </button>
            <p className="text-center text-[10px] text-royal-text-muted mt-4 tracking-wide uppercase">
              Secure payment processing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
