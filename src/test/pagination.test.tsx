import { render } from '@testing-library/react';
import { test, expect, describe } from 'vitest';
import { searchResponseMock } from '@/test/mocks/responses/searchResponseMock';
import Home from '@/pages';

const mockPageProps = {
  query: {
    searchValue: '',
    page: 1,
    pageSize: 10,
    id: '309c1379-8579-4401-916e-bc6a17b2b39f',
  },
  searchResponse: {
    'searchByName({"page":1,"pageSize":10,"searchValue":""})': {
      data: searchResponseMock,
    },
  },
};

describe('pagination tests', () => {
  test('Pagination exists after getting data from server', async () => {
    const { findByTestId } = render(
      <Home
        query={mockPageProps.query}
        searchResponse={mockPageProps.searchResponse}
      />
    );
    const pagination = await findByTestId('pagination');
    expect(pagination).toBeInTheDocument();
  });
});
