import { Link } from 'react-router-dom';
import { Hammer, ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: "Custom kitchen cabinets",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=75",
    href: "/services"
  },
  {
    title: "Bathroom vanities & storage",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=400&q=75",
    href: "/services"
  },
  {
    title: "Fine handmade furniture",
    image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?auto=format&fit=crop&w=400&q=75",
    href: "/services"
  },
  {
    title: "Shelving & bedroom built-ins",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=75",
    href: "/services"
  },
  {
    title: "Custom doors & drawer fronts",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=75",
    href: "/estimator"
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-royal-bg text-royal-text px-4 md:px-8 border-b border-royal-border-light">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Header Row */}
        <div className="flex flex-col items-center text-center mb-16 gap-4">
          <div className="flex items-center gap-4 text-royal-gold">
            <div className="w-12 h-[1px] bg-royal-gold" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Our Services</span>
            <div className="w-12 h-[1px] bg-royal-gold" />
          </div>
          
          <h2 className="font-serif text-3xl md:text-5xl text-white font-bold leading-tight tracking-wide uppercase">
            Quality. Detail. Trust.
          </h2>
          
          <p className="text-royal-text-muted text-sm md:text-base leading-relaxed font-light max-w-2xl mt-4">
            From initial concept to final installation, we provide premium, custom woodworking solutions tailored directly to elevate your space.
          </p>
        </div>

        {/* 5-Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-20">
          {services.map((service, idx) => (
            <Link 
              to={service.href}
              key={idx} 
              className={`group relative h-[320px] md:h-[400px] border border-royal-border rounded-none overflow-hidden transition-all duration-500 hover:border-royal-gold ${
                idx === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              {/* Image background */}
              <img 
                src={service.image} 
                alt={service.title} 
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-royal-bg/90 via-royal-bg/20 to-transparent pointer-events-none" />
              
              {/* Icon / Top Badge */}
              <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-royal-border text-royal-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Title Bottom Left */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-sans font-semibold text-white text-sm md:text-base leading-snug tracking-wider group-hover:text-royal-gold transition-colors">
                  {service.title}
                </p>
                <div className="w-0 h-[1px] bg-royal-gold mt-4 group-hover:w-full transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-royal-border-light relative z-10">
          <div className="text-center flex flex-col items-center">
            <div className="mb-3 text-royal-gold"><Hammer className="w-6 h-6" /></div>
            <p className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">15+</p>
            <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-royal-text-muted">Years Exp.</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <div className="mb-3 text-royal-gold"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg></div>
            <p className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">100%</p>
            <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-royal-text-muted">Custom Work</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <div className="mb-3 text-royal-gold"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
            <p className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">Local</p>
            <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-royal-text-muted">& Trusted</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <div className="mb-3 text-royal-gold"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
            <p className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">100%</p>
            <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-royal-text-muted">Satisfaction</p>
          </div>
        </div>

      </div>
    </section>
  );
}
