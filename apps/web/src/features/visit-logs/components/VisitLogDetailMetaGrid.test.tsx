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

    expect(screen.getByText('District')).toBeInTheDocument();
    expect(screen.getByText('Gangnam-gu')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('KRW 1.28B')).toBeInTheDocument();
    expect(screen.getByText('Visited')).toBeInTheDocument();
    expect(screen.getByText('Mar 27, 2026')).toBeInTheDocument();
    expect(screen.getByText('Agent')).toBeInTheDocument();
    expect(screen.getByText('Minji Park')).toBeInTheDocument();
  });
});
