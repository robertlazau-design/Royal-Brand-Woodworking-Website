import { Star, Quote, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BUSINESS } from '../data/business';
import { REVIEWS } from '../data/reviews';

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

const testimonials = REVIEWS;

export function Testimonials() {
  return (
    <>
      <section id="testimonials" className="py-14 md:py-24 bg-royal-bg relative overflow-hidden text-white border-y border-royal-border-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-royal-gold text-royal-gold" />
              ))}
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-4 tracking-wide uppercase">
              What Customers Say
            </h2>
            <p className="text-royal-text-muted text-base max-w-xl mx-auto">
              Real reviews from Robert's customers on Google.
            </p>
          </div>

        </div>

        {/* Marquee ticker — edge-to-edge */}
          <div className="relative w-full overflow-hidden py-4">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-r from-royal-bg to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-l from-royal-bg to-transparent pointer-events-none" />
            
            <div className="flex items-start w-max animate-marquee hover:[animation-play-state:paused] gap-6 px-3 py-6">
              {[...testimonials, ...testimonials].map((testimonial, idx) => (
                <div key={idx} className="group w-[300px] sm:w-[380px] shrink-0 bg-royal-charcoal p-7 flex flex-col justify-between transition-all duration-500 ease-out border border-royal-border hover:border-royal-gold hover:shadow-[0_8px_30px_rgba(212,175,55,0.1)] hover:-translate-y-2 relative z-10 hover:z-20 cursor-pointer">
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
                          <p className="text-royal-text-muted text-xs font-medium tracking-wide mt-0.5 uppercase">{testimonial.role}</p>
                        </div>
                      </div>
                      <GoogleIcon />
                    </div>

                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-royal-gold text-royal-gold" />
                      ))}
                    </div>

                    <div className="relative transition-all duration-500 ease-in-out overflow-hidden max-h-[190px] sm:max-h-[78px] group-hover:max-h-[300px]">
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
      </section>

      {/* Call to action */}
      <section className="py-14 md:py-20 bg-royal-charcoal border-b border-royal-border-light text-center">
        <div className="max-w-3xl mx-auto px-6">
          <img src="/logo-sm.png" alt="" className="w-14 h-14 object-contain mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-5xl text-white font-bold uppercase tracking-wide mb-4">
            Ready to <span className="text-royal-gold">Get Started?</span>
          </h2>
          <p className="text-gray-200 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
            Give Robert a call, or book a time for him to come take a look.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-royal-gold text-royal-charcoal font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all"
            >
              <Phone className="w-4 h-4" /> Call {BUSINESS.phoneDisplay}
            </a>
            <Link
              to="/booking"
              className="inline-flex items-center justify-center px-10 py-4 border border-royal-gold text-royal-gold font-bold text-sm uppercase tracking-wider hover:bg-royal-gold hover:text-royal-charcoal transition-all"
            >
              Book an Estimate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
