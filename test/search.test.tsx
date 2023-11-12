import { it, expect, describe } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import SearchBlock from '../src/components/SearchBlock';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';

describe('search tests', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    render(<SearchBlock />);

    const searchInput = screen.getByPlaceholderText('Search by name');
    const searchButton = screen.getByText('SEARCH');

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
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search by name');
    expect(searchInput).toHaveValue(exampleSearchValue);

    cleanup();
  });
});
