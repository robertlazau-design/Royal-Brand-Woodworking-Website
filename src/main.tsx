import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { startLeadEvents } from './lib/leadEvents';
import './index.css';

// Count call, email and directions taps from any page (see lib/leadEvents.ts).
startLeadEvents();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
