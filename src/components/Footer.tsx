import { RoyalLogo } from './RoyalLogo';

export function Footer() {
  return (
    <footer id="heritage" className="bg-royal-charcoal text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Owner Bio Section */}
          <div className="lg:col-span-3 space-y-6">
            <RoyalLogo light={true} />
            
            <div className="space-y-4">
              <h4 className="text-royal-terracotta text-lg font-bold uppercase tracking-wide">Meet the Owner</h4>
              <p className="text-royal-stone text-sm leading-relaxed max-w-2xl">
                Robert Burlacu has been refining his carpentry expertise for over 15 years as a third-generation woodworker. His interest began at a young age helping his father in the shop, continuing a craft passed down from his grandfather, who ran a cabinet shop in Romania. At Royal Brand Woodworking, client satisfaction, meticulous attention to detail, and timely completions are guaranteed.
              </p>
              <p className="text-royal-stone text-xs italic max-w-2xl">
                Outside the shop, Robert enjoys traveling with his family, exploring the outdoors, and cheering on the Trail Blazers.
              </p>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="lg:col-span-1 space-y-4">
            <h4 className="font-bold text-white tracking-wider uppercase text-sm">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#services" className="text-royal-stone hover:text-white transition-colors">Kitchen Remodeling</a></li>
              <li><a href="#services" className="text-royal-stone hover:text-white transition-colors">Bathroom Vanities</a></li>
              <li><a href="#services" className="text-royal-stone hover:text-white transition-colors">Handmade Furniture</a></li>
              <li><a href="#doors-drawers" className="text-royal-stone hover:text-white transition-colors">Custom Cabinet Doors</a></li>
            </ul>
          </div>
          
          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-4">
            <h4 className="font-bold text-white tracking-wider uppercase text-sm">Contact Us</h4>
            <ul className="space-y-3 text-royal-stone text-sm">
              <li>Robert Burlacu, Owner</li>
              <li><a href="mailto:robertlazau@gmail.com" className="hover:text-white transition-colors">robertlazau@gmail.com</a></li>
              <li><a href="tel:555-0199" className="hover:text-white transition-colors">Workshop: 555-0199</a></li>
              <li className="pt-2">
                <a href="#doors-drawers" className="text-royal-terracotta font-bold hover:text-white transition-colors">Order Online &rarr;</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-royal-stone text-xs">
            &copy; {new Date().getFullYear()} Royal Brand Woodworking. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-royal-stone hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-royal-stone hover:text-white text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
