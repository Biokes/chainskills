import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { Toaster } from "@/components/ui/sonner";
import { AppProvider } from './providers/HederaAppProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </AppProvider>
  </StrictMode>,
)