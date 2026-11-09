import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@core/styles/tokens.css';
import '@core/styles/global.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
