import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Star, ChevronDown, ArrowRight } from 'lucide-react';
import { BUSINESS } from '../data/business';
import { photosFor } from '../data/gallery';
import { reviewsBy } from '../data/reviews';
import { SERVICE_PAGES, SERVICE_PATHS, type ServicePath } from '../data/servicePages';
import { Lightbox } from '../components/Lightbox';
import { srcSetFor } from '../lib/images';

// A small gold line + label above each section heading, as on the Services page.
function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <div className={`flex items-center gap-3 text-royal-gold mb-3 ${center ? 'justify-center' : ''}`}>
      <div className="w-8 h-[1px] bg-royal-gold" />
      <span className="text-xs font-bold uppercase tracking-[0.25em]">{children}</span>
      {center && <div className="w-8 h-[1px] bg-royal-gold" />}
    </div>
  );
}

export function ServiceDetailPage({ path }: { path: ServicePath }) {
  const page = SERVICE_PAGES[path];
  const photos = photosFor(page.gallery.category);
  const shown = photos.slice(0, page.gallery.count);
  const reviews = reviewsBy(page.reviewNames);
  const others = SERVICE_PATHS.filter(p => p !== path).map(p => SERVICE_PAGES[p]);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="w-full bg-royal-bg text-white">
      {/* Header */}
      <section className="pt-12 pb-12 md:pt-24 md:pb-20 px-6 border-b border-royal-border-light">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <nav aria-label="Breadcrumb" className="text-xs text-royal-text-muted uppercase tracking-[0.15em] mb-6">
              <Link to="/services" className="hover:text-royal-gold">Services</Link>
              <span className="mx-2 text-royal-gold">/</span>
              <span className="text-gray-300">{page.label}</span>
            </nav>
            <Eyebrow>{page.eyebrow}</Eyebrow>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-[1.05] mb-6 text-balance">
              {page.h1[0]} <span className="text-royal-gold">{page.h1[1]}</span>
            </h1>
            <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-xl mb-8">{page.lead}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/booking" className="inline-flex items-center justify-center px-8 py-4 bg-royal-gold text-royal-charcoal font-bold text-sm uppercase tracking-wider hover:bg-white transition-all">
                Book an Estimate
              </Link>
              <a href={BUSINESS.phoneHref} data-spot="hero" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-royal-border text-white font-bold text-sm uppercase tracking-wider hover:border-royal-gold hover:text-royal-gold transition-all">
                <Phone className="w-4 h-4" /> Call {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden border border-royal-border">
            <img
              src={page.hero.src}
              srcSet={srcSetFor(page.hero.src)}
              sizes="(max-width: 1023px) 100vw, 50vw"
              alt={page.hero.alt}
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-14 md:py-20 px-6 border-b border-royal-border-light">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>What You Get</Eyebrow>
          <h2 className="font-serif text-3xl md:text-5xl font-bold uppercase tracking-wide mb-10">{page.pointsHeading}</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {page.points.map((point, i) => (
              <li key={point.title} className="bg-royal-charcoal border border-royal-border p-6 md:p-7">
                <p className="font-serif text-royal-gold text-2xl font-bold mb-3">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-serif text-lg md:text-xl font-bold uppercase tracking-wider mb-2">{point.title}</h3>
                <p className="text-sm text-royal-text-muted font-light leading-relaxed">{point.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Photos of finished work */}
      <section className="py-14 md:py-20 px-4 sm:px-6 bg-royal-charcoal border-b border-royal-border-light">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 px-2 sm:px-0">
            <div>
              <Eyebrow>Our Work</Eyebrow>
              <h2 className="font-serif text-3xl md:text-5xl font-bold uppercase tracking-wide">{page.gallery.heading}</h2>
            </div>
            <Link to={`/gallery?c=${page.gallery.category}`} className="inline-flex items-center gap-2 text-royal-gold font-bold text-sm uppercase tracking-wider hover:text-white py-2">
              See all {photos.length} photos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {shown.map((p, i) => (
              <button key={p.src} onClick={() => setOpen(i)} aria-label={`View photo: ${p.alt}`} className="relative aspect-square overflow-hidden bg-royal-bg group">
                <img src={p.thumb} alt={p.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 md:py-20 px-6 border-b border-royal-border-light">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>The Process</Eyebrow>
          <h2 className="font-serif text-3xl md:text-5xl font-bold uppercase tracking-wide mb-4">{page.stepsHeading}</h2>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed mb-10">{page.stepsIntro}</p>
          <ol className={`grid sm:grid-cols-2 gap-3 sm:gap-5 ${page.steps.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
            {page.steps.map((step, i) => (
              <li key={step.title} className="bg-royal-charcoal border border-royal-border flex sm:block">
                <div className="w-28 shrink-0 aspect-square sm:w-auto sm:aspect-[3/2] overflow-hidden">
                  <img src={step.img} srcSet={srcSetFor(step.img)} sizes="(max-width: 639px) 112px, (max-width: 1023px) 50vw, 25vw" alt={step.alt} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-royal-gold text-sm font-bold mb-1">Step {i + 1}</p>
                  <h3 className="font-serif text-xl font-bold uppercase tracking-wider mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="py-14 md:py-20 px-6 bg-royal-charcoal border-b border-royal-border-light">
          <div className="max-w-7xl mx-auto">
            <Eyebrow>Google Reviews</Eyebrow>
            <h2 className="font-serif text-3xl md:text-5xl font-bold uppercase tracking-wide mb-10">What Customers Say</h2>
            <ul className="grid md:grid-cols-3 gap-3 md:gap-5">
              {reviews.map(r => (
                <li key={r.name} className="bg-royal-bg border border-royal-border p-6 md:p-7 flex flex-col">
                  <div className="flex gap-0.5 mb-4" role="img" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-royal-gold text-royal-gold" />)}
                  </div>
                  <blockquote className="text-gray-200 font-light text-sm leading-relaxed italic flex-1">“{r.quote}”</blockquote>
                  <p className="mt-5 pt-4 border-t border-royal-border text-xs font-bold uppercase tracking-wider">
                    {r.name} <span className="text-royal-text-muted font-medium">· {r.role}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Questions */}
      <section className="py-14 md:py-20 px-6 border-b border-royal-border-light">
        <div className="max-w-3xl mx-auto">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="font-serif text-3xl md:text-5xl font-bold uppercase tracking-wide mb-8">Common Questions</h2>
          <div className="border-t border-royal-border">
            {page.faqs.map(faq => (
              <details key={faq.q} className="group border-b border-royal-border">
                <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="font-bold text-base md:text-lg">{faq.q}</h3>
                  <ChevronDown className="w-5 h-5 text-royal-gold shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="pb-5 text-gray-300 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-14 md:py-16 px-6 bg-royal-charcoal border-b border-royal-border-light">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>Also From Royal Brand</Eyebrow>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            {others.map(o => (
              <li key={o.path}>
                <Link to={o.path} className="flex items-center justify-between gap-3 h-full bg-royal-bg border border-royal-border px-5 py-4 font-bold text-sm uppercase tracking-wider hover:border-royal-gold hover:text-royal-gold transition-colors">
                  {o.label} <ArrowRight className="w-4 h-4 text-royal-gold shrink-0" />
                </Link>
              </li>
            ))}
            <li>
              <Link to="/order" className="flex items-center justify-between gap-3 h-full bg-royal-bg border border-royal-border px-5 py-4 font-bold text-sm uppercase tracking-wider hover:border-royal-gold hover:text-royal-gold transition-colors">
                Custom Doors <ArrowRight className="w-4 h-4 text-royal-gold shrink-0" />
              </Link>
            </li>
            <li>
              <Link to="/gallery?c=furniture" className="flex items-center justify-between gap-3 h-full bg-royal-bg border border-royal-border px-5 py-4 font-bold text-sm uppercase tracking-wider hover:border-royal-gold hover:text-royal-gold transition-colors">
                Handmade Furniture <ArrowRight className="w-4 h-4 text-royal-gold shrink-0" />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-14 md:py-20 px-6 border-b border-royal-border-light">
        <div className="max-w-3xl mx-auto text-center">
          <Eyebrow center>Ready to begin?</Eyebrow>
          <h2 className="font-serif text-3xl md:text-5xl font-bold uppercase tracking-wider mb-6">Start Your Project</h2>
          <p className="text-royal-text-muted text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed mb-8">
            Call Robert or book a time for him to come out and take a look.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/booking" className="w-full sm:w-auto px-8 py-4 bg-royal-gold text-royal-charcoal font-bold text-sm uppercase tracking-wider hover:bg-white transition-all">
              Book an Estimate
            </Link>
            <a href={BUSINESS.phoneHref} data-spot="bottom" className="w-full sm:w-auto px-8 py-4 border border-royal-border text-white font-bold text-sm uppercase tracking-wider hover:border-royal-gold hover:text-royal-gold transition-all inline-flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Call {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {open !== null && (
        <Lightbox photos={shown} startIndex={open} title={page.gallery.heading} onClose={() => setOpen(null)} />
      )}
    </div>
  );
}
