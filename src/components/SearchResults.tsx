import { Component } from 'react';

interface SearchResultsProps {
  loading: boolean;
  items: {
    results: { name: string }[];
  };
}

class SearchResults extends Component<SearchResultsProps> {
  render() {
    return (
      <div className="searchResults">
        {this.props.loading
          ? '...LOADING'
          : this.props.items.results.length
          ? this.props.items.results.map((i) => i.name)
          : 'There are NO ITEMS'}
      </div>
    );
  }
}

export default SearchResults;
