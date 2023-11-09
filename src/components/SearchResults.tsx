import { FC } from 'react';
import PersonCard from './PersonCard';

interface SearchResultsParams {
  results:
    | {
        id: string;
        attributes: {
          name: string;
          gender: string;
          image: string;
        };
        links: {
          self: string;
        };
      }[]
    | null;
}

const SearchResults: FC<SearchResultsParams> = ({ results }) => {
  return (
    <div className="searchResults border">
      {results && results.length
        ? results.map((i) => (
            <PersonCard
              key={i.id}
              name={i.attributes.name}
              gender={i.attributes.gender}
              image={i.attributes.image}
              id={i.id}
            />
          ))
        : 'There are NO ITEMS'}
    </div>
  );
};

export default SearchResults;
