import { Badge } from '@shared-ui/core';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { AppRoutes } from './app/AppRoutes';

const navigationLinkClassName = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-full px-4 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-foreground text-background'
      : 'bg-background text-muted-foreground hover:bg-muted hover:text-foreground',
  ].join(' ');

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface">
        <header className="border-b border-border bg-surface/95 px-6 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <Badge>fe-estate-log</Badge>
              <p className="text-sm text-muted-foreground">
                Route-based app shell for the web workspace.
              </p>
            </div>
            <nav className="flex flex-wrap items-center gap-2">
              <NavLink to="/" end className={navigationLinkClassName}>
                Visit Logs
              </NavLink>
              <NavLink to="/showcase" className={navigationLinkClassName}>
                Showcase
              </NavLink>
            </nav>
          </div>
        </header>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
