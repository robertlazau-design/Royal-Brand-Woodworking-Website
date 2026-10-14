import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS } from '../data/business';
import { MapPin, Hammer, Users, Shield, Expand } from 'lucide-react';
import { srcSetFor } from '../lib/images';
import { Lightbox } from '../components/Lightbox';

// Family photos supplied by Robert. Each is used once on the page; tapping any of them opens
// the full set in the photo viewer. `pos` keeps faces in frame when a photo is cropped.
const FAMILY = {
  today: { src: '/photos/family/robert-and-dad-shop.jpg', alt: 'Robert and his dad in the shop', pos: 'center' },
  album: { src: '/photos/family/family-album.jpg', alt: 'From the family album', pos: 'left center' },
  dad: { src: '/photos/family/dad-in-his-shop.jpg', alt: "Robert's dad at his workbench", pos: 'center 30%' },
  together: { src: '/photos/family/robert-and-dad-lumber-yard.jpg', alt: 'Robert and his dad', pos: 'center 22%' },
};
const FAMILY_ORDER = [FAMILY.today, FAMILY.album, FAMILY.dad, FAMILY.together];

const FACTS = [
  { icon: <Hammer className="w-4 h-4" />, text: '15+ years in the trade' },
  { icon: <Users className="w-4 h-4" />, text: 'Third-generation woodworker' },
  { icon: <Shield className="w-4 h-4" />, text: `Licensed & insured · CCB# ${BUSINESS.ccb}` },
];

type FamilyPhoto = (typeof FAMILY)[keyof typeof FAMILY];

const GENERATIONS: { gen: string; name: string; location: string; desc: string; photo?: FamilyPhoto }[] = [
  {
    gen: '1st Generation',
    name: 'Grandfather',
    location: 'Romania',
    desc: "Owned a cabinet business in Romania, where the family's woodworking tradition began.",
  },
  {
    gen: '2nd Generation',
    name: 'Father',
    location: 'The family shop',
    desc: 'Kept the craft going in his own shop — where Robert first learned the trade as a kid, working alongside him.',
    photo: FAMILY.dad,
  },
  {
    gen: '3rd Generation',
    name: 'Robert Burlacu',
    location: 'Portland, OR',
    desc: 'More than 15 years in the carpentry trade, now building kitchens, bathrooms, furniture and custom doors as Royal Brand Woodworking.',
    photo: FAMILY.together,
  },
];

export function AboutPage() {
  const [openPhoto, setOpenPhoto] = useState<number | null>(null);
  const open = (p: FamilyPhoto) => setOpenPhoto(FAMILY_ORDER.indexOf(p));

  // A family photo that opens the viewer when tapped.
  const PhotoButton = ({ photo, className, caption = true }: { photo: FamilyPhoto; className: string; caption?: boolean }) => (
    <button type="button" onClick={() => open(photo)} aria-label={`View photo: ${photo.alt}`}
      className={`relative overflow-hidden border border-royal-border bg-royal-charcoal group ${className}`}>
      <img src={photo.src} alt={photo.alt} loading="lazy" style={{ objectPosition: photo.pos }}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      {caption && (
        <span className="absolute bottom-2 left-2 text-xs font-bold text-white bg-royal-bg/80 px-2 py-1">{photo.alt}</span>
      )}
      <span className="absolute top-2 right-2 p-1.5 bg-royal-bg/70 text-white opacity-80 group-hover:opacity-100" aria-hidden>
        <Expand className="w-3.5 h-3.5" />
      </span>
    </button>
  );

  return (
    <div className="w-full bg-royal-bg text-white min-h-screen">
      {/* ── Intro: Robert, with a photo of him and his dad ── */}
      <section className="px-6 pt-6 pb-12 md:pt-20 md:pb-20 border-b border-royal-border-light">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 text-royal-gold mb-4">
              <div className="w-8 h-[1px] bg-royal-gold" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase">Meet the Owner</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-white font-bold tracking-wider uppercase mb-5">
              Meet <span className="text-royal-gold">Robert</span>
            </h1>
            <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-7 max-w-xl">
              A third-generation woodworker. His grandfather built cabinets in Romania — now Robert builds them in Portland.
            </p>
            <ul className="space-y-3">
              {FACTS.map(f => (
                <li key={f.text} className="flex items-center gap-3 text-sm text-gray-200">
                  <span className="w-8 h-8 shrink-0 rounded-full border border-royal-gold/40 flex items-center justify-center text-royal-gold">{f.icon}</span>
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <PhotoButton photo={FAMILY.today} className="block w-full aspect-[16/10]" />
          </div>
        </div>
      </section>

      {/* ── Bio ── */}
      <section className="py-14 md:py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-royal-gold" />
              <span className="text-royal-gold text-xs font-bold uppercase tracking-[0.2em]">Owner</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white uppercase tracking-wider">
              Robert Burlacu
            </h2>

            <div className="border-l-2 border-royal-gold pl-6">
              <p className="font-serif text-lg md:text-xl text-royal-text-muted italic leading-relaxed">
                "Every piece I build carries the same standard my grandfather set in his shop — if it doesn't meet my standards, it doesn't leave the workshop."
              </p>
            </div>

            <p className="text-gray-300 font-light leading-relaxed text-base">
              Robert has been a carpenter for over 15 years. He got started as a kid, helping his dad in the shop — and his grandfather ran a cabinet business back in Romania.
            </p>
            <p className="text-gray-300 font-light leading-relaxed text-base">
              He's known for paying attention to the little things and finishing on time. His favorite part of the job is taking something old and worn out and making it beautiful again.
            </p>
            <p className="text-royal-text-muted/80 text-sm font-light italic pt-4 border-t border-royal-border">
              Outside the shop, Robert enjoys traveling with his family, exploring the outdoors, and cheering on the Trail Blazers.
            </p>

            <Link
              to="/booking"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 bg-royal-gold text-royal-charcoal font-bold text-sm tracking-[0.12em] uppercase hover:bg-white hover:text-royal-charcoal transition-all"
            >
              Book an Estimate
            </Link>
          </div>

          <div className="space-y-4 md:space-y-6">
            <PhotoButton photo={FAMILY.album} className="block w-full aspect-[16/9]" />
            {/* Craft close-ups — desktop/tablet only; phones already have plenty of photos on this page */}
            <div className="hidden sm:grid grid-cols-2 gap-4 md:gap-6">
              {[
                { src: '/photos/web/surfacing-lumber-planer.jpg', alt: 'Robert feeding a board through the planer', label: 'At the planer' },
                { src: '/photos/web/hand-sanding-door.jpg', alt: 'Robert sanding a door by hand', label: 'Hand sanding' },
              ].map(p => (
                <div key={p.src} className="aspect-square border border-royal-border overflow-hidden relative group">
                  <img src={p.src} srcSet={srcSetFor(p.src)} sizes="(max-width: 1023px) 50vw, 22vw" loading="lazy" alt={p.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                  <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-royal-bg/80 px-2 py-1">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Three generations, each with its photo ── */}
      <section className="py-14 md:py-20 px-6 bg-royal-charcoal border-y border-royal-border-light">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-4 text-royal-gold mb-4">
              <div className="w-12 h-[1px] bg-royal-gold" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase">The Family</span>
              <div className="w-12 h-[1px] bg-royal-gold" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-bold uppercase tracking-wider">
              Three Generations
            </h2>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {GENERATIONS.map(g => (
              <li key={g.name} className="bg-royal-bg border border-royal-border flex md:block overflow-hidden">
                {/* Photo: small square on phones, full-width on top from tablet up */}
                {g.photo ? (
                  <PhotoButton photo={g.photo} caption={false} className="block w-28 shrink-0 self-stretch md:w-full md:aspect-[4/3] border-0 md:border-b" />
                ) : (
                  <div className="w-28 shrink-0 self-stretch md:w-full md:aspect-[4/3] md:border-b border-royal-border bg-gradient-to-br from-[#2a2117] to-royal-bg flex flex-col items-center justify-center text-center p-3">
                    <MapPin className="w-5 h-5 text-royal-gold mb-1.5" />
                    <span className="font-serif text-royal-gold text-base md:text-2xl font-bold uppercase tracking-wider">Romania</span>
                    <span className="hidden md:block text-xs text-royal-text-muted mt-1">Where it started</span>
                  </div>
                )}
                <div className="p-4 md:p-6">
                  <p className="text-royal-gold text-xs font-bold uppercase tracking-[0.2em] mb-1.5">
                    {g.gen}
                  </p>
                  <h3 className="font-serif text-lg md:text-xl font-bold text-white uppercase tracking-wider mb-1">{g.name}</h3>
                  <p className="flex items-center gap-1.5 text-royal-text-muted/80 text-xs mb-2 md:mb-3">
                    <MapPin className="w-3 h-3" /> {g.location}
                  </p>
                  <p className="text-royal-text-muted text-sm leading-relaxed">{g.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-center text-royal-text-muted text-sm mt-6">Tap any family photo to see it bigger.</p>
        </div>
      </section>

      {openPhoto !== null && openPhoto >= 0 && (
        <Lightbox photos={FAMILY_ORDER} startIndex={openPhoto} title="Robert & His Family" onClose={() => setOpenPhoto(null)} />
      )}

      {/* ── Our promise ── */}
      <section className="py-14 md:py-20 px-6 bg-royal-bg border-b border-royal-border-light">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-royal-charcoal border border-royal-border p-6 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-royal-gold via-royal-gold/60 to-transparent" />

            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3 text-royal-gold">
                <div className="w-8 h-[1px] bg-royal-gold" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Our Promise</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-white font-bold uppercase tracking-wider">
                You Work <br />
                <span className="text-royal-gold">With Robert.</span>
              </h2>
              <p className="text-gray-300 font-light leading-relaxed text-base">
                No middlemen and no hand-offs. When you hire Royal Brand Woodworking, you work with Robert himself — from the first visit to the day it's done.
              </p>
              <Link
                to="/booking"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 bg-royal-gold text-royal-charcoal font-bold text-sm tracking-[0.12em] uppercase hover:bg-white hover:text-royal-charcoal transition-all"
              >
                Book an Estimate
              </Link>
            </div>

            <div className="hidden lg:block lg:col-span-5">
              <div className="aspect-[4/3] bg-royal-bg border border-royal-border overflow-hidden relative group">
                <img
                  src="/photos/web/measuring-cutlist.jpg"
                  srcSet={srcSetFor('/photos/web/measuring-cutlist.jpg')}
                  sizes="35vw"
                  loading="lazy"
                  alt="Robert checking parts against the cut list"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
