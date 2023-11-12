import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Details from '../src/components/Details';

vi.mock('../api/Api.Service', () => {
  return {
    getCharacter: vi.fn(),
  };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => {
      return {
        id: 'idString',
      };
    },
  };
});

describe('Details Component', () => {
  it('displays loading indicator while fetching data', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/details/idString']}>
        <Details />
      </MemoryRouter>
    );
    const loading = await getByText('loading...');
    expect(loading).toBeInTheDocument();
  });
});
