import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { VisitLogDetailBadges } from './VisitLogDetailBadges';

describe('VisitLogDetailBadges', () => {
  it('renders status, property type, and pinned badges', () => {
    render(
      <VisitLogDetailBadges
        isPinned
        propertyType="apartment"
        status="completed"
      />,
    );

    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Apartment')).toBeInTheDocument();
    expect(screen.getByText('Pinned')).toBeInTheDocument();
  });

  it('omits the pinned badge for unpinned visit logs', () => {
    render(
      <VisitLogDetailBadges
        isPinned={false}
        propertyType="office"
        status="scheduled"
      />,
    );

    expect(screen.getByText('Scheduled')).toBeInTheDocument();
    expect(screen.getByText('Office')).toBeInTheDocument();
    expect(screen.queryByText('Pinned')).not.toBeInTheDocument();
  });
});
