import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { AdminProvider } from './contexts/AdminContext';
import { LayoutProvider } from './contexts/LayoutContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AdminProvider>
        <LayoutProvider>
          <App />
        </LayoutProvider>
      </AdminProvider>
    </BrowserRouter>
  </StrictMode>
);