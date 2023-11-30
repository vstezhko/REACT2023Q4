import React, { FC, MutableRefObject } from 'react';
import { AppInputRef } from './AppInput';

export interface AppCheckboxInputParams {
  label: string;
  inputName: string;
  checkboxRef?: MutableRefObject<AppInputRef>;
}

const AppCheckboxInput: FC<AppCheckboxInputParams> = ({
  label,
  inputName,
  checkboxRef,
}) => {
  return (
    <div className="inputItem">
      <label className="appCheckboxInput">
        <input ref={checkboxRef} type="checkbox" name={inputName} />
        {label}
      </label>
    </div>
  );
};

export default AppCheckboxInput;
