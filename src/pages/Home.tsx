import React from 'react';
import { Hero } from '../components/Hero';
import { Testimonials } from '../components/Testimonials';
import { FaqAccordion } from '../components/FaqAccordion';

export function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Testimonials />
      <FaqAccordion />
    </div>
  );
}
