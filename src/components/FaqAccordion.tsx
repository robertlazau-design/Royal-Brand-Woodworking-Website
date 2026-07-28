import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "What types of woodworking projects do you take on?",
    answer: "We specialize in custom kitchen cabinetry, cabinet door and drawer front replacements, bathroom vanities, fine handmade furniture (tables, desks, credenzas), custom built-ins, shelving, and architectural trim/millwork."
  },
  {
    question: "Do you offer free estimates?",
    answer: "No, on-site estimates and consultations are billed at $150/hr. You can reserve a day for an estimate using our online booking calendar."
  },
  {
    question: "How long will my custom doors or drawer fronts order take?",
    answer: "Once dimensions are confirmed over the phone with Robert, standard custom cabinet doors and drawer fronts take 2 to 3 weeks to fabricate, sand, finish, and prep for pick-up or shipping."
  },
  {
    question: "Can you help me select the right finish color and profile style?",
    answer: "Absolutely! Robert Burlacu brings 15+ years of third-generation woodworking experience. He'll help you choose from popular finishes like Classic White, Slate Gray, Navy Blue, or Mahogany Red — and recommend the best profile style (Shaker, Raised Panel, Beveled Edge) to match your kitchen's aesthetic."
  },
  {
    question: "How do I get started with ordering cabinet doors?",
    answer: "Head to the Cabinet Door Estimator page, choose your finish color, profile style, and enter your custom dimensions. Then fill in your contact details and click submit to send Robert an email. He'll follow up with a call to confirm the details and finalize your order."
  },
  {
    question: "Are you licensed and insured?",
    answer: "Yes, Royal Brand Woodworking is fully licensed, bonded, and insured, guaranteeing structural precision, safety, and client peace of mind."
  }
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const toggleAccordion = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-24 bg-royal-bg text-royal-text border-b border-royal-border-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          
          {/* Left: FAQ list */}
          <div className="lg:col-span-2">
            <div className="mb-12">
              <div className="flex items-center gap-4 text-royal-gold mb-4">
                <div className="w-12 h-[1px] bg-royal-gold" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Common Questions</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide uppercase">
                Frequently Asked<br />Questions
              </h2>
              <p className="text-royal-text-muted mt-6 text-sm md:text-base font-light max-w-xl leading-relaxed">
                Common questions homeowners and contractors ask about ordering custom doors and remodeling.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className={`bg-royal-charcoal rounded-none border overflow-hidden transition-all duration-300 ${isOpen ? 'border-royal-gold shadow-lg' : 'border-royal-border hover:border-royal-border-light'}`}
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer group"
                    >
                      <div className="flex items-center gap-6">
                        <span className={`text-xs font-bold tracking-wider w-6 shrink-0 transition-colors ${isOpen ? 'text-royal-gold' : 'text-royal-text-muted'}`}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className={`font-bold text-sm md:text-base transition-colors uppercase tracking-wider ${isOpen ? 'text-royal-gold' : 'text-white group-hover:text-royal-gold'}`}>
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 text-royal-text-muted shrink-0 transition-transform duration-300 ml-4 ${
                          isOpen ? "transform rotate-180 text-royal-gold" : ""
                        }`}
                      />
                    </button>
                    
                    <div 
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-[300px] border-t border-royal-border" : "max-h-0"
                      }`}
                    >
                      <div className="p-6 pl-18 text-royal-text-muted text-sm md:text-base font-light leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Sticky contact sidebar */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-royal-charcoal text-white rounded-none border border-royal-border p-8 md:p-10 space-y-8 shadow-xl">
              <div className="flex items-center gap-4">
                <img src="/logo.jpg" alt="Royal Brand Woodworking" className="w-12 h-12 object-contain" />
                <div>
                  <p className="text-royal-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Ready to order?</p>
                  <h3 className="font-serif text-xl font-bold leading-tight uppercase tracking-wide">Talk to Robert</h3>
                </div>
              </div>
              <p className="text-royal-text-muted text-sm font-light leading-relaxed">
                Robert personally handles every inquiry. Call or fill out the online estimator to get started on your custom cabinet doors.
              </p>
              <div className="space-y-4">
                <a 
                  href="tel:555-0199" 
                  className="flex items-center justify-center gap-2 w-full py-4 bg-royal-gold text-white font-bold text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-royal-charcoal transition-all"
                >
                  Call (555) 0199
                </a>
                <Link 
                  to="/estimator" 
                  className="flex items-center justify-center gap-2 w-full py-4 border border-royal-border text-white font-bold text-xs tracking-[0.15em] uppercase hover:border-royal-gold hover:text-royal-gold transition-all"
                >
                  Get an Estimate
                </Link>
              </div>
              <div className="border-t border-royal-border pt-6">
                <p className="text-royal-text-muted text-xs font-light leading-loose uppercase tracking-wider">
                  Mon – Fri: 8am – 5pm<br />
                  Workshop in Portland, OR
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
