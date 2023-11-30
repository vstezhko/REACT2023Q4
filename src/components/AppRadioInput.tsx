import React, { FC, MutableRefObject } from 'react';
import { AppInputRef } from './AppInput';

export interface AppRadioInputParams {
  label: string;
  inputName: string;
  value: string;
  radioRef?: MutableRefObject<AppInputRef>;
}

const AppRadioInput: FC<AppRadioInputParams> = ({
  label,
  inputName,
  value,
  radioRef,
}) => {
  return (
    <label className="appRadioInput">
      <input type="radio" name={inputName} value={value} ref={radioRef} />
      {label}
    </label>
  );
};

export default AppRadioInput;
