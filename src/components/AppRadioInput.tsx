import React, { ChangeEvent, FC, MutableRefObject } from 'react';
import { AppInputRef } from './AppInput';

export interface AppRadioInputParams {
  label: string;
  inputName: string;
  value: string;
  onClick?: (e: ChangeEvent<HTMLInputElement>) => void;
  radioRef?: MutableRefObject<AppInputRef>;
}

const AppRadioInput: FC<AppRadioInputParams> = ({
  label,
  inputName,
  value,
  onClick,
  radioRef,
}) => {
  return (
    <label className="appRadioInput">
      <input
        type="radio"
        name={inputName}
        value={value}
        ref={radioRef}
        onChange={onClick}
      />
      {label}
    </label>
  );
};

export default AppRadioInput;
