import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

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
  return (
    <section id="overview" className="relative w-full h-[85vh] min-h-[600px] flex items-center bg-royal-bg overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-royal-bg via-royal-bg/85 to-transparent z-10" />
        <div className="absolute inset-0 bg-royal-bg/40 z-10" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full">
        <div className="max-w-2xl">
          {/* Logo badge */}
          <div className="flex items-center gap-3 mb-8">
            <img src="/logo.png" alt="Royal Brand Woodworking" className="w-12 h-12 object-contain" />
            <span className="text-royal-gold text-[10px] font-bold uppercase tracking-[0.2em]">Est. 2009 · 3rd Generation</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl text-white font-bold leading-[1.1] uppercase mb-6 drop-shadow-lg">
            Crafted<br />
            To <span className="text-royal-gold">Perfection.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-royal-text-muted font-light leading-relaxed mb-10 max-w-xl">
            Custom woodworking that elevates your space. Handcrafting luxury furniture & fine cabinetry in Portland, OR.
          </p>
          
          {/* Mini review */}
          <div className="flex items-center gap-2 mb-10">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-royal-gold text-royal-gold" />
              ))}
            </div>
            <span className="text-royal-text-muted text-xs font-light">5.0 · Google Reviews</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/services" className="px-8 py-3.5 bg-royal-gold text-white font-bold text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-royal-charcoal transition-all shadow-lg">
              View Our Work
            </Link>
            <Link to="/estimator" className="px-8 py-3.5 bg-transparent text-white font-bold text-xs tracking-[0.15em] uppercase border border-royal-border hover:border-royal-gold hover:text-royal-gold transition-all">
              Start Your Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
