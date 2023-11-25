import { wrapper } from '@/redux/store';
import { useRouter } from 'next/router';
import React from 'react';
import {
  getRunningQueriesThunk,
  searchByName,
  SearchResponse,
} from '@/redux/hpApi';
import SearchResults from '@/components/SearchResults';
import Pagination from '@/components/Pagination';
import PageSize from '@/components/PageSize';
import { querySlice } from '@/redux/slices/querySlice';
import { useManagePage } from '@/hooks/useManagePage';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const storeQuery = store.getState().query;
    const contextQuery = context.query;
    const query = { ...storeQuery, ...contextQuery };

    if (query) {
      store.dispatch(querySlice.actions.setQuery(query));
      await store.dispatch(searchByName.initiate(query));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        query: query,
        searchResponse: store.getState().hpApi.queries,
      },
    };
  }
);

export default function Home({ query, searchResponse }) {
  const router = useRouter();
  const data: SearchResponse = Object.values(searchResponse)[0].data;

  const { handlePageChange, handlePageSizeChange } = useManagePage(
    router,
    query
  );

  return (
    <>
      <main className="mainInfo">
        <div className="mainInfo__searchResults">
          <SearchResults results={data?.data || []} />
          {data?.data ? (
            <div className="mainInfo__managePage">
              <PageSize
                pageSize={Number(query.pageSize)}
                handlePageSizeChange={handlePageSizeChange}
              />
              <Pagination
                pageCount={
                  Number(data?.meta.pagination.last) || Number(query.page)
                }
                currentPage={Number(query.page)}
                handlePageChange={handlePageChange}
              />
            </div>
          ) : null}
        </div>
        {/*<Outlet />*/}
      </main>
    </>
  );
}
