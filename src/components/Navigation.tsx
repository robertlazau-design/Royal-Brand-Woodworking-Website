import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Phone } from 'lucide-react';
import { BUSINESS } from '../data/business';
import { RoyalLogo } from './RoyalLogo';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Custom Doors', href: '/order' },
];

export function Navigation() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`print:hidden sticky top-0 z-50 w-full backdrop-blur-md border-b transition-all duration-500 py-3 px-6 md:px-12 ${
      scrolled
        ? 'bg-royal-bg/98 border-royal-border-light shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
        : 'bg-royal-bg/80 border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <RoyalLogo />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center justify-center gap-5 lg:gap-6 xl:gap-8 flex-1 px-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-link-underline whitespace-nowrap text-xs font-bold uppercase tracking-[0.12em] xl:tracking-[0.15em] transition-colors relative pb-1 ${
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
        <div className="hidden md:flex flex-shrink-0 items-center gap-5">
          <a href={BUSINESS.phoneHref} className="hidden xl:flex items-center gap-2 text-white text-sm font-bold hover:text-royal-gold transition-colors">
            <Phone className="w-4 h-4 text-royal-gold" /> {BUSINESS.phoneDisplay}
          </a>
          <Link to="/booking" className="px-6 py-2.5 bg-royal-gold text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all shadow-[0_0_20px_rgba(201,164,122,0.15)] hover:shadow-[0_0_25px_rgba(201,164,122,0.3)]">
            Book an Estimate
          </Link>
        </div>

        {/* Mobile: call + menu */}
        <div className="md:hidden flex items-center gap-1">
        <a href={BUSINESS.phoneHref} aria-label={`Call ${BUSINESS.phoneDisplay}`} className="p-2 text-royal-gold">
          <Phone className="w-5 h-5" />
        </a>
        <button 
          className="flex-shrink-0 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
        </div>

      </div>

      {/* Mobile Nav Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-royal-charcoal border-b border-royal-border-light shadow-xl overflow-hidden transition-all duration-500 ease-in-out ${
        mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 py-6 space-y-1">
          {navLinks.map((link, idx) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between py-3 px-4 text-sm font-bold uppercase tracking-wider transition-all rounded ${
                location.pathname === link.href
                  ? 'text-royal-gold bg-royal-gold/5'
                  : 'text-royal-text-muted hover:text-white hover:bg-white/5'
              }`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <span>{link.label}</span>
              <ChevronRight className={`w-4 h-4 transition-colors ${
                location.pathname === link.href ? 'text-royal-gold' : 'text-royal-border'
              }`} />
            </Link>
          ))}
          <div className="pt-4 mt-2 border-t border-royal-border-light">
            <Link to="/booking" onClick={() => setMobileOpen(false)} className="block text-center w-full px-6 py-3.5 bg-royal-gold text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all">
              Book an Estimate
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
