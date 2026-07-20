import { Star } from 'lucide-react';
import { SawtoothDivider } from './SawtoothDivider';

const GoogleIcon = () => (
  <svg className="w-4 h-4 opacity-90" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
  </svg>
);

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('');
};

const testimonials = [
  {
    name: "Brian Bostick",
    role: "Google Review • 5 reviews",
    quote: "Robert at Royal Brand Woodworking has built the custom cabinets for our kitchen, bathrooms, and most recently our laundry room, and every project has exceeded our expectations. He’s a true craftsman with an incredible eye for detail and a real talent for designing cabinetry that’s not only beautiful, but highly functional. He’s responsive, easy to work with, and genuinely cares about getting every detail right."
  },
  {
    name: "Marisa S.",
    role: "Google Review • 4 reviews",
    quote: "Robert is an absolutely phenomenal cabinet maker and contractor. His attention to detail and stellar craftsmanship made our kitchen/dining/bath renovation a dream. He is trustworthy, accountable and communicative, and beyond his top-quality work, Robert is simply a good human. We 100% will be working with him for any future projects and would recommend to anyone."
  },
  {
    name: "M Johnston",
    role: "Google Review • Local Guide",
    quote: "Robert is a highly skilled finish carpenter and gives his work an immense amount of detail. I am so pleased with our new kitchen cabinets; he made my vision come true! He helped us with design, details in sliding racks, crown finishing, dishwasher ready island, left work site clean & tidy, etc. He communicated well via email, text and calls. Truly one of the best contractors I have ever worked with!"
  },
  {
    name: "Lynn Monahan",
    role: "Google Review • 3 reviews",
    quote: "My kitchen cabinets are fantastic! Robert made suggestions for the kitchen remodel that I hadn't thought of. Quality workmanship with careful attention to detail. He was exacting in the installation, a perfectionist. On time, professional, delivered beyond my expectations. I highly recommend him."
  },
  {
    name: "Catherine Malmin",
    role: "Google Review • 7 reviews",
    quote: "Incredible craftsmanship. Robert is truly gifted. Our inset, white-oak kitchen turned out more beautiful than I could have dreamed."
  },
  {
    name: "Bo Malmin",
    role: "Google Review • 3 reviews",
    quote: "This is true craftsmanship! They take great pride in their work and it shows. They went above and beyond to be sure every detail of our project was perfect. 10/10!"
  },
  {
    name: "Wes Silva",
    role: "Google Review",
    quote: "Robert is the contractor / cabinet maker to hire if you want high quality craftsmanship and someone who is generally great to work with. He stayed on budget, on schedule, and always gives the honest answer!"
  },
  {
    name: "McKenzie Lyman",
    role: "Google Review",
    quote: "Robert is truly gifted, he is detail oriented and true craftsman. He puts his whole heart is each customer order. Amazing guy to work with."
  },
  {
    name: "Vasile Benta",
    role: "Google Review",
    quote: "I had an amazing experience with Robert! He made an amazing dining table for us. The customer service was top-notch, and the product exceeded our expectations. I highly recommend him to anyone looking for quality products and excellent service."
  }
];

export function Testimonials() {
  return (
    <>
      <section id="testimonials" className="py-24 bg-royal-charcoal relative overflow-hidden text-white border-t border-royal-stone/10">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16">
            <div className="text-royal-terracotta text-sm font-semibold tracking-wide mb-3">Words from our neighbors</div>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-semibold mb-4 tracking-tight normal-case italic">
              Our neighborly feedback
            </h2>
            <p className="text-royal-stone text-base md:text-lg max-w-2xl font-medium">
              Our legacy is built on the words of those who live and work alongside our craftsmanship every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 border border-royal-stone/20 gap-5">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-royal-charcoal/10 text-royal-terracotta flex items-center justify-center font-bold text-sm shrink-0 border border-royal-charcoal/20">
                        {getInitials(testimonial.name)}
                      </div>
                      <div>
                        <p className="font-bold text-royal-text-dark text-sm">{testimonial.name}</p>
                        <p className="text-royal-stone text-[11px] font-medium tracking-wide mt-0.5">{testimonial.role}</p>
                      </div>
                    </div>
                    <GoogleIcon />
                  </div>

                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-royal-amber text-royal-amber" />
                    ))}
                  </div>

                  <blockquote className="text-royal-text-dark/90 font-medium text-xs leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solid Terracotta Saw-Tooth Banner Section (Ripped Paper Look from Photo) */}
      <div className="bg-royal-charcoal">
        <SawtoothDivider color="text-royal-terracotta" position="top" invert={true} />
        
        <section className="bg-royal-terracotta py-16 text-white text-center relative z-10">
          <div className="max-w-4xl mx-auto px-6 space-y-6">
            <h3 className="font-serif text-4xl md:text-5xl font-semibold uppercase tracking-tight leading-none normal-case italic">
              Where plans become woodwork
            </h3>
            <p className="text-royal-light/95 text-base md:text-lg max-w-xl mx-auto font-medium">
              Let's bring your ideas to life — reach out today to start your order with a craftsman you can trust.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="tel:555-0199" 
                className="inline-block px-8 py-3.5 bg-white text-royal-terracotta font-extrabold text-sm rounded-full tracking-wider hover:bg-royal-charcoal hover:text-white transition-all shadow-xl"
              >
                Call Robert Now
              </a>
              <a 
                href="#doors-drawers" 
                className="inline-block px-8 py-3.5 bg-transparent border-2 border-white text-white font-extrabold text-sm rounded-full tracking-wider hover:bg-white hover:text-royal-terracotta transition-all"
              >
                Get an Estimate
              </a>
            </div>
          </div>
        </section>

        <SawtoothDivider color="text-royal-terracotta" position="bottom" />
      </div>
    </>
  );
}
