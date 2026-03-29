import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CheckboxField } from '../CheckboxField';

describe('CheckboxField', () => {
  it('renders the checkbox with its label', () => {
    render(<CheckboxField id="terms" label="Accept terms" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('renders helper text and wires aria-describedby', () => {
    render(
      <CheckboxField
        id="updates"
        label="Receive updates"
        helperText="We will only send product announcements."
      />,
    );

    expect(
      screen.getByText('We will only send product announcements.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-describedby',
      'updates-helper',
    );
  });

  it('renders error text and marks the checkbox as invalid', () => {
    render(
      <CheckboxField
        id="policy"
        label="Accept policy"
        error="You must accept the policy."
      />,
    );

    expect(screen.getByText('You must accept the policy.')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-describedby',
      'policy-error',
    );
  });

  it('calls onChange when toggled', () => {
    const handleChange = vi.fn();
    render(
      <CheckboxField
        id="marketing"
        label="Receive marketing emails"
        onChange={handleChange}
      />,
    );

    fireEvent.click(screen.getByRole('checkbox'));

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
