import type React from 'react';
import { cn } from '../utils/cn';
import { Badge } from './Badge';
import { Button } from './Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card';

type EmptyStateProps = React.HTMLAttributes<HTMLDivElement> & {
  action?: React.ReactNode;
  badge?: string;
  description: string;
  title: string;
};

const EmptyState = ({
  action,
  badge,
  className,
  description,
  title,
  ...props
}: EmptyStateProps) => {
  return (
    <Card
      {...props}
      className={cn('flex flex-col items-start text-left', className)}
    >
      <CardHeader className="max-w-2xl">
        {badge ? <Badge variant="secondary">{badge}</Badge> : null}
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {action ? (
        <CardFooter>{action}</CardFooter>
      ) : (
        <CardContent className="hidden" />
      )}
    </Card>
  );
};

const EmptyStateAction = Button;

export { EmptyState, EmptyStateAction };
export type { EmptyStateProps };
