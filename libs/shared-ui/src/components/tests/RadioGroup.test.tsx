import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RadioGroup } from '../RadioGroup';

const options = [
  {
    value: 'email',
    label: 'Email',
    description: 'Use this for regular updates.',
  },
  {
    value: 'phone',
    label: 'Phone',
    description: 'Use this for urgent scheduling.',
  },
];

describe('RadioGroup', () => {
  it('renders the group label and radio options', () => {
    render(
      <RadioGroup
        label="Contact method"
        name="contact"
        options={options}
        value="email"
      />,
    );

    expect(
      screen.getByRole('radiogroup', { name: 'Contact method' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Email/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Phone/i })).toBeInTheDocument();
  });

  it('wires helper text through aria-describedby', () => {
    render(
      <RadioGroup
        label="Contact method"
        name="contact"
        options={options}
        value="email"
        helperText="Choose one method for follow-up."
      />,
    );

    expect(
      screen.getByText('Choose one method for follow-up.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'aria-describedby',
      'contact-helper',
    );
    expect(screen.getByRole('radio', { name: /Email/i })).toHaveAttribute(
      'aria-describedby',
      'contact-email-description contact-helper',
    );
  });

  it('uses helper text as aria-describedby when an option has no description', () => {
    render(
      <RadioGroup
        label="Contact method"
        name="contact"
        options={[
          {
            value: 'email',
            label: 'Email',
          },
          {
            value: 'phone',
            label: 'Phone',
            description: 'Use this for urgent scheduling.',
          },
        ]}
        value="email"
        helperText="Choose one method for follow-up."
      />,
    );

    expect(screen.getByRole('radio', { name: /Email/i })).toHaveAttribute(
      'aria-describedby',
      'contact-helper',
    );
  });

  it('marks the group as invalid when error text is present', () => {
    render(
      <RadioGroup
        label="Contact method"
        name="contact"
        options={options}
        value="email"
        error="Please choose one option."
      />,
    );

    expect(screen.getByText('Please choose one option.')).toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'aria-describedby',
      'contact-error',
    );
  });

  it('calls onValueChange when a different option is selected', () => {
    const handleValueChange = vi.fn();

    render(
      <RadioGroup
        label="Contact method"
        name="contact"
        options={options}
        value="email"
        onValueChange={handleValueChange}
      />,
    );

    fireEvent.click(screen.getByRole('radio', { name: /Phone/i }));

    expect(handleValueChange).toHaveBeenCalledWith('phone');
  });
});
