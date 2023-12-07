import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import Btn from './Btn';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface SearchData {
  searchValue: string | null;
  page: number;
}

const SearchBlock = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchData, setSearchData] = useState<SearchData>({
    searchValue: null,
    page: 1,
  });
  const [searchValue, setSearchValue] = useState(searchData.searchValue || '');

  useEffect(() => {
    const searchURL = searchParams.get('search') || null;
    const pageURL = searchParams.get('page') || 1;

    const searchValFromLS = localStorage.getItem('search');
    const searchVal = searchURL !== null ? searchURL : searchValFromLS || '';

    setSearchData({
      searchValue: searchVal,
      page: +pageURL,
    });
    setSearchValue(searchVal);
    localStorage.setItem('search', searchVal.trim());
    navigate(`?search=${searchVal}&page=${+pageURL}`);
  }, [navigate, searchParams]);
  const handleSearchValue = (newValue: string) => {
    const startPage: number = 1;
    setSearchData({ searchValue: newValue, page: startPage });
    navigate(`?search=${newValue}&page=${startPage}`);
  };

  const handleInputChange = (e: BaseSyntheticEvent) => {
    setSearchValue(e.target.value);
    localStorage.setItem('search', e.target.value.trim());
  };

  const handleSearch = () => {
    handleSearchValue(searchValue.trim());
  };

  const handleClear = (e: BaseSyntheticEvent) => {
    handleSearchValue('');
    localStorage.setItem('search', '');
    setSearchValue(e.target.value);
  };

  return (
    <div className="searchBlock">
      <label className="searchBlock__label" htmlFor="search">
        <img className="searchBlock__img" src="/find.svg" alt="search" />
        <input
          type="text"
          id="search"
          onChange={handleInputChange}
          value={searchValue}
        />
      </label>
      <Btn onClick={handleSearch} title="SEARCH" />
      <Btn onClick={handleClear} title="CLEAR" />
    </div>
  );
};

export default SearchBlock;
