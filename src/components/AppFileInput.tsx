import React, { forwardRef } from 'react';
import { AppInputRef } from './AppInput';
import { FormError } from './UncontrolledForm';
import { FieldError } from 'react-hook-form';

export interface AppFileInputParams {
  inputName: string;
  label: string;
  id: string;
  error: FormError | FieldError | undefined;
}

const AppFileInput = forwardRef<AppInputRef, AppFileInputParams>(
  ({ inputName, id, label, error, ...rest }, ref) => {
    const isError = error?.message;

    return (
      <div className="appFileInput">
        <label htmlFor={id}>
          <span className="appFileInput__iconWrapper">
            <img
              className="appFileInput__icon"
              src="./../../public/download.svg"
              alt="Upload Picture"
              width="25"
            />
          </span>
          <span className="appFileInput__title">{label}</span>
        </label>
        <input
          ref={ref}
          type="file"
          name={inputName}
          id={id}
          accept="image/*"
          {...rest}
        />
        {isError && <p className="inputItem__error">{error.message}</p>}
      </div>
    );
  }
);

export default AppFileInput;
