import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppProviders } from '../AppProviders';
import { RouteLoadingFallback } from './RouteLoadingFallback';

describe('RouteLoadingFallback', () => {
  it('renders the route loading fallback container', () => {
    render(
      <AppProviders>
        <RouteLoadingFallback />
      </AppProviders>,
    );

    expect(screen.getByLabelText('Loading route content')).toBeInTheDocument();
  });
});
