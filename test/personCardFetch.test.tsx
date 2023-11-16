import { expect, vi, test } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from '../src/components/AppProvider';
import PersonCard from '../src/components/PersonCard';
import Details from '../src/components/Details';

test('Check that clicking triggers an additional API call to fetch detailed information', async () => {
  const props = {
    name: 'John Doe',
    gender: 'Male',
    id: '42d8662b-24a2-434b-8394-945ff0daa194',
    image: undefined,
  };

  const spy = vi.spyOn(global, 'fetch');
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
    expect(spy).toHaveBeenCalled();
  });
});
