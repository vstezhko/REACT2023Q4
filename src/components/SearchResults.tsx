import { Component } from 'react';
import PersonCard from './PersonCard';

interface SearchResultsProps {
  loading: boolean;
  items: {
    results: {
      name: string;
      gender: string;
      hair_color: string;
      birth_year: string;
    }[];
  };
}

class SearchResults extends Component<SearchResultsProps> {
  render() {
    return (
      <div className="searchResults">
        {this.props.loading
          ? '...LOADING'
          : this.props.items.results.length
          ? this.props.items.results.map((i, index) => (
              <PersonCard
                key={index}
                name={i.name}
                gender={i.gender}
                hairColor={i.hair_color}
                birthYear={i.birth_year}
              />
            ))
          : 'There are NO ITEMS'}
      </div>
    );
  }
}

export default SearchResults;
