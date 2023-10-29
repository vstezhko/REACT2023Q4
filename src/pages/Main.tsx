import React, { Component } from 'react';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';
import { ApiService } from '../api/Api.Service';

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

class Main extends Component {
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

  handleSearchValue = (newValue: string) => {
    this.setState({
      ...this.state,
      searchValue: newValue,
    });
  };

  render() {
    return (
      <>
        <Header
          onSearch={this.handleSearchValue}
        />
        <SearchResults
          items={this.state.searchResults}
          loading={this.state.isLoading}
        />
      </>
    );
  }
}

export default Main;
