import { FC } from 'react';
import PersonCard from './PersonCard';

interface SearchResultsParams {
  results: {
    name: string;
    gender: string;
    hair_color: string;
    birth_year: string;
  }[];
}

const SearchResults: FC<SearchResultsParams> = ({ results }) => {
  return (
    <div className="searchResults">
      {results.length
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
