import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, CheckCircle2, ChevronRight, Info, Layers } from 'lucide-react';

interface Hotspot {
  id: string;
  x: string;
  y: string;
  title: string;
  spec: string;
  mappedService: string;
}

interface ServiceTab {
  id: string;
  tabLabel: string;
  imageSrc: string;
  imageAlt: string;
  hotspots: Hotspot[];
}

const ANATOMY_DATA: ServiceTab[] = [
  {
    id: "handmade-furniture",
    tabLabel: "Fine Handmade Furniture",
    imageSrc: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80", 
    imageAlt: "Macro view of walnut drawer box in custom frame",
    hotspots: [
      {
        id: "hs-1",
        x: "28%",
        y: "42%",
        title: "Blind Dovetail Joinery",
        spec: "Solid 3/4\" Hard Maple. Precision-cut interlocking joints engineered for structural durability without visible mechanical fasteners.",
        mappedService: "Fine Handmade Furniture & Cabinetry"
      },
      {
        id: "hs-2",
        x: "64%",
        y: "30%",
        title: "Multi-Stage Conversion Varnish",
        spec: "Hand-sanded to 320 grit, sealed, and finished with a water-resistant conversion varnish. Impervious to moisture and daily wear.",
        mappedService: "Surface Protection Standard"
      },
      {
        id: "hs-3",
        x: "75%",
        y: "78%",
        title: "Concealed Heavy-Duty Hardware",
        spec: "Integrated 110-degree 3D adjustable soft-close hardware rated for up to 100 lbs per drawer unit.",
        mappedService: "Shelving, Storage & Built-Ins"
      }
    ]
  },
  {
    id: "bathroom-vanities",
    tabLabel: "Bathroom Vanities",
    imageSrc: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Macro view of sealed vanity base and plumbing joinery",
    hotspots: [
      {
        id: "hs-4",
        x: "40%",
        y: "55%",
        title: "Moisture-Barrier Sealant Architecture",
        spec: "End-grain encapsulation preventing humidity absorption and warping in high-moisture environments.",
        mappedService: "Bathroom Vanities"
      },
      {
        id: "hs-5",
        x: "68%",
        y: "35%",
        title: "Custom Plumbing Accommodation",
        spec: "Precision-routed interior drawer scoops and back-panel chaseways designed to conceal plumbing while maximizing usable storage.",
        mappedService: "Custom Fit & Installation"
      }
    ]
  },
  {
    id: "custom-kitchens",
    tabLabel: "Custom Kitchen Cabinets",
    imageSrc: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Custom kitchen cabinetry detail",
    hotspots: [
      {
        id: "hs-6",
        x: "35%",
        y: "45%",
        title: "1-Inch Solid Wood Face Frames",
        spec: "Pocket-screwed and glued face frames providing rigid structural integrity that prevents sagging over decades of heavy use.",
        mappedService: "Custom Kitchen Cabinets"
      }
    ]
  },
  {
    id: "built-ins",
    tabLabel: "Built-Ins",
    imageSrc: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Custom built-in shelving detail",
    hotspots: [
      {
        id: "hs-7",
        x: "50%",
        y: "50%",
        title: "Scribe-to-Wall Precision Fit",
        spec: "Custom extended stiles hand-scribed on-site to match exact room contours and uneven walls for a seamless, built-in aesthetic.",
        mappedService: "Architectural Built-Ins"
      }
    ]
  },
  {
    id: "doors-fronts",
    tabLabel: "Custom Doors & Fronts",
    imageSrc: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Custom cabinet door detail",
    hotspots: [
      {
        id: "hs-8",
        x: "45%",
        y: "40%",
        title: "5-Piece Cope and Stick Construction",
        spec: "Engineered panel expansion tolerances that eliminate hairline paint cracking during seasonal humidity shifts.",
        mappedService: "Custom Doors & Drawer Fronts"
      }
    ]
  }
];

export function AnatomyOfDetail() {
  const [activeTab, setActiveTab] = useState<ServiceTab>(ANATOMY_DATA[0]);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const handleTabChange = (tab: ServiceTab) => {
    setActiveTab(tab);
    setActiveHotspot(null);
  };

  return (
    <section className="py-24 bg-[#0F0F0F] text-white min-h-screen border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-4 text-[#D4AF37] mb-4">
                <div className="w-12 h-[1px] bg-[#D4AF37]" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase"><Layers className="w-4 h-4 inline-block mr-2 -mt-0.5" />Craftsmanship</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-[#D4AF37] font-bold tracking-widest uppercase">
                The Anatomy of Detail
              </h2>
            </div>
            <p className="text-gray-400 text-sm md:text-base font-light max-w-md">
              Explore the structural standards applied across every custom project.
            </p>
          </div>
        </div>

        {/* Interactive Stage */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          
          {/* Left Canvas (65%) */}
          <div className="w-full lg:w-[65%] h-[500px] md:h-[600px] relative overflow-hidden rounded-xl border border-white/10 bg-black group">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeTab.id}
                src={activeTab.imageSrc}
                alt={activeTab.imageAlt}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
            </AnimatePresence>
            
            {/* Gradient Overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Hotspots */}
            <AnimatePresence mode="popLayout">
              {activeTab.hotspots.map((hotspot) => {
                const isActive = activeHotspot?.id === hotspot.id;
                return (
                  <motion.button
                    key={hotspot.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute z-20 group/pin"
                    style={{ left: hotspot.x, top: hotspot.y, transform: 'translate(-50%, -50%)' }}
                    onClick={() => setActiveHotspot(hotspot)}
                    aria-label={`Inspect ${hotspot.title}`}
                  >
                    <motion.div 
                      className={`relative flex items-center justify-center transition-all duration-300 ${isActive ? 'scale-125' : 'hover:scale-125'}`}
                    >
                      {/* Outer Ring */}
                      <div className={`absolute w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-[#D4AF37]/50 border border-white' : 'bg-[#D4AF37]/30 border border-transparent'}`}>
                        {/* Pulsing effect if not active/hovered */}
                        {!isActive && (
                          <div className="absolute inset-0 rounded-full bg-[#D4AF37] animate-ping opacity-30 group-hover/pin:animate-none" />
                        )}
                      </div>
                      
                      {/* Inner Dot */}
                      <div className={`w-3 h-3 rounded-full shadow-lg transition-colors duration-300 z-10 ${isActive ? 'bg-white' : 'bg-[#D4AF37]'}`} />
                    </motion.div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Right Panel (35%) */}
          <div className="w-full lg:w-[35%]">
            <div className="bg-[#181818] border border-white/10 rounded-xl p-8 flex flex-col justify-between h-[300px] lg:h-full sticky top-24 shadow-2xl">
              <AnimatePresence mode="wait">
                {activeHotspot ? (
                  <motion.div 
                    key={activeHotspot.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-5 h-5 text-[#D4AF37]" />
                        <h3 className="text-xl font-bold text-white uppercase tracking-wider leading-tight">{activeHotspot.title}</h3>
                      </div>
                      <div className="w-full h-[1px] bg-white/10 mb-6" />
                      <p className="text-gray-300 text-sm leading-relaxed font-light">
                        {activeHotspot.spec}
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-6">
                      <div className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 px-4 py-2 rounded-full text-xs font-mono w-max flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {activeHotspot.mappedService}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4"
                  >
                    <Info className="w-10 h-10 opacity-50" />
                    <p className="text-sm font-light max-w-[200px]">
                      Select a marker on the specimen to inspect joinery, finishing, and hardware tolerances.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-8">
          {ANATOMY_DATA.map((tab) => {
            const isSelected = activeTab.id === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  isSelected 
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                    : 'bg-transparent text-gray-400 border-white/10 hover:border-[#D4AF37]/50 hover:text-white'
                }`}
              >
                {tab.tabLabel}
                {isSelected && <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
