import PersonCard from './PersonCard';
import { Character } from '../../redux/hpApi';

const SearchResults = ({ results }: { results: Character[] }) => {
  console.log(results);
  return (
    <div className="searchResults border">
      {results && results.length
        ? results.map((i) => (
            <PersonCard
              key={i.id}
              name={i.attributes.name}
              gender={i.attributes.gender || ''}
              image={i.attributes.image || ''}
              id={i.id}
            />
          ))
        : 'There are NO ITEMS'}
    </div>
  );
};

export default SearchResults;
