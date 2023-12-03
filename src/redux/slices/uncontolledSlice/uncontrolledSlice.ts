import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormFields, FormValue } from '../../../utils/validateForm';

const initialState: Array<Record<FormFields, FormValue>> = [];

export const uncontrolledSlice = createSlice({
  name: 'uncontrolled',
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<Record<FormFields, FormValue>>) => {
      state.push(action.payload);
    },
  },
});

export const { actions } = uncontrolledSlice;
