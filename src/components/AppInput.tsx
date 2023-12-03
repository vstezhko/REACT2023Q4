import React, { forwardRef, MutableRefObject, useState } from 'react';
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
    const [showInputData, setShowInputData] = useState(type === 'password');
    const isPasswordField = type === 'password';

    const switchPasswordVisibility = () => {
      setShowInputData((prevState) => !prevState);
    };

    const passwordIcon = showInputData ? (
      <img
        className="appInput__passwordIcon"
        onClick={switchPasswordVisibility}
        src="./../../public/eye.svg"
        alt="show password"
      />
    ) : (
      <img
        className="appInput__passwordIcon"
        onClick={switchPasswordVisibility}
        src="./../../public/invisible.svg"
        alt="hide pasword"
      />
    );

    return (
      <div className="appInput inputItem">
        <label htmlFor={id}>{label}</label>
        <input
          className="appInput__input"
          ref={ref}
          type={showInputData ? type : 'text'}
          id={id}
          name={inputName}
        />
        {error.isError && (
          <p className="inputItem__error">{error.errorMessage}</p>
        )}
        {isPasswordField && passwordIcon}
      </div>
    );
  }
);

export default AppInput;
