import React, { Component } from 'react';
import { ApiService } from '../api/Api.Service';
import SearchResults from './SearchResults';

type StateType = {
  isLoading: boolean;
  searchValue: null | string;
  page: number;
  searchResults: SearchResultsType;
};

type SearchResultsType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: [];
};

class Header extends Component {
  state: StateType = {
    isLoading: false,
    searchValue: null,
    page: 1,
    searchResults: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
  };

  componentDidMount() {
    const lsSearchValue = localStorage.getItem('search');
    this.setState({
      ...this.state,
      searchValue: lsSearchValue || '',
    });
  }

  async updateSearchResults(searchValue: string, page: number) {
    try {
      this.setState({ isLoading: true });

      const results = await ApiService.search(searchValue, page);

      if (results) {
        this.setState({
          searchResults: results,
          page: 1,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  }

  async componentDidUpdate(
    prevProps: Readonly<unknown>,
    prevState: Readonly<StateType>
  ) {
    if (
      this.state.searchValue !== null &&
      this.state.searchValue !== prevState.searchValue
    ) {
      this.updateSearchResults(this.state.searchValue, this.state.page);
    }
  }

  onInputChange = (e: React.BaseSyntheticEvent) => {
    this.setState({
      searchValue: e.target.value,
    });
    localStorage.setItem('search', e.target.value);
  };

  render() {
    return (
      <>
        <header className="header">
          <div className="logo">
            <img
              className="logo__img"
              src="../../public/starwars.svg"
              alt="logo"
            />
            <h2>STARWARS</h2>
          </div>
          <label className="search" htmlFor="search">
            <img
              className="search__img"
              src="../../public/find.svg"
              alt="logo"
            />
            <input
              type="text"
              id="search"
              onChange={this.onInputChange}
              value={this.state.searchValue || ''}
            />
          </label>
        </header>
        <SearchResults
          items={this.state.searchResults}
          loading={this.state.isLoading}
        />
      </>
    );
  }
}

export default Header;
