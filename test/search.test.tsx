import { it, expect, describe } from 'vitest';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import SearchBlock from '../src/components/SearchBlock';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';
import { AppProvider } from '../src/components/AppProvider';

describe('search tests', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AppProvider>
        <SearchBlock />
      </AppProvider>
    );

    const searchInput = getByPlaceholderText('Search by name');
    const searchButton = getByText('SEARCH');

    fireEvent.change(searchInput, { target: { value: 'exampleSearchValue' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      const valueFromLS = localStorage.getItem('search');
      expect(valueFromLS).toBe('exampleSearchValue');
    });
    cleanup();
  });

  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    const exampleSearchValue = 'exampleSearchValue';
    localStorage.setItem('search', exampleSearchValue);
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </MemoryRouter>
    );

    const searchInput = getByPlaceholderText('Search by name');
    expect(searchInput).toHaveValue(exampleSearchValue);
  });
});
