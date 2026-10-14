import { Link, useLocation } from 'react-router-dom';
import { Phone, CalendarCheck } from 'lucide-react';
import { BUSINESS } from '../data/business';

// Pages that already have their own main action.
const HIDDEN_ON = ['/booking', '/order'];

export function useShowMobileActionBar() {
  const { pathname } = useLocation();
  return !HIDDEN_ON.includes(pathname);
}

// Phones only: call or book is always one tap away.
export function MobileActionBar() {
  if (!useShowMobileActionBar()) return null;
  return (
    <div className="md:hidden print:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 gap-2 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] bg-royal-bg/95 backdrop-blur-md border-t border-royal-border">
      <a href={BUSINESS.phoneHref} className="flex items-center justify-center gap-2 py-3 border border-royal-gold/60 text-royal-gold font-bold text-sm uppercase tracking-wider">
        <Phone className="w-4 h-4" /> Call
      </a>
      <Link to="/booking" className="flex items-center justify-center gap-2 py-3 bg-royal-gold text-white font-bold text-sm uppercase tracking-wider">
        <CalendarCheck className="w-4 h-4" /> Book Estimate
      </Link>
    </div>
  );
}
