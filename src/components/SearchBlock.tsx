import React, { BaseSyntheticEvent, useContext, useState } from 'react';
import Btn from './Btn';
import { QueryContext } from './DataProvider';

const SearchBlock = () => {
  const { query, setQuery } = useContext(QueryContext);
  const [inputValue, setInputValue] = useState(query.searchValue);

  const handleSearchValue = () => {
    localStorage.setItem('search', inputValue);
    setQuery((prevState) => {
      return { ...prevState, searchValue: inputValue, page: 1 };
    });
  };

  const handleInputChange = (e: BaseSyntheticEvent) => {
    const newValue = e.target.value.trim();
    setInputValue(newValue);
  };
  const handleClear = () => {
    const newValue = '';
    localStorage.setItem('search', newValue);
    setInputValue(newValue);
  };

  return (
    <div className="searchBlock">
      <label className="searchBlock__label" htmlFor="search">
        <img className="searchBlock__img" src="/find.svg" alt="search" />
        <input
          type="text"
          id="search"
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Search by name"
        />
      </label>
      <Btn onClick={handleSearchValue} title="SEARCH" />
      <Btn onClick={handleClear} title="CLEAR" />
    </div>
  );
};

export default SearchBlock;
