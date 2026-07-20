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
    <section id="overview" className="bg-royal-cream text-royal-text-dark relative z-10 flex flex-col">
      {/* Widescreen image section */}
      <div className="relative w-full h-[380px] md:h-[480px] overflow-hidden border-b border-royal-stone/20">
        <img 
          src="https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1600&q=80" 
          alt="Woodworking workshop" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#2c201c]/30" />

        {/* Floating Reviews Slider Card (from last iteration) */}
        <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-xl z-20 border border-royal-stone/20 max-w-[280px] hidden md:block">
          <div className="flex items-center gap-1 text-royal-amber mb-2">
            {[...Array(reviews[activeIndex].stars)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          
          <p className="text-royal-charcoal font-medium text-xs leading-relaxed mb-3 italic">
            "{reviews[activeIndex].text}"
          </p>
          
          <div className="flex items-center justify-between">
            <span className="font-bold text-[10px] text-royal-slate uppercase tracking-wider">
              — {reviews[activeIndex].author}
            </span>
            
            <div className="flex gap-1.5">
              <button 
                onClick={handlePrev}
                className="w-6 h-6 rounded-full border border-royal-stone/30 flex items-center justify-center text-royal-slate hover:bg-royal-terracotta hover:text-white hover:border-royal-terracotta transition-all cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={handleNext}
                className="w-6 h-6 rounded-full border border-royal-stone/30 flex items-center justify-center text-royal-slate hover:bg-royal-terracotta hover:text-white hover:border-royal-terracotta transition-all cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
        {/* Bottom-left image overlay — artisan badge */}
        <div className="absolute bottom-6 left-6 z-20 hidden md:flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-[2px] bg-white/60" />
            <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em]">Est. Portland, OR</span>
          </div>
          <p className="text-white text-2xl font-serif font-bold leading-tight drop-shadow-lg">
            Third-Generation<br />
            <span className="italic text-[#c9a47a]" >Woodworkers</span>
          </p>
        </div>
      </div>

      {/* Call Banner */}
      <div className="bg-[#2c201c] py-4 px-6 md:px-12 text-white border-b border-royal-stone/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[11px] font-black tracking-widest text-center md:text-left text-white/95">
            NEED CUSTOM CABINETS OR DOORS FOR YOUR KITCHEN?
          </span>
          <a href="#doors-drawers" className="px-6 py-2.5 bg-[#8cb2c5] hover:bg-white text-royal-charcoal font-bold text-xs rounded-full tracking-wider uppercase transition-all shadow-md">
            GET ESTIMATE NOW
          </a>
        </div>
      </div>

      {/* Welcome Message Block */}
      <div className="bg-royal-cream py-16 px-6 md:px-12 lg:px-16 text-royal-text-dark">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <h1 className="font-serif text-3.5xl md:text-5xl text-royal-charcoal font-bold leading-tight uppercase">
              Welcome to<br />
              Royal Brand<br />
              Woodworking
            </h1>
          </div>
          <div className="md:col-span-7 space-y-5">
            <p className="text-sm md:text-base text-royal-slate font-medium leading-relaxed">
              At the core of our workshop is a deep commitment to cabinet making and custom woodwork. We work closely with our clients to provide thoughtful designs and custom dimension doors, ensuring that every detail reflects care and authentic craftsmanship.
            </p>
            <p className="text-xs md:text-sm text-royal-stone font-bold uppercase tracking-wider">
              Family Owned & Operated • Portland, OR
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#doors-drawers" className="inline-flex items-center gap-2 px-5 py-2.5 bg-royal-charcoal text-white font-bold text-xs rounded-full tracking-wider uppercase hover:bg-royal-terracotta transition-all shadow-md">
                Get an Estimate
              </a>
              <a href="tel:555-0199" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-royal-charcoal text-royal-charcoal font-bold text-xs rounded-full tracking-wider uppercase hover:bg-royal-charcoal hover:text-white transition-all">
                Call Robert
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
