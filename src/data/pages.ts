// Title and description for every page. Used twice: scripts/prerender.mjs bakes them into each
// page's HTML at build time (what Google, Bing and link previews read), and PageMeta keeps the tab
// title right as visitors click around. Keep titles to 60 characters or less and descriptions to
// 155, with the main search phrase first.
export const SITE_URL = 'https://www.royalbrandwoodworking.com';

export const PAGES: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Portland Cabinet Maker & Carpenter | Royal Brand Woodworking',
    description: 'Custom kitchen cabinets, bathroom vanities, built-ins and furniture, handmade in Portland, OR by third-generation woodworker Robert Burlacu. CCB# 210239.',
  },
  '/services': {
    title: 'Custom Cabinets, Vanities & Built-Ins in Portland, OR',
    description: 'Kitchen cabinets, bathroom vanities, built-ins, finish carpentry, handmade furniture and custom cabinet doors, built by hand in Portland, OR.',
  },
  '/kitchen-cabinets': {
    title: 'Custom Kitchen Cabinets in Portland, OR | Royal Brand',
    description: "Custom kitchen cabinets designed with you, built in Robert Burlacu's Portland shop and installed by him. Get a price before any work starts.",
  },
  '/bathroom-vanities': {
    title: 'Custom Bathroom Vanities in Portland, OR | Royal Brand',
    description: 'Custom bathroom vanities made to fit your space and built to handle a humid room, handmade in Portland, OR by woodworker Robert Burlacu.',
  },
  '/custom-cabinets': {
    title: 'Custom Cabinets & Built-Ins in Portland, OR | Royal Brand',
    description: "Custom cabinets, built-ins, shelving, bars and wardrobes, built by hand in Robert Burlacu's Portland shop. Licensed, bonded & insured, CCB# 210239.",
  },
  '/gallery': {
    title: 'Custom Kitchen & Cabinet Projects in Portland | Royal Brand',
    description: 'Photos of custom kitchens, bathroom vanities, handmade furniture and built-ins by Royal Brand Woodworking in Portland, OR.',
  },
  '/order': {
    title: 'Order Custom Cabinet Doors Online | Royal Brand Woodworking',
    description: 'Pick your door style, wood and finish, enter your sizes, and Robert sends you a price. Made to order in Portland, OR. Nothing is charged until you say yes.',
  },
  '/booking': {
    title: 'Book an In-Home Cabinet Estimate in Portland | Royal Brand',
    description: 'Have Robert measure and talk through your kitchen, bath or furniture project. The $150 estimate fee is credited toward your project if you go ahead.',
  },
  '/about': {
    title: 'About Robert Burlacu, Portland Cabinet Maker | Royal Brand',
    description: 'Meet Robert Burlacu, the third-generation woodworker behind Royal Brand Woodworking in Portland, OR. Licensed, bonded & insured (CCB# 210239).',
  },
};

export const NOT_FOUND_TITLE = 'Page Not Found | Royal Brand Woodworking';
