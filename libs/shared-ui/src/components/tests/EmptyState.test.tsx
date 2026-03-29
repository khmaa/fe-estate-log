import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EmptyState, EmptyStateAction } from '../EmptyState';

describe('EmptyState', () => {
  it('renders the title and description', () => {
    render(
      <EmptyState
        title="No saved notes"
        description="Add a new note to start tracking your property visits."
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'No saved notes' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Add a new note to start tracking your property visits.',
      ),
    ).toBeInTheDocument();
  });

  it('renders an action when provided', () => {
    render(
      <EmptyState
        title="No search results"
        description="Try a broader filter range."
        action={<EmptyStateAction>Reset filters</EmptyStateAction>}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Reset filters' }),
    ).toBeInTheDocument();
  });

  it('renders a badge when provided', () => {
    render(
      <EmptyState
        badge="Search"
        title="No search results"
        description="Try a broader filter range."
      />,
    );

    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
