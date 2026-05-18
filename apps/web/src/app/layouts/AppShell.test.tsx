import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { i18n } from '../i18n';
import { AppShell } from './AppShell';

vi.mock('../config/demoMode', () => ({
  isDemoModeEnabled: vi.fn(),
}));

const { isDemoModeEnabled } = vi.mocked(await import('../config/demoMode'));

const renderShell = () => {
  return render(
    <MemoryRouter initialEntries={['/visit-logs']}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/visit-logs" element={<main>Visit logs route</main>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
};

describe('AppShell', () => {
  afterEach(() => {
    isDemoModeEnabled.mockReset();
  });

  it('renders the demo mode indicator when demo mode is enabled', () => {
    isDemoModeEnabled.mockReturnValue(true);

    renderShell();

    expect(screen.getByText('Demo mode')).toBeInTheDocument();
    expect(screen.getByText('Mock data')).toBeInTheDocument();
  });

  it('omits the demo mode indicator when demo mode is disabled', () => {
    isDemoModeEnabled.mockReturnValue(false);

    renderShell();

    expect(screen.queryByText('Demo mode')).not.toBeInTheDocument();
    expect(screen.queryByText('Mock data')).not.toBeInTheDocument();
  });

  it('renders localized demo mode copy', async () => {
    await i18n.changeLanguage('ko');
    isDemoModeEnabled.mockReturnValue(true);

    renderShell();

    expect(screen.getByText('데모 모드')).toBeInTheDocument();
    expect(screen.getByText('Mock 데이터')).toBeInTheDocument();
  });
});
