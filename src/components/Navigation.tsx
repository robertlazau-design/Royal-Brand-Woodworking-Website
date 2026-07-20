import { Menu } from 'lucide-react';
import { RoyalLogo } from './RoyalLogo';

export function Navigation() {
  return (
    <nav className="relative z-30">
      {/* Top Dark Header Bar (Cafe style) */}
      <div className="bg-[#2c201c] text-white/90 border-b border-white/5 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Left group: Hours + Workshop */}
          <div className="hidden md:flex items-center gap-10 flex-1">
            <div className="text-[10px] uppercase font-bold tracking-wider">
              <p className="text-white/60">Hours</p>
              <p className="mt-0.5 text-white font-extrabold">Mon - Fri: 8am - 5pm</p>
            </div>
            <div className="text-[10px] uppercase font-bold tracking-wider">
              <p className="text-white/60">Workshop</p>
              <p className="mt-0.5 text-white font-extrabold">Portland, OR</p>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center flex-1">
            <a href="#" className="hover:opacity-90 transition-opacity">
              <RoyalLogo light={true} />
            </a>
          </div>

          {/* Right group: Phone + Email */}
          <div className="hidden md:flex items-center justify-end gap-10 flex-1">
            <div className="text-[10px] uppercase font-bold tracking-wider text-right">
              <p className="text-white/60">Call Robert</p>
              <p className="mt-0.5 text-white font-extrabold">(555) 0199</p>
            </div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-right">
              <p className="text-white/60">Email</p>
              <p className="mt-0.5 text-white font-extrabold lowercase">robert@royalbrand.com</p>
            </div>
          </div>

          {/* Mobile: just logo (already centered via flex-1) */}
          <div className="md:hidden flex-1" />

        </div>
      </div>

      {/* Sub-navigation bar (Cafe style light blue-grey banner) */}
      <div className="bg-[#8cb2c5] py-3.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-8 md:gap-12">
          <a href="#overview" className="text-[11px] font-extrabold uppercase tracking-widest text-royal-charcoal hover:text-white transition-colors">Home</a>
          <a href="#heritage" className="text-[11px] font-extrabold uppercase tracking-widest text-royal-charcoal hover:text-white transition-colors">About</a>
          <a href="#services" className="text-[11px] font-extrabold uppercase tracking-widest text-royal-charcoal hover:text-white transition-colors">Services</a>
          <a href="#doors-drawers" className="text-[11px] font-extrabold uppercase tracking-widest text-royal-charcoal hover:text-white transition-colors">Estimator</a>
          <a href="#testimonials" className="text-[11px] font-extrabold uppercase tracking-widest text-royal-charcoal hover:text-white transition-colors">Reviews</a>
        </div>
      </div>
    </nav>
  );
}
