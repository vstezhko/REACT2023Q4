import { FC } from 'react';

interface PersonCardParams {
  name: string;
  gender: string;
  hairColor: string;
  birthYear: string;
}

const PersonCard: FC<PersonCardParams> = ({
  name,
  gender,
  hairColor,
  birthYear,
}) => {
  return (
    <div className="card">
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
