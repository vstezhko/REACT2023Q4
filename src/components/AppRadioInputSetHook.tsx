import React, { ChangeEvent, FC, useEffect } from 'react';
import AppRadioInput, { AppRadioInputParams } from './AppRadioInput';
import { FormError } from './UncontrolledForm';
import { FieldError, useFormContext } from 'react-hook-form';
import { FormFields } from '../utils/validateForm';

export interface AppRadioInputSetParams {
  label: string;
  options: AppRadioInputParams[];
  error: FormError | FieldError | undefined;
}

const AppRadioInputSetHook: FC<AppRadioInputSetParams> = ({
  label,
  options,
  error,
}) => {
  const { register, setValue } = useFormContext();

  const isError = error?.message;

  useEffect(() => {
    register(FormFields.GENDER);
  }, []);

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(FormFields.GENDER, e.target.value, { shouldValidate: true });
  };

  return (
    <div className="inputItem">
      <label>{label}</label>
      <div className="radioGroup">
        {options.map((option) => (
          <AppRadioInput
            {...option}
            key={option.value}
            onClick={handleRadioChange}
          />
        ))}
      </div>
      <p className="inputItem__error">{isError ? error.message : ' '}</p>
    </div>
  );
};

export default AppRadioInputSetHook;
