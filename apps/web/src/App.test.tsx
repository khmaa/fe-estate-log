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
      await screen.findByText('삼성동 한강뷰 아파트 재방문'),
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

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'Jamsil riverside draft' },
    });
    fireEvent.change(screen.getByLabelText('District'), {
      target: { value: 'Songpa-gu' },
    });
    fireEvent.change(screen.getByLabelText('Price'), {
      target: { value: 'KRW 1.35B' },
    });
    fireEvent.change(screen.getByLabelText('Summary'), {
      target: {
        value: 'Need to validate parking flow and evening commuter traffic.',
      },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create draft' }));

    expect(await screen.findByText('Visit log created')).toBeInTheDocument();
    expect(
      screen.getByText(
        'The new draft has been added through the feature mutation flow.',
      ),
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Jamsil riverside draft'),
    ).toBeInTheDocument();
  });

  it('filters the list by pinned visit logs only', async () => {
    renderApp();

    expect(
      await screen.findByText('삼성동 한강뷰 아파트 재방문'),
    ).toBeInTheDocument();

    fireEvent.click(
      await screen.findByRole('button', { name: 'Advanced filters' }),
    );

    const toggle = screen.getByRole('checkbox', {
      name: 'Show pinned visit logs only',
    });

    fireEvent.click(toggle);

    expect(screen.getByText('삼성동 한강뷰 아파트 재방문')).toBeInTheDocument();
    expect(
      screen.queryByText('성수 복합용도 오피스 층'),
    ).not.toBeInTheDocument();
  });
});
