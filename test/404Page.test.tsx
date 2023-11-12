import { describe, it, expect } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';

describe('App', () => {
  it('Renders on a bad page', async () => {
    render(
      <MemoryRouter initialEntries={['/incorrect-route']}>
        <App />
      </MemoryRouter>
    );

    const notFound = await screen.findByText('Page not found');
    expect(notFound).toBeInTheDocument();
    cleanup();
  });
});
