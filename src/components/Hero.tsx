import { Link } from 'react-router-dom';
import { Star, ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section id="overview" className="relative w-full h-[90vh] min-h-[650px] flex items-center bg-royal-bg overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1920&q=80" 
          alt="Craftsman doing woodworking" 
          className="w-full h-full object-cover object-center scale-105"
          loading="eager"
          fetchPriority="high"
          style={{ animation: 'heroParallax 20s ease-in-out infinite alternate' }}
        />
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-royal-bg via-royal-bg/90 to-royal-bg/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-bg/80 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-royal-bg/30 z-10" />
      </div>

      {/* Decorative left accent line */}
      <div className="absolute left-6 md:left-12 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-royal-gold/30 to-transparent z-20 hidden md:block" />

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full">
        <div className="max-w-2xl md:pl-8">
          {/* Logo badge */}
          <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
            <img src="/logo.png" alt="Royal Brand Woodworking" className="w-12 h-12 object-contain" />
            <div className="flex flex-col">
              <span className="text-royal-gold text-[10px] font-bold uppercase tracking-[0.2em]">Est. 2009 · 3rd Generation</span>
              <span className="text-royal-text-muted text-[9px] uppercase tracking-[0.15em] mt-0.5">Portland, Oregon</span>
            </div>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-[1.05] uppercase mb-4 drop-shadow-lg">
            <span className="block animate-fade-in-up delay-100">Crafted</span>
            <span className="block animate-fade-in-up delay-200">To <span className="gold-shimmer">Perfection.</span></span>
          </h1>

          {/* Ornamental divider */}
          <div className="flex items-center gap-3 my-8 animate-fade-in-up delay-300">
            <div className="w-12 h-[1px] bg-royal-gold" />
            <div className="w-1.5 h-1.5 bg-royal-gold rotate-45" />
            <div className="w-24 h-[1px] bg-gradient-to-r from-royal-gold to-transparent" />
          </div>
          
          <p className="text-lg md:text-xl text-royal-text-muted font-light leading-relaxed mb-10 max-w-xl animate-fade-in-up delay-300">
            Custom woodworking that elevates your space. Handcrafting luxury furniture & fine cabinetry in Portland, OR.
          </p>
          
          {/* Mini review */}
          <div className="flex items-center gap-3 mb-10 animate-fade-in-up delay-400">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-royal-gold text-royal-gold" />
              ))}
            </div>
            <div className="w-[1px] h-4 bg-royal-border" />
            <span className="text-royal-text-muted text-xs font-light">5.0 Rating · Google Reviews</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 animate-fade-in-up delay-500">
            <Link to="/services" className="group px-8 py-3.5 bg-royal-gold text-white font-bold text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-royal-charcoal transition-all shadow-[0_0_30px_rgba(201,164,122,0.2)] hover:shadow-[0_0_40px_rgba(201,164,122,0.4)]">
              View Our Work
            </Link>
            <Link to="/booking" className="px-8 py-3.5 bg-transparent text-white font-bold text-xs tracking-[0.15em] uppercase border border-royal-border hover:border-royal-gold hover:text-royal-gold transition-all">
              Start Your Project
            </Link>
            <Link to="/estimator" className="text-royal-text-muted font-bold text-xs tracking-[0.15em] uppercase hover:text-royal-gold transition-all flex items-center gap-2 group">
              Order Custom Doors
              <ChevronDown className="w-3.5 h-3.5 -rotate-90 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-scroll-bounce">
        <span className="text-royal-text-muted text-[9px] uppercase tracking-[0.2em] font-bold">Scroll</span>
        <ChevronDown className="w-4 h-4 text-royal-gold" />
      </div>

      {/* Hero parallax animation */}
      <style>{`
        @keyframes heroParallax {
          0% { transform: scale(1.05) translateY(0); }
          100% { transform: scale(1.1) translateY(-15px); }
        }
      `}</style>
    </section>
  );
}
