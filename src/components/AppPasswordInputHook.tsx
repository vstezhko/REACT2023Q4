import React, { ChangeEvent, ForwardedRef, forwardRef, useState } from 'react';
import PasswordStrength from './PasswordStrength';
import { AppInputRef } from './AppInput';
import { FieldError, useFormContext } from 'react-hook-form';

export interface AppPasswordInputHookParams {
  label: string;
  inputName: string;
  id: string;
  error: FieldError | undefined;
  ref: ForwardedRef<AppInputRef>;
  onChange?: (e: ChangeEvent) => void;
}

const AppPasswordInputHook = forwardRef<
  AppInputRef,
  AppPasswordInputHookParams
>(({ label, inputName, id, error, ...rest }, ref) => {
  const [showInputData, setShowInputData] = useState(true);
  const [value, setValue] = useState('');
  const { register } = useFormContext();
  const { onChange } = register(inputName);

  const switchPasswordVisibility = () => {
    setShowInputData((prevState) => !prevState);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event);
  };

  const passwordIcon = showInputData ? (
    <img
      className="appInput__passwordIcon"
      onClick={switchPasswordVisibility}
      src="./../../public/invisible.svg"
      alt="show password"
    />
  ) : (
    <img
      className="appInput__passwordIcon"
      onClick={switchPasswordVisibility}
      src="./../../public/eye.svg"
      alt="hide pasword"
    />
  );

  const isError = error?.message;

  return (
    <div className="appInput inputItem">
      <label htmlFor={id}>{label}</label>
      <input
        {...rest}
        className="appInput__input"
        type={showInputData ? 'password' : 'text'}
        id={id}
        name={inputName}
        ref={ref}
        value={value}
        onChange={handleChange}
      />
      {value && <PasswordStrength password={value} />}
      <p className="inputItem__error">{isError ? error.message : ' '}</p>
      {passwordIcon}
    </div>
  );
});

export default AppPasswordInputHook;
