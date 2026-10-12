import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ChefHat, Bath, Armchair, Hammer, DoorOpen, Phone } from 'lucide-react';
import { BUSINESS } from '../data/business';

const SPECIALTIES = [
  { icon: <ChefHat className="w-5 h-5" />, title: 'Kitchen Remodels', text: "New cabinets designed for your kitchen, built in Robert's shop and installed by him." },
  { icon: <Bath className="w-5 h-5" />, title: 'Bathroom Remodels', text: 'Vanities and cabinets made to fit your bathroom exactly.' },
  { icon: <Armchair className="w-5 h-5" />, title: 'Handmade Furniture', text: 'Dining tables, desks and one-of-a-kind pieces in solid wood.' },
];

const DOOR_STEPS = [
  { img: '/photos/web/table-saw-rip-fence.jpg', title: 'Cut', text: 'Solid wood is cut to your exact sizes.' },
  { img: '/photos/web/shaper-table-profile.jpg', title: 'Shape', text: 'The edges are shaped so every piece matches.' },
  { img: '/photos/web/squaring-clamp-rack.jpg', title: 'Glue', text: 'The door is glued and clamped perfectly square.' },
  { img: '/photos/web/wide-belt-sander-feed.jpg', title: 'Sand & Check', text: 'Sanded smooth and ready for finish.' },
];

const ALSO = [
  'Shelving & storage',
  'Bedroom built-ins',
  'Bar & shop fitting',
  'Finish & trim carpentry',
  'Cabinet refinishing',
  'Garden sheds & outdoor structures',
  'Gates & fences',
  'Metal / wood fabrication',
];

export function ServicesPage() {
  return (
    <div className="w-full bg-royal-bg text-white">
      {/* Header Banner */}
      <section className="relative pt-32 pb-20 px-6 border-b border-royal-border-light overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/photos/web/sliding-table-saw-action.jpg"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-royal-bg/60 via-royal-bg/85 to-royal-bg" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-4 text-royal-gold mb-4">
            <div className="w-12 h-[1px] bg-royal-gold" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-1.5">
              <Layers className="w-4 h-4 inline-block -mt-0.5" />
              Residential & Commercial
            </span>
            <div className="w-12 h-[1px] bg-royal-gold" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold tracking-widest uppercase mb-6">
            Our <span className="text-royal-gold">Services</span>
          </h1>
          <p className="text-royal-text-muted text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Kitchens, bathrooms, furniture and carpentry for homes and businesses in Portland — indoors or out.
          </p>
        </div>
      </section>

      {/* Core services */}
      <section className="py-20 px-6 border-b border-royal-border-light">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 text-royal-gold mb-3">
            <div className="w-8 h-[1px] bg-royal-gold" />
            <span className="text-xs font-bold uppercase tracking-[0.25em]">We Specialize In</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white uppercase tracking-wide mb-10">
            What We Build
          </h2>
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {SPECIALTIES.map(item => (
              <div key={item.title} className="bg-royal-charcoal border border-royal-border p-7 hover:border-royal-gold/40 transition-colors">
                <div className="w-11 h-11 rounded-full border border-royal-gold/30 flex items-center justify-center text-royal-gold mb-5">{item.icon}</div>
                <h3 className="font-serif text-xl font-bold text-white uppercase tracking-wider mb-3">{item.title}</h3>
                <p className="text-sm text-royal-text-muted font-light leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="bg-royal-charcoal border border-royal-border p-7">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <Hammer className="w-4 h-4 text-royal-gold" /> We Also Do
            </h3>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
              {ALSO.map(item => (
                <li key={item} className="text-sm text-royal-text-muted flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-royal-gold rotate-45 shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-royal-text-muted mt-6 pt-5 border-t border-royal-border">
              Not sure if we do it? Just ask — call Robert at{' '}
              <a href={BUSINESS.phoneHref} className="text-royal-gold hover:underline">{BUSINESS.phoneDisplay}</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Custom doors */}
      <section className="py-20 px-6 bg-royal-charcoal border-b border-royal-border-light">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 text-royal-gold mb-3">
                <div className="w-8 h-[1px] bg-royal-gold" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] flex items-center gap-1.5">
                  <DoorOpen className="w-3.5 h-3.5" /> Also Available
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white uppercase tracking-wide">Custom Doors</h2>
              <p className="text-gray-200 text-base md:text-lg max-w-2xl leading-relaxed mt-4">
                Just need new cabinet doors? They're built to order in your sizes. Here's how a door comes together.
              </p>
            </div>
            <Link to="/order" className="shrink-0 px-7 py-4 bg-royal-gold text-white font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all">
              Order Doors Online
            </Link>
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DOOR_STEPS.map((step, i) => (
              <li key={step.title} className="bg-royal-bg border border-royal-border">
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={step.img} alt={step.text} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-royal-gold text-sm font-bold mb-1">Step {i + 1}</p>
                  <h3 className="font-serif text-xl font-bold text-white uppercase tracking-wider mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Bottom call to action */}
      <section className="py-20 px-6 bg-royal-charcoal border-b border-royal-border-light">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 text-royal-gold mb-4">
            <div className="w-8 h-[1px] bg-royal-gold" />
            <span className="text-xs font-bold uppercase tracking-[0.25em]">Ready to begin?</span>
            <div className="w-8 h-[1px] bg-royal-gold" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white uppercase tracking-wider mb-6">
            Start Your Project
          </h2>
          <p className="text-royal-text-muted text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed mb-8">
            Call Robert or book a time for him to come out and take a look.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/booking"
              className="px-8 py-3.5 bg-royal-gold text-white font-bold text-xs uppercase tracking-[0.15em] hover:bg-white hover:text-royal-charcoal transition-all shadow-[0_0_20px_rgba(201,164,122,0.2)]"
            >
              Book an Estimate
            </Link>
            <a
              href={BUSINESS.phoneHref}
              className="px-8 py-3.5 border border-royal-border text-white font-bold text-xs uppercase tracking-[0.15em] hover:border-royal-gold hover:text-royal-gold transition-all inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> Call {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
