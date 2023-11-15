import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import Btn from './Btn';
import { useDispatch, useSelector } from '../../redux/store';
import { querySlice } from '../../redux/slices/querySlice/querySlice';

const SearchBlock = () => {
  const { searchValue } = useSelector((state) => state.query);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(searchValue);

  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  const handleSearchValue = () => {
    localStorage.setItem('search', inputValue);
    dispatch(querySlice.actions.setNewSearchValue(inputValue));
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
