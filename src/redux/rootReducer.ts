import { querySlice } from './slices/querySlice';
import { hpApi } from './hpApi';
import { loadingSlice } from './slices/loadingSlice';

export const reducer = {
  query: querySlice.reducer,
  loading: loadingSlice.reducer,
  [hpApi.reducerPath]: hpApi.reducer,
};
