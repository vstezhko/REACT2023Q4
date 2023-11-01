import React, { BaseSyntheticEvent, FC, useState } from 'react';
import Btn from './Btn';

interface SearchBlockParams {
  initialValue: string;
  onSearch: (newValue: string) => void;
}

const SearchBlock: FC<SearchBlockParams> = ({ initialValue, onSearch }) => {
  const [searchValue, setSearchValue] = useState(initialValue);

  const handleInputChange = (e: BaseSyntheticEvent) => {
    setSearchValue(e.target.value);
    localStorage.setItem('search', e.target.value.trim());
  };

  const handleSearch = () => {
    onSearch(searchValue.trim());
  };

  const handleClear = (e: BaseSyntheticEvent) => {
    onSearch('');
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
