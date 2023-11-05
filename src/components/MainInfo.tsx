import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { ApiService } from '../api/Api.Service';
import SearchResults from './SearchResults';
import Pagination from './Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Search {
  searchValue: null | string;
  page: number;
}

interface SearchResultsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results:
    | {
        name: string;
        gender: string;
        hair_color: string;
        birth_year: string;
      }[]
    | null;
}

const MainInfo = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchData, setSearchData] = useState<Search>({
    searchValue: null,
    page: 1,
  });

  const [searchResults, setSearchResults] = useState<SearchResultsResponse>({
    count: 0,
    next: null,
    previous: null,
    results: null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const search = searchParams.get('search') || null;
    const page = searchParams.get('page') || 1;
    setSearchData({
      searchValue: search,
      page: +page,
    });
  }, [searchParams]);

  useEffect(() => {
    const updateSearchResults = async (searchValue: string, page: number) => {
      try {
        setIsLoading(true);

        const results: SearchResultsResponse = await ApiService.search(
          searchValue,
          page
        );

        if (results) {
          setSearchResults(results);

          const searchURL = searchParams.get('search') || '';
          const pageURL = searchParams.get('page') || 1;
          if (searchData.page !== pageURL) {
            navigate(`?search=${searchURL}&page=${searchData.page}`);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (typeof searchData.searchValue === 'string') {
      updateSearchResults(searchData.searchValue, searchData.page);
    }

    if (searchData.searchValue === null) {
      const lsSearchValue = localStorage.getItem('search');
      setSearchData({ ...searchData, searchValue: lsSearchValue || '' });
    }
  }, [navigate, searchData, searchParams]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      search: searchData.searchValue ? searchData.searchValue! : '',
      page: newPage.toString(),
    });
  };

  return (
    <main className="mainInfo">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SearchResults results={searchResults.results} />
          <Pagination
            pageCount={Math.ceil(searchResults.count / 10 || 1)}
            currentPage={searchData.page}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
};

export default MainInfo;
