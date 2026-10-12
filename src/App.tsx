import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { ServicesPage } from './pages/ServicesPage';
import { OrderPage } from './pages/OrderPage';
import { BookingPage } from './pages/BookingPage';
import { AboutPage } from './pages/AboutPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
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
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
      <Analytics />
    </Router>
  );
}
