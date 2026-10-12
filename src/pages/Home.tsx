import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Testimonials } from '../components/Testimonials';
import { FaqAccordion } from '../components/FaqAccordion';
import { ArrowRight, CheckCircle2, ChefHat, Bath, Armchair, Hammer, ShieldCheck, DoorOpen } from 'lucide-react';
import { BUSINESS } from '../data/business';

const SERVICES = [
  { icon: <ChefHat className="w-5 h-5" />, title: 'Kitchen Remodels', text: 'Custom cabinetry designed, built and installed to fit the way you cook and live.' },
  { icon: <Bath className="w-5 h-5" />, title: 'Bathroom Remodels', text: 'Vanities and storage sized to your space and built to handle a humid room.' },
  { icon: <Armchair className="w-5 h-5" />, title: 'Handmade Furniture', text: 'Dining tables, desks and pieces made from solid hardwood to last generations.' },
  { icon: <Hammer className="w-5 h-5" />, title: 'Built-Ins & Carpentry', text: 'Shelving, bedroom built-ins, trim and finish carpentry, indoors or out.' },
];

const DOOR_PHOTOS = [
  { src: '/photos/web/wide-belt-sander-exit.jpg', alt: 'Finished mitered door coming off the wide-belt sander', label: 'Finished door', span: 'col-span-2 aspect-[3/2]' },
  { src: '/photos/web/door-components-still-life.jpg', alt: 'Door frame parts and panel laid out on the workbench', label: 'Cut to size', span: 'aspect-[4/5]' },
  { src: '/photos/web/miter-grooves-detail.jpg', alt: 'Stacked oak frame parts with 45 degree miters', label: 'Ready to join', span: 'aspect-square' },
  { src: '/photos/web/pneumatic-clamp-rack.jpg', alt: 'Door glued up in the clamp rack', label: 'Glued & clamped', span: 'aspect-square' },
  { src: '/photos/web/orbital-sanding-action.jpg', alt: 'Robert sanding a door panel', label: 'Sanded by hand', span: 'aspect-square' },
];

export function Home() {
  return (
    <div className="w-full">
      <Hero />

      {/* Heritage + what we build */}
      <section className="py-24 bg-royal-bg border-b border-royal-border-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3 text-royal-gold">
              <div className="w-8 h-[1px] bg-royal-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.25em]">About Robert</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
              Three Generations <br />
              <span className="text-royal-gold">of Woodworkers.</span>
            </h2>
            <p className="text-royal-text-muted font-light leading-relaxed text-sm md:text-base">
              Robert's grandfather built cabinets in Romania. Robert grew up helping his dad in the shop, and he's been doing
              this work for over 15 years. Today he builds for homes and businesses all over Portland.
            </p>
            <div className="space-y-3 pt-1">
              {[
                'You deal with Robert himself, start to finish',
                'Built in his own Portland shop',
                `Licensed, bonded and insured · CCB# ${BUSINESS.ccb}`,
              ].map(item => (
                <div key={item} className="flex items-start gap-3 text-xs md:text-sm text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-royal-gold shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link to="/booking" className="px-6 py-3 bg-royal-gold text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all shadow-[0_0_20px_rgba(201,164,122,0.2)]">
                Book an Estimate
              </Link>
              <Link to="/about" className="px-6 py-3 border border-royal-border text-white font-bold text-xs uppercase tracking-wider hover:border-royal-gold hover:text-royal-gold transition-all">
                Meet Robert
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[3/2] border border-royal-border overflow-hidden mb-4 group">
              <img
                src="/photos/web/powermatic-planer-shop.jpg"
                alt="Robert at the planer in the Royal Brand Woodworking shop"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-bg/70 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-3 text-xs font-bold uppercase tracking-[0.2em] text-royal-gold bg-royal-bg/80 px-2 py-1 border border-royal-border">
                The Shop · NE Portland
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICES.map(s => (
                <div key={s.title} className="bg-royal-charcoal border border-royal-border p-5 hover:border-royal-gold/40 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-royal-gold">{s.icon}</span>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">{s.title}</h3>
                  </div>
                  <p className="text-xs text-royal-text-muted leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 mt-5 text-royal-gold text-xs font-bold uppercase tracking-[0.15em] hover:text-white transition-colors">
              See All Services <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Custom doors — made-to-order line */}
      <section className="py-20 bg-royal-charcoal border-b border-royal-border-light relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3 text-royal-gold">
              <div className="w-8 h-[1px] bg-royal-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] flex items-center gap-1.5">
                <DoorOpen className="w-3.5 h-3.5" /> Made to Order
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
              Need New Cabinet Doors? <br />
              <span className="text-royal-gold">Order Them Online.</span>
            </h2>
            <p className="text-royal-text-muted font-light leading-relaxed text-sm md:text-base">
              Custom cabinet doors, built to order — no remodel needed.
              Tell us the sizes and the look you want, and Robert will check everything and call you with a price before anything is made.
            </p>
            <div className="space-y-3 pt-1">
              {['Pick your style, wood and color', 'Type in your sizes', 'Robert checks everything and calls you with a price'].map(item => (
                <div key={item} className="flex items-start gap-3 text-xs md:text-sm text-gray-200">
                  <ShieldCheck className="w-4 h-4 text-royal-gold shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link to="/order" className="px-6 py-3 bg-royal-gold text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all">
                Order Custom Doors
              </Link>
              <Link to="/services" className="px-6 py-3 border border-royal-border text-white font-bold text-xs uppercase tracking-wider hover:border-royal-gold hover:text-royal-gold transition-all">
                See How They're Made
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
            {DOOR_PHOTOS.map(photo => (
              <div key={photo.src} className={`relative ${photo.span} bg-royal-bg border border-royal-border overflow-hidden group`}>
                <img src={photo.src} alt={photo.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-bg/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2 left-2 text-xs font-bold text-white bg-royal-bg/70 px-2 py-0.5">{photo.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <FaqAccordion />
    </div>
  );
}
