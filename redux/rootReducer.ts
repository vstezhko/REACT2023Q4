import { querySlice } from './slices/querySlice';
import { hpApi } from './hpApi';

export const reducer = {
  query: querySlice.reducer,
  [hpApi.reducerPath]: hpApi.reducer,
};
