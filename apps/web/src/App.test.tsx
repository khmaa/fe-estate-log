import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';
import { AppProviders } from './app/AppProviders';
import { resetVisitLogsMock } from './features/visit-logs/mocks/visitLogs.data';

const renderApp = (route = '/') => {
  window.history.pushState({}, '', route);

  return render(
    <AppProviders>
      <App />
    </AppProviders>,
  );
};

const openVisitLogDetails = async (title: string) => {
  const titleElement = await screen.findByText(title);
  const card =
    titleElement.closest('[class*="rounded-[28px]"]') ??
    titleElement.closest('div');

  if (!(card instanceof HTMLElement)) {
    throw new Error(`Could not find a visit log card for "${title}"`);
  }

  fireEvent.click(within(card).getByRole('button', { name: 'Review note' }));
};

describe('App', () => {
  beforeEach(() => {
    resetVisitLogsMock();
  });

  it('renders the visit logs workspace page', async () => {
    renderApp();

    expect(
      await screen.findByRole('heading', { name: 'Visit logs workspace' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Search visit logs')).toBeInTheDocument();
    expect(screen.getByLabelText('Page size')).toHaveValue('2');
    expect(
      screen.getByRole('button', { name: 'Create visit log' }),
    ).toBeInTheDocument();
    expect(
      await screen.findByText('삼성동 한강뷰 아파트 재방문'),
    ).toBeInTheDocument();
  });

  it('switches the app shell and visit logs copy to Korean', async () => {
    renderApp();

    fireEvent.click(screen.getByRole('button', { name: 'KO' }));

    expect(
      await screen.findByRole('heading', { name: '임장 기록 워크스페이스' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '임장 기록' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(
      screen.getByRole('button', { name: '임장 기록 생성' }),
    ).toBeInTheDocument();
    expect(
      (await screen.findAllByRole('button', { name: '기록 검토' })).length,
    ).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole('button', { name: '임장 기록 생성' }));

    expect(
      await screen.findByRole('heading', { name: '새 임장 기록 만들기' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('제목')).toBeInTheDocument();
    expect(screen.getByLabelText('지역')).toBeInTheDocument();
    expect(screen.getByLabelText('가격')).toBeInTheDocument();
    expect(screen.getByLabelText('요약')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '초안 생성' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '취소' }));

    fireEvent.click(screen.getByRole('button', { name: 'EN' }));

    expect(
      await screen.findByRole('heading', { name: 'Visit logs workspace' }),
    ).toBeInTheDocument();
  });

  it('hydrates visit log filters from the query string', async () => {
    renderApp(
      '/visit-logs?query=%EA%B0%95%EB%82%A8&sort=district&pinned=true&page=2',
    );

    expect(
      await screen.findByRole('heading', { name: 'Visit logs workspace' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Search visit logs')).toHaveValue('강남');
    expect(screen.getByLabelText('Sort by')).toHaveValue('district');
    fireEvent.click(screen.getByRole('button', { name: 'Advanced filters' }));
    expect(
      await screen.findByRole('checkbox', {
        name: 'Pinned only',
      }),
    ).toBeChecked();
    expect(screen.getByText('Active filters')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Clear Search: 강남 filter' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Clear Sort: District filter' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Clear Pinned only filter' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Clear Page: 2 filter' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Next' })).toBeNull();
  });

  it('switches active filter remove labels to Korean', async () => {
    renderApp(
      '/visit-logs?query=%EA%B0%95%EB%82%A8&sort=district&pinned=true&page=2',
    );

    fireEvent.click(screen.getByRole('button', { name: 'KO' }));

    expect(
      await screen.findByRole('button', { name: '검색: 강남 적용 해제' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '정렬: 지역순 적용 해제' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '고정된 기록만 보기 적용 해제' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '페이지: 2 적용 해제' }),
    ).toBeInTheDocument();
  });

  it('resets visit log filters back to the default url state', async () => {
    renderApp(
      '/visit-logs?query=%EA%B0%95%EB%82%A8&sort=district&pinned=true&page=2&pageSize=5',
    );

    expect(
      await screen.findByRole('button', { name: 'Reset filters' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Reset filters' }));

    expect(screen.getByLabelText('Search visit logs')).toHaveValue('');
    expect(screen.getByLabelText('Sort by')).toHaveValue('latest');
    expect(screen.getByLabelText('Page size')).toHaveValue('2');
    expect(window.location.search).toBe('');
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

  it('switches the showcase page copy to Korean', async () => {
    renderApp('/showcase');

    fireEvent.click(screen.getByRole('button', { name: 'KO' }));

    expect(
      await screen.findByRole('heading', { name: '공용 UI 쇼케이스' }),
    ).toBeInTheDocument();
    expect(screen.getByText('쇼케이스 미리보기 모드')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '성공 토스트 보기' }),
    ).toBeInTheDocument();
    expect(screen.getByText('이메일')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '아파트' })).toBeInTheDocument();
  });

  it('renders the not found page on an unknown route', async () => {
    renderApp('/missing-route');

    expect(
      await screen.findByRole('heading', { name: 'Page not found' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Go to visit logs' }),
    ).toHaveAttribute('href', '/visit-logs');
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
      name: 'Pinned only',
    });

    fireEvent.click(toggle);

    expect(
      await screen.findByText('삼성동 한강뷰 아파트 재방문'),
    ).toBeInTheDocument();
    expect(screen.queryByText('성수 복합용도 오피스 층')).toBeNull();
  });

  it('updates an existing visit log from the detail dialog', async () => {
    renderApp();

    expect(
      await screen.findByText('삼성동 한강뷰 아파트 재방문'),
    ).toBeInTheDocument();

    await openVisitLogDetails('삼성동 한강뷰 아파트 재방문');

    expect(
      await screen.findByRole('heading', {
        name: '삼성동 한강뷰 아파트 재방문',
      }),
    ).toBeInTheDocument();
    fireEvent.click(await screen.findByRole('button', { name: 'Edit' }));

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
        '"삼성동 한강뷰 아파트 수정 메모" was updated and synced to the detail view.',
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

    await openVisitLogDetails('삼성동 한강뷰 아파트 재방문');

    expect(
      await screen.findByRole('heading', {
        name: '삼성동 한강뷰 아파트 재방문',
      }),
    ).toBeInTheDocument();
    fireEvent.click(await screen.findByRole('button', { name: 'Delete' }));

    expect(
      await screen.findByRole('heading', { name: 'Delete visit log' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(await screen.findByText('Visit log deleted')).toBeInTheDocument();
    expect(
      screen.getByText(
        '"삼성동 한강뷰 아파트 재방문" was removed from the current visit log workspace.',
      ),
    ).toBeInTheDocument();
  });

  it('renders a visit log detail page from a direct route', async () => {
    renderApp('/visit-logs/visit-log-3');

    expect(
      await screen.findByRole('heading', {
        name: '연남동 부티크 상가 코너',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Back to visit logs' }),
    ).toBeInTheDocument();
  });

  it('moves between visit log pages through the pagination controls', async () => {
    renderApp('/visit-logs');

    expect(
      await screen.findByText('삼성동 한강뷰 아파트 재방문'),
    ).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(
      await screen.findByText('연남동 부티크 상가 코너'),
    ).toBeInTheDocument();
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
  });

  it('updates the page size and resets the current page', async () => {
    renderApp('/visit-logs?page=2');

    expect(
      await screen.findByText('연남동 부티크 상가 코너'),
    ).toBeInTheDocument();
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Page size'), {
      target: { value: '5' },
    });

    expect(
      await screen.findByText('삼성동 한강뷰 아파트 재방문'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Page size')).toHaveValue('5');
    expect(screen.queryByText('Page 2 of 2')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Next' })).toBeNull();
    expect(screen.getByText('성수 복합용도 오피스 층')).toBeInTheDocument();
  });

  it('keeps search params when returning from a detail route', async () => {
    renderApp('/visit-logs/visit-log-1?query=%EA%B0%95%EB%82%A8');

    fireEvent.click(
      await screen.findByRole('button', { name: 'Back to visit logs' }),
    );

    expect(
      await screen.findByRole('heading', { name: 'Visit logs workspace' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Search visit logs')).toHaveValue('강남');
  });

  it('renders the visit log empty state for an unknown detail route', async () => {
    renderApp('/visit-logs/missing-log');

    expect(await screen.findByText('Visit log not found')).toBeInTheDocument();
  });
});
