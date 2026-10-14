import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { MobileActionBar, useShowMobileActionBar } from './components/MobileActionBar';

// Pages
import { Home } from './pages/Home';
import { ServicesPage } from './pages/ServicesPage';
import { OrderPage } from './pages/OrderPage';
import { BookingPage } from './pages/BookingPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Keeps the fixed phone action bar from covering the bottom of the footer.
function MobileActionBarSpacer() {
  return useShowMobileActionBar() ? <div className="h-20 md:hidden print:hidden" aria-hidden /> : null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-royal-bg text-royal-text font-sans selection:bg-royal-gold selection:text-royal-charcoal relative">
        <Navigation />

        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/estimator" element={<Navigate to="/order" replace />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </main>

        <Footer />
        <MobileActionBarSpacer />
        <MobileActionBar />
      </div>
      <Analytics />
    </Router>
  );
}
