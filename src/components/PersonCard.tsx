import { FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface PersonCardParams {
  name: string;
  gender: string;
  hairColor: string;
  birthYear: string;
  url: string;
}

const PersonCard: FC<PersonCardParams> = ({
  name,
  gender,
  hairColor,
  birthYear,
  url,
}) => {
  const parts = url.split('/');
  const id = parts[parts.length - 2];
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
    <div className="card" onClick={handleClick}>
      <h4>
        <span>name:</span> {name}
      </h4>
      <p>
        <span>gender:</span> {gender}
      </p>
      <p>
        <span>hair color:</span> {hairColor}
      </p>
      <p>
        <span>birth year:</span> {birthYear}
      </p>
    </div>
  );
};

export default PersonCard;
