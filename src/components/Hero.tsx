import { Link } from 'react-router-dom';
import { Star, ChevronDown, Phone } from 'lucide-react';
import { BUSINESS } from '../data/business';
import { srcSetFor } from '../lib/images';

export function Hero() {
  return (
    <section id="overview" className="relative w-full md:h-[90vh] md:min-h-[650px] flex items-center bg-royal-bg overflow-hidden">
      {/* Background Image & Overlay */}
      {/* Phones: photo is a clear band across the top. Desktop: photo fills the right side, beside the text. */}
      <div className="absolute inset-x-0 top-0 h-[280px] md:h-auto md:inset-y-0 md:left-[34%] lg:left-[42%] xl:left-[34%] md:right-0 z-0 overflow-hidden">
        <img 
          src="/photos/web/crosscutting-lumber.jpg"
          srcSet={srcSetFor("/photos/web/crosscutting-lumber.jpg")}
          sizes="(max-width: 767px) 100vw, 66vw"
          alt="Robert Burlacu crosscutting a board on the miter saw in the Royal Brand Woodworking shop" 
          className="w-full h-full object-cover object-[45%_center] md:object-[18%_center] scale-105"
          loading="eager"
          fetchPriority="high"
          style={{ animation: 'heroParallax 20s ease-in-out infinite alternate' }}
        />
        {/* Optional hero video (set BUSINESS.heroVideo). The photo above stays as
            the poster and the fallback; people who prefer reduced motion keep the photo. */}
        {BUSINESS.heroVideo && (
          <video
            className="absolute inset-0 w-full h-full object-cover object-[45%_center] md:object-[18%_center] motion-reduce:hidden"
            src={BUSINESS.heroVideo}
            poster="/photos/web/crosscutting-lumber.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}
        {/* Layered overlays for depth */}
        <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-royal-bg to-transparent z-10 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-bg via-transparent via-40% to-royal-bg/30 z-10 hidden md:block" />
        {/* Tablets: the headline overlaps the photo, so shade it more */}
        <div className="absolute inset-0 bg-royal-bg/55 hidden md:block lg:hidden z-10" />
        {/* Phones: fade the bottom of the photo band into the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-royal-bg/20 via-transparent via-45% to-royal-bg to-90% md:hidden z-10" />
              </div>

      {/* Decorative left accent line */}
      <div className="absolute left-6 md:left-12 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-royal-gold/30 to-transparent z-20 hidden md:block" />

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 pt-[245px] pb-12 md:py-0 flex flex-col justify-center h-full">
        <div className="max-w-2xl md:pl-8">
          <p className="text-royal-gold text-sm font-bold uppercase tracking-[0.2em] mb-6 animate-fade-in-up">
            Portland, Oregon
          </p>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-[1.05] uppercase mb-6 drop-shadow-lg">
            <span className="block animate-fade-in-up delay-100">Custom Cabinets</span>
            <span className="block animate-fade-in-up delay-200">&amp; Furniture, <span className="gold-shimmer">Built by Hand.</span></span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed mb-8 max-w-xl animate-fade-in-up delay-300">
            Kitchens, bathrooms and furniture made by Robert Burlacu — a third-generation woodworker — in his Portland shop.
          </p>

          {/* Mini review */}
          <div className="flex items-center gap-3 mb-10 animate-fade-in-up delay-400">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-royal-gold text-royal-gold" />
              ))}
            </div>
            <div className="w-[1px] h-4 bg-royal-border" />
            <span className="text-gray-200 text-sm">5-star reviews on Google</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 animate-fade-in-up delay-500">
            <Link to="/booking" className="text-center px-8 py-4 bg-royal-gold text-white font-bold text-sm tracking-[0.1em] uppercase hover:bg-white hover:text-royal-charcoal transition-all shadow-[0_0_30px_rgba(201,164,122,0.2)]">
              Book an Estimate
            </Link>
            <a href={BUSINESS.phoneHref} className="px-8 py-4 bg-transparent text-white font-bold text-sm tracking-[0.1em] uppercase border border-white/40 hover:border-royal-gold hover:text-royal-gold transition-all flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Call {BUSINESS.phoneDisplay}
            </a>
          </div>
          <Link to="/order" className="mt-5 py-2 inline-flex items-center gap-2 text-royal-text-muted text-sm hover:text-royal-gold transition-colors animate-fade-in-up delay-600 group">
            Just need new cabinet doors? <span className="text-royal-gold font-bold">Order online</span>
            <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-royal-gold group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 animate-scroll-bounce">
        <span className="text-royal-text-muted text-xs uppercase tracking-[0.2em] font-bold">Scroll</span>
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
