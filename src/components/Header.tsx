import React, { Component } from 'react';
import SearchBlock from './SearchBlock';
import ErrorBtn from './ErrorBtn';

interface HeaderProps {
  onSearch: (newValue: string) => void;
}

class Header extends Component<HeaderProps> {
  render() {
    return (
      <header className="header">
        <div className="logo">
          <img
            className="logo__img"
            src="../../public/starwars.svg"
            alt="logo"
          />
          <h2>STARWARS</h2>
        </div>
        <SearchBlock onSearch={this.props.onSearch} />
        <ErrorBtn />
      </header>
    );
  }
}

export default Header;
