import { formResultsSlice } from './slices/formResultsSlice/formResultsSlice';
import { countriesSlice } from './slices/countriesSlice/countriesSlice';

export const reducer = {
  formResultsSlice: formResultsSlice.reducer,
  countriesSlice: countriesSlice.reducer,
};
