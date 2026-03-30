import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';
import { AppProviders } from './app/AppProviders';

const renderApp = () =>
  render(
    <AppProviders>
      <App />
    </AppProviders>,
  );

describe('App', () => {
  it('renders the visit logs workspace page', async () => {
    renderApp();

    expect(
      await screen.findByRole('heading', { name: 'Visit logs workspace' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Search visit logs')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Create visit log' }),
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Samsung-dong river-view apartment'),
    ).toBeInTheDocument();
  });

  it('opens the create dialog and shows a toast after creating a draft', async () => {
    renderApp();

    fireEvent.click(
      await screen.findByRole('button', { name: 'Create visit log' }),
    );

    expect(
      screen.getByRole('heading', { name: 'Create a new visit log' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Create draft' }));

    expect(await screen.findByText('Draft flow prepared')).toBeInTheDocument();
    expect(
      screen.getByText(
        'The visit-logs page is ready for a real create mutation once the API is wired in.',
      ),
    ).toBeInTheDocument();
  });

  it('filters the list by pinned visit logs only', async () => {
    renderApp();

    fireEvent.click(
      await screen.findByRole('button', { name: 'Advanced filters' }),
    );

    const toggle = screen.getByRole('checkbox', {
      name: 'Show pinned visit logs only',
    });

    fireEvent.click(toggle);

    expect(
      screen.getByText('Samsung-dong river-view apartment'),
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Seongsu mixed-use office floor'),
    ).not.toBeInTheDocument();
  });
});
