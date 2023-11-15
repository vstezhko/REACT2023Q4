import { describe, it, expect, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Details from '../src/components/Details';
import { characterMock } from './mock/characterMock';
import App from '../src/App';
import { AppProvider } from '../src/components/AppProvider';

vi.mock('../api/Api.Service', () => {
  return {
    getCharacter: () => {
      setTimeout(() => {
        return characterMock;
      }, 1000);
    },
  };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => {
      return {
        id: id,
      };
    },
  };
});

const id = '309c1379-8579-4401-916e-bc6a17b2b39f';

describe('Details Component', () => {
  it('displays loading indicator while fetching data', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={[`/details/${id}`]}>
        <Details />
      </MemoryRouter>
    );
    const loading = await getByText('loading...');
    expect(loading).toBeInTheDocument();
    cleanup();
  }, 500);

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const { findByText } = render(
      <MemoryRouter initialEntries={[`/details/${id}`]}>
        <Details />
      </MemoryRouter>
    );
    const nameLabel = await findByText(characterMock.data.attributes.name);
    expect(nameLabel).toBeInTheDocument();
  });

  it('Ensure that clicking the close button hides the component', async () => {
    const { findByTestId, queryByTestId } = render(
      <MemoryRouter initialEntries={['/details/asdf']}>
        <AppProvider>
          <App />
        </AppProvider>
      </MemoryRouter>
    );
    const detailsBeforeClose = await queryByTestId('details');
    expect(detailsBeforeClose).toBeInTheDocument();
    const close = await findByTestId('close');
    fireEvent.click(close);
    const detailsAfterClose = await queryByTestId('details');
    expect(detailsAfterClose).not.toBeInTheDocument();
  });
});
