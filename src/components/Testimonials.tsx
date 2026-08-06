import { Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    role: "Google Review · 5 reviews",
    quote: "Robert at Royal Brand Woodworking has built the custom cabinets for our kitchen, bathrooms, and most recently our laundry room, and every project has exceeded our expectations. He's a true craftsman with an incredible eye for detail and a real talent for designing cabinetry that's not only beautiful, but highly functional. He's responsive, easy to work with, and genuinely cares about getting every detail right."
  },
  {
    name: "Marisa S.",
    role: "Google Review · 4 reviews",
    quote: "Robert is an absolutely phenomenal cabinet maker and contractor. His attention to detail and stellar craftsmanship made our kitchen/dining/bath renovation a dream. He is trustworthy, accountable and communicative, and beyond his top-quality work, Robert is simply a good human. We 100% will be working with him for any future projects and would recommend to anyone."
  },
  {
    name: "M Johnston",
    role: "Google Review · Local Guide",
    quote: "Robert is a highly skilled finish carpenter and gives his work an immense amount of detail. I am so pleased with our new kitchen cabinets; he made my vision come true! He helped us with design, details in sliding racks, crown finishing, dishwasher ready island, left work site clean & tidy, etc. He communicated well via email, text and calls. Truly one of the best contractors I have ever worked with!"
  },
  {
    name: "Lynn Monahan",
    role: "Google Review · 3 reviews",
    quote: "My kitchen cabinets are fantastic! Robert made suggestions for the kitchen remodel that I hadn't thought of. Quality workmanship with careful attention to detail. He was exacting in the installation, a perfectionist. On time, professional, delivered beyond my expectations. I highly recommend him."
  },
  {
    name: "Catherine Malmin",
    role: "Google Review · 7 reviews",
    quote: "Incredible craftsmanship. Robert is truly gifted. Our inset, white-oak kitchen turned out more beautiful than I could have dreamed."
  },
  {
    name: "Bo Malmin",
    role: "Google Review · 3 reviews",
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
      <section id="testimonials" className="py-20 bg-royal-bg relative overflow-hidden text-white border-y border-royal-border-light">
        <div className="w-full relative z-10">
          <div className="mb-14 text-center px-6">
            <div className="flex items-center justify-center gap-4 text-royal-gold mb-4">
              <div className="w-12 h-[1px] bg-royal-gold" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Reviews</span>
              <div className="w-12 h-[1px] bg-royal-gold" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-4 tracking-wide uppercase">
              Built Beautifully. Built For You.
            </h2>
            <p className="text-royal-text-muted text-sm md:text-base max-w-2xl mx-auto font-light">
              Our legacy is built on the words of those who live and work alongside our craftsmanship every day.
            </p>
          </div>

          {/* Marquee ticker — edge-to-edge */}
          <div className="relative w-full overflow-hidden py-4">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-r from-royal-bg to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-l from-royal-bg to-transparent pointer-events-none" />
            
            <div className="flex items-start w-max animate-marquee hover:[animation-play-state:paused] gap-6 px-3 py-6">
              {[...testimonials, ...testimonials].map((testimonial, idx) => (
                <div key={idx} className="group w-[380px] shrink-0 bg-royal-charcoal p-7 flex flex-col justify-between transition-all duration-500 ease-out border border-royal-border hover:border-royal-gold hover:shadow-[0_8px_30px_rgba(212,175,55,0.1)] hover:-translate-y-2 relative z-10 hover:z-30 cursor-pointer">
                  <div>
                    {/* Decorative quote icon */}
                    <Quote className="w-6 h-6 text-royal-gold/15 mb-3 group-hover:text-royal-gold/30 transition-colors duration-500" />

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-royal-bg text-royal-gold flex items-center justify-center font-bold text-xs shrink-0 border border-royal-border group-hover:border-royal-gold group-hover:shadow-[0_0_10px_rgba(201,164,122,0.2)] transition-all duration-500">
                          {getInitials(testimonial.name)}
                        </div>
                        <div>
                          <p className="font-bold text-white text-xs tracking-wider uppercase group-hover:text-royal-gold transition-colors duration-500">{testimonial.name}</p>
                          <p className="text-royal-text-muted text-[9px] font-medium tracking-wide mt-0.5 uppercase">{testimonial.role}</p>
                        </div>
                      </div>
                      <GoogleIcon />
                    </div>

                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-royal-gold text-royal-gold" />
                      ))}
                    </div>

                    <div className="relative transition-all duration-500 ease-in-out overflow-hidden max-h-[78px] group-hover:max-h-[300px]">
                      <blockquote className="text-royal-text-muted font-light text-xs leading-relaxed italic">
                        "{testimonial.quote}"
                      </blockquote>
                      {/* Fading bottom edge for ellipsis effect when not hovered */}
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-royal-charcoal to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner Section — Premium Upgrade */}
      <div className="bg-royal-charcoal border-b border-royal-border-light relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a47a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        {/* Decorative top line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-royal-gold/20 to-transparent" />

        <section className="py-20 text-center relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            {/* Ornamental top piece */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-royal-gold/40" />
              <img src="/logo.png" alt="Royal Brand Woodworking" className="w-14 h-14 object-contain" />
              <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-royal-gold/40" />
            </div>

            <h3 className="font-serif text-3xl md:text-5xl text-white font-bold uppercase tracking-wide mb-4">
              Where Plans Become <span className="text-royal-gold">Woodwork</span>
            </h3>

            <div className="flex items-center justify-center gap-3 my-6">
              <div className="w-8 h-[1px] bg-royal-gold/40" />
              <div className="w-1.5 h-1.5 bg-royal-gold rotate-45" />
              <div className="w-8 h-[1px] bg-royal-gold/40" />
            </div>

            <p className="text-royal-text-muted text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed mb-10">
              Let's bring your ideas to life. Reach out today to start your order with a craftsman you can trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:555-0199" 
                className="inline-block px-10 py-4 bg-royal-gold text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all shadow-[0_0_30px_rgba(201,164,122,0.15)]"
              >
                Call Robert Now
              </a>
              <Link 
                to="/estimator" 
                className="inline-block px-10 py-4 bg-transparent border border-royal-gold text-royal-gold font-bold text-xs uppercase tracking-wider hover:bg-royal-gold hover:text-white transition-all"
              >
                Order Custom Doors
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
