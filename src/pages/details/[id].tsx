import { wrapper } from '@/redux/store';
import { useRouter } from 'next/router';
import React from 'react';
import {
  getCharacter,
  getRunningQueriesThunk,
  searchByName,
  StoreCharacterResponse,
  StoreSearchResponse,
} from '@/redux/hpApi';
import SearchResults from '@/components/SearchResults';
import Pagination from '@/components/Pagination';
import PageSize from '@/components/PageSize';
import { QueryParams, querySlice } from '@/redux/slices/querySlice';
import { useManagePage } from '@/hooks/useManagePage';
import Details from '@/components/Details';

const errorMessage = <h2>The error occurs on the server</h2>;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id;
    const storeQuery = store.getState().query;
    const contextQuery = context.query;
    const query = { ...storeQuery, ...contextQuery };

    if (query) {
      store.dispatch(querySlice.actions.setQuery(query));
      await store.dispatch(searchByName.initiate(query));
    }

    if (id && !Array.isArray(id)) {
      await store.dispatch(getCharacter.initiate(id));
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

export default function HomeWithDetails({
  query,
  searchResponse,
}: {
  query: QueryParams;
  searchResponse: Record<string, StoreSearchResponse | StoreCharacterResponse>;
}) {
  const router = useRouter();
  const { handlePageChange, handlePageSizeChange } = useManagePage(
    router,
    query
  );

  const searchByNameKey = 'searchByName';
  const dataKey = Object.keys(searchResponse).find((key) =>
    key.startsWith(searchByNameKey)
  );
  let searchResponseData;
  if (dataKey && 'data' in searchResponse[dataKey].data)
    searchResponseData = searchResponse[dataKey] as StoreSearchResponse;

  const characterKey = 'getCharacter';
  const detailsDataKey = Object.keys(searchResponse).find((key) =>
    key.startsWith(characterKey)
  );
  let detailsData;
  if (
    detailsDataKey &&
    searchResponse[detailsDataKey].data?.data &&
    'attributes' in searchResponse[detailsDataKey]?.data?.data
  ) {
    detailsData = searchResponse[detailsDataKey] as StoreCharacterResponse;
  } else {
    return errorMessage;
  }

  const handleClose = () => {
    router.push(
      `/?searchValue=${query.searchValue?.trim()}&page=${Number(
        query.page
      )}&pageSize=${Number(query.pageSize)}`
    );
  };

  return (
    <>
      <main className="mainInfo">
        <div className="mainInfo__searchResults">
          <SearchResults results={searchResponseData?.data.data || []} />
          {searchResponseData?.data.data ? (
            <div className="mainInfo__managePage">
              <PageSize
                pageSize={Number(query.pageSize)}
                handlePageSizeChange={handlePageSizeChange}
              />
              <Pagination
                pageCount={
                  Number(searchResponseData?.data.meta.pagination.last) ||
                  Number(query.page)
                }
                currentPage={Number(query.page)}
                handlePageChange={handlePageChange}
              />
            </div>
          ) : null}
        </div>
        {detailsData ? (
          <Details
            detailsData={detailsData.data.data.attributes}
            handleClose={handleClose}
          />
        ) : null}
      </main>
    </>
  );
}
