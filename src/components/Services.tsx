import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Hammer, ArrowUpRight, Shield, MapPin, CheckCircle } from 'lucide-react';

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

const stats = [
  { icon: <Hammer className="w-5 h-5" />, value: "15+", label: "Years Experience" },
  { icon: <Shield className="w-5 h-5" />, value: "100%", label: "Custom Work" },
  { icon: <MapPin className="w-5 h-5" />, value: "Local", label: "& Trusted" },
  { icon: <CheckCircle className="w-5 h-5" />, value: "100%", label: "Satisfaction" },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-royal-bg text-royal-text px-4 md:px-8 border-b border-royal-border-light">
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
              className={`group relative h-[320px] md:h-[400px] border border-royal-border rounded-none overflow-hidden transition-all duration-700 hover:border-royal-gold ${
                idx === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.6s ease-out ${idx * 0.1}s, transform 0.6s ease-out ${idx * 0.1}s`,
              }}
            >
              {/* Image background */}
              <img 
                src={service.image} 
                alt={service.title} 
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-royal-bg via-royal-bg/30 to-transparent pointer-events-none" />
              
              {/* Number badge */}
              <div className="absolute top-4 left-4 text-royal-gold/20 font-serif text-4xl font-bold leading-none group-hover:text-royal-gold/40 transition-colors duration-500">
                {String(idx + 1).padStart(2, '0')}
              </div>

              {/* Icon / Top Badge */}
              <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-royal-border text-royal-gold opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-royal-gold">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Title Bottom Left */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-sans font-semibold text-white text-sm md:text-base leading-snug tracking-wider group-hover:text-royal-gold transition-colors duration-300">
                  {service.title}
                </p>
                <div className="w-0 h-[1px] bg-royal-gold mt-4 group-hover:w-full transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>

        {/* Decorative divider */}
        <div className="flex items-center gap-4 justify-center mb-12">
          <div className="flex-1 max-w-[200px] h-[1px] bg-gradient-to-r from-transparent to-royal-border" />
          <div className="w-2 h-2 bg-royal-gold rotate-45" />
          <div className="flex-1 max-w-[200px] h-[1px] bg-gradient-to-l from-transparent to-royal-border" />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-royal-border-light relative z-10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center flex flex-col items-center group"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease-out ${0.6 + idx * 0.1}s, transform 0.6s ease-out ${0.6 + idx * 0.1}s`,
              }}
            >
              <div className="mb-3 text-royal-gold w-10 h-10 rounded-full border border-royal-border flex items-center justify-center group-hover:border-royal-gold group-hover:shadow-[0_0_15px_rgba(201,164,122,0.2)] transition-all duration-500">
                {stat.icon}
              </div>
              <p className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-royal-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
