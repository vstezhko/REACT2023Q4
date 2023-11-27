import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Character } from '@/redux/slices/hpApi';
import SearchResults from '@/components/SearchResults';
import { clearSearchResponseMock } from '@/test/mocks/responses/clearSearchResponseMock';

vi.mock('next/router', () => require('next-router-mock'));

describe('Test cards', () => {
  it('Verify that the component renders the specified number of cards', async () => {
    const { getAllByTestId } = render(
      <SearchResults results={clearSearchResponseMock.data} />
    );

    const cardsOnScreen = getAllByTestId('personCard');
    expect(cardsOnScreen.length).toBe(clearSearchResponseMock.data.length);
  });

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    const emptyResults: Character[] = [];

    const { getByText } = render(<SearchResults results={emptyResults} />);

    const noItemsMessage = getByText('There are NO ITEMS');

    expect(noItemsMessage).toBeInTheDocument();
  });
});
