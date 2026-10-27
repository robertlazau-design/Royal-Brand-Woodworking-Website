// Runs after `vite build` (see "build" in package.json). Turns every page into its own HTML file
// with that page's title, description, canonical link, share tags and full text, plus a 404 page:
//
//   dist/index.html, dist/services.html, dist/gallery.html, ... and dist/404.html
//
// Vercel serves /services from services.html (cleanUrls in vercel.json) and answers any unknown
// address with 404.html and a real 404 status. In the browser, React then draws the page as usual.
// The build fails on purpose if something here doesn't fit, so a broken page never goes live.
import { readFile, writeFile } from 'node:fs/promises';
import { render, PAGES, SITE_URL, NOT_FOUND_TITLE } from '../dist-ssr/entry-server.js';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const template = await readFile('dist/index.html', 'utf8');

function swap(html, pattern, replacement, what) {
  if (!pattern.test(html)) throw new Error(`prerender: couldn't find ${what} in index.html`);
  return html.replace(pattern, replacement);
}

function build(path, { title, description }, { notFound = false } = {}) {
  const url = SITE_URL + path;
  let html = template;
  html = swap(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`, 'the title');
  html = swap(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(description)}" />`, 'the description');
  html = swap(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${esc(title)}" />`, 'og:title');
  html = swap(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${esc(description)}" />`, 'og:description');
  html = swap(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, notFound ? '' : `<meta property="og:url" content="${url}" />`, 'og:url');
  html = swap(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    notFound ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    'the canonical link',
  );
  const body = render(notFound ? '/404' : path);
  if (!notFound && !/<h1[\s>]/.test(body)) throw new Error(`prerender: ${path} has no <h1>`);
  html = swap(html, /<div id="root"><\/div>/, `<div id="root">${body}</div>`, '<div id="root">');
  return html;
}

for (const [path, meta] of Object.entries(PAGES)) {
  const file = path === '/' ? 'dist/index.html' : `dist${path}.html`;
  await writeFile(file, build(path, meta));
  console.log(`prerendered ${path} -> ${file}`);
}
await writeFile('dist/404.html', build('/404', { title: NOT_FOUND_TITLE, description: PAGES['/'].description }, { notFound: true }));
console.log('prerendered 404 -> dist/404.html');
