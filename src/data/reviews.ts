// Real Google reviews of Robert's work, shown on the home page and the service pages.
// Copy them word for word from Google; never edit or invent one.
export interface Review { name: string; role: string; quote: string }

export const REVIEWS: Review[] = [
  {
    name: "Brian Bostick",
    role: "Google Review · 5 reviews",
    quote: "Robert at Royal Brand Woodworking has built the custom cabinets for our kitchen, bathrooms, and most recently our laundry room, and every project has exceeded our expectations. He's a true craftsman with an incredible eye for detail and a real talent for designing cabinetry that's not only beautiful, but highly functional. He's responsive, easy to work with, and genuinely cares about getting every detail right."
  },
  {
    name: "Marisa S.",
    role: "Google Review · 4 reviews",
    quote: "Robert is an absolutely phenomenal cabinet maker and contractor. His attention to detail and stellar craftsmanship made our kitchen/dining/bath renovation a dream. He is trustworthy, accountable and communicative, and beyond his top-quality work, Robert is simply a good human. We 100% will be working with him for any future projects and would recommend to anyone."
  },
  {
    name: "M Johnston",
    role: "Google Review · Local Guide",
    quote: "Robert is a highly skilled finish carpenter and gives his work an immense amount of detail. I am so pleased with our new kitchen cabinets; he made my vision come true! He helped us with design, details in sliding racks, crown finishing, dishwasher ready island, left work site clean & tidy, etc. He communicated well via email, text and calls. Truly one of the best contractors I have ever worked with!"
  },
  {
    name: "Lynn Monahan",
    role: "Google Review · 3 reviews",
    quote: "My kitchen cabinets are fantastic! Robert made suggestions for the kitchen remodel that I hadn't thought of. Quality workmanship with careful attention to detail. He was exacting in the installation, a perfectionist. On time, professional, delivered beyond my expectations. I highly recommend him."
  },
  {
    name: "Catherine Malmin",
    role: "Google Review · 7 reviews",
    quote: "Incredible craftsmanship. Robert is truly gifted. Our inset, white-oak kitchen turned out more beautiful than I could have dreamed."
  },
  {
    name: "Bo Malmin",
    role: "Google Review · 3 reviews",
    quote: "This is true craftsmanship! They take great pride in their work and it shows. They went above and beyond to be sure every detail of our project was perfect. 10/10!"
  },
  {
    name: "Wes Silva",
    role: "Google Review",
    quote: "Robert is the contractor / cabinet maker to hire if you want high quality craftsmanship and someone who is generally great to work with. He stayed on budget, on schedule, and always gives the honest answer!"
  },
  {
    name: "McKenzie Lyman",
    role: "Google Review",
    quote: "Robert is truly gifted, he is detail oriented and true craftsman. He puts his whole heart is each customer order. Amazing guy to work with."
  },
  {
    name: "Vasile Benta",
    role: "Google Review",
    quote: "I had an amazing experience with Robert! He made an amazing dining table for us. The customer service was top-notch, and the product exceeded our expectations. I highly recommend him to anyone looking for quality products and excellent service."
  }
];

export const reviewsBy = (names: string[]) => names.map(n => REVIEWS.find(r => r.name === n)).filter((r): r is Review => !!r);
