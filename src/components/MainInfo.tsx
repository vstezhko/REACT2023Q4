import React, { useContext, useMemo } from 'react';
import Loader from './Loader';
import SearchResults from './SearchResults';
import { Outlet } from 'react-router-dom';
import { QueryContext, SearchResultContext } from './DataProvider';
import Pagination from './Pagination';
import PageSize from './PageSize';

const MainInfo = () => {
  const { searchResult } = useContext(SearchResultContext);
  const { query, setQuery } = useContext(QueryContext);

  const handlePageChange = (targetPage: number) => {
    setQuery((prevState) => {
      return { ...prevState, page: targetPage };
    });
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
