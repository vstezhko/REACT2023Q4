import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState = {
  search: false,
  character: false,
};

export const loadingSlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setSearchLoading: (state, action: PayloadAction<boolean>) => {
      state.search = action.payload;
    },
    setCharacterLoading: (state, action: PayloadAction<boolean>) => {
      state.character = action.payload;
    },
  },
});
