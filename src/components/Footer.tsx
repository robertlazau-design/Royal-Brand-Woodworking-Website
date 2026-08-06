import { Link } from 'react-router-dom';
import { RoyalLogo } from './RoyalLogo';
import { Mail, Phone, MapPin, Clock, Star, ChevronRight } from 'lucide-react';

export function Footer() {
  return (
    <footer id="heritage" className="bg-royal-charcoal text-white relative">
      {/* Decorative gold top line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-royal-gold/60 to-transparent" />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-6">
              <Link to="/">
                <RoyalLogo light={true} />
              </Link>
              
              <p className="text-royal-text-muted text-sm font-light leading-relaxed max-w-sm">
                Third-generation craftsmanship meets modern precision. We handcraft custom doors, fine furniture, and bespoke woodwork for clients who demand excellence.
              </p>

              {/* Google Reviews badge */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-royal-gold text-royal-gold" />
                  ))}
                </div>
                <span className="text-royal-text-muted text-xs font-light">5.0 · Google Reviews</span>
              </div>

              {/* Est. badge */}
              <div className="flex items-center gap-3 pt-1">
                <div className="w-8 h-[1px] bg-royal-gold/40" />
                <span className="text-royal-gold text-[9px] font-bold uppercase tracking-[0.2em]">Est. 2009 · Portland, OR</span>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="lg:col-span-2 space-y-6">
              <h4 className="font-bold text-white tracking-wider uppercase text-[11px] flex items-center gap-2">
                <div className="w-4 h-[1px] bg-royal-gold" />
                Navigate
              </h4>
              <ul className="space-y-3.5 text-sm">
                {[
                  { label: 'Home', to: '/' },
                  { label: 'About Us', to: '/about' },
                  { label: 'Services', to: '/services' },
                  { label: 'Door Estimator', to: '/estimator' },
                  { label: 'Book Estimate', to: '/booking' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-royal-text-muted font-light hover:text-royal-gold transition-colors group flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-royal-gold/0 group-hover:text-royal-gold transition-all -ml-4 group-hover:ml-0 opacity-0 group-hover:opacity-100" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Details */}
            <div className="lg:col-span-3 space-y-6">
              <h4 className="font-bold text-white tracking-wider uppercase text-[11px] flex items-center gap-2">
                <div className="w-4 h-[1px] bg-royal-gold" />
                Get in Touch
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-royal-bg/60 flex items-center justify-center shrink-0 border border-royal-border">
                    <Phone className="w-3.5 h-3.5 text-royal-gold" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold uppercase tracking-wider mb-0.5">Workshop</p>
                    <a href="tel:555-0199" className="text-royal-text-muted font-light hover:text-royal-gold transition-colors">555-0199</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-royal-bg/60 flex items-center justify-center shrink-0 border border-royal-border">
                    <Mail className="w-3.5 h-3.5 text-royal-gold" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold uppercase tracking-wider mb-0.5">Email</p>
                    <a href="mailto:robertlazau@gmail.com" className="text-royal-text-muted font-light hover:text-royal-gold transition-colors">robertlazau@gmail.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-royal-bg/60 flex items-center justify-center shrink-0 border border-royal-border">
                    <MapPin className="w-3.5 h-3.5 text-royal-gold" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold uppercase tracking-wider mb-0.5">Location</p>
                    <p className="text-royal-text-muted font-light">Portland, Oregon</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Hours & CTA */}
            <div className="lg:col-span-3 space-y-6">
              <h4 className="font-bold text-white tracking-wider uppercase text-[11px] flex items-center gap-2">
                <div className="w-4 h-[1px] bg-royal-gold" />
                Workshop Hours
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-3">
                  <Clock className="w-3.5 h-3.5 text-royal-gold shrink-0" />
                  <div className="flex justify-between w-full">
                    <span className="text-royal-text-muted font-light">Mon – Fri</span>
                    <span className="text-white font-light">7:00 AM – 5:00 PM</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-3.5 h-3.5 text-royal-gold shrink-0" />
                  <div className="flex justify-between w-full">
                    <span className="text-royal-text-muted font-light">Saturday</span>
                    <span className="text-white font-light">By Appointment</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-3.5 h-3.5 text-royal-text-muted/30 shrink-0" />
                  <div className="flex justify-between w-full">
                    <span className="text-royal-text-muted/50 font-light">Sunday</span>
                    <span className="text-royal-text-muted/50 font-light">Closed</span>
                  </div>
                </li>
              </ul>

              {/* CTA Buttons */}
              <div className="pt-2 space-y-3">
                <Link
                  to="/estimator"
                  className="block w-full text-center px-6 py-3 bg-royal-gold text-white font-bold text-[10px] uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all"
                >
                  Order Custom Doors
                </Link>
                <Link
                  to="/booking"
                  className="block w-full text-center px-6 py-3 bg-transparent text-royal-gold font-bold text-[10px] uppercase tracking-wider border border-royal-gold/40 hover:border-royal-gold hover:bg-royal-gold/5 transition-all"
                >
                  Book a Consultation
                </Link>
              </div>
            </div>
          </div>
          
          {/* Divider with logo */}
          <div className="flex items-center gap-6 mb-8">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-royal-border" />
            <img src="/logo.png" alt="Royal Brand" className="w-8 h-8 object-contain opacity-30" />
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-royal-border" />
          </div>

          {/* Copyright strip */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-royal-text-muted/60 text-[10px] font-light tracking-wide">
              &copy; {new Date().getFullYear()} Royal Brand Woodworking. All rights reserved. Handcrafted with pride in Portland, OR.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-royal-text-muted/60 font-light hover:text-royal-gold text-[10px] transition-colors tracking-wide uppercase">Privacy Policy</a>
              <a href="#" className="text-royal-text-muted/60 font-light hover:text-royal-gold text-[10px] transition-colors tracking-wide uppercase">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

