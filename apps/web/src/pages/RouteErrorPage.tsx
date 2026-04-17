import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@shared-ui/core';
import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

const RouteErrorPage = () => {
  const { t } = useTranslation();
  const error = useRouteError();

  const status = isRouteErrorResponse(error) ? String(error.status) : '500';
  const description = isRouteErrorResponse(error)
    ? t('routeError.responseDescription', {
        status: error.status,
        statusText: error.statusText,
      })
    : t('routeError.description');

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto flex max-w-3xl flex-col gap-8">
        <Card className="overflow-hidden">
          <CardHeader className="gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="warning">{status}</Badge>
              <Badge variant="secondary">{t('routeError.badge')}</Badge>
            </div>
            <CardTitle>{t('routeError.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm leading-6 text-muted-foreground">
              {description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/visit-logs"
                className="inline-flex h-11 items-center justify-center rounded-ui bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-soft transition-colors duration-200 hover:bg-primary-hover"
              >
                {t('routeError.actions.visitLogs')}
              </Link>
              <Link
                to="/showcase"
                className="inline-flex h-11 items-center justify-center rounded-ui bg-secondary px-4 text-sm font-semibold text-secondary-foreground ring-1 ring-border transition-colors duration-200 hover:bg-secondary-hover"
              >
                {t('routeError.actions.showcase')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export { RouteErrorPage };
