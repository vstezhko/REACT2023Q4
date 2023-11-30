import React, { FC } from 'react';
import AppRadioInput, { AppRadioInputParams } from './AppRadioInput';

export interface AppRadioInputSetParams {
  label: string;
  options: AppRadioInputParams[];
}

const AppRadioInputSet: FC<AppRadioInputSetParams> = ({ label, options }) => {
  return (
    <div className="inputItem">
      <label>{label}</label>
      <div className="radioGroup">
        {options.map((option) => (
          <AppRadioInput {...option} key={option.value} />
        ))}
      </div>
    </div>
  );
};

export default AppRadioInputSet;
