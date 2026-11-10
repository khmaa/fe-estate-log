import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Alert, AlertDescription, AlertTitle } from '../Alert';

describe('Alert', () => {
  it('renders the title and description', () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>
          This area has a high number of recently updated listings.
        </AlertDescription>
      </Alert>,
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    expect(
      screen.getByText(
        'This area has a high number of recently updated listings.',
      ),
    ).toBeInTheDocument();
  });

  it('applies the error variant styles', () => {
    render(
      <Alert variant="error">
        <AlertTitle>Submission failed</AlertTitle>
      </Alert>,
    );

    expect(screen.getByRole('alert')).toHaveClass('border-danger');
    expect(screen.getByRole('alert')).toHaveClass('bg-danger-soft');
  });

  it('applies className to the root element', () => {
    render(
      <Alert className="max-w-lg">
        <AlertTitle>Notice</AlertTitle>
      </Alert>,
    );

    expect(screen.getByRole('status')).toHaveClass('max-w-lg');
  });

  it('uses an explicit role before the variant default', () => {
    render(
      <Alert role="alert" variant="warning">
        <AlertTitle>Session expiring</AlertTitle>
      </Alert>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Session expiring');
  });
});
