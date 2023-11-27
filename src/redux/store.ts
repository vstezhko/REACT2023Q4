import { reducer } from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import { hpApi } from './slices/hpApi';
import { createWrapper } from 'next-redux-wrapper';

export const reduxStore = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hpApi.middleware),
});

export type Store = typeof reduxStore;
const wrapper = createWrapper(() => reduxStore);

export default wrapper;
