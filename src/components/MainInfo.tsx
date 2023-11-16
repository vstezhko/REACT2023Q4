import React, { useMemo } from 'react';
import Loader from './Loader';
import SearchResults from './SearchResults';
import { Outlet } from 'react-router-dom';
import Pagination from './Pagination';
import PageSize from './PageSize';
import { useDispatch, useSelector } from '../../redux/store';
import { querySlice } from '../../redux/slices/querySlice';
import { useSearchByNameQuery } from '../../redux/hpApi';

const MainInfo = () => {
  const query = useSelector((state) => state.query);
  const dispatch = useDispatch();
  const { data, error, isFetching } = useSearchByNameQuery(query);

  const handlePageChange = (targetPage: number) => {
    dispatch(querySlice.actions.setPage(targetPage));
  };

  const pageCountFromResponse = useMemo(
    () => Number(data?.meta.pagination.last),
    [data]
  );

  return (
    <main className="mainInfo">
      <div className="mainInfo__searchResults">
        {isFetching ? (
          <Loader />
        ) : error ? (
          <div>try one more time</div>
        ) : (
          <>
            <SearchResults results={data?.data || []} />
            {data?.data ? (
              <div className="mainInfo__managePage">
                <PageSize />
                <Pagination
                  pageCount={pageCountFromResponse || query.page}
                  currentPage={query.page}
                  handlePageChange={handlePageChange}
                />
              </div>
            ) : null}
          </>
        )}
      </div>
      <Outlet />
    </main>
  );
};

export default MainInfo;
