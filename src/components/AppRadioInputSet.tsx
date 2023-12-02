import React, { FC } from 'react';
import AppRadioInput, { AppRadioInputParams } from './AppRadioInput';
import { FormError } from './UncontrolledForm';

export interface AppRadioInputSetParams {
  label: string;
  options: AppRadioInputParams[];
  error: FormError;
}

const AppRadioInputSet: FC<AppRadioInputSetParams> = ({
  label,
  options,
  error,
}) => {
  return (
    <div className="inputItem">
      <label>{label}</label>
      <div className="radioGroup">
        {options.map((option) => (
          <AppRadioInput {...option} key={option.value} />
        ))}
      </div>
      {error.isError && (
        <p className="inputItem__error">{error.errorMessage}</p>
      )}
    </div>
  );
};

export default AppRadioInputSet;
