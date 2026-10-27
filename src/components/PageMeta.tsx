import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGES, SITE_URL, NOT_FOUND_TITLE } from '../data/pages';

// Each page's HTML already ships with its own title, description and canonical link
// (scripts/prerender.mjs). This keeps them right while a visitor clicks between pages.
function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export function PageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = PAGES[pathname];
    const url = SITE_URL + (pathname === '/' ? '/' : pathname);
    if (!page) {
      document.title = NOT_FOUND_TITLE;
      return;
    }
    document.title = page.title;
    setMeta('meta[name="description"]', 'content', page.description);
    setMeta('meta[property="og:title"]', 'content', page.title);
    setMeta('meta[property="og:description"]', 'content', page.description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('link[rel="canonical"]', 'href', url);
  }, [pathname]);
  return null;
}
