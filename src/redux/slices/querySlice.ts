import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export interface QueryParams {
  searchValue?: string;
  page?: number;
  pageSize?: number;
}

export const initialState: QueryParams = {
  searchValue: '',
  page: 1,
  pageSize: 10,
};

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setNewSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
      state.page = 1;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setQuery: (state, action: PayloadAction<QueryParams>) => {
      state = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.query,
      };
    },
  },
});
