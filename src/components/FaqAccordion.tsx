import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What types of woodworking projects do you take on?",
    answer: "We specialize in custom kitchen cabinetry, cabinet door and drawer front replacements, bathroom vanities, fine handmade furniture (tables, desks, credenzas), custom built-ins, shelving, and architectural trim/millwork."
  },
  {
    question: "Do you offer free estimates?",
    answer: "Yes, we provide free preliminary estimates. You can fill out our custom door & drawer front estimator above, or contact Robert directly for larger custom remodeling layouts."
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
    answer: "Head to the Cabinet Door Estimator section above, choose your finish color, profile style, and enter your custom dimensions. Then fill in your contact details and click submit to send Robert an email. He'll follow up with a call to confirm the details and finalize your order."
  },
  {
    question: "Are you licensed and insured?",
    answer: "Yes, Royal Brand Woodworking is fully licensed, bonded, and insured, guaranteeing structural precision, safety, and client peace of mind."
  }
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(1); // Default second accordion open like the photo

  const toggleAccordion = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-24 bg-royal-cream text-royal-charcoal border-t border-royal-stone/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Two-column: FAQs left, contact sidebar right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          
          {/* Left: FAQ list */}
          <div className="lg:col-span-2">
            <div className="mb-12">
              <div className="text-royal-terracotta text-sm font-semibold tracking-wide mb-3">Common Questions</div>
              <h2 className="font-serif text-4xl md:text-5xl text-royal-charcoal font-semibold tracking-tight normal-case italic">
                Frequently Asked<br />Questions
              </h2>
              <p className="text-royal-slate mt-4 text-sm max-w-xl">
                Common questions homeowners and contractors ask about ordering custom doors and remodeling.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className={`bg-white rounded-xl border overflow-hidden transition-all duration-300 ${isOpen ? 'border-royal-terracotta/40 shadow-md' : 'border-royal-stone/30'}`}
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full flex items-center justify-between p-5 text-left focus:outline-none cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-xs font-black font-mono w-6 shrink-0 transition-colors ${isOpen ? 'text-royal-terracotta' : 'text-royal-stone/60'}`}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className={`font-bold text-sm md:text-base transition-colors ${isOpen ? 'text-royal-terracotta' : 'text-royal-charcoal group-hover:text-royal-terracotta'}`}>
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 text-royal-slate shrink-0 transition-transform duration-300 ml-4 ${
                          isOpen ? "transform rotate-180 text-royal-terracotta" : ""
                        }`}
                      />
                    </button>
                    
                    <div 
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-[300px] border-t border-royal-terracotta/20" : "max-h-0"
                      }`}
                    >
                      <div className="p-5 pl-14 text-royal-slate text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Sticky contact sidebar */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-royal-charcoal text-white rounded-2xl p-8 space-y-6 shadow-xl">
              <div>
                <p className="text-royal-terracotta text-xs font-bold uppercase tracking-widest mb-2">Ready to order?</p>
                <h3 className="font-serif text-2xl font-bold leading-tight">Talk to Robert<br />directly</h3>
              </div>
              <p className="text-royal-stone text-sm leading-relaxed">
                Robert personally handles every inquiry. Call or fill out the online estimator to get started on your custom cabinet doors.
              </p>
              <div className="space-y-3">
                <a 
                  href="tel:555-0199" 
                  className="flex items-center justify-center gap-2 w-full py-3 bg-royal-terracotta text-white font-bold text-sm rounded-full tracking-wider uppercase hover:bg-white hover:text-royal-charcoal transition-all"
                >
                  📞 Call (555) 0199
                </a>
                <a 
                  href="#doors-drawers" 
                  className="flex items-center justify-center gap-2 w-full py-3 border-2 border-white/20 text-white font-bold text-sm rounded-full tracking-wider uppercase hover:border-white/50 transition-all"
                >
                  Get an Estimate
                </a>
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-royal-stone text-xs">
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
