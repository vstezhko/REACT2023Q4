import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  QueryContext,
  SearchResultContext,
} from '../src/components/DataProvider';
import Main from '../src/pages/Main';
import { ApiService } from '../src/api/Api.Service';

describe('Test cards', () => {
  it('Verify that the component renders the specified number of cards', async () => {
    const query = {
      searchValue: '',
      page: 1,
      pageSize: 10,
    };

    const setQuery = vi.fn();
    const setSearchResult = vi.fn();
    const searchResponse = await ApiService.search(query);
    const searchResult = {
      isLoading: false,
      isError: false,
      resultItems: searchResponse,
    };

    render(
      <MemoryRouter>
        <QueryContext.Provider value={{ query, setQuery }}>
          <SearchResultContext.Provider
            value={{ searchResult, setSearchResult }}
          >
            <Main />
          </SearchResultContext.Provider>
        </QueryContext.Provider>
      </MemoryRouter>
    );

    const cardsOnScreen = await screen.findAllByTestId('personCard');
    expect(cardsOnScreen.length).toBe(query.pageSize);
  });

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    const setSearchResult = vi.fn();
    const searchResult = {
      isLoading: false,
      isError: false,
      resultItems: {
        data: [],
        meta: {
          pagination: {
            current: 1,
            records: 0,
          },
        },
      },
    };

    render(
      <MemoryRouter>
        <SearchResultContext.Provider value={{ searchResult, setSearchResult }}>
          <Main />
        </SearchResultContext.Provider>
      </MemoryRouter>
    );

    const cardsOnScreen = await screen.findByText('There are NO ITEMS');
    expect(cardsOnScreen).toBeInTheDocument();
  });
});
