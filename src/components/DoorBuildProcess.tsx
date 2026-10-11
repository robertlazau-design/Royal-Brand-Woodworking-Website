import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Hammer, 
  ChevronRight, 
  ChevronLeft, 
  Maximize2, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  Compass,
  Wrench,
  Gauge
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProcessStep {
  number: string;
  phase: string;
  title: string;
  station: string;
  primaryImage: string;
  imageAlt: string;
  galleryImages: { src: string; caption: string }[];
  description: string;
  specs: { label: string; value: string }[];
  craftPillar: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    phase: "Material Ingestion & Sizing",
    title: "Rough Milling & Grain Selection",
    station: "DeWalt Precision Chop Station",
    primaryImage: "/photos/web/dewalt-miter-rough-cut.jpg",
    imageAlt: "Crosscutting domestic hardwood stock on DeWalt miter saw",
    galleryImages: [
      { src: "/photos/web/dewalt-miter-rough-cut.jpg", caption: "Rough crosscutting raw domestic hardwood" },
      { src: "/photos/web/crosscutting-lumber.jpg", caption: "Carbide blade cutting stile stock to rough length" },
      { src: "/photos/web/chopping-hardwood-stock.jpg", caption: "Manual stock inspection at chop station" }
    ],
    description: "Every door begins with hand-selecting premium domestic hardwoods (White Oak, Walnut, Hard Maple, or Cherry). We inspect board grain, check moisture content (calibrated to 6–8%), and perform rough crosscuts with generous tolerances before facing.",
    specs: [
      { label: "Grade", value: "FAS Domestic Hardwood" },
      { label: "Moisture Content", value: "6% – 8% Equilibrium" },
      { label: "Tolerances", value: "+1.5\" Rough Sizing" }
    ],
    craftPillar: "Uniform grain direction selected by hand to prevent warping over decades."
  },
  {
    number: "02",
    phase: "Thickness Calibration",
    title: "Industrial Surfacing & Planing",
    station: "Powermatic Stationary Thickness Planer",
    primaryImage: "/photos/web/powermatic-planer-shop.jpg",
    imageAlt: "Craftsman operating yellow Powermatic thickness planer in workshop",
    galleryImages: [
      { src: "/photos/web/powermatic-planer-shop.jpg", caption: "Robert operating the Powermatic planer in the Portland shop" },
      { src: "/photos/web/surfacing-lumber-planer.jpg", caption: "Feeding rough boards for parallel surface calibration" },
      { src: "/photos/web/checking-planed-thickness.jpg", caption: "Digital caliper verification of stile thickness" }
    ],
    description: "Rough stock is brought to our yellow Powermatic stationary planer. Taking light micro-passes across multiple rotations relieves internal board tension and planes each stile and rail to a dead-flat, uniform 3/4\" or 7/8\" reference thickness.",
    specs: [
      { label: "Equipment", value: "Powermatic Industrial Planer" },
      { label: "Tolerance", value: "±0.005\" Parallel Thickness" },
      { label: "Pass Schedule", value: "Multiple Stress-Relief Cuts" }
    ],
    craftPillar: "Eliminating internal wood stress so doors stay straight through four seasons."
  },
  {
    number: "03",
    phase: "Edge Truing & Profiling",
    title: "Continuous Power-Fed Jointing & Shaping",
    station: "Cantek Multi-Roller Power Feeder & Baldor Shaper",
    primaryImage: "/photos/web/cantek-power-feeder-action.jpg",
    imageAlt: "Cantek power feeder advancing stock through shaper",
    galleryImages: [
      { src: "/photos/web/cantek-power-feeder-action.jpg", caption: "Cantek multi-wheel feeder maintaining constant feed rate" },
      { src: "/photos/web/baldor-shaper-trim.jpg", caption: "Baldor high-RPM spindle cutter creating sticking profile" },
      { src: "/photos/web/table-saw-dado-groove.jpg", caption: "Cutting center panel dado channel with Freud carbide blade" }
    ],
    description: "Human hand speed naturally fluctuates, causing machine chatter. We utilize an automated Cantek continuous power feeder over our jointer and shaper tables. This delivers glass-smooth reference edges and crisp architectural Shaker sticking with zero ripple.",
    specs: [
      { label: "Feed System", value: "Cantek Multi-Roller Continuous Feed" },
      { label: "Spindle Rate", value: "8,500 RPM Precision Cutter" },
      { label: "Finish Quality", value: "Zero Chatter / Zero Snipe" }
    ],
    craftPillar: "Mechanically constant pressure ensures identical profiles across every door in your home."
  },
  {
    number: "04",
    phase: "Joinery Architecture",
    title: "Precision 45° Miter & Grooving",
    station: "Dual-Angle Precision Miter Station",
    primaryImage: "/photos/web/dual-miter-cut-action.jpg",
    imageAlt: "Action shot of precision miter cutting on stile",
    galleryImages: [
      { src: "/photos/web/dual-miter-cut-action.jpg", caption: "Simultaneous dual-blade 45.00° angle cut" },
      { src: "/photos/web/miter-grooves-detail.jpg", caption: "Internal grooved biscuit slot for structural reinforcement" },
      { src: "/photos/web/door-components-still-life.jpg", caption: "Disassembled components: panel, profiled stiles, and splines" }
    ],
    description: "Every mitered frame is machined on pneumatic hold-down tables to exact 45.00° geometry. We rout internal spline and biscuit slots along the joint faces, providing massive surface area for structural glue-bonding that will never gap or shear.",
    specs: [
      { label: "Angle Accuracy", value: "45.00° Certified" },
      { label: "Internal Key", value: "Concealed Hardwood Spline / Biscuits" },
      { label: "Panel Dado", value: "Precision Expansion Clearance" }
    ],
    craftPillar: "Interlocking internal hardwood splines give miter joints multi-generational shear strength."
  },
  {
    number: "05",
    phase: "Component Quality Control",
    title: "Cutlist Verification & Pre-Sanding",
    station: "Down-Draft Table & Random Orbital Prep",
    primaryImage: "/photos/web/panel-orbital-sanding.jpg",
    imageAlt: "Random orbital sanding of center panel on downdraft table",
    galleryImages: [
      { src: "/photos/web/panel-orbital-sanding.jpg", caption: "Hand-sanding center panel with pneumatic random orbital sander" },
      { src: "/photos/web/stile-rail-spec-check.jpg", caption: "Checking milled stiles against custom architectural cutlist" },
      { src: "/photos/web/dowel-tap-assembly.jpg", caption: "Dry-fitting internal joinery keys and checking flush corners" }
    ],
    description: "A common flaw in mass-produced doors is unfinished center panel edges that reveal raw wood when humidity drops. We pre-sand all floating panels to 220 grit and dry-fit every frame against the client's cutlist before any adhesive is applied.",
    specs: [
      { label: "Dust Extraction", value: "Down-Draft Perforated Air Vacuum" },
      { label: "Dry Fit Check", value: "100% Tolerance Verification" },
      { label: "Pre-Finish", value: "Beveled Edges Pre-Sanded" }
    ],
    craftPillar: "No unfinished raw edges peek out when the door contracts during dry winter months."
  },
  {
    number: "06",
    phase: "Structural Glue-Up",
    title: "Pneumatic Rack Squaring & Pinning",
    station: "Heavy-Duty Multi-Ram Door Clamp Rack",
    primaryImage: "/photos/web/pneumatic-clamp-rack.jpg",
    imageAlt: "Cabinet door clamped tight in pneumatic door clamp rack",
    galleryImages: [
      { src: "/photos/web/pneumatic-clamp-rack.jpg", caption: "Uniform pneumatic pressure on all 4 axes in dedicated clamp rack" },
      { src: "/photos/web/door-clamp-overview.jpg", caption: "High-angle view of door frame clamped under multi-ton pressure" },
      { src: "/photos/web/pneumatic-fastener-joint.jpg", caption: "Pneumatically pinning the reinforced joint while locked in square" }
    ],
    description: "Assembly happens in our dedicated pneumatic clamping rack. Multi-axis rams apply uniform hydraulic pressure from all sides simultaneously, forcing diagonals into true 90.00° squareness. While under full lock, joints receive reinforced mechanical pins and cure under pressure.",
    specs: [
      { label: "Clamping Rig", value: "Multi-Axis Pneumatic Door Squaring Rack" },
      { label: "Squareness", value: "Corner-to-Corner Diagonal Check ±0.01\"" },
      { label: "Adhesive", value: "Type II Water-Resistant Cross-Linking PVA" }
    ],
    craftPillar: "Equalized pneumatic pressure ensures doors hang true and square without hinge stress."
  },
  {
    number: "07",
    phase: "Surface Finishing & Guarantee",
    title: "Wide-Belt Calibration & Hand Sanding",
    station: "Industrial Wide-Belt Sander & Bench Finishing",
    primaryImage: "/photos/web/hand-sanding-door.jpg",
    imageAlt: "Craftsman hand-inspecting and finish-sanding custom cabinet door",
    galleryImages: [
      { src: "/photos/web/hand-sanding-door.jpg", caption: "Robert hand finish-sanding the Shaker door face to 320 grit" },
      { src: "/photos/web/wide-belt-sander-exit.jpg", caption: "Assembled door exiting industrial wide-belt sander flush" },
      { src: "/photos/web/craftsman-handshake.jpg", caption: "The craftsman handshake — guaranteed quality on every commission" }
    ],
    description: "The cured door passes through an industrial wide-belt sander to calibrate face joints flush. Robert then performs finish sanding by hand up to 320 grit, inspecting every edge and corner with tactile touch before signing off on client delivery.",
    specs: [
      { label: "Machine Sand", value: "Industrial Wide-Belt Flush Calibrator" },
      { label: "Hand Sanding", value: "Feathered 220 to 320 Grit Finish" },
      { label: "Inspection", value: "Owner Signed & Handshake Guarantee" }
    ],
    craftPillar: "Silky-smooth touch ready for premium conversion varnish or fine hand-rubbed oil."
  }
];

export function DoorBuildProcess() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const currentStep = PROCESS_STEPS[activeStepIndex];

  const handleStepChange = (idx: number) => {
    setActiveStepIndex(idx);
    setSelectedImageIndex(0);
  };

  const handlePrev = () => {
    if (activeStepIndex > 0) {
      handleStepChange(activeStepIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeStepIndex < PROCESS_STEPS.length - 1) {
      handleStepChange(activeStepIndex + 1);
    }
  };

  return (
    <section id="craft-process" className="py-24 bg-royal-bg text-white relative overflow-hidden border-b border-royal-border-light">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-royal-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-royal-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 text-royal-gold mb-3">
            <div className="w-10 h-[1px] bg-royal-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Documented In Our Shop · The 7-Step Process
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight uppercase">
                Built From <span className="text-royal-gold">Scratch.</span>
              </h2>
              <p className="text-royal-text-muted text-base md:text-lg font-light mt-3 max-w-2xl leading-relaxed">
                Step inside our Portland workshop. Follow the real, chronological journey of a custom shaker door — from raw FAS hardwood to hand-sanded architectural perfection.
              </p>
            </div>

            {/* Quick stats badge */}
            <div className="flex items-center gap-4 bg-royal-charcoal border border-royal-border px-5 py-3">
              <div className="w-8 h-8 rounded-full border border-royal-gold/40 flex items-center justify-center text-royal-gold font-serif text-sm font-bold">
                7
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-white font-semibold">Precision Milestones</p>
                <p className="text-[11px] text-royal-text-muted">100% In-House Portland Milling</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step Navigation Pill Carousel / Bar */}
        <div className="mb-10 overflow-x-auto pb-3 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max border-b border-royal-border-light pb-4">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              return (
                <button
                  key={step.number}
                  onClick={() => handleStepChange(idx)}
                  className={`group flex items-center gap-3 px-4 py-2.5 transition-all duration-300 border text-left cursor-pointer ${
                    isActive
                      ? 'bg-royal-charcoal border-royal-gold text-white shadow-[0_0_20px_rgba(201,164,122,0.15)]'
                      : 'bg-transparent border-royal-border/60 text-royal-text-muted hover:text-white hover:border-royal-gold/50'
                  }`}
                >
                  <span className={`font-serif text-sm font-bold ${isActive ? 'text-royal-gold' : 'text-royal-text-muted group-hover:text-royal-gold'}`}>
                    {step.number}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-[0.15em] font-bold opacity-60">Phase {idx + 1}</span>
                    <span className="text-xs font-semibold whitespace-nowrap">{step.title}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Visual Showcase (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative aspect-[16/10] bg-royal-charcoal border border-royal-border overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${currentStep.number}-${selectedImageIndex}`}
                  src={currentStep.galleryImages[selectedImageIndex]?.src || currentStep.primaryImage}
                  alt={currentStep.galleryImages[selectedImageIndex]?.caption || currentStep.imageAlt}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </AnimatePresence>

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-royal-bg via-transparent to-transparent pointer-events-none opacity-80" />

              {/* Station Tag */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="bg-royal-bg/90 backdrop-blur-md border border-royal-border text-royal-gold text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 flex items-center gap-1.5">
                  <Gauge className="w-3 h-3 text-royal-gold" />
                  {currentStep.station}
                </span>
              </div>

              {/* Image Caption Bar */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs bg-royal-bg/85 backdrop-blur-md border border-royal-border px-4 py-2.5">
                <span className="text-royal-text font-medium truncate">
                  {currentStep.galleryImages[selectedImageIndex]?.caption}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-royal-gold shrink-0 ml-3">
                  Photo {selectedImageIndex + 1} of {currentStep.galleryImages.length}
                </span>
              </div>
            </div>

            {/* Sub-photo Thumbnails Row */}
            <div className="grid grid-cols-3 gap-3 mt-3">
              {currentStep.galleryImages.map((img, i) => {
                const isSelected = selectedImageIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`relative aspect-[16/10] overflow-hidden border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-royal-gold ring-1 ring-royal-gold'
                        : 'border-royal-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img.src} 
                      alt={img.caption} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Narrative & Technical Specifications (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-royal-charcoal border border-royal-border p-6 md:p-8 relative">
            {/* Top gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-royal-gold via-royal-gold/60 to-transparent" />

            <div>
              {/* Phase header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-royal-gold text-[10px] font-bold uppercase tracking-[0.25em]">
                  Phase {currentStep.number} · {currentStep.phase}
                </span>
                <span className="text-royal-text-muted text-xs font-mono">
                  0{activeStepIndex + 1} / 0{PROCESS_STEPS.length}
                </span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white uppercase tracking-wide mb-4">
                {currentStep.title}
              </h3>

              <p className="text-royal-text-muted font-light leading-relaxed text-sm md:text-base mb-6">
                {currentStep.description}
              </p>

              {/* Craft Pillar Quote */}
              <div className="border-l-2 border-royal-gold pl-4 py-1.5 my-6 bg-royal-bg/50">
                <p className="text-xs italic text-royal-gold/90 font-light leading-relaxed">
                  "{currentStep.craftPillar}"
                </p>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="bg-royal-bg border border-royal-border p-4 mb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-gold mb-3 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  Technical Standards
                </p>
                <div className="space-y-2.5">
                  {currentStep.specs.map((spec, i) => (
                    <div key={i} className="flex items-center justify-between text-xs border-b border-royal-border-light pb-2 last:border-b-0 last:pb-0">
                      <span className="text-royal-text-muted">{spec.label}</span>
                      <span className="text-white font-medium font-mono text-[11px]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Controls & Navigation */}
            <div className="pt-6 border-t border-royal-border-light flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handlePrev}
                  disabled={activeStepIndex === 0}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 px-4 py-2.5 border text-xs font-bold uppercase tracking-wider transition-all ${
                    activeStepIndex === 0
                      ? 'border-royal-border text-royal-text-muted/40 cursor-not-allowed'
                      : 'border-royal-border text-white hover:border-royal-gold hover:text-royal-gold cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeStepIndex === PROCESS_STEPS.length - 1}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 px-4 py-2.5 border text-xs font-bold uppercase tracking-wider transition-all ${
                    activeStepIndex === PROCESS_STEPS.length - 1
                      ? 'border-royal-border text-royal-text-muted/40 cursor-not-allowed'
                      : 'border-royal-border text-white hover:border-royal-gold hover:text-royal-gold cursor-pointer'
                  }`}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <Link
                to="/estimator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-royal-gold text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all shadow-[0_0_15px_rgba(201,164,122,0.2)]"
              >
                Order Custom Doors
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

        {/* Bottom Proof Strip */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-royal-border-light">
          <div className="flex items-start gap-4 p-5 bg-royal-charcoal/50 border border-royal-border">
            <div className="w-10 h-10 rounded-full border border-royal-gold/40 flex items-center justify-center text-royal-gold shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-white mb-1">True Solid Wood</h4>
              <p className="text-xs text-royal-text-muted font-light leading-relaxed">
                No foam cores or thin vinyl wraps. Premium FAS domestic hardwoods surfaced and milled in Portland.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-royal-charcoal/50 border border-royal-border">
            <div className="w-10 h-10 rounded-full border border-royal-gold/40 flex items-center justify-center text-royal-gold shrink-0">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-white mb-1">Pneumatic Squaring</h4>
              <p className="text-xs text-royal-text-muted font-light leading-relaxed">
                Assembled under multi-axis pneumatic rack pressure to ensure 90° corners that never rack or bind.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-royal-charcoal/50 border border-royal-border">
            <div className="w-10 h-10 rounded-full border border-royal-gold/40 flex items-center justify-center text-royal-gold shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-white mb-1">3rd Generation Standard</h4>
              <p className="text-xs text-royal-text-muted font-light leading-relaxed">
                Every door is inspected by owner Robert Burlacu with a master craftsman handshake guarantee.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
