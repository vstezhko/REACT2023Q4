import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Main from '../src/pages/Main';
import { AppProvider } from '../src/components/AppProvider';
import SearchResults from '../src/components/SearchResults';

describe('Test cards', () => {
  it('Verify that the component renders the specified number of cards', async () => {
    const query = {
      searchValue: '',
      page: 1,
      pageSize: 10,
    };

    render(
      <MemoryRouter>
        <AppProvider>
          <Main />
        </AppProvider>
      </MemoryRouter>
    );

    const cardsOnScreen = await screen.findAllByTestId('personCard');
    expect(cardsOnScreen.length).toBe(query.pageSize);
  });

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    const emptyResults = [];

    render(<SearchResults results={emptyResults} />);

    const noItemsMessage = screen.getByText('There are NO ITEMS');

    expect(noItemsMessage).toBeInTheDocument();
  });
});
