import { describe, expect, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { reduxStore } from '../redux/store';
import { ReactNode } from 'react';
import { useGetCharacterQuery, useSearchByNameQuery } from '../redux/hpApi';
import { searchResponseMock } from './mocks/responses/searchResponseMock';
import { clearSearchResponseMock } from './mocks/responses/clearSearchResponseMock';
import { characterResponseMock } from './mocks/responses/characterResponseMock';

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={reduxStore}>{props.children}</Provider>;
}

const queryHarry = { searchValue: 'Harry', pageSize: 10, page: 1 };
const clearQuery = { searchValue: '', pageSize: 10, page: 1 };
const characterId = '309c1379-8579-4401-916e-bc6a17b2b39f';

describe('toolkit query', () => {
  it('search string', async () => {
    const { result } = renderHook(() => useSearchByNameQuery(queryHarry), {
      wrapper: Wrapper,
    });
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toMatchObject(searchResponseMock);
    });
  });
  it('clear search', async () => {
    const { result } = renderHook(() => useSearchByNameQuery(clearQuery), {
      wrapper: Wrapper,
    });
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toMatchObject(clearSearchResponseMock);
    });
  });
  it('character', async () => {
    const { result } = renderHook(() => useGetCharacterQuery(characterId), {
      wrapper: Wrapper,
    });
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toMatchObject(characterResponseMock);
    });
  });
});
