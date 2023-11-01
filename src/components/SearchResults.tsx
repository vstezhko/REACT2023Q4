import { FC } from 'react';
import PersonCard from './PersonCard';

interface SearchResultsParams {
  loading: boolean;
  results: {
    name: string;
    gender: string;
    hair_color: string;
    birth_year: string;
  }[];
}

const SearchResults: FC<SearchResultsParams> = ({ loading, results }) => {
  return (
    <div className="searchResults">
      {loading
        ? '...LOADING'
        : results.length
        ? results.map((i, index) => (
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
};

export default SearchResults;
