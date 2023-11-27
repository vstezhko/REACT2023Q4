import PersonCard from './PersonCard';
import { Character } from '@/redux/slices/hpApi';

const SearchResults = ({ results }: { results: Character[] }) => {
  return (
    <div className="searchResults border">
      {results?.length
        ? results.map(({ id, attributes }) => (
            <PersonCard
              key={id}
              name={attributes.name}
              gender={attributes.gender || ''}
              image={attributes.image || ''}
              id={id}
            />
          ))
        : 'There are NO ITEMS'}
    </div>
  );
};

export default SearchResults;
