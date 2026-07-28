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
    <nav className="relative z-30 w-full bg-royal-bg border-b border-royal-border-light py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="#" className="hover:opacity-90 transition-opacity">
            <RoyalLogo light={true} />
          </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center justify-center gap-8 flex-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-colors relative pb-1 ${
                  isActive
                    ? 'text-white'
                    : 'text-royal-text-muted hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-royal-gold" />
                )}
              </a>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex flex-shrink-0">
          <a href="#doors-drawers" className="px-6 py-2.5 bg-white text-royal-black font-bold text-xs uppercase tracking-wider hover:bg-royal-gold hover:text-white transition-all shadow-sm">
            Get a Quote
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden flex-shrink-0 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>

      </div>

      {/* Mobile Nav Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-royal-charcoal border-b border-royal-border-light px-6 py-4 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-royal-text-muted hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-royal-border-light">
            <a href="#doors-drawers" className="block text-center w-full px-6 py-3 bg-royal-gold text-white font-bold text-xs uppercase tracking-wider hover:bg-royal-bronze transition-all">
              Get a Quote
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
