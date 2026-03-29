import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from '../Switch';

describe('Switch', () => {
  it('renders as a checkbox input', () => {
    render(<Switch aria-label="Auto save" />);
    expect(
      screen.getByRole('checkbox', { name: 'Auto save' }),
    ).toBeInTheDocument();
  });

  it('supports the checked state', () => {
    render(<Switch aria-label="Notifications" defaultChecked />);
    expect(
      screen.getByRole('checkbox', { name: 'Notifications' }),
    ).toBeChecked();
  });

  it('respects the disabled state', () => {
    render(<Switch aria-label="Disabled switch" disabled />);
    expect(
      screen.getByRole('checkbox', { name: 'Disabled switch' }),
    ).toBeDisabled();
  });

  it('calls onChange when toggled', () => {
    const handleChange = vi.fn();
    render(<Switch aria-label="Live updates" onChange={handleChange} />);

    fireEvent.click(screen.getByRole('checkbox', { name: 'Live updates' }));

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
