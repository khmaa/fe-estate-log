import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input } from '../Input';

describe('Input', () => {
  it('renders with a placeholder', () => {
    render(<Input placeholder="Email address" />);
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
  });

  it('applies className', () => {
    render(<Input className="bg-red-500" placeholder="Custom" />);
    expect(screen.getByPlaceholderText('Custom')).toHaveClass('bg-red-500');
  });

  it('respects the disabled state', () => {
    render(<Input disabled placeholder="Disabled input" />);
    expect(screen.getByPlaceholderText('Disabled input')).toBeDisabled();
  });

  it('passes through the input type', () => {
    render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute(
      'type',
      'email',
    );
  });
});
