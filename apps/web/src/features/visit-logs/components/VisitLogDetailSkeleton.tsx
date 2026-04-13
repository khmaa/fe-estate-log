import { Skeleton } from '@shared-ui/core';

const VisitLogDetailSkeleton = () => {
  return (
    <main className="min-h-screen px-6 py-16">
      <section
        className="mx-auto flex max-w-4xl flex-col gap-8"
        data-testid="visit-log-detail-skeleton"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Skeleton className="h-11 w-40" />
          <div className="flex gap-3">
            <Skeleton className="h-11 w-24" />
            <Skeleton className="h-11 w-24" />
          </div>
        </div>

        <div className="rounded-[28px] border border-border bg-surface p-8 shadow-soft">
          <div className="space-y-6">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-10 w-3/4 max-w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export { VisitLogDetailSkeleton };
