import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { DoorBuildProcess } from '../components/DoorBuildProcess';
import { Testimonials } from '../components/Testimonials';
import { FaqAccordion } from '../components/FaqAccordion';
import { ArrowRight, Hammer, Award, Sparkles, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

export function Home() {
  return (
    <div className="w-full">
      <Hero />
      
      {/* The 7-Step Built From Scratch Interactive Showcase */}
      <DoorBuildProcess />

      {/* Workshop Visual Showcase & Direct-to-Craftsman Banner */}
      <section className="py-20 bg-royal-charcoal border-b border-royal-border-light relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3 text-royal-gold">
                <div className="w-8 h-[1px] bg-royal-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Portland, Oregon Workshop
                </span>
              </div>

              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
                No Middlemen. <br />
                <span className="text-royal-gold">Pure Craft.</span>
              </h2>

              <p className="text-royal-text-muted font-light leading-relaxed text-sm md:text-base">
                Unlike big-box cabinet stores that resell overseas particleboard with thin veneers, Royal Brand Woodworking builds every cabinet door, drawer box, and custom millwork project from raw domestic hardwoods right here in our Portland shop.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "FAS domestic hardwoods (White Oak, Walnut, Maple, Cherry)",
                  "Internal hardwood biscuit & spline reinforcement",
                  "Dead-flat calibration on industrial wide-belt sanders",
                  "320-grit hand finishing on every profile face"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs md:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-royal-gold shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/estimator"
                  className="px-6 py-3 bg-royal-gold text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all shadow-[0_0_20px_rgba(201,164,122,0.2)]"
                >
                  Configure Doors & Drawers
                </Link>
                <Link
                  to="/about"
                  className="px-6 py-3 border border-royal-border text-white font-bold text-xs uppercase tracking-wider hover:border-royal-gold hover:text-royal-gold transition-all"
                >
                  Meet Robert Burlacu
                </Link>
              </div>
            </div>

            {/* Right Visual Grid of Authentic Photos */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              
              <div className="relative aspect-[4/5] sm:col-span-2 bg-royal-bg border border-royal-border overflow-hidden group">
                <img
                  src="/photos/web/craftsman-handshake.jpg"
                  alt="Robert Burlacu handshake with client in shop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-bg/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-royal-gold bg-royal-bg/80 px-2 py-1 border border-royal-border">
                    The Guarantee
                  </span>
                  <p className="text-xs text-white font-medium mt-1 drop-shadow">
                    Master craftsman handshake on every completed order.
                  </p>
                </div>
              </div>

              <div className="relative aspect-[4/5] bg-royal-bg border border-royal-border overflow-hidden group">
                <img
                  src="/photos/web/door-components-still-life.jpg"
                  alt="Woodworking components laid out on workbench"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-bg/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2">
                  <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-royal-gold">
                    Dry-Fit Joinery
                  </span>
                </div>
              </div>

              <div className="relative aspect-square bg-royal-bg border border-royal-border overflow-hidden group">
                <img
                  src="/photos/web/miter-grooves-detail.jpg"
                  alt="Precision 45 degree miter joint detail"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-bg/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2">
                  <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-royal-gold">
                    45° Miter Slots
                  </span>
                </div>
              </div>

              <div className="relative aspect-square bg-royal-bg border border-royal-border overflow-hidden group">
                <img
                  src="/photos/web/pneumatic-clamp-rack.jpg"
                  alt="Pneumatic door clamp rack"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-bg/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2">
                  <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-royal-gold">
                    Pneumatic Squaring
                  </span>
                </div>
              </div>

              <div className="relative aspect-square bg-royal-bg border border-royal-border overflow-hidden group">
                <img
                  src="/photos/web/wide-belt-sander-exit.jpg"
                  alt="Wide belt sander flush calibration"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-bg/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2">
                  <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-royal-gold">
                    Wide-Belt Flush
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      <Testimonials />
      <FaqAccordion />
    </div>
  );
}
