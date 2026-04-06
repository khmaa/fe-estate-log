import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shared-ui/core';
import type { VisitLog } from '../types/visitLog';

const statusVariantMap = {
  completed: 'success',
  draft: 'secondary',
  scheduled: 'warning',
} as const;

type VisitLogCardProps = {
  log: VisitLog;
  onOpenDetails: (visitLogId: string) => void;
};

const formatVisitedAt = (visitedAt: string) => {
  return new Intl.DateTimeFormat('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(visitedAt));
};

const VisitLogCard = ({ log, onOpenDetails }: VisitLogCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={statusVariantMap[log.status]}>
                {log.status[0].toUpperCase()}
                {log.status.slice(1)}
              </Badge>
              <Badge variant="secondary">{log.propertyType}</Badge>
              {log.isPinned ? <Badge>Pinned</Badge> : null}
            </div>
            <CardTitle className="text-xl">{log.title}</CardTitle>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Visit log actions</DropdownMenuLabel>
              <DropdownMenuItem onSelect={() => onOpenDetails(log.id)}>
                Open details
              </DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-danger focus:bg-danger-soft/50">
                Archive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          <div>
            <p className="font-semibold text-foreground">District</p>
            <p>{log.district}</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Price</p>
            <p>{log.priceLabel}</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Visited</p>
            <p>{formatVisitedAt(log.visitedAt)}</p>
          </div>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{log.summary}</p>
        <div className="flex items-center justify-between gap-4 text-sm">
          <p className="text-muted-foreground">Handled by {log.agentName}</p>
          <Button variant="secondary" onClick={() => onOpenDetails(log.id)}>
            Review note
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { VisitLogCard };
