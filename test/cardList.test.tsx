import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import SearchResults from '../src/components/SearchResults';
import { clearSearchResponseMock } from './mocks/responses/clearSearchResponseMock';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: () => [new URLSearchParams('search=&page=1')],
  };
});

describe('Test cards', () => {
  it('Verify that the component renders the specified number of cards', async () => {
    const { getAllByTestId } = render(
      <SearchResults results={clearSearchResponseMock.data} />
    );

    const cardsOnScreen = getAllByTestId('personCard');
    expect(cardsOnScreen.length).toBe(clearSearchResponseMock.data.length);
  });

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    const emptyResults = [];

    const { getByText } = render(<SearchResults results={emptyResults} />);

    const noItemsMessage = getByText('There are NO ITEMS');

    expect(noItemsMessage).toBeInTheDocument();
  });
});
