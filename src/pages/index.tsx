import wrapper from '@/redux/store';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import {
  searchByName,
  StoreSearchResponse,
} from '@/redux/slices/hpApi';
import SearchResults from '@/components/SearchResults';
import Pagination from '@/components/Pagination';
import PageSize from '@/components/PageSize';
import { QueryParams } from '@/redux/slices/querySlice';
import { useManagePage } from '@/hooks/useManagePage';
import { getValueByKeyBeginning } from '@/utils/getValueByKeyBeginning';
import { useFetchPageData } from '@/hooks/useFetchPageData';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    return useFetchPageData(context, store);
  }
);

const errorMessage = <h2>The error occurs on the server</h2>;

interface HomeParams {
  query: QueryParams;
  searchResponse: Record<string, StoreSearchResponse>;
}

const searchByNameKey = 'searchByName';

const Home: FC<HomeParams> = ({ query, searchResponse }) => {
  const router = useRouter();
  const { page, pageSize } = query;
  const { handlePageChange, handlePageSizeChange } = useManagePage(
    router,
    query
  );

  const storeResponseRecord = getValueByKeyBeginning(
    searchByNameKey,
    searchResponse
  );

  if (!storeResponseRecord) return errorMessage;

  const { data, meta } = storeResponseRecord.data;

  return (
    <>
      <main className="mainInfo">
        <div className="mainInfo__searchResults">
          <SearchResults results={data || []} />
          {data && meta ? (
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
      </main>
    </>
  );
};

export default Home;
