import { render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppProviders } from '../app/AppProviders';
import { RouteErrorPage } from './RouteErrorPage';

const renderRouteError = (routes: RouteObject[], initialEntry = '/') => {
  const router = createMemoryRouter(routes, {
    initialEntries: [initialEntry],
  });

  return render(
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>,
  );
};

describe('RouteErrorPage', () => {
  it('renders a route response failure', async () => {
    renderRouteError([
      {
        path: '/',
        loader: () => {
          throw new Response(null, {
            status: 503,
            statusText: 'Service Unavailable',
          });
        },
        element: <div>ok</div>,
        errorElement: <RouteErrorPage />,
      },
    ]);

    expect(
      await screen.findByRole('heading', { name: 'Route failed to render' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/^503$/)).toBeInTheDocument();
    expect(
      screen.getByText(
        'The route returned 503 Service Unavailable before the page could render normally. Return to a stable page and try again.',
      ),
    ).toBeInTheDocument();
  });

  it('renders a generic route error fallback', async () => {
    renderRouteError([
      {
        path: '/',
        element: <div>ok</div>,
        errorElement: <RouteErrorPage />,
        children: [
          {
            path: '/',
            loader: () => {
              throw new Error('boom');
            },
            element: <div>broken</div>,
          },
        ],
      },
    ]);

    expect(
      await screen.findByRole('heading', { name: 'Route failed to render' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/^500$/)).toBeInTheDocument();
    expect(
      screen.getByText(
        'The current route failed before the page could render normally. Return to a stable page and try again.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Go to visit logs' }),
    ).toHaveAttribute('href', '/visit-logs');
  });
});
