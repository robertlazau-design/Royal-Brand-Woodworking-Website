import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryPhoto } from '../data/gallery';

interface LightboxProps {
  photos: GalleryPhoto[];
  startIndex: number;
  title?: string;
  onClose: () => void;
}

// Full-screen photo viewer: swipe or arrow keys to move, Esc or ✕ to close.
export function Lightbox({ photos, startIndex, title, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex);
  const touchX = useRef<number | null>(null);
  const count = photos.length;
  const go = (delta: number) => setIndex(i => (i + delta + count) % count);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!count) return null;
  const photo = photos[index];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col print:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} photos` : 'Photos'}
      onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <div className="min-w-0">
          {title && <p className="font-serif text-lg font-bold uppercase tracking-wide truncate">{title}</p>}
          <p className="text-xs text-royal-text-muted">{index + 1} of {count}</p>
        </div>
        <button onClick={onClose} aria-label="Close photos" className="p-3 -mr-2 hover:text-royal-gold">
          <X className="w-7 h-7" />
        </button>
      </div>

      <div className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-16" onClick={onClose}>
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          className="max-w-full max-h-full object-contain animate-fade-in-up"
          style={{ animationDuration: '0.25s' }}
          onClick={e => e.stopPropagation()}
        />
        {count > 1 && (
          <>
            <button onClick={e => { e.stopPropagation(); go(-1); }} aria-label="Previous photo"
              className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white hover:text-royal-gold">
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button onClick={e => { e.stopPropagation(); go(1); }} aria-label="Next photo"
              className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white hover:text-royal-gold">
              <ChevronRight className="w-7 h-7" />
            </button>
          </>
        )}
      </div>

      <p className="px-4 py-4 text-center text-sm text-gray-300 min-h-[3.5rem]">{photo.alt}</p>
    </div>
  );
}
