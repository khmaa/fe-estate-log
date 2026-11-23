import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { VisitLogDetailMetaGrid } from './VisitLogDetailMetaGrid';

describe('VisitLogDetailMetaGrid', () => {
  it('renders visit log metadata', () => {
    render(
      <VisitLogDetailMetaGrid
        agentName="Minji Park"
        district="Gangnam-gu"
        priceLabel="KRW 1.28B"
        visitedAt="2026-03-27T10:30:00.000Z"
      />,
    );

    expect(screen.getByText('District').tagName).toBe('DT');
    expect(screen.getByText('Gangnam-gu').tagName).toBe('DD');
    expect(screen.getByText('Price').tagName).toBe('DT');
    expect(screen.getByText('KRW 1.28B').tagName).toBe('DD');
    expect(screen.getByText('Visited').tagName).toBe('DT');
    expect(screen.getByText('Mar 27, 2026').tagName).toBe('DD');
    expect(screen.getByText('Agent').tagName).toBe('DT');
    expect(screen.getByText('Minji Park').tagName).toBe('DD');
    expect(document.querySelectorAll('dl')).toHaveLength(1);
    expect(document.querySelectorAll('dt')).toHaveLength(4);
    expect(document.querySelectorAll('dd')).toHaveLength(4);
  });
});
