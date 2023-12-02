import React, { forwardRef, MutableRefObject } from 'react';
import { FormError } from './UncontrolledForm';

export type AppInputRef = HTMLInputElement | null;

export interface AppInputParams {
  type: string;
  id: string;
  inputName: string;
  label: string;
  error: FormError;
  ref?: MutableRefObject<AppInputRef>;
}

const AppInput = forwardRef<AppInputRef, AppInputParams>(
  ({ label, inputName, id, type, error }, ref) => {
    return (
      <div className="appInput inputItem">
        <label htmlFor={id}>{label}</label>
        <input ref={ref} type={type} id={id} name={inputName} />
        {error.isError && (
          <p className="inputItem__error">{error.errorMessage}</p>
        )}
      </div>
    );
  }
);

export default AppInput;
