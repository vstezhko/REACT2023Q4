import { describe, it, expect } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';

describe('App', () => {
  it('Renders on a bad page', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/incorrect-route']}>
        <App />
      </MemoryRouter>
    );

    const notFound = await getByText('Page not found');
    expect(notFound).toBeInTheDocument();
    cleanup();
  });
});
