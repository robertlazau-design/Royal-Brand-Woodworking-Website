import { useState, useEffect, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { DualPath } from './components/DualPath';
import { Testimonials } from './components/Testimonials';
import { FaqAccordion } from './components/FaqAccordion';
import { Footer } from './components/Footer';
import { ChevronUp } from 'lucide-react';

function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`fade-in-section ${visible ? 'visible' : ''}`}>
      {children}
    </div>
  );
}

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowTop(scrollTop > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen app-woody-bg text-royal-text-dark font-sans selection:bg-royal-terracotta selection:text-white py-0 md:py-10 px-0 md:px-6 relative flex items-center justify-center">
      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <div className="w-full max-w-7xl rounded-none md:rounded-3xl overflow-hidden shadow-2xl bg-royal-light border border-royal-stone/20 relative z-10">
        <Navigation />
        <main>
          <Hero />
          <FadeInSection><Services /></FadeInSection>
          <FadeInSection><DualPath /></FadeInSection>
          <FadeInSection><Testimonials /></FadeInSection>
          <FadeInSection><FaqAccordion /></FadeInSection>
        </main>
        <Footer />
      </div>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={`back-to-top ${showTop ? 'show' : ''} fixed bottom-6 right-6 z-[9999] w-11 h-11 rounded-full bg-royal-charcoal text-white shadow-xl flex items-center justify-center hover:bg-royal-terracotta transition-colors cursor-pointer border border-white/10`}
        aria-label="Back to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>
  );
}
