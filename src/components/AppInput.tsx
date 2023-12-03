import React, { forwardRef } from 'react';
import { FormError } from './UncontrolledForm';
import { FieldError } from 'react-hook-form';

export type AppInputRef = HTMLInputElement | null;

export interface AppInputParams {
  type: string;
  id: string;
  inputName: string;
  label: string;
  error?: FormError | FieldError | undefined;
}

const AppInput = forwardRef<AppInputRef, AppInputParams>(
  ({ label, inputName, id, type, error, ...rest }, ref) => {
    const isError = error?.message;

    return (
      <div className="appInput inputItem">
        <label htmlFor={id}>{label}</label>
        <input
          className="appInput__input"
          ref={ref}
          type={type}
          id={id}
          name={inputName}
          {...rest}
        />
        {isError && <p className="inputItem__error">{error.message}</p>}
      </div>
    );
  }
);

export default AppInput;
