import React from 'react';
import { Link } from 'react-router-dom';
import { AnatomyOfDetail } from '../components/AnatomyOfDetail';
import { DoorBuildProcess } from '../components/DoorBuildProcess';
import { ArrowRight, Layers, Hammer, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

export function ServicesPage() {
  return (
    <div className="w-full bg-royal-bg text-white">
      {/* Header Banner */}
      <section className="relative pt-32 pb-20 px-6 border-b border-royal-border-light overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/photos/web/pneumatic-clamp-rack.jpg"
            alt="Pneumatic door clamp in Royal Brand Woodworking shop"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-royal-bg/60 via-royal-bg/85 to-royal-bg" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-4 text-royal-gold mb-4">
            <div className="w-12 h-[1px] bg-royal-gold" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-1.5">
              <Layers className="w-4 h-4 inline-block -mt-0.5" />
              Portland Custom Millwork & Cabinetry
            </span>
            <div className="w-12 h-[1px] bg-royal-gold" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold tracking-widest uppercase mb-6">
            Services & <span className="text-royal-gold">Craftsmanship</span>
          </h1>
          <p className="text-royal-text-muted text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            From precision-milled custom cabinet doors to bespoke heirloom furniture and architectural built-ins, every commission is crafted to uncompromising standards.
          </p>
        </div>
      </section>

      {/* Anatomy of Detail Interactive Inspector */}
      <AnatomyOfDetail />

      {/* 7-Step From Scratch Process */}
      <DoorBuildProcess />

      {/* Services Bottom Call to Action */}
      <section className="py-20 px-6 bg-royal-charcoal border-b border-royal-border-light">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 text-royal-gold mb-4">
            <div className="w-8 h-[1px] bg-royal-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Ready to begin?</span>
            <div className="w-8 h-[1px] bg-royal-gold" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white uppercase tracking-wider mb-6">
            Commission Your Project
          </h2>
          <p className="text-royal-text-muted text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed mb-8">
            Order custom replacement cabinet doors with exact dimensions using our live estimator, or schedule an in-person consultation with Robert for full cabinetry installations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/estimator"
              className="px-8 py-3.5 bg-royal-gold text-white font-bold text-xs uppercase tracking-[0.15em] hover:bg-white hover:text-royal-charcoal transition-all shadow-[0_0_20px_rgba(201,164,122,0.2)]"
            >
              Open Door Estimator
            </Link>
            <Link
              to="/booking"
              className="px-8 py-3.5 border border-royal-border text-white font-bold text-xs uppercase tracking-[0.15em] hover:border-royal-gold hover:text-royal-gold transition-all"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
