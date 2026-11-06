import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Shared Button</Button>);
    const button = screen.getByRole('button', { name: 'Shared Button' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toHaveAttribute('aria-busy');
  });

  it('does not submit an enclosing form by default', () => {
    const handleSubmit = vi.fn((event: React.FormEvent) => {
      event.preventDefault();
    });

    render(
      <form onSubmit={handleSubmit}>
        <Button>Open details</Button>
      </form>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open details' }));

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('supports an explicit submit type', () => {
    const handleSubmit = vi.fn((event: React.FormEvent) => {
      event.preventDefault();
    });

    render(
      <form onSubmit={handleSubmit}>
        <Button type="submit">Save changes</Button>
      </form>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('applies className', () => {
    render(<Button className="bg-red-500">Click</Button>);
    expect(screen.getByRole('button', { name: 'Click' })).toHaveClass(
      'bg-red-500',
    );
  });

  it('applies the secondary variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button', { name: 'Secondary' })).toHaveClass(
      'bg-secondary',
    );
    expect(screen.getByRole('button', { name: 'Secondary' })).toHaveClass(
      'ring-border',
    );
  });

  it('applies the large size classes', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button', { name: 'Large' })).toHaveClass('h-12');
    expect(screen.getByRole('button', { name: 'Large' })).toHaveClass('px-5');
  });

  it('exposes a busy state and blocks clicks while loading', () => {
    const handleClick = vi.fn();
    render(
      <Button loading aria-busy={false} onClick={handleClick}>
        Saving
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Saving' });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('preserves an explicit busy state when not loading', () => {
    render(<Button aria-busy>Syncing elsewhere</Button>);

    expect(
      screen.getByRole('button', { name: 'Syncing elsewhere' }),
    ).toHaveAttribute('aria-busy', 'true');
  });
});
