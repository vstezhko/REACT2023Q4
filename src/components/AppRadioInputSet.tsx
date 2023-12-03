import React, { FC } from 'react';
import AppRadioInput, { AppRadioInputParams } from './AppRadioInput';
import { FormError } from './UncontrolledForm';
import { FieldError } from 'react-hook-form';

export interface AppRadioInputSetParams {
  label: string;
  options: AppRadioInputParams[];
  error: FormError | FieldError | undefined;
}

const AppRadioInputSet: FC<AppRadioInputSetParams> = ({
  label,
  options,
  error,
}) => {
  const isError = error?.message;

  return (
    <div className="inputItem">
      <label>{label}</label>
      <div className="radioGroup">
        {options.map((option) => (
          <AppRadioInput {...option} key={option.value} />
        ))}
      </div>
      {isError && <p className="inputItem__error">{error.message}</p>}
    </div>
  );
};

export default AppRadioInputSet;
