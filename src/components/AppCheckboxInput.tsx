import React, { FC, MutableRefObject } from 'react';
import { AppInputRef } from './AppInput';
import { FormError } from './UncontrolledForm';

export interface AppCheckboxInputParams {
  label: string;
  inputName: string;
  error: FormError;
  checkboxRef?: MutableRefObject<AppInputRef>;
}

const AppCheckboxInput: FC<AppCheckboxInputParams> = ({
  label,
  inputName,
  error,
  checkboxRef,
}) => {
  return (
    <div className="inputItem">
      <label className="appCheckboxInput">
        <input ref={checkboxRef} type="checkbox" name={inputName} />
        {label}
      </label>
      {error.isError && (
        <p className="inputItem__error">{error.errorMessage}</p>
      )}
    </div>
  );
};

export default AppCheckboxInput;
