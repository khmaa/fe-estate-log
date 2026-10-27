import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Field } from '../Field';
import { Input } from '../Input';

describe('Field', () => {
  it('renders helper text and wires aria-describedby', () => {
    render(
      <Field
        htmlFor="email"
        label="Email"
        helperText="We will never share your email."
      >
        <Input type="email" />
      </Field>,
    );

    expect(
      screen.getByText('We will never share your email.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-describedby',
      'email-helper',
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'email');
  });

  it('merges an existing aria-describedby value', () => {
    render(
      <Field
        htmlFor="company"
        label="Company"
        helperText="This will be shown on your profile."
      >
        <Input
          aria-describedby="custom-description"
          aria-errormessage="custom-error"
        />
      </Field>,
    );

    const textbox = screen.getByRole('textbox');
    expect(textbox).toHaveAttribute(
      'aria-describedby',
      'custom-description company-helper',
    );
    expect(textbox).toHaveAttribute('aria-errormessage', 'custom-error');
  });

  it('renders error text and marks the control as invalid', () => {
    render(
      <Field htmlFor="password" label="Password" error="Password is required.">
        <Input type="password" />
      </Field>,
    );

    const textbox = screen.getByLabelText('Password');
    expect(screen.getByText('Password is required.')).toBeInTheDocument();
    expect(textbox).toHaveAttribute('aria-invalid', 'true');
    expect(textbox).toHaveAttribute('aria-describedby', 'password-error');
    expect(textbox).toHaveAttribute('aria-errormessage', 'password-error');
  });

  it('marks the control as required and hides the visual indicator', () => {
    render(
      <Field htmlFor="name" label="Full name" required>
        <Input />
      </Field>,
    );

    expect(screen.getByLabelText('Full name')).toBeRequired();
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('shows the required indicator when the child control is required', () => {
    render(
      <Field htmlFor="phone" label="Phone">
        <Input required />
      </Field>,
    );

    expect(screen.getByLabelText('Phone')).toBeRequired();
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('disables the control and styles the complete field', () => {
    render(
      <Field disabled htmlFor="email" label="Email">
        <Input />
      </Field>,
    );

    const textbox = screen.getByLabelText('Email');
    expect(textbox).toBeDisabled();
    expect(textbox.parentElement).toHaveClass(
      'cursor-not-allowed',
      'opacity-70',
    );
  });

  it('styles the complete field when its child control is disabled', () => {
    render(
      <Field htmlFor="company" label="Company">
        <Input disabled />
      </Field>,
    );

    const textbox = screen.getByLabelText('Company');
    expect(textbox).toBeDisabled();
    expect(textbox.parentElement).toHaveClass(
      'cursor-not-allowed',
      'opacity-70',
    );
  });
});
