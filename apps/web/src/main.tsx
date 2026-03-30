import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AppProviders } from './app/AppProviders.tsx';
import './index.css';
import { enableMocking } from './mocks';

const bootstrap = async () => {
  await enableMocking();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </StrictMode>,
  );
};

void bootstrap();
