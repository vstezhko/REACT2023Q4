import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormFields, FormValue } from '../../../utils/validateForm';

interface FormResultsSlice {
  uncontrolled: Array<Record<FormFields, FormValue>>;
  reactHook: Array<Record<FormFields, FormValue>>;
}

const initialState: FormResultsSlice = { uncontrolled: [], reactHook: [] };

export const formResultsSlice = createSlice({
  name: 'formResultsSlice',
  initialState,
  reducers: {
    addUncontrolledForm: (
      state,
      action: PayloadAction<Record<FormFields, FormValue>>
    ) => {
      state.uncontrolled.push(action.payload);
    },
    addReactHookForm: (
      state,
      action: PayloadAction<Record<FormFields, FormValue>>
    ) => {
      state.reactHook.push(action.payload);
    },
  },
});

export const { actions } = formResultsSlice;
