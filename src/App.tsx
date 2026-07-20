import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { DualPath } from './components/DualPath';
import { Testimonials } from './components/Testimonials';
import { FaqAccordion } from './components/FaqAccordion';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen app-woody-bg text-royal-text-dark font-sans selection:bg-royal-terracotta selection:text-white py-0 md:py-10 px-0 md:px-6 relative flex items-center justify-center">
      <div className="w-full max-w-7xl rounded-none md:rounded-3xl overflow-hidden shadow-2xl bg-royal-light border border-royal-stone/20 relative z-10">
        <Navigation />
        <main>
          <Hero />
          <Services />
          <DualPath />
          <Testimonials />
          <FaqAccordion />
        </main>
        <Footer />
      </div>
    </div>
  );
}
