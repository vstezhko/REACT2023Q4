import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';
import { ApiService } from '../api/Api.Service';

interface SearchResultsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: [];
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
    searchValue: null,
    page: 1,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof searchData.searchValue === 'string') {
      updateSearchResults(searchData.searchValue, searchData.page);
    } else {
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

  return (
    <div className="main wrapper">
      <Header onSearch={handleSearchValue} />
      <SearchResults items={searchResults} loading={isLoading} />
    </div>
  );
};
export default Main;
