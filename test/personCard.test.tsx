import { describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import PersonCard from '../src/components/PersonCard';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from '../src/components/Details';
import { AppProvider } from '../src/components/AppProvider';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => [new URLSearchParams('search=test&page=1')],
  };
});

describe('cards', () => {
  const props = {
    name: 'John Doe',
    gender: 'Male',
    id: '42d8662b-24a2-434b-8394-945ff0daa194',
    image: undefined,
  };

  it('Ensure that the card component renders the relevant card data', () => {
    const { getByText, queryByRole } = render(
      <MemoryRouter>
        <PersonCard {...props} />
      </MemoryRouter>
    );

    const renderedName = getByText(props.name);
    expect(renderedName).toBeInTheDocument();
    const renderedGender = getByText(props.gender);
    expect(renderedGender).toBeInTheDocument();
    const renderedImage = queryByRole('img');
    expect(renderedImage).not.toBeInTheDocument();
  });
  it('Validate that clicking on a card opens a detailed card component', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <AppProvider>
          <Routes>
            <Route path={'/'} element={<PersonCard {...props} />} />
            <Route path={'details/:id'} element={<Details />} />
          </Routes>
        </AppProvider>
      </MemoryRouter>
    );

    const card = getByTestId('personCard');
    fireEvent.click(card);
    await waitFor(async () => {
      const details = await getByTestId('details');
      expect(details).toBeInTheDocument();
    });
    cleanup();
  });
});
