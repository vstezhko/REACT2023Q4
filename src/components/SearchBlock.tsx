import React, { BaseSyntheticEvent, FC, useState } from 'react';
import Btn from './Btn';

interface SearchBlockParams {
  handleSearchValueChange: (newValue: string) => void;
  searchValue: string;
}

const SearchBlock: FC<SearchBlockParams> = ({
  handleSearchValueChange,
  searchValue,
}) => {
  const [inputValue, setInputValue] = useState(searchValue);

  const handleSearchValue = () => {
    handleSearchValueChange(inputValue);
  };

  const handleInputChange = (e: BaseSyntheticEvent) => {
    const newValue = e.target.value.trim();
    setInputValue(newValue);
  };
  const handleClear = () => {
    const newValue = '';
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
