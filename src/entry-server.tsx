// Build-time only: scripts/prerender.mjs uses this to turn each route into real HTML,
// so search engines and link previews get every page's text without running JavaScript.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppShell } from './App';

export { PAGES, SITE_URL, NOT_FOUND_TITLE } from './data/pages';

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </StrictMode>,
  );
}
