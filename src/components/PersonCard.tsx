import { FC } from 'react';
import { useRouter } from 'next/router';

interface PersonCardParams {
  name: string;
  gender: string;
  id: string;
  image: string;
}

const PersonCard: FC<PersonCardParams> = ({ name, gender, id, image }) => {
  const router = useRouter();
  const { searchValue = '', page = 1, pageSize = 10 } = router.query;

  const handleClick = () => {
    router.push(
      `/details/${id}?searchValue=${searchValue}&page=${page}&pageSize=${pageSize}`
    );
  };

  return (
    <div
      className="card searchResults__item"
      onClick={handleClick}
      data-testid="personCard"
    >
      <div className="card__info">
        <h4>
          <span>name:</span> {name}
        </h4>
        <p>
          <span>gender:</span> {gender}
        </p>
      </div>
      {image ? (
        <div className="card__imageBlock">
          <img src={image} alt="card image" />
        </div>
      ) : null}
    </div>
  );
};

export default PersonCard;
