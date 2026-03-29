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
        <Input aria-describedby="custom-description" />
      </Field>,
    );

    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-describedby',
      'custom-description company-helper',
    );
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
  });

  it('renders the required indicator', () => {
    render(
      <Field htmlFor="name" label="Full name" required>
        <Input />
      </Field>,
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
