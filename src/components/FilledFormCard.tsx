import React, { FC } from 'react';
import { FormFields } from '../utils/validateForm';

export interface FilledFormCardParams {
  [FormFields.NAME]: string | null;
  [FormFields.AGE]: number;
  [FormFields.EMAIL]: string;
  [FormFields.PASSWORD]: string;
  [FormFields.CONFIRM_PASSWORD]: string;
  [FormFields.GENDER]: string;
  [FormFields.ACCEPT_TERMS]: boolean;
  [FormFields.PICTURE]: string;
  [FormFields.COUNTRY]: string;
}

const FilledFormCard: FC<FilledFormCardParams> = (props) => {
  const {
    name,
    age,
    email,
    password,
    confirmPassword,
    gender,
    country,
    acceptTerms,
    picture,
  } = props;
  return (
    <div className="card">
      <p>
        <b>Name: </b>
        {name || ''}
      </p>
      <p>
        <b>Age: </b>
        {age}
      </p>
      <p>
        <b>Email: </b>
        {email}
      </p>
      <p>
        <b>Password: </b>
        {password}
      </p>
      <p>
        <b>Confirm password: </b>
        {confirmPassword}
      </p>
      <p>
        <b>Gender: </b>
        {gender}
      </p>
      <p>
        <b>Country: </b>
        {country}
      </p>
      <p>
        <b>A&T: </b>
        {acceptTerms ? 'accepted' : ''}
      </p>
      <div className="card__image">
        <img src={picture} alt={'pic'} />
      </div>
    </div>
  );
};

export default FilledFormCard;
