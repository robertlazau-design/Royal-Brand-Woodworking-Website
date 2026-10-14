// Project photos for the home page category galleries and the /gallery page.
// Photos come from Robert's Instagram (@royalbrandwoodworking), resized into
// public/photos/instagram/. To add one, drop the file there and add a line below.

export type GalleryCategory = 'kitchens' | 'bathrooms' | 'furniture' | 'built-ins';

export interface GalleryPhoto {
  src: string;
  alt: string;
  category: GalleryCategory;
}

export const GALLERY_CATEGORIES: { id: GalleryCategory; title: string; text: string }[] = [
  { id: 'kitchens', title: 'Kitchen Remodels', text: 'Custom cabinetry designed, built and installed to fit the way you cook and live.' },
  { id: 'bathrooms', title: 'Bathroom Remodels', text: 'Vanities and storage sized to your space and built to handle a humid room.' },
  { id: 'furniture', title: 'Handmade Furniture', text: 'Dining tables, desks and pieces made from solid hardwood to last generations.' },
  { id: 'built-ins', title: 'Built-Ins & Carpentry', text: 'Shelving, bedroom built-ins, trim and finish carpentry, indoors or out.' },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [];

export const photosFor = (category: GalleryCategory) => GALLERY_PHOTOS.filter(p => p.category === category);
