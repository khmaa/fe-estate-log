import { Badge } from '@shared-ui/core';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet } from 'react-router-dom';

const navigationLinkClassName = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-full px-4 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-foreground text-background'
      : 'bg-background text-muted-foreground hover:bg-muted hover:text-foreground',
  ].join(' ');

const AppShell = () => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (language: 'en' | 'ko') => {
    void i18n.changeLanguage(language);
  };

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-surface/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <Badge>fe-estate-log</Badge>
            <p className="text-sm text-muted-foreground">
              {t('app.brandDescription')}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <nav className="flex flex-wrap items-center gap-2">
              <NavLink to="/visit-logs" className={navigationLinkClassName}>
                {t('app.nav.visitLogs')}
              </NavLink>
              <NavLink to="/showcase" className={navigationLinkClassName}>
                {t('app.nav.showcase')}
              </NavLink>
            </nav>
            <div
              className="flex items-center gap-2 rounded-full border border-border bg-background px-2 py-1"
              aria-label={t('app.language.label')}
            >
              <button
                type="button"
                className={[
                  'rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                  i18n.language === 'en'
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                ].join(' ')}
                onClick={() => handleLanguageChange('en')}
              >
                {t('app.language.en')}
              </button>
              <button
                type="button"
                className={[
                  'rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                  i18n.language === 'ko'
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                ].join(' ')}
                onClick={() => handleLanguageChange('ko')}
              >
                {t('app.language.ko')}
              </button>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export { AppShell };
