import { Skeleton } from '@shared-ui/core';

const VisitLogListSkeleton = () => {
  return (
    <div className="grid gap-6" data-testid="visit-log-list-skeleton">
      {Array.from({ length: 2 }, (_, index) => (
        <div
          key={index}
          className="rounded-[28px] border border-border bg-surface p-6 shadow-soft"
          data-testid="visit-log-card-skeleton"
        >
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <Skeleton className="h-8 w-72 max-w-full" />
              </div>
              <Skeleton className="h-11 w-24" />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-11 w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { VisitLogListSkeleton };
