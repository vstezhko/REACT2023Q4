import { describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import PersonCard from '../src/components/PersonCard';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from '../src/components/Details';

describe('cards', () => {
  it('Ensure that the card component renders the relevant card data', () => {
    const name = 'TestName';
    const gender = 'TestGender';
    const image = undefined;
    const { getByText, queryByRole } = render(
      <MemoryRouter>
        <PersonCard name={name} gender={gender} id={'id'} image={image} />
      </MemoryRouter>
    );

    const renderedName = getByText(name);
    expect(renderedName).toBeInTheDocument();
    const renderedGender = getByText(gender);
    expect(renderedGender).toBeInTheDocument();
    const renderedImage = queryByRole('img');
    expect(renderedImage).not.toBeInTheDocument();
    cleanup();
  });
  it('Ensure that the card component renders the relevant card data', async () => {
    const name = 'TestName';
    const gender = 'TestGender';
    const image = undefined;
    const { getByTestId } = render(
      <MemoryRouter>
        <Routes>
          <Route
            path={'/'}
            element={
              <PersonCard name={name} gender={gender} id={'id'} image={image} />
            }
          />
          <Route path={'details/:id'} element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    const card = getByTestId('personCard');
    fireEvent.click(card);
    await waitFor(async () => {
      const details = await getByTestId('details');
      expect(details).toBeInTheDocument();
    });
  });
  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const spy = vi.spyOn(global, 'fetch');
    const name = 'TestName';
    const gender = 'TestGender';
    const image = undefined;
    const { getByTestId } = render(
      <MemoryRouter>
        <Routes>
          <Route
            path={'/'}
            element={
              <PersonCard name={name} gender={gender} id={'id'} image={image} />
            }
          />
          <Route path={'details/:id'} element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    const card = getByTestId('personCard');
    fireEvent.click(card);
    await waitFor(async () => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
