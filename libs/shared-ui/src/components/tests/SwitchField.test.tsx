import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SwitchField } from '../SwitchField';

describe('SwitchField', () => {
  it('associates the label and toggles the switch', () => {
    const handleChange = vi.fn();
    render(
      <SwitchField label="Release notifications" onChange={handleChange} />,
    );

    const toggle = screen.getByRole('switch', {
      name: 'Release notifications',
    });

    fireEvent.click(screen.getByText('Release notifications'));

    expect(toggle).toBeChecked();
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('connects helper text to the switch', () => {
    render(
      <SwitchField
        id="notifications"
        label="Release notifications"
        helperText="Receive a digest when shared UI changes."
      />,
    );

    expect(
      screen.getByRole('switch', { name: 'Release notifications' }),
    ).toHaveAccessibleDescription('Receive a digest when shared UI changes.');
  });

  it('merges an existing description reference', () => {
    render(
      <>
        <p id="account-description">Applied to your account.</p>
        <SwitchField
          id="notifications"
          label="Release notifications"
          helperText="Receive a digest when shared UI changes."
          aria-describedby="account-description"
        />
      </>,
    );

    expect(
      screen.getByRole('switch', { name: 'Release notifications' }),
    ).toHaveAttribute(
      'aria-describedby',
      'account-description notifications-helper',
    );
  });

  it('connects an error message and invalid state', () => {
    render(
      <SwitchField
        id="notifications"
        label="Release notifications"
        error="Choose a notification preference."
      />,
    );

    const toggle = screen.getByRole('switch', {
      name: 'Release notifications',
    });

    expect(toggle).toHaveAttribute('aria-invalid', 'true');
    expect(toggle).toHaveAttribute('aria-errormessage', 'notifications-error');
    expect(toggle).toHaveAccessibleDescription(
      'Choose a notification preference.',
    );
  });

  it('shows a decorative required indicator', () => {
    render(<SwitchField label="Release notifications" required />);

    expect(
      screen.getByRole('switch', { name: 'Release notifications' }),
    ).toBeRequired();
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('blocks changes while disabled', () => {
    const handleChange = vi.fn();
    render(
      <SwitchField
        label="Release notifications"
        disabled
        onChange={handleChange}
      />,
    );

    const toggle = screen.getByRole('switch', {
      name: 'Release notifications',
    });
    fireEvent.click(toggle);

    expect(toggle).toBeDisabled();
    expect(handleChange).not.toHaveBeenCalled();
  });
});
