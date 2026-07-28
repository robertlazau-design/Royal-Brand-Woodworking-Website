import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { RoyalLogo } from './RoyalLogo';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Estimator', href: '/estimator' },
  { label: 'Book Estimate', href: '/booking' },
];

export function Navigation() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-royal-bg/95 backdrop-blur-md border-b border-royal-border-light py-3 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <RoyalLogo light={true} />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center justify-center gap-8 flex-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
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
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex flex-shrink-0">
          <Link to="/estimator" className="px-6 py-2.5 bg-royal-gold text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all">
            Get a Quote
          </Link>
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
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-bold uppercase tracking-wider transition-colors ${
                location.pathname === link.href ? 'text-royal-gold' : 'text-royal-text-muted hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-royal-border-light">
            <Link to="/estimator" onClick={() => setMobileOpen(false)} className="block text-center w-full px-6 py-3 bg-royal-gold text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all">
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
