import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Hammer, Users, Shield, Star, Award, ChevronRight } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="w-full bg-royal-bg text-white min-h-screen">
      {/* Header Section with background image */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 border-b border-royal-border-light overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1920&q=80"
            alt="Woodworking workshop"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-royal-bg/60 via-royal-bg/80 to-royal-bg" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-4 text-royal-gold mb-4">
            <div className="w-12 h-[1px] bg-royal-gold" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
              <Users className="w-4 h-4 inline-block mr-2 -mt-0.5" />
              Meet the Owner
            </span>
            <div className="w-12 h-[1px] bg-royal-gold" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold tracking-widest uppercase mb-6">
            Our <span className="text-royal-gold">Heritage</span>
          </h1>
          <p className="text-royal-text-muted text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            A legacy of craftsmanship passed down through three generations — from a small cabinet shop in Romania to award-winning custom woodwork in Portland, Oregon.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-royal-charcoal border-b border-royal-border-light">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Hammer className="w-5 h-5" />, value: "15+", label: "Years" },
            { icon: <Users className="w-5 h-5" />, value: "3rd", label: "Generation" },
            { icon: <Shield className="w-5 h-5" />, value: "Licensed", label: "& Insured" },
            { icon: <Star className="w-5 h-5" />, value: "5.0", label: "Google Rating" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-royal-border flex items-center justify-center text-royal-gold mb-3">
                {stat.icon}
              </div>
              <p className="font-serif text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-royal-text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Bio */}
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-[1px] bg-royal-gold" />
                <span className="text-royal-gold text-[10px] font-bold uppercase tracking-[0.2em]">Owner & Master Craftsman</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white uppercase tracking-wider">
                Robert Burlacu
              </h2>

              {/* Pull quote */}
              <div className="border-l-2 border-royal-gold pl-6 my-8">
                <p className="font-serif text-lg md:text-xl text-royal-text-muted italic leading-relaxed">
                  "Every piece I build carries the same standard my grandfather set in his shop — if it doesn't meet my standards, it doesn't leave the workshop."
                </p>
              </div>

              <p className="text-royal-text-muted font-light leading-relaxed text-sm md:text-base">
                Robert has been refining his carpentry expertise for over 15 years as a third-generation woodworker. His interest began at a young age helping his father in the shop, continuing a craft passed down from his grandfather, who ran a cabinet shop in Romania.
              </p>
              <p className="text-royal-text-muted font-light leading-relaxed text-sm md:text-base">
                At Royal Brand Woodworking, client satisfaction, meticulous attention to detail, and timely completions are guaranteed. Every project is approached with the same dedication to quality that has defined our family's work for decades.
              </p>
              <p className="text-royal-text-muted/70 text-sm font-light italic pt-4 border-t border-royal-border">
                Outside the shop, Robert enjoys traveling with his family, exploring the outdoors, and cheering on the Trail Blazers.
              </p>
              
              <div className="pt-6 flex flex-wrap gap-4">
                <Link 
                  to="/estimator" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-royal-gold text-white font-bold text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-royal-charcoal transition-all shadow-[0_0_20px_rgba(201,164,122,0.15)]"
                >
                  Work With Us
                </Link>
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-royal-border text-white font-bold text-xs tracking-[0.15em] uppercase hover:border-royal-gold hover:text-royal-gold transition-all"
                >
                  Book a Consultation
                </Link>
              </div>
            </div>

            {/* Image Grid */}
            <div className="space-y-6">
              <div className="aspect-[4/3] bg-royal-charcoal border border-royal-border overflow-hidden relative group">
                <img
                  src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80"
                  alt="Craftsman at work in woodworking shop"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-bg/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-royal-gold text-[9px] font-bold uppercase tracking-[0.2em]">Robert in the Workshop</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="aspect-square bg-royal-charcoal border border-royal-border overflow-hidden relative group">
                  <img
                    src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=400&q=80"
                    alt="Woodworking hand tools"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-bg/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-royal-gold text-[8px] font-bold uppercase tracking-[0.2em]">The Craft</span>
                  </div>
                </div>
                <div className="aspect-square bg-royal-charcoal border border-royal-border overflow-hidden relative group">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=400&q=80"
                    alt="Woodworking workshop detail"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-bg/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-royal-gold text-[8px] font-bold uppercase tracking-[0.2em]">The Workshop</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Timeline */}
      <section className="py-20 px-4 md:px-8 bg-royal-charcoal border-y border-royal-border-light">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 text-royal-gold mb-4">
              <div className="w-12 h-[1px] bg-royal-gold" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Three Generations</span>
              <div className="w-12 h-[1px] bg-royal-gold" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-bold uppercase tracking-wider">
              A Family Legacy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                gen: "1st Generation",
                name: "Grandfather",
                location: "Romania",
                desc: "Established the family's woodworking tradition in a small cabinet shop, laying the foundation for decades of craftsmanship.",
                icon: <Award className="w-5 h-5" />,
              },
              {
                gen: "2nd Generation",
                name: "Father",
                location: "Romania → USA",
                desc: "Carried the craft across continents, merging old-world techniques with modern precision and expanding the family's expertise.",
                icon: <ChevronRight className="w-5 h-5" />,
              },
              {
                gen: "3rd Generation",
                name: "Robert Burlacu",
                location: "Portland, OR",
                desc: "Refined 15+ years of inherited mastery into Royal Brand Woodworking — Portland's trusted source for premium custom woodwork.",
                icon: <Star className="w-5 h-5" />,
              },
            ].map((gen, idx) => (
              <div key={idx} className="relative group">
                {/* Connection line */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-10 right-0 w-8 h-[1px] bg-gradient-to-r from-royal-gold/40 to-royal-gold/10 translate-x-full z-10" />
                )}
                <div className="bg-royal-bg border border-royal-border p-8 h-full hover:border-royal-gold/30 transition-all duration-500">
                  <div className="w-10 h-10 rounded-full border border-royal-gold/30 flex items-center justify-center text-royal-gold mb-6 group-hover:border-royal-gold group-hover:shadow-[0_0_15px_rgba(201,164,122,0.15)] transition-all duration-500">
                    {gen.icon}
                  </div>
                  <p className="text-royal-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{gen.gen}</p>
                  <h3 className="font-serif text-xl font-bold text-white uppercase tracking-wider mb-1">{gen.name}</h3>
                  <div className="flex items-center gap-1.5 mb-4">
                    <MapPin className="w-3 h-3 text-royal-text-muted/50" />
                    <span className="text-royal-text-muted/70 text-xs font-light">{gen.location}</span>
                  </div>
                  <p className="text-royal-text-muted text-sm font-light leading-relaxed">{gen.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
