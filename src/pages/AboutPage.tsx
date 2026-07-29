import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Hammer, Users } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="w-full bg-[#0F0F0F] text-white min-h-screen">
      {/* Header Section */}
      <section className="pt-24 pb-16 px-4 md:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 text-[#D4AF37] mb-4">
            <div className="w-12 h-[1px] bg-[#D4AF37]" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
              <Users className="w-4 h-4 inline-block mr-2 -mt-0.5" />
              Meet the Owner
            </span>
            <div className="w-12 h-[1px] bg-[#D4AF37]" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-[#D4AF37] font-bold tracking-widest uppercase mb-6">
            Our Heritage
          </h1>
          <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto">
            A legacy of craftsmanship passed down through generations.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Bio */}
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-bold text-white uppercase tracking-wider mb-8">
                Robert Burlacu
              </h2>
              <p className="text-gray-300 font-light leading-relaxed">
                Robert has been refining his carpentry expertise for over 15 years as a third-generation woodworker. His interest began at a young age helping his father in the shop, continuing a craft passed down from his grandfather, who ran a cabinet shop in Romania.
              </p>
              <p className="text-gray-300 font-light leading-relaxed">
                At Royal Brand Woodworking, client satisfaction, meticulous attention to detail, and timely completions are guaranteed. Every project is approached with the same dedication to quality that has defined our family's work for decades.
              </p>
              <p className="text-gray-400 text-sm font-light italic pt-4 border-t border-white/10">
                Outside the shop, Robert enjoys traveling with his family, exploring the outdoors, and cheering on the Trail Blazers.
              </p>
              
              <div className="pt-6">
                <Link 
                  to="/estimator" 
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-[#D4AF37] text-black font-bold text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                >
                  Work With Us
                </Link>
              </div>
            </div>

            {/* Images Placeholder */}
            <div className="space-y-6">
              <div className="aspect-[4/3] bg-[#181818] border border-white/10 rounded-xl overflow-hidden relative group">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                  <Hammer className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-sm font-light uppercase tracking-widest text-center px-6">
                    [ Placeholder for 3rd Generation / Robert working ]
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                 <div className="aspect-square bg-[#181818] border border-white/10 rounded-xl overflow-hidden relative group">
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                     <MapPin className="w-8 h-8 mb-3 opacity-50" />
                     <p className="text-xs font-light uppercase tracking-widest text-center px-4">
                       [ 2nd Generation / Father's Shop ]
                     </p>
                   </div>
                 </div>
                 <div className="aspect-square bg-[#181818] border border-white/10 rounded-xl overflow-hidden relative group">
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                     <Users className="w-8 h-8 mb-3 opacity-50" />
                     <p className="text-xs font-light uppercase tracking-widest text-center px-4">
                       [ 1st Generation / Grandfather in Romania ]
                     </p>
                   </div>
                 </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
