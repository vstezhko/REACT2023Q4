import React, { FC } from 'react';

interface AppRadioInputParams {
  label: string;
  inputName: string;
  value: string;
  checked?: boolean;
  onChange?: () => void;
}

const AppRadioInput: FC<AppRadioInputParams> = ({
  label,
  inputName,
  value,
}) => {
  return (
    <label className="appRadioInput">
      <input
        type="radio"
        name={inputName}
        value={value}
        // checked={checked}
        // onChange={handleChange}
      />
      {label}
    </label>
  );
};

export default AppRadioInput;
