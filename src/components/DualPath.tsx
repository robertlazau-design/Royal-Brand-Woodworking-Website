import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, Mail, PhoneCall, Plus, Trash2, ArrowRight } from 'lucide-react';

interface QuoteItem {
  id: string;
  type: 'doors' | 'drawers';
  woodSpecies: string;
  height: number;
  width: number;
  thickness: string;
  quantity: number;
  profileStyle: string;
  preBored: 'yes' | 'no';
  notes: string;
  estimatedPrice: number;
}

const woodColors: Record<string, { base: string; mid: string; dark: string; grain: string }> = {
  'Classic White': { base: '#f7f6f2', mid: '#faf9f5', dark: '#e4e2dd', grain: '#f7f6f2' },
  'Oatmeal Cream': { base: '#e4decb', mid: '#ece6d4', dark: '#d5cfba', grain: '#e4decb' },
  'Slate Gray': { base: '#5b6167', mid: '#6b7278', dark: '#4b5055', grain: '#5b6167' },
  'Charcoal Black': { base: '#252627', mid: '#353638', dark: '#151617', grain: '#252627' },
  'Navy Blue': { base: '#1b2d42', mid: '#283c54', dark: '#101d2c', grain: '#1b2d42' },
  'Forest Green': { base: '#2b3e34', mid: '#394f43', dark: '#1c2b22', grain: '#2b3e34' },
  'Mahogany Red': { base: '#722615', mid: '#862d19', dark: '#5b1d0d', grain: '#722615' },
  'Raw MDF': { base: '#d4bea0', mid: '#dfcfb7', dark: '#c6ad8a', grain: '#b59a76' },
  'Other (Custom Color)': { base: '#9aa097', mid: '#abaea6', dark: '#888f85', grain: '#9aa097' },
};

const calculateItemPrice = (
  type: 'doors' | 'drawers',
  wood: string,
  h: number,
  w: number,
  style: string,
  preBored: string
) => {
  const base = type === 'doors' ? 35 : 25;
  const area = h * w;
  const sizeFactor = area * 0.14; // Cost per square inch
  
  let finishMultiplier = 1.0;
  const matchColor = wood.startsWith('Other') ? 'Other (Custom Color)' : wood;
  switch (matchColor) {
    case 'Classic White': finishMultiplier = 1.1; break;
    case 'Oatmeal Cream': finishMultiplier = 1.1; break;
    case 'Slate Gray': finishMultiplier = 1.2; break;
    case 'Charcoal Black': finishMultiplier = 1.2; break;
    case 'Navy Blue': finishMultiplier = 1.25; break;
    case 'Forest Green': finishMultiplier = 1.25; break;
    case 'Mahogany Red': finishMultiplier = 1.3; break;
    case 'Raw MDF': finishMultiplier = 0.85; break;
    case 'Other (Custom Color)': finishMultiplier = 1.4; break;
  }

  let profileCost = 0;
  switch (style) {
    case 'Classic Shaker': profileCost = 5; break;
    case 'Raised Panel': profileCost = 10; break;
    case 'Beveled Edge': profileCost = 3; break;
  }

  const hingeCost = (type === 'doors' && preBored === 'yes') ? 4 : 0;

  return Math.round((base + sizeFactor) * finishMultiplier + profileCost + hingeCost);
};

export function DualPath() {
  const [selectedPath, setSelectedPath] = useState<'doors' | 'drawers' | null>('doors');
  
  // Spec fields
  const [woodSpecies, setWoodSpecies] = useState('Classic White');
  const [customColor, setCustomColor] = useState('');
  const [height, setHeight] = useState('30');
  const [width, setWidth] = useState('18');
  const [thickness, setThickness] = useState('0.75');
  const [quantity, setQuantity] = useState('1');
  const [profileStyle, setProfileStyle] = useState('Classic Shaker');
  const [preBored, setPreBored] = useState('no');
  const [notes, setNotes] = useState('');
  
  // Basket list of items
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  
  // Client details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAddItem = (e: React.MouseEvent) => {
    e.preventDefault();
    const hVal = parseFloat(height);
    const wVal = parseFloat(width);
    const qVal = parseInt(quantity);
    
    if (!woodSpecies || !height || !width || !quantity || !profileStyle) {
      alert("Please fill out all required color, dimension, and profile specifications.");
      return;
    }
    
    if (isNaN(hVal) || hVal <= 0 || isNaN(wVal) || wVal <= 0 || isNaN(qVal) || qVal <= 0) {
      alert("Please enter valid height, width, and quantity measurements.");
      return;
    }

    const displayColor = woodSpecies === 'Other (Custom Color)'
      ? `Other: ${customColor.trim() || 'Custom Finish'}`
      : woodSpecies;

    const price = calculateItemPrice(
      selectedPath || 'doors',
      displayColor,
      hVal,
      wVal,
      profileStyle,
      preBored
    );

    const newItem: QuoteItem = {
      id: Date.now().toString(),
      type: 'doors',
      woodSpecies: displayColor,
      height: hVal,
      width: wVal,
      thickness,
      quantity: qVal,
      profileStyle,
      preBored: preBored as 'yes' | 'no',
      notes,
      estimatedPrice: price * qVal
    };

    setQuoteItems([...quoteItems, newItem]);
    
    // Clear item specs but keep path/wood/profile to make multi-entry faster
    setHeight('');
    setWidth('');
    setQuantity('1');
    setNotes('');
  };

  const handleRemoveItem = (id: string) => {
    setQuoteItems(quoteItems.filter(item => item.id !== id));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quoteItems.length === 0) {
      alert("Please add at least one cabinet door or drawer front to your quote list first.");
      return;
    }
    if (!name || !email || !phone) {
      alert("Please fill out all client contact details.");
      return;
    }
    
    setIsSubmitted(true);
    
    // Format quote items for ASCII table
    const tableHeader = `========================================================================\n` +
                        `QTY | TYPE     | MATERIAL                 | STYLE          | DIMS (H x W x T)      | HINGES | EST. PRICE\n` +
                        `========================================================================`;
    const tableRows = quoteItems.map(item => {
      const typeStr = item.type === 'doors' ? 'Door' : 'Drawer';
      const specLine = `${item.quantity.toString().padEnd(3)} | ` +
                       `${typeStr.padEnd(8)} | ` +
                       `${item.woodSpecies.substring(0, 24).padEnd(24)} | ` +
                       `${item.profileStyle.substring(0, 14).padEnd(14)} | ` +
                       `${(item.height + '" x ' + item.width + '" x ' + (item.thickness === '0.75' ? '3/4"' : item.thickness === '0.875' ? '7/8"' : '1"')).padEnd(21)} | ` +
                       `${(item.preBored === 'yes' ? 'Yes' : 'No').padEnd(6)} | ` +
                       `$${item.estimatedPrice}`;
      const noteLine = item.notes ? `    ↳ Note: ${item.notes}` : '';
      return noteLine ? `${specLine}\n${noteLine}` : specLine;
    }).join('\n');
    
    const subtotal = quoteItems.reduce((acc, curr) => acc + curr.estimatedPrice, 0);
    const tableFooter = `========================================================================\n` +
                        `TOTAL ESTIMATED ITEMS: ${quoteItems.reduce((acc, curr) => acc + curr.quantity, 0)}\n` +
                        `ESTIMATED BATCH SUBTOTAL: $${subtotal}\n` +
                        `* Final material pricing and shipping to be finalized by Robert.\n` +
                        `========================================================================`;
    
    const bodyText = `Hello Robert,\n\n` +
      `I would like to request a custom woodworking quote for the following project items:\n\n` +
      `${tableHeader}\n` +
      `${tableRows}\n` +
      `${tableFooter}\n\n` +
      `CLIENT CONTACT DETAILS:\n` +
      `- Name: ${name}\n` +
      `- Email: ${email}\n` +
      `- Phone: ${phone}\n\n` +
      `Please review my custom list and call me to finish the deal.\n\n` +
      `Thank you!`;

    const subject = encodeURIComponent(`Royal Brand Woodworking - Custom Quote List for ${name}`);
    const body = encodeURIComponent(bodyText);
    
    window.location.href = `mailto:robertlazau@gmail.com?subject=${subject}&body=${body}`;
  };

  // Setup Visualizer dimensions
  const hVal = parseFloat(height) || 30;
  const wVal = parseFloat(width) || 18;
  const maxH = 240;
  const maxW = 200;
  
  // Calculate relative scaled dimensions
  const scale = Math.min(maxW / wVal, maxH / hVal);
  const drawW = wVal * scale;
  const drawH = hVal * scale;
  const x = (maxW - drawW) / 2 + 40;
  const y = (maxH - drawH) / 2 + 40;
  
  const selectedWoodColor = woodColors[woodSpecies] || woodColors['Classic White'];
  const totalSubtotal = quoteItems.reduce((acc, curr) => acc + curr.estimatedPrice, 0);

  // Profile-specific frame inset sizing
  const frameInset = Math.min(14, drawW * 0.16, drawH * 0.16);
  const raisedPanelInset = frameInset * 1.35;

  return (
    <section id="doors-drawers" className="py-24 bg-royal-bg border-b border-royal-border-light relative text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 text-royal-gold mb-4">
            <div className="w-12 h-[1px] bg-royal-gold" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Interactive Estimator</span>
            <div className="w-12 h-[1px] bg-royal-gold" />
          </div>
          
          <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-6 tracking-wide uppercase">
            Custom Cabinet Ordering
          </h2>
          
          <p className="text-royal-text-muted text-sm md:text-base font-light">
            Configure custom doors and drawer fronts built in our shop. Use our live previewer, add multiple dimensions to your list, and instantly draft a quote. Robert will call you to finalize grain patterns, shipping, and finish the deal.
          </p>
        </div>

        {!isSubmitted ? (
          <div className="space-y-12">
            {/* Visualizer & Configuration Section */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive Live Previewer */}
              <div className="lg:col-span-5 bg-royal-charcoal p-8 rounded-none border border-royal-border shadow-md flex flex-col justify-between self-stretch">
                <div>
                  <h4 className="font-sans text-sm font-bold text-royal-gold uppercase tracking-[0.15em] mb-6 text-center">
                    Live Dimension Previewer
                  </h4>
                  
                  <div className="relative w-full h-[320px] bg-royal-cream/40 rounded-lg flex items-center justify-center overflow-hidden border border-royal-stone/10 mb-6">
                    <svg width="100%" height="100%" className="max-w-[280px] max-h-[300px]">
                      <defs>
                        <linearGradient id="wood-base-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor={selectedWoodColor.base} />
                          <stop offset="50%" stopColor={selectedWoodColor.mid} />
                          <stop offset="100%" stopColor={selectedWoodColor.dark} />
                        </linearGradient>
                        <pattern id="grain-pattern" width="80" height="200" patternUnits="userSpaceOnUse" patternTransform="rotate(4)">
                          <path d="M5,0 C15,30 8,65 5,100 C2,135 12,170 5,200" fill="none" stroke={selectedWoodColor.grain} strokeWidth="0.75" opacity="0.18" />
                          <path d="M25,0 C20,50 35,110 25,150 C15,190 22,200 25,200" fill="none" stroke={selectedWoodColor.grain} strokeWidth="1" opacity="0.12" />
                          <path d="M55,0 C65,40 45,95 55,140 C65,175 58,200 55,200" fill="none" stroke={selectedWoodColor.grain} strokeWidth="0.6" opacity="0.18" />
                          <path d="M75,0 C70,60 80,130 75,200" fill="none" stroke={selectedWoodColor.grain} strokeWidth="0.8" opacity="0.14" />
                          {/* Grain whorl */}
                          <path d="M26,60 Q32,70 26,80" fill="none" stroke={selectedWoodColor.grain} strokeWidth="0.75" opacity="0.22" />
                          <path d="M23,55 Q35,70 23,85" fill="none" stroke={selectedWoodColor.grain} strokeWidth="0.5" opacity="0.15" />
                        </pattern>
                      </defs>

                      {/* Main Door Slab */}
                      <rect 
                        x={x} 
                        y={y} 
                        width={drawW} 
                        height={drawH} 
                        fill="url(#wood-base-grad)" 
                        stroke="rgba(0,0,0,0.3)" 
                        strokeWidth="1.5" 
                        rx="1"
                        className="transition-all duration-300"
                      />
                      
                      {/* Grain Overlay */}
                      <rect 
                        x={x} 
                        y={y} 
                        width={drawW} 
                        height={drawH} 
                        fill="url(#grain-pattern)" 
                        pointerEvents="none" 
                        className="transition-all duration-300"
                      />

                      {/* Style overlays */}
                      {profileStyle === 'Classic Shaker' && (
                        <>
                          <rect 
                            x={x + frameInset} 
                            y={y + frameInset} 
                            width={drawW - 2 * frameInset} 
                            height={drawH - 2 * frameInset} 
                            fill="url(#wood-base-grad)" 
                            filter="brightness(0.9)" 
                            stroke="rgba(0,0,0,0.25)" 
                            strokeWidth="1.5"
                            className="transition-all duration-300"
                          />
                          <rect 
                            x={x + frameInset} 
                            y={y + frameInset} 
                            width={drawW - 2 * frameInset} 
                            height={drawH - 2 * frameInset} 
                            fill="url(#grain-pattern)" 
                            opacity="0.6"
                            className="transition-all duration-300"
                          />
                        </>
                      )}

                      {profileStyle === 'Raised Panel' && (
                        <>
                          {/* Inner Bevel frame */}
                          <rect 
                            x={x + frameInset} 
                            y={y + frameInset} 
                            width={drawW - 2 * frameInset} 
                            height={drawH - 2 * frameInset} 
                            fill="url(#wood-base-grad)" 
                            filter="brightness(0.8)" 
                            stroke="rgba(0,0,0,0.3)" 
                            strokeWidth="1"
                            className="transition-all duration-300"
                          />
                          {/* Raised center */}
                          <rect 
                            x={x + raisedPanelInset} 
                            y={y + raisedPanelInset} 
                            width={drawW - 2 * raisedPanelInset} 
                            height={drawH - 2 * raisedPanelInset} 
                            fill="url(#wood-base-grad)" 
                            filter="brightness(1.05)" 
                            stroke="rgba(0,0,0,0.2)" 
                            strokeWidth="1.5"
                            className="transition-all duration-300"
                          />
                          <rect 
                            x={x + raisedPanelInset} 
                            y={y + raisedPanelInset} 
                            width={drawW - 2 * raisedPanelInset} 
                            height={drawH - 2 * raisedPanelInset} 
                            fill="url(#grain-pattern)" 
                            opacity="0.8"
                            className="transition-all duration-300"
                          />
                        </>
                      )}

                      {profileStyle === 'Beveled Edge' && (
                        <>
                          <rect 
                            x={x + 4} 
                            y={y + 4} 
                            width={drawW - 8} 
                            height={drawH - 8} 
                            fill="none" 
                            stroke="rgba(0,0,0,0.25)" 
                            strokeWidth="1"
                            className="transition-all duration-300"
                          />
                          {/* Bevel lines */}
                          <line x1={x} y1={y} x2={x+4} y2={y+4} stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
                          <line x1={x+drawW} y1={y} x2={x+drawW-4} y2={y+4} stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
                          <line x1={x} y1={y+drawH} x2={x+4} y2={y+drawH-4} stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
                          <line x1={x+drawW} y1={y+drawH} x2={x+drawW-4} y2={y+drawH-4} stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
                        </>
                      )}

                      {/* Hinge bores overlay */}
                      {preBored === 'yes' && (
                        <>
                          {/* Top Hinge cup */}
                          <circle cx={x + frameInset / 2} cy={y + 35} r="6" fill="#4b5563" stroke="#1f2937" strokeWidth="1" opacity="0.85" />
                          <line x1={x + frameInset / 2} y1={y + 31} x2={x + frameInset / 2} y2={y + 39} stroke="#9ca3af" strokeWidth="1" />
                          <line x1={x + frameInset / 2 - 4} y1={y + 35} x2={x + frameInset / 2 + 4} y2={y + 35} stroke="#9ca3af" strokeWidth="1" />
                          
                          {/* Bottom Hinge cup */}
                          <circle cx={x + frameInset / 2} cy={y + drawH - 35} r="6" fill="#4b5563" stroke="#1f2937" strokeWidth="1" opacity="0.85" />
                          <line x1={x + frameInset / 2} y1={y + drawH - 39} x2={x + frameInset / 2} y2={y + drawH - 31} stroke="#9ca3af" strokeWidth="1" />
                          <line x1={x + frameInset / 2 - 4} y1={y + drawH - 35} x2={x + frameInset / 2 + 4} y2={y + drawH - 35} stroke="#9ca3af" strokeWidth="1" />
                        </>
                      )}

                      {/* Height Measurement Line & Label */}
                      <line x1={x - 15} y1={y} x2={x - 15} y2={y + drawH} stroke="#c9a47a" strokeWidth="1.5" />
                      <line x1={x - 20} y1={y} x2={x - 10} y2={y} stroke="#c9a47a" strokeWidth="1.5" />
                      <line x1={x - 20} y1={y + drawH} x2={x - 10} y2={y + drawH} stroke="#c9a47a" strokeWidth="1.5" />
                      <text 
                        x={x - 24} 
                        y={y + drawH / 2} 
                        fill="#c9a47a" 
                        textAnchor="middle" 
                        transform={`rotate(-90 ${x - 24} ${y + drawH / 2})`}
                        className="text-[11px] font-black tracking-wider"
                      >
                        {height || 'H'}"
                      </text>

                      {/* Width Measurement Line & Label */}
                      <line x1={x} y1={y - 15} x2={x + drawW} y2={y - 15} stroke="#c9a47a" strokeWidth="1.5" />
                      <line x1={x} y1={y - 20} x2={x} y2={y - 10} stroke="#c9a47a" strokeWidth="1.5" />
                      <line x1={x + drawW} y1={y - 20} x2={x + drawW} y2={y - 10} stroke="#c9a47a" strokeWidth="1.5" />
                      <text 
                        x={x + drawW / 2} 
                        y={y - 24} 
                        fill="#c9a47a" 
                        textAnchor="middle"
                        className="text-[11px] font-black tracking-wider"
                      >
                        {width || 'W'}"
                      </text>
                    </svg>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Swatch color labels for quick finish color selection */}
                  <div className="bg-royal-bg p-4 border border-royal-border">
                    <p className="text-[11px] font-bold uppercase text-white tracking-wider mb-2.5">Door Finish Color</p>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.keys(woodColors).map((name) => (
                        <button
                          key={name}
                          onClick={() => setWoodSpecies(name)}
                          className={`flex items-center gap-1.5 p-1.5 border text-left cursor-pointer transition-all hover:-translate-y-0.5 ${
                            woodSpecies === name 
                              ? 'border-royal-gold bg-royal-gold/10 text-white shadow-[0_0_10px_rgba(201,164,122,0.2)]' 
                              : 'border-royal-border bg-royal-bg text-royal-text-muted hover:border-royal-gold hover:text-white'
                          }`}
                        >
                          <span 
                            className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0" 
                            style={{ backgroundColor: woodColors[name].base }} 
                          />
                          <span className="text-[10px] font-bold leading-tight truncate">
                            {name === 'Other (Custom Color)' ? 'Other' : name}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Render input field if 'Other (Custom Color)' is selected in swatches */}
                    {woodSpecies === 'Other (Custom Color)' && (
                      <div className="mt-3">
                        <label className="block text-[10px] font-extrabold text-royal-slate uppercase tracking-wider mb-1">Specify Custom Finish Color *</label>
                        <input 
                          type="text" 
                          placeholder="e.g. SW 7008 Alabaster, F&B Lichen"
                          value={customColor}
                          onChange={(e) => setCustomColor(e.target.value)}
                          className="w-full bg-white border border-royal-stone/30 text-royal-charcoal px-2.5 py-1.5 rounded text-xs focus:border-royal-terracotta focus:outline-none"
                        />
                      </div>
                    )}
                  </div>

                  {/* Instant pricing estimate warning */}
                  <div className="flex items-center justify-between p-3.5 bg-royal-charcoal text-white rounded-lg">
                    <div>
                      <p className="text-[10px] font-semibold text-royal-stone uppercase tracking-wide">Estimated Price Per Unit</p>
                      <p className="text-xl font-black text-white mt-0.5">
                        ${calculateItemPrice(selectedPath || 'doors', woodSpecies, hVal, wVal, profileStyle, preBored)}
                      </p>
                    </div>
                    <span className="text-[10px] text-royal-stone max-w-[150px] leading-snug text-right font-medium">
                      Estimate factors wood choice, sizing, and styling.
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Custom Configuration Controls */}
              <div className="lg:col-span-7 bg-royal-charcoal text-white p-8 md:p-10 rounded-none border border-royal-border shadow-md self-stretch flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-8 tracking-wide uppercase border-b border-royal-border pb-4">
                    Configure Cabinet Door Details
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-royal-stone uppercase tracking-wider mb-2">Door Finish Color *</label>
                      <select 
                        value={woodSpecies}
                        onChange={(e) => setWoodSpecies(e.target.value)}
                        className="w-full bg-white/10 border border-white/25 text-white p-2.5 rounded-md focus:border-royal-terracotta focus:outline-none appearance-none cursor-pointer text-sm"
                      >
                        {Object.keys(woodColors).map((name) => (
                          <option key={name} value={name} className="text-royal-charcoal">
                            {name}
                          </option>
                        ))}
                      </select>

                      {/* Render input field if 'Other (Custom Color)' is selected in dropdown */}
                      {woodSpecies === 'Other (Custom Color)' && (
                        <div className="mt-3">
                          <label className="block text-[10px] font-bold text-royal-stone uppercase tracking-wider mb-1">Specify Custom Finish Color *</label>
                          <input 
                            type="text" 
                            placeholder="e.g. SW 7008 Alabaster, F&B Lichen"
                            value={customColor}
                            onChange={(e) => setCustomColor(e.target.value)}
                            className="w-full bg-white/10 border border-white/25 text-white px-2.5 py-1.5 rounded text-xs focus:border-royal-terracotta focus:outline-none"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-royal-stone uppercase tracking-wider mb-2">Profile Style *</label>
                      <select 
                        value={profileStyle}
                        onChange={(e) => setProfileStyle(e.target.value)}
                        className="w-full bg-white/10 border border-white/25 text-white p-2.5 rounded-md focus:border-royal-terracotta focus:outline-none appearance-none cursor-pointer text-sm"
                      >
                        <option value="Classic Shaker" className="text-royal-charcoal">Classic Shaker</option>
                        <option value="Modern Slab" className="text-royal-charcoal">Modern Slab (Flat Panel)</option>
                        <option value="Raised Panel" className="text-royal-charcoal">Raised Panel (Traditional)</option>
                        <option value="Beveled Edge" className="text-royal-charcoal">Beveled Edge</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-royal-stone uppercase tracking-wider mb-2">Height (Inches) *</label>
                        <input 
                          type="number" 
                          step="0.0625"
                          placeholder="e.g. 30" 
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="w-full bg-white/10 border border-white/25 text-white p-2.5 rounded-md focus:border-royal-terracotta focus:outline-none text-sm" 
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-royal-stone uppercase tracking-wider mb-2">Width (Inches) *</label>
                        <input 
                          type="number" 
                          step="0.0625"
                          placeholder="e.g. 18" 
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          className="w-full bg-white/10 border border-white/25 text-white p-2.5 rounded-md focus:border-royal-terracotta focus:outline-none text-sm" 
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-royal-stone uppercase tracking-wider mb-2">Thickness *</label>
                        <select 
                          value={thickness}
                          onChange={(e) => setThickness(e.target.value)}
                          className="w-full bg-white/10 border border-white/25 text-white p-2.5 rounded-md focus:border-royal-terracotta focus:outline-none appearance-none cursor-pointer text-sm"
                        >
                          <option value="0.75" className="text-royal-charcoal">3/4" (Standard)</option>
                          <option value="0.875" className="text-royal-charcoal">7/8"</option>
                          <option value="1.0" className="text-royal-charcoal">1" (Heavy Duty)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-royal-stone uppercase tracking-wider mb-2">Quantity *</label>
                        <input 
                          type="number" 
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="w-full bg-white/10 border border-white/25 text-white p-2.5 rounded-md focus:border-royal-terracotta focus:outline-none text-sm" 
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-royal-stone uppercase tracking-wider mb-2">Pre-bore Hinge Holes?</label>
                      <div className="flex gap-6 mt-1 text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="preBored" 
                            value="yes" 
                            checked={preBored === 'yes'}
                            onChange={() => setPreBored('yes')}
                            className="accent-royal-terracotta w-4 h-4 cursor-pointer" 
                          />
                          <span className="font-semibold text-white">Yes (35mm cup holes - 3" inset)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="preBored" 
                            value="no" 
                            checked={preBored === 'no'}
                            onChange={() => setPreBored('no')}
                            className="accent-royal-terracotta w-4 h-4 cursor-pointer" 
                          />
                          <span className="font-semibold text-white">No (Solid edge)</span>
                        </label>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-royal-stone uppercase tracking-wider mb-2">Special grain alignment or notes</label>
                      <input 
                        type="text" 
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g., Grain matched with adjacent drawer front, custom cup-hole depth..."
                        className="w-full bg-white/10 border border-white/25 text-white p-2.5 rounded-md focus:border-royal-terracotta focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6 flex justify-end">
                  <button 
                    type="button"
                    onClick={handleAddItem}
                    className="w-full sm:w-auto px-6 py-3 bg-royal-terracotta text-white font-extrabold text-xs uppercase tracking-wider hover:bg-white hover:text-royal-charcoal transition-all rounded shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Add Item to Quote List
                  </button>
                </div>
              </div>

            </div>

            {/* List / Basket of Added items */}
            <div className="bg-white rounded-xl border border-royal-stone/20 shadow-md p-6 md:p-8">
              <h3 className="font-sans text-xl font-black text-royal-charcoal mb-6 uppercase tracking-tight flex items-center gap-2 border-b border-royal-stone/10 pb-4">
                Your Custom Quote List
                <span className="text-xs bg-royal-terracotta/10 text-royal-terracotta border border-royal-terracotta/20 rounded-full px-2.5 py-0.5 font-bold">
                  {quoteItems.reduce((acc, curr) => acc + curr.quantity, 0)} Items
                </span>
              </h3>

              {quoteItems.length === 0 ? (
                <div className="py-12 text-center text-royal-slate font-medium space-y-3">
                  <div className="w-12 h-12 rounded-full border border-dashed border-royal-stone/30 flex items-center justify-center mx-auto text-royal-stone">
                    <Trash2 className="w-5 h-5 opacity-40" />
                  </div>
                  <p className="text-sm">Your custom cabinet list is currently empty.</p>
                  <p className="text-xs text-royal-stone">Use the form above to configure dimensions and add items to your list.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Table view */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-royal-stone/20 text-royal-stone font-bold text-xs uppercase tracking-wider">
                          <th className="py-3 px-2">Type</th>
                          <th className="py-3 px-2">Finish Color</th>
                          <th className="py-3 px-2">Profile</th>
                          <th className="py-3 px-2">Dimensions (H x W x T)</th>
                          <th className="py-3 px-2 text-center">Hinges</th>
                          <th className="py-3 px-2 text-center">Qty</th>
                          <th className="py-3 px-2 text-right">Est. Price</th>
                          <th className="py-3 px-2 text-center">Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quoteItems.map((item) => (
                          <tr key={item.id} className="border-b border-royal-stone/10 hover:bg-royal-cream/20 transition-all font-semibold">
                            <td className="py-4 px-2 capitalize text-royal-charcoal font-bold">{item.type === 'doors' ? 'Cabinet Door' : 'Drawer Front'}</td>
                            <td className="py-4 px-2 text-royal-slate">{item.woodSpecies}</td>
                            <td className="py-4 px-2 text-royal-slate">{item.profileStyle}</td>
                            <td className="py-4 px-2 text-royal-slate font-mono">
                              {item.height}" x {item.width}" x {item.thickness === '0.75' ? '3/4"' : item.thickness === '0.875' ? '7/8"' : '1"'}
                            </td>
                            <td className="py-4 px-2 text-center capitalize text-royal-slate">
                              {item.type === 'doors' ? (item.preBored === 'yes' ? 'Yes' : 'No') : '—'}
                            </td>
                            <td className="py-4 px-2 text-center font-bold text-royal-charcoal">{item.quantity}</td>
                            <td className="py-4 px-2 text-right text-royal-terracotta font-extrabold">${item.estimatedPrice}</td>
                            <td className="py-4 px-2 text-center">
                              <button 
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-royal-stone hover:text-red-600 transition-colors p-1 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-end border-t border-royal-stone/20 pt-6 gap-6">
                    <div>
                      <h5 className="text-xs font-bold text-royal-stone uppercase tracking-wider">Estimated Project Subtotal:</h5>
                      <p className="text-3xl font-black text-royal-charcoal mt-1">
                        ${totalSubtotal}
                      </p>
                      <p className="text-[10px] text-royal-stone font-medium mt-1">
                        * Estimates exclude taxes & shipping, subject to final revision by Robert.
                      </p>
                    </div>
                  </div>

                  {/* Customer Info Form built directly beneath the Cart list */}
                  <div className="bg-royal-cream/35 p-6 rounded-lg border border-royal-stone/10 mt-8 space-y-6">
                    <div>
                      <h4 className="text-sm font-extrabold text-royal-charcoal uppercase tracking-wider mb-2">
                        Step 2: Enter Client Details & Generate Quote Email
                      </h4>
                      <p className="text-xs text-royal-slate font-medium">
                        Fill in your coordinates to draft your custom quote email. Robert will call you to confirm all details and finish the deal.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-royal-slate uppercase tracking-wider mb-2">Your Full Name *</label>
                        <input 
                          type="text" 
                          placeholder="Name..." 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-white border border-royal-stone/30 text-royal-charcoal p-2.5 rounded focus:border-royal-terracotta focus:outline-none text-sm" 
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-royal-slate uppercase tracking-wider mb-2">Your Email *</label>
                        <input 
                          type="email" 
                          placeholder="client@gmail.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white border border-royal-stone/30 text-royal-charcoal p-2.5 rounded focus:border-royal-terracotta focus:outline-none text-sm" 
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-royal-slate uppercase tracking-wider mb-2">Your Phone Number *</label>
                        <input 
                          type="tel" 
                          placeholder="Phone..." 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-white border border-royal-stone/30 text-royal-charcoal p-2.5 rounded focus:border-royal-terracotta focus:outline-none text-sm" 
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                      <button 
                        type="button" 
                        onClick={handleFormSubmit}
                        className="w-full sm:w-auto px-8 py-3.5 bg-royal-terracotta text-white font-extrabold text-xs uppercase tracking-wider hover:bg-royal-charcoal transition-all rounded shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Mail className="w-4 h-4" />
                        Email Quote Request to Robert
                      </button>
                      <span className="text-[10px] text-royal-slate font-medium max-w-md leading-normal text-center sm:text-left">
                        Drafting compiles your list into a formatted quote email sent to Robert Lazau (Burlacu). He will verify dimensions and call you to finalise the agreement.
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Confirmation / Success Screen */
          <div className="bg-royal-charcoal text-white p-8 md:p-12 rounded-xl text-center shadow-2xl max-w-4xl mx-auto border-2 border-royal-terracotta">
            <div className="w-20 h-20 bg-royal-terracotta/15 rounded-full flex items-center justify-center text-royal-terracotta mx-auto mb-6 border border-royal-terracotta/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <h3 className="font-sans text-3.5xl font-extrabold mb-4 tracking-tight uppercase">
              Quote Request Drafted!
            </h3>
            
            <p className="text-royal-stone text-lg mb-8 max-w-2xl mx-auto font-medium">
              Thank you, <span className="text-white font-bold">{name}</span>. Your custom dimension list containing <span className="text-white font-bold">{quoteItems.reduce((acc, curr) => acc + curr.quantity, 0)} items</span> has been formatted. Your default email client was triggered to send specifications to Robert.
            </p>
            
            {/* List breakdown summary */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 max-w-xl mx-auto mb-8 text-left text-xs space-y-4">
              <p className="text-xs font-bold text-royal-terracotta uppercase tracking-wider border-b border-white/10 pb-2">Order Cart Summary:</p>
              <div className="divide-y divide-white/5">
                {quoteItems.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between">
                    <div>
                      <span className="text-white font-bold">{item.quantity}x</span> {item.type === 'doors' ? 'Cabinet Door' : 'Drawer Front'} — {item.woodSpecies} ({item.profileStyle})
                      <div className="text-royal-stone text-[10px] mt-0.5">Dims: {item.height}"H x {item.width}"W x {item.thickness === '0.75' ? '3/4"' : '1"'} {item.preBored === 'yes' ? '(Hinges: Yes)' : ''}</div>
                    </div>
                    <span className="font-bold text-royal-terracotta">${item.estimatedPrice}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between font-bold text-sm">
                <span>Estimated Subtotal:</span>
                <span className="text-white text-base">${totalSubtotal}</span>
              </div>
            </div>

            <div className="bg-royal-terracotta/10 p-6 rounded-lg max-w-xl mx-auto mb-10 border border-royal-terracotta/20 flex gap-4 items-center text-left">
              <div className="w-12 h-12 rounded-full bg-royal-terracotta/20 flex items-center justify-center text-royal-terracotta shrink-0">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Robert is Reviewing & Will Call You</h4>
                <p className="text-royal-stone text-xs leading-relaxed mt-1">
                  Robert Burlacu will inspect your specifications, double-check sizing alignments, and prepare wood pricing. He will call you at <span className="text-royal-terracotta font-bold">{phone}</span> (or reply to <span className="text-white font-semibold">{email}</span>) to verify shipping coordinates and finalize the deal.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={handleFormSubmit}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-md transition-all text-xs uppercase tracking-wider"
              >
                <Mail className="w-4 h-4" />
                Resend Quote Email
              </button>
              <button 
                onClick={() => {
                  setIsSubmitted(false);
                  setQuoteItems([]);
                  setHeight('30');
                  setWidth('18');
                  setQuantity('1');
                }}
                className="px-8 py-3 bg-royal-terracotta text-white font-bold hover:bg-white hover:text-royal-charcoal transition-all rounded-md text-xs uppercase tracking-wider cursor-pointer"
              >
                Start New Project Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
