import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Select } from '../Select';

describe('Select', () => {
  it('renders select options', () => {
    render(
      <Select aria-label="Region">
        <option value="seoul">Seoul</option>
        <option value="busan">Busan</option>
      </Select>,
    );

    expect(
      screen.getByRole('combobox', { name: 'Region' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Seoul' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Busan' })).toBeInTheDocument();
  });

  it('respects the selected value', () => {
    render(
      <Select aria-label="Budget" defaultValue="mid">
        <option value="low">Low</option>
        <option value="mid">Mid</option>
        <option value="high">High</option>
      </Select>,
    );

    expect(screen.getByRole('combobox', { name: 'Budget' })).toHaveValue('mid');
  });

  it('respects the disabled state', () => {
    render(
      <Select aria-label="Disabled select" disabled>
        <option value="draft">Draft</option>
      </Select>,
    );

    expect(
      screen.getByRole('combobox', { name: 'Disabled select' }),
    ).toBeDisabled();
  });

  it('calls onChange when a new option is selected', () => {
    const handleChange = vi.fn();

    render(
      <Select
        aria-label="Property type"
        defaultValue="apartment"
        onChange={handleChange}
      >
        <option value="apartment">Apartment</option>
        <option value="villa">Villa</option>
      </Select>,
    );

    fireEvent.change(screen.getByRole('combobox', { name: 'Property type' }), {
      target: { value: 'villa' },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('combobox', { name: 'Property type' })).toHaveValue(
      'villa',
    );
  });
});
