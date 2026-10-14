import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { GALLERY_CATEGORIES, GALLERY_PHOTOS, type GalleryCategory } from '../data/gallery';
import { Lightbox } from '../components/Lightbox';
import { BUSINESS } from '../data/business';

const FILTERS: { id: GalleryCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  ...GALLERY_CATEGORIES.map(c => ({ id: c.id, label: c.title.replace(/ Remodels| & Carpentry/, '') })),
];

export function GalleryPage() {
  const [filter, setFilter] = useState<GalleryCategory | 'all'>('all');
  const [open, setOpen] = useState<number | null>(null);
  const photos = filter === 'all' ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter(p => p.category === filter);
  const current = FILTERS.find(f => f.id === filter)!;

  return (
    <div className="w-full bg-royal-bg text-white">
      <section className="pt-14 pb-10 md:pt-24 md:pb-14 px-6 text-center border-b border-royal-border-light">
        <p className="text-royal-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">Our Work</p>
        <h1 className="font-serif text-4xl md:text-6xl font-bold uppercase tracking-widest mb-4">
          Project <span className="text-royal-gold">Gallery</span>
        </h1>
        <p className="text-gray-300 text-base max-w-xl mx-auto">
          Kitchens, bathrooms, furniture and built-ins Robert has made for homes around Portland. Tap any photo to see it bigger.
        </p>
      </section>

      <section className="py-8 md:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Category filter — scrolls sideways on small phones */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center" role="tablist">
            {FILTERS.map(f => {
              const n = f.id === 'all' ? GALLERY_PHOTOS.length : GALLERY_PHOTOS.filter(p => p.category === f.id).length;
              const active = filter === f.id;
              return (
                <button key={f.id} role="tab" aria-selected={active} onClick={() => setFilter(f.id)}
                  className={`shrink-0 px-5 py-3 text-sm font-bold uppercase tracking-wider border transition-colors ${
                    active ? 'bg-royal-gold border-royal-gold text-white' : 'border-royal-border text-gray-300 hover:border-royal-gold hover:text-white'}`}>
                  {f.label} <span className={active ? 'text-white/80' : 'text-royal-text-muted'}>({n})</span>
                </button>
              );
            })}
          </div>

          {photos.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {photos.map((p, i) => (
                <button key={p.src} onClick={() => setOpen(i)} className="relative aspect-square overflow-hidden bg-royal-charcoal group">
                  <img src={p.src} alt={p.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-royal-text-muted py-16">Photos coming soon.</p>
          )}

          <div className="mt-10 text-center space-y-4">
            <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-royal-gold font-bold text-sm uppercase tracking-wider py-3 hover:text-white">
              <Instagram className="w-4 h-4" /> More on Instagram {BUSINESS.instagramHandle}
            </a>
            <div>
              <Link to="/booking" className="inline-block px-8 py-4 bg-royal-gold text-white font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all">
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {open !== null && (
        <Lightbox photos={photos} startIndex={open} title={current.id === 'all' ? 'Our Work' : current.label} onClose={() => setOpen(null)} />
      )}
    </div>
  );
}
