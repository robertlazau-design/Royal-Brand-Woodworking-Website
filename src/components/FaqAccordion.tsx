import React, { useState } from 'react';
import { ChevronDown, Phone, Star, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BUSINESS } from '../data/business';

const faqs = [
  {
    question: "What do you build?",
    answer: "Kitchen and bathroom cabinets, handmade furniture like dining tables and desks, built-in shelving, and finish carpentry. You can also order custom doors online, built to order in your sizes."
  },
  {
    question: "Is the estimate free?",
    answer: "Robert comes to your home to measure and talk through your project, and that visit is $150 an hour. If you go ahead with the project, the $150 is credited toward it — so it ends up costing you nothing extra. You can pick a day and time on our booking page."
  },
  {
    question: "How do I get started?",
    answer: "Call Robert or book an estimate online. He'll come out, take measurements, and give you a price before any work starts."
  },
  {
    question: "Can you help me choose colors and styles?",
    answer: "Yes. Robert has been doing this for over 15 years and will help you pick the wood, color and style that suit your home."
  },
  {
    question: "How long do custom doors take?",
    answer: "Usually 2 to 3 weeks once Robert has confirmed your sizes with you."
  },
  {
    question: "Are you licensed and insured?",
    answer: "Yes. Royal Brand Woodworking is licensed, bonded and insured in Oregon — CCB# 210239."
  }
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const toggleAccordion = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-14 md:py-24 bg-royal-bg text-royal-text border-b border-royal-border-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          
          {/* Left: FAQ list */}
          <div className="lg:col-span-2">
            <div className="mb-12">
              <div className="flex items-center gap-4 text-royal-gold mb-4">
                <div className="w-12 h-[1px] bg-royal-gold" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase">FAQ</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide uppercase">
                Common Questions
              </h2>
              <p className="text-royal-text-muted mt-6 text-sm md:text-base font-light max-w-xl leading-relaxed">
                Quick answers to what people ask us most.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className={`bg-royal-charcoal rounded-none overflow-hidden transition-all duration-500 border-l-2 ${
                      isOpen
                        ? 'border-l-royal-gold border border-royal-gold/30 shadow-[0_4px_20px_rgba(201,164,122,0.06)]'
                        : 'border-l-transparent border border-royal-border hover:border-royal-border-light'
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer group"
                    >
                      <div className="flex items-center gap-6">
                        <span className={`text-xs font-bold tracking-wider w-6 shrink-0 transition-colors duration-300 ${isOpen ? 'text-royal-gold' : 'text-royal-text-muted/40'}`}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className={`font-bold text-base md:text-lg transition-colors duration-300 ${isOpen ? 'text-royal-gold' : 'text-white group-hover:text-royal-gold'}`}>
                          {faq.question}
                        </span>
                      </div>
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ml-4 transition-all duration-500 ${
                        isOpen ? 'bg-royal-gold border-royal-gold rotate-180' : 'border-royal-border group-hover:border-royal-gold'
                      }`}>
                        <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-royal-text-muted'}`} />
                      </div>
                    </button>
                    
                    <div 
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-[500px]" : "max-h-0"
                      }`}
                    >
                      <div className="px-6 pb-6 pl-[4.5rem] text-royal-text-muted text-sm md:text-base font-light leading-relaxed border-t border-royal-border/50 pt-4">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Sticky contact sidebar (desktop only — on phones the call-to-action below covers it) */}
          <div className="hidden lg:block lg:sticky lg:top-24">
            <div className="bg-royal-charcoal text-white rounded-none border border-royal-border overflow-hidden shadow-xl">
              {/* Gold top accent */}
              <div className="h-[2px] bg-gradient-to-r from-royal-gold via-royal-gold/60 to-transparent" />

              <div className="p-8 md:p-10 space-y-8">
                <div className="flex items-center gap-4">
                  <img src="/logo-sm.png" alt="Royal Brand Woodworking" className="w-12 h-12 object-contain" />
                  <div>
                    <p className="text-royal-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Still have questions?</p>
                    <h3 className="font-serif text-xl font-bold leading-tight uppercase tracking-wide">Talk to Robert</h3>
                  </div>
                </div>

                {/* Credentials */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2.5 bg-royal-bg/50 rounded border border-royal-border">
                    <Shield className="w-3.5 h-3.5 text-royal-gold shrink-0" />
                    <span className="text-xs text-royal-text-muted uppercase tracking-wider font-bold">Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 bg-royal-bg/50 rounded border border-royal-border">
                    <Star className="w-3.5 h-3.5 text-royal-gold fill-royal-gold shrink-0" />
                    <span className="text-xs text-royal-text-muted uppercase tracking-wider font-bold">5.0 Google Rating</span>
                  </div>
                </div>

                <p className="text-royal-text-muted text-sm font-light leading-relaxed">
                  Robert answers the phone himself. Give him a call or book an estimate online.
                </p>
                <div className="space-y-3">
                  <a 
                    href={BUSINESS.phoneHref} 
                    className="flex items-center justify-center gap-2 w-full py-4 bg-royal-gold text-royal-charcoal font-bold text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-royal-charcoal transition-all shadow-[0_0_20px_rgba(201,164,122,0.15)]"
                  >
                    <Phone className="w-4 h-4" />
                    Call {BUSINESS.phoneDisplay}
                  </a>
                  <Link 
                    to="/booking" 
                    className="flex items-center justify-center gap-2 w-full py-4 border border-royal-border text-white font-bold text-xs tracking-[0.15em] uppercase hover:border-royal-gold hover:text-royal-gold transition-all"
                  >
                    Book an Estimate
                  </Link>
                </div>
                <div className="border-t border-royal-border pt-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-royal-gold" />
                    <p className="text-royal-text-muted text-xs font-light uppercase tracking-wider">
                      Mon – Fri: 7am – 5pm
                    </p>
                  </div>
                  <p className="text-royal-text-muted text-xs font-light uppercase tracking-wider pl-[22px]">
                    {BUSINESS.street}, {BUSINESS.cityStateZip}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
