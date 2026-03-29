import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../Card';

describe('Card', () => {
  it('renders its semantic sections', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Project settings</CardTitle>
          <CardDescription>
            Manage how this project is presented to collaborators.
          </CardDescription>
        </CardHeader>
        <CardContent>Body content</CardContent>
        <CardFooter>Footer actions</CardFooter>
      </Card>,
    );

    expect(
      screen.getByRole('heading', { name: 'Project settings' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Manage how this project is presented to collaborators.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
    expect(screen.getByText('Footer actions')).toBeInTheDocument();
  });

  it('applies className to the card container', () => {
    render(<Card className="max-w-xl">Card body</Card>);
    expect(screen.getByText('Card body')).toHaveClass('max-w-xl');
  });
});
