import React, { useContext, useMemo } from 'react';
import Loader from './Loader';
import SearchResults from './SearchResults';
import { Outlet } from 'react-router-dom';
import { SearchResultContext } from './DataProvider';
import Pagination from './Pagination';
import PageSize from './PageSize';
import { useDispatch, useSelector } from '../../redux/store';
import { querySlice } from '../../redux/slices/querySlice/querySlice';

const MainInfo = () => {
  const { searchResult } = useContext(SearchResultContext);
  const { page } = useSelector((state) => state.query);
  const dispatch = useDispatch();

  const handlePageChange = (targetPage: number) => {
    dispatch(querySlice.actions.setPage(targetPage));
  };

  const pageCountFromResponse = useMemo(
    () => Number(searchResult.resultItems?.meta.pagination.last),
    [searchResult]
  );

  return (
    <main className="mainInfo">
      <div className="mainInfo__searchResults">
        {searchResult.isLoading ? (
          <Loader />
        ) : searchResult.isError ? (
          <div>try one more time</div>
        ) : (
          <>
            <SearchResults results={searchResult.resultItems?.data || []} />
            {searchResult.resultItems ? (
              <div className="mainInfo__managePage">
                <PageSize />
                <Pagination
                  pageCount={pageCountFromResponse || page}
                  currentPage={page}
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
