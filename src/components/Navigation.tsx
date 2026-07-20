import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { RoyalLogo } from './RoyalLogo';

const navLinks = [
  { label: 'Home', href: '#overview' },
  { label: 'About', href: '#heritage' },
  { label: 'Services', href: '#services' },
  { label: 'Estimator', href: '#doors-drawers' },
  { label: 'Reviews', href: '#testimonials' },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll-spy: track which section is in view
  useEffect(() => {
    const sectionIds = ['overview', 'heritage', 'services', 'doors-drawers', 'testimonials'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="relative z-30">
      {/* Top Dark Header Bar */}
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
            <a href="tel:555-0199" className="text-[10px] uppercase font-bold tracking-wider text-right hover:text-white/80 transition-colors">
              <p className="text-white/60">Call Robert</p>
              <p className="mt-0.5 text-white font-extrabold">(555) 0199</p>
            </a>
            <a href="mailto:robert@royalbrand.com" className="text-[10px] uppercase font-bold tracking-wider text-right hover:text-white/80 transition-colors">
              <p className="text-white/60">Email</p>
              <p className="mt-0.5 text-white font-extrabold lowercase">robert@royalbrand.com</p>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button 
            className="md:hidden flex-1 flex justify-end"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>

        </div>
      </div>

      {/* Sub-navigation bar with active link highlighting */}
      <div className="bg-[#8cb2c5] py-3.5 px-6 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-8 md:gap-12">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-[11px] font-extrabold uppercase tracking-widest transition-colors relative ${
                  isActive
                    ? 'text-white'
                    : 'text-royal-charcoal hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-white rounded-full" />
                )}
              </a>
            );
          })}
        </div>
      </div>

      {/* Mobile nav menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#2c201c] border-t border-white/10 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-white/80 hover:text-white transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <div className="border-t border-white/10 pt-3 space-y-2">
            <a href="tel:555-0199" className="block text-sm text-royal-terracotta font-bold">📞 (555) 0199</a>
            <a href="mailto:robert@royalbrand.com" className="block text-sm text-white/70">robert@royalbrand.com</a>
          </div>
        </div>
      )}
    </nav>
  );
}
