import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.tsx';
if (window.location.hash.startsWith('#/'))
    window.history.replaceState(null, '', window.location.hash.slice(1));
createRoot(document.getElementById('root')!).render(<StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>);
