import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    stars: 5,
    text: "Robert is an absolutely phenomenal cabinet maker and contractor. His attention to detail and stellar craftsmanship made our kitchen/dining/bath renovation a dream.",
    author: "Marisa S."
  },
  {
    stars: 5,
    text: "This is true craftsmanship! They take great pride in their work and it shows. They went above and beyond to be sure every detail of our project was perfect. 10/10!",
    author: "Bo Malmin"
  },
  {
    stars: 5,
    text: "Robert has built the custom cabinets for our kitchen, bathrooms, and laundry room, and every project exceeded our expectations. He's a true craftsman with an incredible eye for detail.",
    author: "Brian Bostick"
  }
];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="overview" className="relative w-full h-[80vh] min-h-[600px] flex items-center bg-royal-bg overflow-hidden border-b border-royal-border-light">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1920&q=80" 
          alt="Craftsman doing woodworking" 
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        {/* Dark overlay with gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-royal-bg via-royal-bg/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full">
        <div className="max-w-2xl">
          {/* Artisan Badge */}
          <div className="flex items-center gap-3 mb-6">
            <img src="/crown-icon.svg" alt="Crown" className="w-6 h-6 opacity-80" onError={(e) => e.currentTarget.style.display = 'none'} />
            <span className="text-royal-gold text-[10px] font-bold uppercase tracking-[0.2em]">Premium Craftsmanship</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl text-white font-bold leading-[1.1] uppercase mb-6 drop-shadow-lg">
            Crafted<br />
            To <span className="text-royal-text-muted">Perfection.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-royal-text-muted font-light leading-relaxed mb-10 max-w-xl">
            Custom woodworking that elevates your space. Handcrafting luxury furniture & fine woodwork.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <a href="#services" className="px-8 py-3.5 bg-white text-royal-black font-bold text-xs tracking-[0.15em] uppercase hover:bg-royal-gold hover:text-white transition-all shadow-lg border border-transparent">
              View Our Work
            </a>
            <a href="#doors-drawers" className="px-8 py-3.5 bg-transparent text-white font-bold text-xs tracking-[0.15em] uppercase border border-royal-border-light hover:border-royal-gold hover:text-royal-gold transition-all flex items-center gap-2">
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">▶</span>
              Start Your Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
