// Project photos for the home page category galleries and the /gallery page.
// Photos come from Robert's Instagram (@royalbrandwoodworking), resized into
// public/photos/instagram/. To add one, drop the file there and add a line below.

export type GalleryCategory = 'kitchens' | 'bathrooms' | 'furniture' | 'built-ins';

export interface GalleryPhoto {
  src: string;   // full size, for the photo viewer
  thumb: string; // small, for grids and cards
  alt: string;
  category: GalleryCategory;
}

export const GALLERY_CATEGORIES: { id: GalleryCategory; title: string; text: string }[] = [
  { id: 'kitchens', title: 'Kitchen Remodels', text: 'Custom cabinetry designed, built and installed to fit the way you cook and live.' },
  { id: 'bathrooms', title: 'Bathroom Remodels', text: 'Vanities and storage sized to your space and built to handle a humid room.' },
  { id: 'furniture', title: 'Handmade Furniture', text: 'Dining tables, desks and pieces made from solid hardwood to last generations.' },
  { id: 'built-ins', title: 'Built-Ins & Carpentry', text: 'Shelving, bedroom built-ins, trim and finish carpentry, indoors or out.' },
];

// The first photo in each category is its cover.
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { category: 'kitchens', src: '/photos/instagram/kitchen-white-oak-island.jpg', thumb: '/photos/instagram/thumb/kitchen-white-oak-island.jpg', alt: "White oak kitchen with a large island and painted range hood" },
  { category: 'kitchens', src: '/photos/instagram/kitchen-white-shaker.jpg', thumb: '/photos/instagram/thumb/kitchen-white-shaker.jpg', alt: "White Shaker kitchen with marble counters and white oak floating shelves" },
  { category: 'kitchens', src: '/photos/instagram/kitchen-walnut.jpg', thumb: '/photos/instagram/thumb/kitchen-walnut.jpg', alt: "American black walnut kitchen with glass-front upper cabinets" },
  { category: 'kitchens', src: '/photos/instagram/kitchen-white-gray-island.jpg', thumb: '/photos/instagram/thumb/kitchen-white-gray-island.jpg', alt: "White painted kitchen with a gray island and pendant lights" },
  { category: 'kitchens', src: '/photos/instagram/kitchen-sage-green-1909.jpg', thumb: '/photos/instagram/thumb/kitchen-sage-green-1909.jpg', alt: "Sage green kitchen in a 1909 Portland home" },
  { category: 'kitchens', src: '/photos/instagram/kitchen-painted-breakfast-bar.jpg', thumb: '/photos/instagram/thumb/kitchen-painted-breakfast-bar.jpg', alt: "Painted kitchen with a breakfast bar and pendant lights" },
  { category: 'kitchens', src: '/photos/instagram/kitchen-modern-bamboo.jpg', thumb: '/photos/instagram/thumb/kitchen-modern-bamboo.jpg', alt: "Modern bamboo kitchen with a stone-topped island" },
  { category: 'kitchens', src: '/photos/instagram/kitchen-adu.jpg', thumb: '/photos/instagram/thumb/kitchen-adu.jpg', alt: "ADU kitchen with two-tone cabinets and open shelving" },
  { category: 'kitchens', src: '/photos/instagram/kitchen-maple-waterfall-island.jpg', thumb: '/photos/instagram/thumb/kitchen-maple-waterfall-island.jpg', alt: "Solid maple waterfall countertop on a stone-faced island" },
  { category: 'kitchens', src: '/photos/instagram/kitchen-painted-pantry-door.jpg', thumb: '/photos/instagram/thumb/kitchen-painted-pantry-door.jpg', alt: "Hand-painted custom pantry door in a remodeled kitchen" },
  { category: 'bathrooms', src: '/photos/instagram/bath-teal-vanity.jpg', thumb: '/photos/instagram/thumb/bath-teal-vanity.jpg', alt: "Teal custom vanity on a patterned tile floor" },
  { category: 'bathrooms', src: '/photos/instagram/bath-walnut-inset-vanity.jpg', thumb: '/photos/instagram/thumb/bath-walnut-inset-vanity.jpg', alt: "Inset walnut vanity in a guest bathroom" },
  { category: 'bathrooms', src: '/photos/instagram/bath-floating-vanity.jpg', thumb: '/photos/instagram/thumb/bath-floating-vanity.jpg', alt: "Floating custom vanity with a round mirror" },
  { category: 'bathrooms', src: '/photos/instagram/bath-master-white.jpg', thumb: '/photos/instagram/thumb/bath-master-white.jpg', alt: "Master bathroom with a white vanity and freestanding tub" },
  { category: 'bathrooms', src: '/photos/instagram/bath-gray-vanity.jpg', thumb: '/photos/instagram/thumb/bath-gray-vanity.jpg', alt: "Gray custom vanity on a hexagon tile floor" },
  { category: 'bathrooms', src: '/photos/instagram/bath-kids-blue-vanity.jpg', thumb: '/photos/instagram/thumb/bath-kids-blue-vanity.jpg', alt: "Kids' bathroom with a light blue double vanity" },
  { category: 'bathrooms', src: '/photos/instagram/bath-bamboo-vanity.jpg', thumb: '/photos/instagram/thumb/bath-bamboo-vanity.jpg', alt: "Bamboo vanity with a framed mirror" },
  { category: 'bathrooms', src: '/photos/instagram/bath-walnut-vanity.jpg', thumb: '/photos/instagram/thumb/bath-walnut-vanity.jpg', alt: "Custom walnut vanity with drawers" },
  { category: 'bathrooms', src: '/photos/instagram/bath-1909-remodel.jpg', thumb: '/photos/instagram/thumb/bath-1909-remodel.jpg', alt: "Top-floor bathroom remodel in a 1909 home" },
  { category: 'furniture', src: '/photos/instagram/furniture-white-oak-dresser.jpg', thumb: '/photos/instagram/thumb/furniture-white-oak-dresser.jpg', alt: "White oak dresser" },
  { category: 'furniture', src: '/photos/instagram/furniture-mid-century-end-table.jpg', thumb: '/photos/instagram/thumb/furniture-mid-century-end-table.jpg', alt: "Mid-century modern walnut end table with teal drawers" },
  { category: 'furniture', src: '/photos/instagram/furniture-burl-curved-cabinet.jpg', thumb: '/photos/instagram/thumb/furniture-burl-curved-cabinet.jpg', alt: "Curved cabinet with burl veneer and a stone top" },
  { category: 'furniture', src: '/photos/instagram/furniture-dining-table.jpg', thumb: '/photos/instagram/thumb/furniture-dining-table.jpg', alt: "Dining table on a steel frame" },
  { category: 'furniture', src: '/photos/instagram/furniture-farm-table-nook.jpg', thumb: '/photos/instagram/thumb/furniture-farm-table-nook.jpg', alt: "Farm table nook with a built-in storage bench" },
  { category: 'furniture', src: '/photos/instagram/furniture-jatoba-nightstand.jpg', thumb: '/photos/instagram/thumb/furniture-jatoba-nightstand.jpg', alt: "Jatoba hardwood nightstand with a painted base" },
  { category: 'furniture', src: '/photos/instagram/furniture-round-coffee-table.jpg', thumb: '/photos/instagram/thumb/furniture-round-coffee-table.jpg', alt: "Round coffee table" },
  { category: 'furniture', src: '/photos/instagram/furniture-live-edge-detail.jpg', thumb: '/photos/instagram/thumb/furniture-live-edge-detail.jpg', alt: "Close-up of a live-edge walnut table" },
  { category: 'built-ins', src: '/photos/instagram/builtin-fireplace.jpg', thumb: '/photos/instagram/thumb/builtin-fireplace.jpg', alt: "Fireplace built-ins with shelves and cabinets" },
  { category: 'built-ins', src: '/photos/instagram/builtin-lighted-shelves.jpg', thumb: '/photos/instagram/thumb/builtin-lighted-shelves.jpg', alt: "White oak floating shelves with built-in lighting" },
  { category: 'built-ins', src: '/photos/instagram/builtin-window-seat-office.jpg', thumb: '/photos/instagram/thumb/builtin-window-seat-office.jpg', alt: "His-and-hers office built-ins around a window seat" },
  { category: 'built-ins', src: '/photos/instagram/builtin-walnut-bar.jpg', thumb: '/photos/instagram/thumb/builtin-walnut-bar.jpg', alt: "Walnut bar with glass cabinets and a wine fridge" },
  { category: 'built-ins', src: '/photos/instagram/builtin-walnut-entertainment-center.jpg', thumb: '/photos/instagram/thumb/builtin-walnut-entertainment-center.jpg', alt: "Walnut entertainment center" },
  { category: 'built-ins', src: '/photos/instagram/builtin-library.jpg', thumb: '/photos/instagram/thumb/builtin-library.jpg', alt: "Built-in library shelving" },
  { category: 'built-ins', src: '/photos/instagram/builtin-hall-closet.jpg', thumb: '/photos/instagram/thumb/builtin-hall-closet.jpg', alt: "Grain-matched built-in hall closet, 9½ feet tall" },
  { category: 'built-ins', src: '/photos/instagram/builtin-master-bedroom.jpg', thumb: '/photos/instagram/thumb/builtin-master-bedroom.jpg', alt: "Master bedroom built-ins" },
  { category: 'built-ins', src: '/photos/instagram/builtin-walnut-wardrobe.jpg', thumb: '/photos/instagram/thumb/builtin-walnut-wardrobe.jpg', alt: "Walnut built-in wardrobe" },
  { category: 'built-ins', src: '/photos/instagram/builtin-sliding-door.jpg', thumb: '/photos/instagram/thumb/builtin-sliding-door.jpg', alt: "Modern sliding barn door" },
];

export const photosFor = (category: GalleryCategory) => GALLERY_PHOTOS.filter(p => p.category === category);
