import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ErrorBoundary from '@/components/ErrorBoundary';

const ErrorThrowingComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary fallback={<div>Fallback Content</div>}>
        <div>Child Content</div>
      </ErrorBoundary>
    );

    expect(getByText('Child Content')).toBeInTheDocument();
  });

  it('renders fallback when there is an error', () => {
    const { getByText } = render(
      <ErrorBoundary fallback={<div>Error Fallback</div>}>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(getByText('Error Fallback')).toBeInTheDocument();
  });
});
