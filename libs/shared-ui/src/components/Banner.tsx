import type React from 'react';
import { cn } from '../utils/cn';

const bannerVariants = {
  info: 'border-info bg-info-soft text-foreground',
  success: 'border-success bg-success-soft text-foreground',
  warning: 'border-warning bg-warning-soft text-foreground',
} as const;

type BannerVariant = keyof typeof bannerVariants;

type BannerProps = React.HTMLAttributes<HTMLDivElement> & {
  action?: React.ReactNode;
  description: string;
  title: string;
  variant?: BannerVariant;
};

const Banner = ({
  action,
  className,
  description,
  title,
  variant = 'info',
  ...props
}: BannerProps) => {
  return (
    <div
      {...props}
      role="status"
      className={cn(
        'flex flex-col gap-4 rounded-ui border px-5 py-4 shadow-soft sm:flex-row sm:items-center sm:justify-between',
        bannerVariants[variant],
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-sm font-semibold leading-5">{title}</p>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {action ? (
        <div className="flex shrink-0 items-center gap-3">{action}</div>
      ) : null}
    </div>
  );
};

export { Banner };
export type { BannerProps, BannerVariant };
