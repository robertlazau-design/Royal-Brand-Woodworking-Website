import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Bath, Armchair, Hammer, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { GALLERY_CATEGORIES, photosFor, type GalleryCategory } from '../data/gallery';
import { srcSetFor } from '../lib/images';

const ICONS: Record<GalleryCategory, React.ReactNode> = {
  kitchens: <ChefHat className="w-5 h-5" />,
  bathrooms: <Bath className="w-5 h-5" />,
  furniture: <Armchair className="w-5 h-5" />,
  'built-ins': <Hammer className="w-5 h-5" />,
};

const SHORT_NAME: Record<GalleryCategory, string> = { kitchens: 'kitchen', bathrooms: 'bathroom', furniture: 'furniture', 'built-ins': 'built-in' };

const SHOP_PHOTO = { src: '/photos/web/powermatic-planer-shop.jpg', alt: 'Robert at the planer in the Royal Brand Woodworking shop' };

// Home page: one big photo (the shop by default). Tapping a category swaps the photo to that
// category's work; small arrows (or a swipe) step through that category in the same frame.
export function ProjectShowcase() {
  const [active, setActive] = useState<GalleryCategory | null>(null);
  const [index, setIndex] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const photos = active ? photosFor(active) : [];
  const count = photos.length;
  const current = active && count ? photos[index] : SHOP_PHOTO;
  const category = GALLERY_CATEGORIES.find(c => c.id === active);
  const go = (delta: number) => count > 1 && setIndex(i => (i + delta + count) % count);

  // Warm the cache for the next photo so stepping through feels instant.
  useEffect(() => {
    if (count > 1) new Image().src = photos[(index + 1) % count].src;
  }, [active, index, count]); // eslint-disable-line react-hooks/exhaustive-deps

  function choose(id: GalleryCategory) {
    setActive(id);
    setIndex(0);
    // On phones the photo can be scrolled off the top — bring it back into view.
    const top = frameRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 70) frameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <div>
      <div
        ref={frameRef}
        className="relative aspect-[3/2] border border-royal-border overflow-hidden mb-3 sm:mb-4 bg-royal-charcoal group"
        onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <img
          key={current.src}
          src={current.src}
          srcSet={srcSetFor(current.src)}
          sizes="(max-width: 1023px) 100vw, 55vw"
          alt={current.alt}
          className="w-full h-full object-cover animate-fade-in group-hover:scale-[1.02] transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-bg/70 via-transparent to-transparent pointer-events-none" />

        <span className="absolute bottom-3 left-3 text-xs font-bold uppercase tracking-[0.2em] text-royal-gold bg-royal-bg/80 px-2 py-1 border border-royal-border">
          {category ? `${category.title} · ${index + 1} of ${count}` : 'The Shop · NE Portland'}
        </span>

        {count > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 bg-royal-bg/70 text-white hover:text-royal-gold">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-royal-bg/70 text-white hover:text-royal-gold">
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4" role="tablist" aria-label="Show photos of">
        {GALLERY_CATEGORIES.map(c => {
          const selected = active === c.id;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => choose(c.id)}
              className={`text-left border p-3 sm:p-5 transition-colors ${
                selected ? 'bg-royal-gold/10 border-royal-gold' : 'bg-royal-charcoal border-royal-border hover:border-royal-gold/40'}`}
            >
              <div className="flex items-center gap-2 sm:gap-3 sm:mb-2">
                <span className="text-royal-gold">{ICONS[c.id]}</span>
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">{c.title}</h3>
              </div>
              <p className="hidden sm:block text-xs text-royal-text-muted leading-relaxed">{c.text}</p>
            </button>
          );
        })}
      </div>

      {category ? (
        <Link to={`/gallery?c=${category.id}`} className="inline-flex items-center gap-2 mt-3 py-3 text-royal-gold text-xs font-bold uppercase tracking-[0.15em] hover:text-white transition-colors">
          See all {count} {SHORT_NAME[category.id]} photos <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      ) : (
        <Link to="/services" className="inline-flex items-center gap-2 mt-3 py-3 text-royal-gold text-xs font-bold uppercase tracking-[0.15em] hover:text-white transition-colors">
          See All Services <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}
