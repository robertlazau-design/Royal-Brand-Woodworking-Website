import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Testimonials } from '../components/Testimonials';
import { FaqAccordion } from '../components/FaqAccordion';
import { CheckCircle2, ShieldCheck, DoorOpen } from 'lucide-react';
import { BUSINESS } from '../data/business';
import { ProjectShowcase } from '../components/ProjectShowcase';
import { srcSetFor } from '../lib/images';


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
      <section className="py-14 md:py-24 bg-royal-bg border-b border-royal-border-light">
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
              <Link to="/booking" className="px-6 py-3 bg-royal-gold text-royal-charcoal font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all shadow-[0_0_20px_rgba(201,164,122,0.2)]">
                Book an Estimate
              </Link>
              <Link to="/about" className="px-6 py-3 border border-royal-border text-white font-bold text-xs uppercase tracking-wider hover:border-royal-gold hover:text-royal-gold transition-all">
                Meet Robert
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ProjectShowcase />
          </div>
        </div>
      </section>

      {/* Estimate fee credit */}
      <section className="py-10 md:py-12 bg-royal-charcoal border-b border-royal-border-light">
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="flex-1">
            <p className="text-royal-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">Your time is valuable</p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white uppercase tracking-wide mb-3">
              Your Estimate Pays for Itself
            </h2>
            <p className="text-gray-200 text-base leading-relaxed">
              Robert's on-site estimate is $150. If you go ahead with the project, <strong className="text-white">that $150 is credited toward it.</strong>
            </p>
          </div>
          <Link to="/booking" className="shrink-0 text-center px-8 py-4 bg-royal-gold text-royal-charcoal font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all">
            Book an Estimate
          </Link>
        </div>
      </section>

      {/* Custom doors — made-to-order line */}
      <section className="py-14 md:py-20 bg-royal-charcoal border-b border-royal-border-light relative overflow-hidden">
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
              <Link to="/order" className="px-6 py-3 bg-royal-gold text-royal-charcoal font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all">
                Order Custom Doors
              </Link>
              <Link to="/services" className="px-6 py-3 border border-royal-border text-white font-bold text-xs uppercase tracking-wider hover:border-royal-gold hover:text-royal-gold transition-all">
                See How They're Made
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
            {DOOR_PHOTOS.map((photo, i) => (
              <div key={photo.src} className={`relative ${photo.span} ${i >= 3 ? 'hidden sm:block' : ''} bg-royal-bg border border-royal-border overflow-hidden group`}>
                <img src={photo.src} srcSet={srcSetFor(photo.src)} sizes="(max-width: 1023px) 50vw, 25vw" alt={photo.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
