import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { CheckboxProps } from '../Checkbox';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('renders as a checkbox input', () => {
    render(<Checkbox aria-label="Accept terms" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('keeps checkbox behavior when an unsupported runtime type is passed', () => {
    const unsupportedProps = {
      type: 'radio',
    } as unknown as CheckboxProps;

    render(<Checkbox {...unsupportedProps} aria-label="Accept terms" />);

    expect(
      screen.getByRole('checkbox', { name: 'Accept terms' }),
    ).toHaveAttribute('type', 'checkbox');
  });

  it('supports the checked state', () => {
    render(<Checkbox aria-label="Subscribe" defaultChecked />);
    expect(screen.getByRole('checkbox', { name: 'Subscribe' })).toBeChecked();
  });

  it('respects the disabled state', () => {
    render(<Checkbox aria-label="Disabled checkbox" disabled />);
    expect(
      screen.getByRole('checkbox', { name: 'Disabled checkbox' }),
    ).toBeDisabled();
  });

  it('supports a disabled checked state', () => {
    render(<Checkbox aria-label="Locked selection" disabled defaultChecked />);
    expect(
      screen.getByRole('checkbox', { name: 'Locked selection' }),
    ).toBeDisabled();
    expect(
      screen.getByRole('checkbox', { name: 'Locked selection' }),
    ).toBeChecked();
  });

  it('calls onChange when toggled', () => {
    const handleChange = vi.fn();
    render(<Checkbox aria-label="Receive updates" onChange={handleChange} />);

    fireEvent.click(screen.getByRole('checkbox', { name: 'Receive updates' }));

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
