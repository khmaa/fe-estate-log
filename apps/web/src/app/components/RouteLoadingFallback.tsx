import { Skeleton } from '@shared-ui/core';
import { useTranslation } from 'react-i18next';

const RouteLoadingFallback = () => {
  const { t } = useTranslation();

  return (
    <main
      className="min-h-[calc(100vh-89px)] px-6 py-16"
      aria-label={t('app.routeLoading.label')}
    >
      <section className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-wrap items-center gap-3">
          <Skeleton className="h-7 w-28 rounded-full" />
          <Skeleton className="h-7 w-32 rounded-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 w-full max-w-lg" />
          <Skeleton className="h-5 w-full max-w-3xl" />
          <Skeleton className="h-5 w-full max-w-2xl" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-72 rounded-[28px]" />
          <Skeleton className="h-72 rounded-[28px]" />
        </div>
      </section>
    </main>
  );
};

export { RouteLoadingFallback };
