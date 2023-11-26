
import { expect, describe, it } from 'vitest';
import { reducer } from "@/redux/rootReducer";
import { initialState, querySlice } from "@/redux/slices/querySlice";

describe('reducer', () => {
  it('check initial state', () => {
    const state = reducer.query(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('setNewSearchValue', () => {
    const testValue = 'testValue';
    const startPage = 1;
    const state = reducer.query(
      initialState,
      querySlice.actions.setNewSearchValue(testValue)
    );
    expect(state.searchValue).toBe(testValue);
    expect(state.page).toBe(startPage);
  });

  it('setPageSize', () => {
    const testPageSize = 15;
    const startPage = 1;
    const state = reducer.query(
      initialState,
      querySlice.actions.setPageSize(testPageSize)
    );
    expect(state.pageSize).toBe(testPageSize);
    expect(state.page).toBe(startPage);
  });

  it('setPage', () => {
    const testPage = 5;
    const state = reducer.query(
      initialState,
      querySlice.actions.setPage(testPage)
    );
    expect(state.page).toBe(testPage);
  });
});
