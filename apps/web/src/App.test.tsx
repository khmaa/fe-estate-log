import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';
import { AppProviders } from './app/AppProviders';

const renderApp = (route = '/') => {
  window.history.pushState({}, '', route);

  return render(
    <AppProviders>
      <App />
    </AppProviders>,
  );
};

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

  it('renders the showcase page on the showcase route', async () => {
    renderApp('/showcase');

    expect(
      await screen.findByRole('heading', { name: 'Shared UI Showcase' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Showcase' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('renders the not found page on an unknown route', async () => {
    renderApp('/missing-route');

    expect(
      await screen.findByRole('heading', { name: 'Page not found' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Go to visit logs' }),
    ).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Open showcase' })).toHaveAttribute(
      'href',
      '/showcase',
    );
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

  it('updates an existing visit log from the detail dialog', async () => {
    renderApp();

    expect(
      await screen.findByText('삼성동 한강뷰 아파트 재방문'),
    ).toBeInTheDocument();

    fireEvent.click(
      (await screen.findAllByRole('button', { name: 'Review note' }))[0],
    );

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));

    expect(
      await screen.findByRole('heading', { name: 'Edit visit log' }),
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: '삼성동 한강뷰 아파트 수정 메모' },
    });
    fireEvent.change(screen.getByLabelText('District'), {
      target: { value: '송파구' },
    });
    fireEvent.change(screen.getByLabelText('Price'), {
      target: { value: 'KRW 1.40B' },
    });
    fireEvent.change(screen.getByLabelText('Summary'), {
      target: { value: '업데이트된 현장 메모입니다.' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

    expect(await screen.findByText('Visit log updated')).toBeInTheDocument();
    expect(
      screen.getByText(
        'The latest edits were synced through the feature mutation flow.',
      ),
    ).toBeInTheDocument();
    expect(
      await screen.findByText('삼성동 한강뷰 아파트 수정 메모'),
    ).toBeInTheDocument();
  });

  it('deletes an existing visit log from the detail dialog', async () => {
    renderApp();

    expect(
      await screen.findByText('삼성동 한강뷰 아파트 재방문'),
    ).toBeInTheDocument();

    fireEvent.click(
      (await screen.findAllByRole('button', { name: 'Review note' }))[0],
    );
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(
      await screen.findByRole('heading', { name: 'Delete visit log' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(await screen.findByText('Visit log deleted')).toBeInTheDocument();
    expect(
      screen.getByText(
        'The selected visit log was removed through the feature mutation flow.',
      ),
    ).toBeInTheDocument();
  });
});
