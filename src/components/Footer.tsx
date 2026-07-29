import { Link } from 'react-router-dom';
import { RoyalLogo } from './RoyalLogo';

export function Footer() {
  return (
    <footer id="heritage" className="bg-royal-charcoal text-white pt-24 pb-12 border-t border-royal-border-light">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-20">
          {/* Owner Bio Section */}
          <div className="lg:col-span-3 space-y-8">
            <Link to="/">
              <RoyalLogo light={true} />
            </Link>
            
            <div className="space-y-4">
              <p className="text-royal-text-muted text-sm font-light leading-relaxed max-w-xl">
                Custom woodworking that elevates your space. Handcrafting luxury furniture & fine cabinetry in Portland, OR.
              </p>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="lg:col-span-1 space-y-6">
            <h4 className="font-bold text-white tracking-wider uppercase text-xs">Navigate</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="text-royal-text-muted font-light hover:text-royal-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-royal-text-muted font-light hover:text-royal-gold transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-royal-text-muted font-light hover:text-royal-gold transition-colors">Services</Link></li>
              <li><Link to="/estimator" className="text-royal-text-muted font-light hover:text-royal-gold transition-colors">Door Estimator</Link></li>
              <li><Link to="/booking" className="text-royal-text-muted font-light hover:text-royal-gold transition-colors">Book Estimate</Link></li>
            </ul>
          </div>
          
          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-6">
            <h4 className="font-bold text-white tracking-wider uppercase text-xs">Contact Us</h4>
            <ul className="space-y-4 text-royal-text-muted text-sm font-light">
              <li>Robert Burlacu, Owner</li>
              <li><a href="mailto:robertlazau@gmail.com" className="hover:text-royal-gold transition-colors">robertlazau@gmail.com</a></li>
              <li><a href="tel:555-0199" className="hover:text-royal-gold transition-colors">Workshop: 555-0199</a></li>
              <li className="pt-4">
                <Link to="/estimator" className="text-royal-gold font-bold uppercase tracking-wider text-[10px] hover:text-white transition-colors">Order Online &rarr;</Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright strip */}
        <div className="pt-8 border-t border-royal-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-royal-text-muted text-xs font-light">
            &copy; {new Date().getFullYear()} Royal Brand Woodworking. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-royal-text-muted font-light hover:text-white text-xs transition-colors tracking-wide uppercase">Privacy Policy</a>
            <a href="#" className="text-royal-text-muted font-light hover:text-white text-xs transition-colors tracking-wide uppercase">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
