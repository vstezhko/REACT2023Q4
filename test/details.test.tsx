import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from '../src/components/Details';
import { AppProvider } from '../src/components/AppProvider';
import { characterResponseMock } from './mocks/responses/characterResponseMock';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => {
      return {
        id: id,
      };
    },
    useSearchParams: () => [new URLSearchParams({ search: '', page: '1' })],
  };
});

const id = '309c1379-8579-4401-916e-bc6a17b2b39f';

describe('Details Component', () => {
  it('displays loading indicator while fetching data', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <AppProvider>
          <Details />
        </AppProvider>
      </MemoryRouter>
    );
    const loading = await getByText('loading...');
    expect(loading).toBeInTheDocument();
  }, 500);

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const { findByText } = render(
      <MemoryRouter>
        <AppProvider>
          <Details />
        </AppProvider>
      </MemoryRouter>
    );
    const nameLabel = await findByText(
      characterResponseMock.data.attributes.name
    );
    expect(nameLabel).toBeInTheDocument();
  });

  it('Ensure that clicking the close button hides the component', async () => {
    const { queryByTestId, getByTestId } = render(
      <MemoryRouter
        initialEntries={['/details/309c1379-8579-4401-916e-bc6a17b2b39f']}
      >
        <AppProvider>
          <Routes>
            <Route path={'details/:id'} element={<Details />} />
            <Route path={'/'} element={<></>} />
          </Routes>
        </AppProvider>
      </MemoryRouter>
    );
    const detailsBeforeClose = getByTestId('details');
    expect(detailsBeforeClose).toBeInTheDocument();
    const close = getByTestId('close');
    fireEvent.click(close);
    await waitFor(async () => {
      const detailsAfterClose = await queryByTestId('details');
      expect(detailsAfterClose).not.toBeInTheDocument();
    });
  });
});
