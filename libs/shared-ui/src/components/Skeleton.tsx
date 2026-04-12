import type React from 'react';
import { cn } from '../utils/cn';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      {...props}
      aria-hidden="true"
      className={cn('animate-pulse rounded-ui bg-muted', className)}
    />
  );
};

export { Skeleton };
export type { SkeletonProps };
