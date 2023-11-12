import { cleanup, render, screen } from '@testing-library/react';
import { test, expect, describe } from 'vitest';
import DataProvider from '../src/components/DataProvider';
import Main from '../src/pages/Main';
import { MemoryRouter } from 'react-router-dom';

describe('pagination tests', () => {
  test('Pagination exists after getting data from server', async () => {
    render(
      <MemoryRouter>
        <DataProvider>
          <Main />
        </DataProvider>
      </MemoryRouter>
    );
    const pagination = await screen.findByTestId('pagination');
    expect(pagination).toBeInTheDocument();
    cleanup();
  });
});
