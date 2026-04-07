import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@shared-ui/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-[calc(100vh-89px)] px-6 py-16">
      <section className="mx-auto flex max-w-3xl flex-col gap-8">
        <Card className="overflow-hidden">
          <CardHeader className="gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="warning">404</Badge>
              <Badge variant="secondary">{t('notFound.badge')}</Badge>
            </div>
            <CardTitle>{t('notFound.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm leading-6 text-muted-foreground">
              {t('notFound.description')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/visit-logs"
                className="inline-flex h-11 items-center justify-center rounded-ui bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-soft transition-colors duration-200 hover:bg-primary-hover"
              >
                {t('notFound.actions.visitLogs')}
              </Link>
              <Link
                to="/showcase"
                className="inline-flex h-11 items-center justify-center rounded-ui bg-secondary px-4 text-sm font-semibold text-secondary-foreground ring-1 ring-border transition-colors duration-200 hover:bg-secondary-hover"
              >
                {t('notFound.actions.showcase')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export { NotFoundPage };
