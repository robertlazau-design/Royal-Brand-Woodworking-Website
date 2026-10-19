import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BUSINESS } from '../data/business';

// Gives every page its own title, description and canonical link, so Google
// and link previews see the right page instead of the home page's tags.
const PAGES: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Royal Brand Woodworking — Custom Cabinetry, Furniture & Carpentry | Portland, OR',
    description: 'Third-generation woodworker Robert Burlacu builds custom kitchens, bathroom vanities, built-ins and handmade furniture in Portland, OR. Licensed, bonded & insured (CCB# 210239). Custom doors made to order.',
  },
  '/services': {
    title: 'Custom Kitchens, Vanities, Furniture & Built-Ins | Royal Brand Woodworking, Portland',
    description: 'Kitchen remodels, bathroom vanities, handmade furniture, built-ins and custom cabinet doors, built by hand in Portland, OR by third-generation woodworker Robert Burlacu.',
  },
  '/gallery': {
    title: 'Project Gallery — Kitchens, Bathrooms & Furniture | Royal Brand Woodworking',
    description: 'Photos of custom kitchens, bathroom vanities, handmade furniture and built-ins by Royal Brand Woodworking in Portland, OR.',
  },
  '/order': {
    title: 'Order Custom Cabinet Doors Online | Royal Brand Woodworking, Portland',
    description: 'Choose your door style, wood and finish, enter your sizes, and Robert sends you a price. Custom cabinet doors made to order in Portland, OR. Nothing is made or charged until you say yes.',
  },
  '/booking': {
    title: 'Book an In-Home Estimate | Royal Brand Woodworking, Portland',
    description: 'Have Robert come measure and talk through your kitchen, bathroom or furniture project. The $150 estimate fee is credited toward your project if you go ahead.',
  },
  '/about': {
    title: 'About Robert Burlacu, Third-Generation Woodworker | Royal Brand Woodworking',
    description: 'Meet Robert Burlacu, the third-generation woodworker behind Royal Brand Woodworking in Portland, OR. Licensed, bonded & insured (CCB# 210239).',
  },
};

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export function PageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = PAGES[pathname];
    const url = BUSINESS.siteUrl + (pathname === '/' ? '/' : pathname);
    if (!page) {
      document.title = 'Page not found | Royal Brand Woodworking';
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
