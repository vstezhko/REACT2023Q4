import wrapper from '@/redux/store';
import { useRouter } from 'next/router';
import React from 'react';
import {
  CharacterResponse,
  getCharacter,
  searchByName,
  SearchResponse,
  StoreCharacterResponse,
  StoreSearchResponse,
} from '@/redux/slices/hpApi';
import SearchResults from '@/components/SearchResults';
import Pagination from '@/components/Pagination';
import PageSize from '@/components/PageSize';
import { QueryParams } from '@/redux/slices/querySlice';
import { useManagePage } from '@/hooks/useManagePage';
import Details from '@/components/Details';
import { useFetchPageData } from '@/hooks/useFetchPageData';
import { getValueByKeyBeginning } from '@/utils/getValueByKeyBeginning';

const errorMessage = <h2>The error occurs on the server</h2>;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    return useFetchPageData(context, store);
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
  const { page, pageSize } = query;

  const searchByNameKey = 'searchByName';
  const storeSearchResponseRecord = getValueByKeyBeginning(
    searchByNameKey,
    searchResponse
  );
  const isStoreSearchResponse =
    storeSearchResponseRecord && 'meta' in storeSearchResponseRecord.data;

  if (!isStoreSearchResponse) return errorMessage;
  const { data, meta } = storeSearchResponseRecord.data as SearchResponse;

  const characterKey = 'getCharacter';
  const storeCharacterResponseRecord = getValueByKeyBeginning(
    characterKey,
    searchResponse
  );
  const isStoreCharacterResponse =
    storeCharacterResponseRecord &&
    'attributes' in storeCharacterResponseRecord.data.data;

  if (!isStoreCharacterResponse) return errorMessage;
  const { attributes } = storeCharacterResponseRecord.data
    .data as CharacterResponse['data'];

  const handleClose = () => {
    router.push(
      `/?searchValue=${query.searchValue?.trim()}&page=${query.page}&pageSize=${
        query.pageSize
      }`
    );
  };

  return (
    <>
      <main className="mainInfo">
        <div className="mainInfo__searchResults">
          <SearchResults results={data || []} />
          {data ? (
            <div className="mainInfo__managePage">
              {pageSize ? (
                <PageSize
                  pageSize={pageSize}
                  handlePageSizeChange={handlePageSizeChange}
                />
              ) : null}
              {page ? (
                <Pagination
                  pageCount={Number(meta.pagination.last) || page}
                  currentPage={page}
                  handlePageChange={handlePageChange}
                />
              ) : null}
            </div>
          ) : null}
        </div>
        {attributes ? (
          <Details detailsData={attributes} handleClose={handleClose} />
        ) : null}
      </main>
    </>
  );
}
