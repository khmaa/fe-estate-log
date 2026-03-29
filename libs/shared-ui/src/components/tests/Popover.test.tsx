import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '../Button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '../Popover';

describe('Popover', () => {
  it('opens content through the trigger', () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Popover content</p>
        </PopoverContent>
      </Popover>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open popover' }));

    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('closes content through the close action', () => {
    render(
      <Popover defaultOpen>
        <PopoverContent>
          <PopoverClose asChild>
            <Button variant="ghost">Close</Button>
          </PopoverClose>
        </PopoverContent>
      </Popover>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('merges className on content', () => {
    render(
      <Popover defaultOpen>
        <PopoverContent className="custom-popover">
          <p>Popover content</p>
        </PopoverContent>
      </Popover>,
    );

    expect(screen.getByRole('dialog')).toHaveClass('custom-popover');
  });
});
