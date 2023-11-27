import { typeContextQuery } from '@/utils/typeContextQuery';
import {
  getCharacter,
  getRunningQueriesThunk,
  hpApi,
} from '@/redux/slices/hpApi';
import { GetServerSidePropsContext } from 'next';
import { Store } from '@/redux/store';

export const useFetchPageData = async (
  context: GetServerSidePropsContext,
  store: Store
) => {
  const query = typeContextQuery(context.query);

  if (query) {
    await store.dispatch(hpApi.endpoints.searchByName.initiate(query));
  }

  if (query.id) {
    await store.dispatch(getCharacter.initiate(query.id));
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      query: query,
      searchResponse: store.getState().hpApi.queries,
    },
  };
};
