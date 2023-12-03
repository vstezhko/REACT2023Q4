import React, { forwardRef } from 'react';
import { AppInputRef } from './AppInput';
import { FormError } from './UncontrolledForm';
import { FieldError } from 'react-hook-form';

export interface AppCheckboxInputParams {
  label: string;
  inputName: string;
  error: FormError | FieldError | undefined;
}

const AppCheckboxInput = forwardRef<AppInputRef, AppCheckboxInputParams>(
  ({ label, inputName, error, ...rest }, ref) => {
    const isError = error?.message;

    return (
      <div className="inputItem">
        <label className="appCheckboxInput">
          <input ref={ref} type="checkbox" name={inputName} {...rest} />
          {label}
        </label>
        {isError && <p className="inputItem__error">{error.message}</p>}
      </div>
    );
  }
);

export default AppCheckboxInput;
