import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { BUSINESS } from '../data/business';

export function NotFoundPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-20 text-center bg-royal-bg text-white">
      <div className="max-w-md">
        <img src="/logo-sm.png" alt="" className="w-16 h-16 object-contain mx-auto mb-6" />
        <h1 className="font-serif text-3xl md:text-4xl font-bold uppercase tracking-wide mb-4">Page Not Found</h1>
        <p className="text-gray-300 text-base mb-8">That page doesn't exist — it may have moved. Try one of these instead:</p>
        <div className="flex flex-col gap-3">
          <Link to="/" className="py-4 bg-royal-gold text-white font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all">Go to the Home Page</Link>
          <Link to="/gallery" className="py-4 border border-royal-border font-bold text-sm uppercase tracking-wider hover:border-royal-gold hover:text-royal-gold transition-all">See Our Work</Link>
          <a href={BUSINESS.phoneHref} className="py-4 border border-royal-border font-bold text-sm uppercase tracking-wider hover:border-royal-gold hover:text-royal-gold transition-all inline-flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" /> Call {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
