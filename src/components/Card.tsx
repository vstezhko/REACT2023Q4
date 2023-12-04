import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export interface CardParams {
  formType: string;
  title: string;
  link: string;
}

const Card: FC<CardParams> = ({ title, link }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <Link to={link} className="card__link">
        Go to form
      </Link>
    </div>
  );
};

export default Card;
