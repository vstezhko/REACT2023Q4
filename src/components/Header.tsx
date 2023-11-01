import React, { FC } from 'react';
import SearchBlock from './SearchBlock';
import ErrorBtn from './ErrorBtn';

interface HeaderParams {
  onSearch: (newValue: string) => void;
}

const Header: FC<HeaderParams> = ({ onSearch }) => {
  return (
    <header className="header">
      <div className="logo">
        <img className="logo__img" src="/starwars.svg" alt="logo" />
        <h2>STARWARS</h2>
      </div>
      <SearchBlock onSearch={onSearch} />
      <ErrorBtn />
    </header>
  );
};

export default Header;
