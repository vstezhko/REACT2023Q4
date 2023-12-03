import React, { ChangeEvent, forwardRef, useState } from 'react';
import { FormError } from './UncontrolledForm';
import { FieldError } from 'react-hook-form';
import PasswordStrength from './PasswordStrength';

export type AppInputRef = HTMLInputElement | null;

export interface AppPasswordInputParams {
  id: string;
  inputName: string;
  label: string;
  error?: FormError | FieldError | undefined;
}

const AppPasswordInput = forwardRef<AppInputRef, AppPasswordInputParams>(
  ({ label, inputName, id, error }, ref) => {
    const [showInputData, setShowInputData] = useState(true);
    const [value, setValue] = useState('');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

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

    const isError = error?.message;

    return (
      <div className="appInput inputItem">
        <label htmlFor={id}>{label}</label>
        <input
          className="appInput__input"
          ref={ref}
          type={showInputData ? 'password' : 'text'}
          id={id}
          name={inputName}
          value={value}
          onChange={onChange}
        />
        {value && <PasswordStrength password={value} />}
        {isError && <p className="inputItem__error">{error.message}</p>}
        {passwordIcon}
      </div>
    );
  }
);

export default AppPasswordInput;
