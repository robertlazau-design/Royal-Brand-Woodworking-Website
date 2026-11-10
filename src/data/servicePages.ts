// Content for the three service pages (/kitchen-cabinets, /bathroom-vanities, /custom-cabinets).
// One layout (src/pages/ServiceDetailPage.tsx) renders all three. Only use facts that are already
// true on the site: no prices, timelines, service areas or claims Robert hasn't confirmed.
// Each page's search title and description live in src/data/pages.ts.
import type { GalleryCategory } from './gallery';

export type ServicePath = '/kitchen-cabinets' | '/bathroom-vanities' | '/custom-cabinets';

export interface ServicePageData {
  path: ServicePath;
  label: string;                 // short name, used in links between the pages
  eyebrow: string;
  h1: [string, string];          // [white part, gold part]
  lead: string;
  hero: { src: string; alt: string };
  pointsHeading: string;
  points: { title: string; text: string }[];
  gallery: { category: GalleryCategory; heading: string; count: number };
  stepsHeading: string;
  stepsIntro: string;
  steps: { img: string; alt: string; title: string; text: string }[];
  reviewNames: string[];         // must match names in src/data/reviews.ts
  faqs: { q: string; a: string }[];
}

const ESTIMATE_STEP = {
  img: '/photos/web/measuring-cutlist.jpg',
  alt: 'Measuring cabinet parts against the cut list',
  title: 'Estimate',
  text: 'Robert comes to your home to measure and talk through the project. The $150 estimate fee is credited toward your project if you go ahead.',
};
const DESIGN_STEP = {
  img: '/photos/web/door-components-still-life.jpg',
  alt: 'Cut door parts laid out on the bench',
  title: 'Design & Price',
  text: 'Pick the wood, color and style together. You get a price before any work starts.',
};
const BUILD_STEP = {
  img: '/photos/web/squaring-clamp-rack.jpg',
  alt: 'Clamping a cabinet door square in the shop',
  title: 'Built in the Shop',
  text: "Everything is cut, glued and sanded by hand in Robert's Portland shop.",
};

const FAQ_ESTIMATE = {
  q: 'How do I get started?',
  a: "Call Robert or book an estimate online. He'll come out, take measurements, and give you a price before any work starts. The $150 estimate fee is credited toward your project if you go ahead.",
};
const FAQ_STYLE = {
  q: 'Can you help me choose colors and styles?',
  a: 'Yes. Robert has been doing this for over 15 years and will help you pick the wood, color and style that suit your home.',
};
const FAQ_DOORS = {
  q: 'I only need new cabinet doors. Can you help?',
  a: 'Yes. Custom doors can be ordered online, built to order in your sizes. They usually take 2 to 3 weeks once Robert has confirmed your sizes with you.',
};
const FAQ_LICENSE = {
  q: 'Are you licensed and insured?',
  a: 'Yes. Royal Brand Woodworking is licensed, bonded and insured in Oregon (CCB# 210239).',
};

export const SERVICE_PAGES: Record<ServicePath, ServicePageData> = {
  '/kitchen-cabinets': {
    path: '/kitchen-cabinets',
    label: 'Kitchen Cabinets',
    eyebrow: 'Kitchen Remodels',
    h1: ['Custom Kitchen Cabinets', 'in Portland'],
    lead: "Robert measures your kitchen, helps you design it, builds the cabinets in his own Portland shop and installs them himself.",
    hero: { src: '/photos/instagram/kitchen-white-oak-island.jpg', alt: 'White oak kitchen with a large island and painted range hood' },
    pointsHeading: 'One Craftsman, Start to Finish',
    points: [
      { title: 'Designed With You', text: 'Robert helps you pick the wood, color and style that suit your home and the way you cook.' },
      { title: 'Built in His Shop', text: "Your cabinets are built to your kitchen's measurements in Robert's Portland shop." },
      { title: 'Installed by Robert', text: 'The person who built your cabinets is the one who installs them.' },
      { title: 'Price Up Front', text: 'You get a price before any work starts. Licensed, bonded and insured, CCB# 210239.' },
    ],
    gallery: { category: 'kitchens', heading: 'Kitchens Robert Has Built', count: 8 },
    stepsHeading: 'How a Kitchen Comes Together',
    stepsIntro: 'From the first visit to the last cabinet on the wall.',
    steps: [
      ESTIMATE_STEP,
      DESIGN_STEP,
      BUILD_STEP,
      {
        img: '/photos/instagram/kitchen-white-shaker.jpg',
        alt: 'White Shaker kitchen with marble counters and white oak floating shelves',
        title: 'Installed',
        text: 'Robert installs your new cabinets himself.',
      },
    ],
    reviewNames: ['Lynn Monahan', 'M Johnston', 'Catherine Malmin'],
    faqs: [
      FAQ_ESTIMATE,
      { q: 'Do you install the cabinets?', a: 'Yes. Robert builds your cabinets in his Portland shop and installs them himself.' },
      FAQ_STYLE,
      FAQ_DOORS,
      FAQ_LICENSE,
    ],
  },

  '/bathroom-vanities': {
    path: '/bathroom-vanities',
    label: 'Bathroom Vanities',
    eyebrow: 'Bathroom Remodels',
    h1: ['Custom Bathroom Vanities', 'in Portland'],
    lead: "Vanities and cabinets made to fit your bathroom exactly: sized to your space, built to handle a humid room, and made by hand in Robert's Portland shop.",
    hero: { src: '/photos/instagram/bath-walnut-inset-vanity.jpg', alt: 'Inset walnut vanity in a guest bathroom' },
    pointsHeading: 'Made for Your Bathroom',
    points: [
      { title: 'Made to Fit', text: 'Built to your measurements, so the vanity fits the room instead of the room fitting a stock size.' },
      { title: 'Ready for a Humid Room', text: 'Vanities and storage built to handle the moisture of a bathroom.' },
      { title: 'Your Style', text: 'Floating, inset or double, in walnut, bamboo or a painted color. See the photos below.' },
      { title: 'Price Up Front', text: 'You get a price before any work starts. Licensed, bonded and insured, CCB# 210239.' },
    ],
    gallery: { category: 'bathrooms', heading: 'Bathrooms Robert Has Built', count: 8 },
    stepsHeading: 'How It Works',
    stepsIntro: 'Three steps from the first visit to a vanity built for your room.',
    steps: [ESTIMATE_STEP, DESIGN_STEP, BUILD_STEP],
    reviewNames: ['Brian Bostick', 'Marisa S.', 'Wes Silva'],
    faqs: [FAQ_ESTIMATE, FAQ_STYLE, FAQ_DOORS, FAQ_LICENSE],
  },

  '/custom-cabinets': {
    path: '/custom-cabinets',
    label: 'Custom Cabinets',
    eyebrow: 'Built by Hand',
    h1: ['Custom Cabinets & Built-Ins', 'in Portland'],
    lead: 'Cabinets for every room: fireplace built-ins, offices, bars, wardrobes, closets and laundry rooms, built by third-generation woodworker Robert Burlacu.',
    hero: { src: '/photos/instagram/builtin-fireplace.jpg', alt: 'Fireplace built-ins with shelves and cabinets' },
    pointsHeading: 'Why Royal Brand',
    points: [
      { title: 'Any Room', text: 'Built-ins, shelving, bars, wardrobes and closets, sized to your space.' },
      { title: 'Made in His Shop', text: "Built by hand in Robert's Portland shop, from rough lumber to the final sanding." },
      { title: 'Third Generation', text: "Robert's grandfather built cabinets in Romania. Robert has been in the trade for over 15 years." },
      { title: 'Licensed & Insured', text: 'Licensed, bonded and insured in Oregon, CCB# 210239. You get a price before any work starts.' },
    ],
    gallery: { category: 'built-ins', heading: 'Built-Ins Robert Has Made', count: 8 },
    stepsHeading: 'How It’s Made',
    stepsIntro: "What happens in Robert's Portland shop before anything reaches your home.",
    steps: [
      { img: '/photos/web/surfacing-lumber-planer.jpg', alt: 'Robert feeding a board through the planer', title: 'Mill', text: 'Rough lumber is planed flat and to thickness.' },
      { img: '/photos/web/crosscutting-lumber.jpg', alt: 'Crosscutting lumber on the miter saw', title: 'Cut', text: 'Parts are cut to your exact sizes.' },
      { img: '/photos/web/pneumatic-clamp-rack.jpg', alt: 'A door clamped square in the clamp rack', title: 'Assemble', text: 'Glued and clamped perfectly square.' },
      { img: '/photos/web/hand-sanding-door.jpg', alt: 'Sanding a cabinet door by hand', title: 'Sand', text: 'Sanded smooth and ready for finish.' },
    ],
    reviewNames: ['Brian Bostick', 'Bo Malmin', 'McKenzie Lyman'],
    faqs: [
      { q: 'What do you build?', a: 'Kitchen and bathroom cabinets, handmade furniture like dining tables and desks, built-in shelving, and finish carpentry. You can also order custom doors online, built to order in your sizes.' },
      FAQ_ESTIMATE,
      FAQ_STYLE,
      FAQ_LICENSE,
    ],
  },
};

export const SERVICE_PATHS = Object.keys(SERVICE_PAGES) as ServicePath[];
