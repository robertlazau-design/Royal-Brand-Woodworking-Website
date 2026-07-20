import { Hammer, ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: "Custom kitchen cabinets",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80",
    href: "#services"
  },
  {
    title: "Bathroom vanities & storage",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80",
    href: "#services"
  },
  {
    title: "Fine handmade furniture",
    image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?auto=format&fit=crop&q=80",
    href: "#services"
  },
  {
    title: "Shelving & bedroom built-ins",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80",
    href: "#services"
  },
  {
    title: "Custom doors & drawer fronts",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80",
    href: "#doors-drawers"
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-royal-light text-royal-text-dark px-4 md:px-8">
      {/* Outer Card Container */}
      <div className="max-w-7xl mx-auto bg-royal-cream/40 border border-royal-stone/20 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
        {/* Soft shadow/gradient styling overlay to emulate the photo's diagonal drop shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-royal-charcoal/[0.02] via-transparent to-royal-charcoal/[0.04] pointer-events-none" />
        
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8 relative z-10">
          <div className="max-w-xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-royal-stone/30 rounded-full mb-6 shadow-sm">
              <Hammer className="w-3.5 h-3.5 text-royal-terracotta" />
              <span className="text-royal-charcoal text-[11px] font-bold tracking-wider uppercase">Our services</span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5.5xl text-royal-charcoal font-semibold leading-[1.1] tracking-tight">
              What we can do<br />
              <span className="italic text-royal-terracotta">for you</span>
            </h2>
          </div>
          
          <div className="lg:max-w-md space-y-6">
            <p className="text-royal-slate text-sm leading-relaxed font-medium">
              From initial dimensions and wood selection to final delivery and installation, we provide premium, custom woodworking solutions tailored directly to your home's needs.
            </p>
            <div>
              <a 
                href="#services" 
                className="inline-flex items-center gap-2.5 px-5 py-2 bg-royal-stone/30 hover:bg-royal-charcoal text-royal-charcoal hover:text-white font-bold text-xs rounded-full shadow-sm tracking-wide transition-all"
              >
                <span>Learn about our work</span>
                <span className="w-6 h-6 rounded-full bg-royal-charcoal text-white flex items-center justify-center font-bold">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* 5-Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10 mb-12">
          {services.map((service, idx) => (
            <a 
              href={service.href}
              key={idx} 
              className={`group relative h-[300px] md:h-[380px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
                idx === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              {/* Image background */}
              <img 
                src={service.image} 
                alt={service.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              {/* Arrow Badge Top Right */}
              <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center group-hover:bg-royal-terracotta group-hover:scale-110 transition-all duration-300">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>

              {/* Title Bottom Left */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-serif text-white text-base md:text-lg leading-tight font-medium italic group-hover:text-royal-amber transition-colors">
                  {service.title}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Stats Row modeled after Woody's stats counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-royal-stone/20 pt-10 pb-8 relative z-10">
          <div className="text-center md:text-left">
            <p className="font-serif text-3xl md:text-4xl font-bold text-royal-charcoal">15+</p>
            <p className="text-[10px] uppercase tracking-wider font-bold text-royal-stone mt-1">Years in Business</p>
          </div>
          <div className="text-center md:text-left border-l border-royal-stone/20 pl-0 md:pl-6">
            <p className="font-serif text-3xl md:text-4xl font-bold text-royal-charcoal">650+</p>
            <p className="text-[10px] uppercase tracking-wider font-bold text-royal-stone mt-1">Completed Projects</p>
          </div>
          <div className="text-center md:text-left border-l border-royal-stone/20 pl-0 md:pl-6">
            <p className="font-serif text-3xl md:text-4xl font-bold text-royal-charcoal">100%</p>
            <p className="text-[10px] uppercase tracking-wider font-bold text-royal-stone mt-1">Happy Neighbors</p>
          </div>
          <div className="text-center md:text-left border-l border-royal-stone/20 pl-0 md:pl-6">
            <p className="font-serif text-3xl md:text-4xl font-bold text-royal-charcoal">5.0 ★</p>
            <p className="text-[10px] uppercase tracking-wider font-bold text-royal-stone mt-1">Google Rating</p>
          </div>
        </div>

        {/* Bottom also fabricate bar, styled cleanly to match */}
        <div className="border-t border-royal-stone/20 pt-8 relative z-10 text-center">
          <p className="text-[11px] font-bold text-royal-terracotta uppercase tracking-widest mb-4">
            Also building custom cabinetry for
          </p>
          <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-5 text-xs text-royal-slate font-semibold">
            <span>Laundry Rooms</span>
            <span className="w-1 h-1 rounded-full bg-royal-stone" />
            <span>Credenzas & Desks</span>
            <span className="w-1 h-1 rounded-full bg-royal-stone" />
            <span>Fireside Alcoves</span>
            <span className="w-1 h-1 rounded-full bg-royal-stone" />
            <span>Wall Libraries</span>
            <span className="w-1 h-1 rounded-full bg-royal-stone" />
            <span>Bathroom Linen Towers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
