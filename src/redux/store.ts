import { reducer } from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from 'react-redux';
import { hpApi } from './hpApi';
import { createWrapper } from 'next-redux-wrapper';

export const reduxStore = () =>
  configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(hpApi.middleware),
  });

export type ReduxStore = ReturnType<typeof reduxStore>;
export type ReduxState = ReturnType<ReduxStore['getState']>;

export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch();
export const wrapper = createWrapper<ReduxStore>(reduxStore);
