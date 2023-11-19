import { render } from '@testing-library/react';
import { test, expect, describe, vi } from 'vitest';
import MainInfo from '../src/components/MainInfo';
import { AppProvider } from '../src/components/AppProvider';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: () => [new URLSearchParams('search=&page=1')],
  };
});

describe('pagination tests', () => {
  test('Pagination exists after getting data from server', async () => {
    const { findByTestId } = render(
      <AppProvider>
        <MainInfo />
      </AppProvider>
    );
    const pagination = await findByTestId('pagination');
    expect(pagination).toBeInTheDocument();
  });
});
