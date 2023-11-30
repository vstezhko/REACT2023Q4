import React, { FC } from 'react';

interface AppInputParams {
  type: string;
  id: string;
  inputName: string;
  value?: string;
  handleChange?: () => void;
  label: string;
  required?: boolean;
}

const AppInput: FC<AppInputParams> = ({
  label,
  inputName,
  id,
  type,
  required = false,
}) => {
  return (
    <div className="appInput inputItem">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={inputName}
        // value={value}
        // onChange={handleChange}
        required={required}
      />
    </div>
  );
};

export default AppInput;
