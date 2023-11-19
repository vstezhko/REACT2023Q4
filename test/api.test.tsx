import { describe, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { reduxStore } from '../redux/store';
import { ReactNode } from 'react';
import { hpApi } from '../redux/hpApi';

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={reduxStore}>{props.children}</Provider>;
}

describe('toolkit query', () => {
  it('renders hook', () => {
    renderHook(() => hpApi.useSearchByNameQuery, { wrapper: Wrapper });
  });
});
