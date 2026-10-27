// Royal Brand Woodworking contact details — from royalbrandwoodworking.com.
// Update here and every page picks it up.
export const BUSINESS = {
  name: 'Royal Brand Woodworking',
  owner: 'Robert Burlacu',
  phoneDisplay: '(503) 808-0820',
  phoneHref: 'tel:+15038080820',
  email: 'royalbrandwoodworking@gmail.com',
  street: '6712 NE 46th Ave',
  cityStateZip: 'Portland, OR 97218',
  ccb: '210239',
  mapsUrl: 'https://maps.google.com/?q=6712+NE+46th+Ave,+Portland,+OR+97218',
  instagram: 'https://www.instagram.com/royalbrandwoodworking/',
  instagramHandle: '@royalbrandwoodworking',
  siteUrl: 'https://www.royalbrandwoodworking.com',
  // Home page hero video. Put a short, silent, looping clip in public/video/
  // (an .mp4 under ~6 MB) and set its path here, e.g. '/video/hero.mp4'.
  // Leave it null to show the photo.
  heroVideo: null as string | null,
};

// "How did you find us?" choices on the booking and door order forms (optional for the customer).
// The answer comes through in each form email as found_us, so we can see which channels bring work.
export const LEAD_SOURCES = [
  'Google search',
  'Google Maps',
  'Instagram',
  'Friend or family',
  'Past customer',
  'Contractor or designer',
  'Other',
];
