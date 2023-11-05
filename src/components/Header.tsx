import React from 'react';
import SearchBlock from './SearchBlock';
import ErrorBtn from './ErrorBtn';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img className="logo__img" src="/starwars.svg" alt="logo" />
        <h2>STARWARS</h2>
      </div>
      <SearchBlock />
      <ErrorBtn />
    </header>
  );
};

export default Header;
