# Royal Brand Woodworking website

Client site built and maintained by Robert Lazau (Golden Boy Productions) for Robert Burlacu,
Royal Brand Woodworking, Portland, OR. Live at https://www.royalbrandwoodworking.com.

## Robert Lazau's rules (from his Golden Boy HQ rulebook)
- Never commit to main. Feature branch + pull request; Robert merges.
- Keep commits few: Vercel caps builds per day.
- Never invent business facts (prices, hours, years, reviews, licenses, service areas). Use what's on the site or ask.
- Contact forms run on Robert's paid Web3Forms account (key in src/lib/submitForm.ts), never the client's.
- Never submit the forms as a test. Robert sends the test.
- Check the Vercel preview before calling a pull request ready.
- Never handle passwords, codes or tokens.

## Stack
- Vite + React 19 + React Router 7 + Tailwind 4. Hosted on Vercel (project royal-brand-woodworking-website).
- Domain is registered at Wix; Wix DNS points the apex (A record) and www (CNAME) at Vercel. www is the main address.
- vercel.json also sends royal-brand-woodworking-website.vercel.app to www, so Google sees one copy of the site.
- Google Search Console: domain property under Burlacu's Google account; Robert is an Owner.

## How pages get to Google
- `npm run build` = client build, then a server build of src/entry-server.tsx, then scripts/prerender.mjs.
- prerender.mjs writes one HTML file per page (dist/index.html, dist/services.html, ...) with that page's
  title, description, canonical, share tags and full text, plus dist/404.html (noindex).
- vercel.json: cleanUrls serves /services from services.html; unknown paths get 404.html with a 404 status.
  There is no catch-all rewrite: a new page needs a route in src/App.tsx AND an entry in src/data/pages.ts.
- In the browser, src/main.tsx renders the app over the pre-rendered HTML (createRoot, no hydration).
- Code that runs during render must work without a browser (no window/document/localStorage outside
  effects or try/catch), or the build fails.

## Adding or changing a page
1. Route in src/App.tsx.
2. Title (60 characters max, main search phrase first) and description (155 max) in src/data/pages.ts.
3. Exactly one <h1> on the page (the build checks this).
4. Add it to public/sitemap.xml and bump <lastmod> for any page whose content changed.
   The IndexNow GitHub Action pings Bing with the changed URLs after the merge deploys.

## Files
- src/data/business.ts: name, phone, address, CCB#, Instagram, form lead-source choices. Change contact details here.
- src/data/pages.ts: every page's title and description.
- src/data/gallery.ts, public/photos/web: project photos.
- src/data/servicePages.ts + src/pages/ServiceDetailPage.tsx: the kitchen cabinets, bathroom vanities and custom cabinets pages.
- src/data/reviews.ts: real Google reviews, copied word for word (home page and service pages).
- public/photos/web/kitchen-hero-{800,1200,1920}.webp: the home hero as WebP (Hero.tsx). If the hero photo changes, make new WebP files too.
- index.html: shared head, business schema (JSON-LD), fonts.
- public/<32 hex>.txt: IndexNow key (public by design).

## Lead events and Speed Insights
- src/lib/leadEvents.ts counts leads as Vercel Web Analytics custom events (Pro plan): `Call Click`, `Email Click` and `Directions Click` from one click listener started in src/main.tsx.
- src/lib/submitForm.ts sends `Form Sent` (page + how they found us) when Web3Forms accepts a form, and `Form Error` (page) when it doesn't.
- Two properties per event at most (Pro's limit). `spot` comes from the nearest `data-spot` (`hero`, `bottom`, `mobile-bar`), else header (nav), footer, the section id, or page.
- Never put names, phone numbers, emails, addresses or message text in an event.
- Speed Insights: `<SpeedInsights />` next to `<Analytics />` in src/App.tsx.

