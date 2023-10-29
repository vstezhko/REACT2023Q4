import React, { Component } from 'react';

interface SearchBlockProps {
  onSearch: (newValue: string) => void;
}

type StateType = {
  value: string;
};

class SearchBlock extends Component<SearchBlockProps> {
  state: StateType = {
    value: '',
  };

  componentDidMount() {
    const lsSearchValue = localStorage.getItem('search');
    this.setState({
      value: lsSearchValue || '',
    });
  }

  handleInputChange = (e: React.BaseSyntheticEvent) => {
    this.setState({
      value: e.target.value,
    });
    localStorage.setItem('search', e.target.value.trim());
  };

  handleSearch = () => {
    this.props.onSearch(this.state.value.trim());
  };

  handleClear = () => {
    this.props.onSearch('');
    localStorage.setItem('search', '');
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <div className="searchBlock">
        <label className="search" htmlFor="search">
          <img className="search__img" src="/find.svg" alt="logo" />
          <input
            type="text"
            id="search"
            onChange={this.handleInputChange}
            value={this.state.value}
          />
        </label>
        <button className="btn" onClick={this.handleSearch}>
          SEARCH
        </button>
        <button className="btn" onClick={this.handleClear}>
          CLEAR
        </button>
      </div>
    );
  }
}

export default SearchBlock;
