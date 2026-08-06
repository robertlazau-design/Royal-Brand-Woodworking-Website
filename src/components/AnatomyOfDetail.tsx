import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, CheckCircle2, ChevronRight, Info, Layers, Armchair, Bath, Home, DoorOpen } from 'lucide-react';

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
  description: string;
  icon: React.ReactNode;
  hotspots: Hotspot[];
}

const ANATOMY_DATA: ServiceTab[] = [
  {
    id: "handmade-furniture",
    tabLabel: "Fine Handmade Furniture",
    imageSrc: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80", 
    imageAlt: "Macro view of walnut drawer box in custom frame",
    description: "Bespoke tables, desks, and credenzas built from premium hardwoods with traditional joinery techniques.",
    icon: <Armchair className="w-4 h-4" />,
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
    description: "Moisture-resistant vanities engineered for humidity, custom-fit to your bathroom's exact dimensions.",
    icon: <Bath className="w-4 h-4" />,
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
    description: "Full kitchen cabinet systems with premium face frames, soft-close everything, and flawless finishing.",
    icon: <Home className="w-4 h-4" />,
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
    description: "Wall-to-wall built-in solutions hand-scribed on-site for a seamless, architectural finish.",
    icon: <Layers className="w-4 h-4" />,
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
    imageAlt: "Custom door detail",
    description: "Precision-milled doors and drawer fronts in Shaker, Raised Panel, and Beveled Edge profiles.",
    icon: <DoorOpen className="w-4 h-4" />,
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
    <section className="py-24 bg-royal-bg text-white min-h-screen border-b border-royal-border-light">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="mb-14 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-4 text-royal-gold mb-4">
                <div className="w-12 h-[1px] bg-royal-gold" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase"><Layers className="w-4 h-4 inline-block mr-2 -mt-0.5" />Craftsmanship</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-widest uppercase">
                The Anatomy of <span className="text-royal-gold">Detail</span>
              </h2>
            </div>
            <p className="text-royal-text-muted text-sm md:text-base font-light max-w-md">
              Explore the structural standards applied across every custom project. Click the markers to inspect details.
            </p>
          </div>
        </div>

        {/* Interactive Stage */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          
          {/* Left Canvas (65%) */}
          <div className="w-full lg:w-[65%] h-[500px] md:h-[600px] relative overflow-hidden border border-royal-border bg-royal-charcoal group">
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
            <div className="absolute inset-0 bg-gradient-to-t from-royal-bg/60 via-transparent to-transparent pointer-events-none" />

            {/* Active tab label */}
            <div className="absolute bottom-4 left-4 z-10">
              <span className="text-royal-gold text-[9px] font-bold uppercase tracking-[0.2em] bg-royal-bg/80 backdrop-blur-sm px-3 py-1.5 border border-royal-border">
                {activeTab.tabLabel}
              </span>
            </div>

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
                      <div className={`absolute w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-royal-gold/50 border border-white' : 'bg-royal-gold/30 border border-transparent'}`}>
                        {/* Pulsing effect if not active/hovered */}
                        {!isActive && (
                          <div className="absolute inset-0 rounded-full bg-royal-gold animate-ping opacity-30 group-hover/pin:animate-none" />
                        )}
                      </div>
                      
                      {/* Inner Dot */}
                      <div className={`w-3 h-3 rounded-full shadow-lg transition-colors duration-300 z-10 ${isActive ? 'bg-white' : 'bg-royal-gold'}`} />
                    </motion.div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Right Panel (35%) */}
          <div className="w-full lg:w-[35%]">
            <div className="bg-royal-charcoal border border-royal-border p-8 flex flex-col justify-between h-[300px] lg:h-full sticky top-24 shadow-2xl overflow-hidden">
              {/* Gold top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-royal-gold via-royal-gold/50 to-transparent" />

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
                        <MapPin className="w-5 h-5 text-royal-gold" />
                        <h3 className="text-xl font-bold text-white uppercase tracking-wider leading-tight">{activeHotspot.title}</h3>
                      </div>
                      <div className="w-full h-[1px] bg-royal-border mb-6" />
                      <p className="text-royal-text-muted text-sm leading-relaxed font-light">
                        {activeHotspot.spec}
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-6">
                      <div className="bg-royal-gold/10 text-royal-gold border border-royal-gold/20 px-4 py-2.5 text-xs font-bold w-max flex items-center gap-2 uppercase tracking-wider">
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
                    className="flex flex-col items-center justify-center h-full text-center text-royal-text-muted space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full border border-royal-border flex items-center justify-center">
                      <Info className="w-8 h-8 opacity-30" />
                    </div>
                    <p className="text-sm font-light max-w-[220px] leading-relaxed">
                      Select a marker on the image to inspect joinery, finishing, and hardware tolerances.
                    </p>
                    <div className="flex items-center gap-2 text-royal-gold text-[10px] uppercase tracking-widest font-bold">
                      <div className="w-2 h-2 rounded-full bg-royal-gold animate-pulse" />
                      {activeTab.hotspots.length} inspection {activeTab.hotspots.length === 1 ? 'point' : 'points'}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Tab description */}
        <div className="mb-8 text-center">
          <p className="text-royal-text-muted text-sm font-light italic max-w-lg mx-auto">{activeTab.description}</p>
        </div>

        {/* Bottom Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
          {ANATOMY_DATA.map((tab) => {
            const isSelected = activeTab.id === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab)}
                className={`flex items-center gap-2.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  isSelected 
                    ? 'bg-royal-gold text-white border-royal-gold shadow-[0_0_20px_rgba(201,164,122,0.2)]' 
                    : 'bg-transparent text-royal-text-muted border-royal-border hover:border-royal-gold/50 hover:text-white'
                }`}
              >
                <span className={`transition-colors ${isSelected ? 'text-white' : 'text-royal-gold'}`}>{tab.icon}</span>
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
