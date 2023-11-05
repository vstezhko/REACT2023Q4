import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';
import { ApiService } from '../api/Api.Service';
import Pagination from '../components/Pagination';

interface SearchResultsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    gender: string;
    hair_color: string;
    birth_year: string;
  }[];
}

interface SearchData {
  searchValue: string | null;
  page: number;
}

const Main = () => {
  const [searchResults, setSearchResults] = useState<SearchResultsResponse>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  const [searchData, setSearchData] = useState<SearchData>({
    searchValue: localStorage.getItem('search') || null,
    page: 2,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof searchData.searchValue === 'string') {
      updateSearchResults(searchData.searchValue, searchData.page);
    }

    if (searchData.searchValue === null) {
      const lsSearchValue = localStorage.getItem('search');
      setSearchData({ ...searchData, searchValue: lsSearchValue || '' });
    }
  }, [searchData]);

  const updateSearchResults = async (searchValue: string, page: number) => {
    try {
      setIsLoading(true);

      const results: SearchResultsResponse = await ApiService.search(
        searchValue,
        page
      );

      if (results) {
        setSearchResults(results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchValue = (newValue: string) => {
    const startPage: number = 1;
    setSearchData({ searchValue: newValue, page: startPage });
  };

  const handlePageChange = (newPage: number) => {
    setSearchData({
      ...searchData,
      page: newPage,
    });
  };

  return (
    <div className="main wrapper">
      <Header
        onSearch={handleSearchValue}
        searchInitialValue={searchData.searchValue || ''}
      />
      <SearchResults results={searchResults.results} loading={isLoading} />
      <Pagination
        pageCount={Math.ceil(searchResults.count / 10)}
        currentPage={searchData.page}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};
export default Main;
