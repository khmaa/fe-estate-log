import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@shared-ui/core';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <main className="min-h-[calc(100vh-89px)] px-6 py-16">
      <section className="mx-auto flex max-w-3xl flex-col gap-8">
        <Card className="overflow-hidden">
          <CardHeader className="gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="warning">404</Badge>
              <Badge variant="secondary">Route Not Found</Badge>
            </div>
            <CardTitle>Page not found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm leading-6 text-muted-foreground">
              The route you requested is not available in the current web
              workspace. Use the primary navigation or go back to the visit logs
              page.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex h-11 items-center justify-center rounded-ui bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-soft transition-colors duration-200 hover:bg-primary-hover"
              >
                Go to visit logs
              </Link>
              <Link
                to="/showcase"
                className="inline-flex h-11 items-center justify-center rounded-ui bg-secondary px-4 text-sm font-semibold text-secondary-foreground ring-1 ring-border transition-colors duration-200 hover:bg-secondary-hover"
              >
                Open showcase
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export { NotFoundPage };
