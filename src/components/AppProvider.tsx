import { Provider } from 'react-redux';
import React from 'react';
import { reduxStore } from '../../redux/store';

export const AppProvider = (props: React.PropsWithChildren) => {
  return <Provider store={reduxStore}>{props.children}</Provider>;
};
