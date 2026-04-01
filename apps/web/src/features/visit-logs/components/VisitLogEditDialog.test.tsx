import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AppProviders } from '../../../app/AppProviders';
import { VisitLogEditDialog } from './VisitLogEditDialog';

const visitLog = {
  id: 'visit-log-1',
  title: '삼성동 한강뷰 아파트 재방문',
  district: '강남구',
  propertyType: 'apartment' as const,
  status: 'completed' as const,
  visitedAt: '2026-03-27T10:30:00.000Z',
  priceLabel: 'KRW 1.28B',
  agentName: '박민지',
  isPinned: true,
  summary: '초기 메모입니다.',
};

describe('VisitLogEditDialog', () => {
  it('renders the current visit log values when opened', () => {
    render(
      <AppProviders>
        <VisitLogEditDialog
          log={visitLog}
          open
          onOpenChange={vi.fn()}
          onUpdated={vi.fn()}
        />
      </AppProviders>,
    );

    expect(screen.getByLabelText('Title')).toHaveValue(visitLog.title);
    expect(screen.getByLabelText('District')).toHaveValue(visitLog.district);
    expect(screen.getByLabelText('Price')).toHaveValue(visitLog.priceLabel);
    expect(screen.getByLabelText('Summary')).toHaveValue(visitLog.summary);
  });

  it('updates a visit log and resets the form when the dialog closes', async () => {
    const onUpdated = vi.fn();
    const onOpenChange = vi.fn();

    const { rerender } = render(
      <AppProviders>
        <VisitLogEditDialog
          log={visitLog}
          open
          onOpenChange={onOpenChange}
          onUpdated={onUpdated}
        />
      </AppProviders>,
    );

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: '수정된 메모 제목' },
    });
    fireEvent.change(screen.getByLabelText('District'), {
      target: { value: '송파구' },
    });
    fireEvent.change(screen.getByLabelText('Price'), {
      target: { value: 'KRW 1.40B' },
    });
    fireEvent.change(screen.getByLabelText('Summary'), {
      target: { value: '수정된 요약입니다.' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

    await waitFor(() => {
      expect(onUpdated).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'visit-log-1',
          title: '수정된 메모 제목',
          district: '송파구',
        }),
      );
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);

    rerender(
      <AppProviders>
        <VisitLogEditDialog
          log={visitLog}
          open={false}
          onOpenChange={onOpenChange}
          onUpdated={onUpdated}
        />
      </AppProviders>,
    );

    rerender(
      <AppProviders>
        <VisitLogEditDialog
          log={visitLog}
          open
          onOpenChange={onOpenChange}
          onUpdated={onUpdated}
        />
      </AppProviders>,
    );

    expect(screen.getByLabelText('Title')).toHaveValue(visitLog.title);
    expect(screen.getByLabelText('District')).toHaveValue(visitLog.district);
    expect(screen.getByLabelText('Price')).toHaveValue(visitLog.priceLabel);
    expect(screen.getByLabelText('Summary')).toHaveValue(visitLog.summary);
  });
});
