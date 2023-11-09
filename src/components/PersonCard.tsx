import { FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface PersonCardParams {
  name: string;
  gender: string;
  id: string;
  image: string;
}

const PersonCard: FC<PersonCardParams> = ({ name, gender, id, image }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = () => {
    navigate(
      `/details/${id}?search=${searchParams.get(
        'search'
      )}&page=${searchParams.get('page')}`
    );
  };

  return (
    <div className="card searchResults__item" onClick={handleClick}>
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
