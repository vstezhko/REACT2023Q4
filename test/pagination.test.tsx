import { cleanup, render, screen } from '@testing-library/react';
import { test, expect, describe } from 'vitest';
import DataProvider from '../src/components/DataProvider';
import Main from '../src/pages/Main';
import { MemoryRouter } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';

describe('pagination tests', () => {
  test('Pagination exists after getting data from server', async () => {
    render(
      <MemoryRouter>
        <DataProvider>
          <Main />
        </DataProvider>
      </MemoryRouter>
    );
    const pagination = await screen.findByTestId('pagination');
    expect(pagination).toBeInTheDocument();
    cleanup();
  });
  test('Make sure the component updates URL query parameter when page changes', async () => {
    render(
      <MemoryRouter>
        <DataProvider>
          <Main />
        </DataProvider>
      </MemoryRouter>
    );
    const paginationBtns = await screen.findAllByTestId('paginationBtn');
    const nonDisabledPaginationBtns = paginationBtns.filter(
      (button) => button.className === 'pagination__item'
    );
    // let urlBeforeClick = document.URL;
    nonDisabledPaginationBtns.forEach((btn) => {
      userEvent.click(btn);
      // console.log(btn);
      // const urlAfterClick = window.history;
      // console.log(urlAfterClick);
    });

    // userEvent.click(nonDisabledPaginationBtns.)

    // expect(pagination).toBeInTheDocument();
    cleanup();
  });
});
