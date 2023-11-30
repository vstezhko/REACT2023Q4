import React, { FC } from 'react';

interface AppCheckboxInputParams {
  label: string;
  inputName: string;
  checked?: boolean;
  onChange?: () => void;
}

const AppCheckboxInput: FC<AppCheckboxInputParams> = ({ label, inputName }) => {
  return (
    <div className="inputItem">
      <label className="appCheckboxInput">
        <input
          type="checkbox"
          name={inputName}
          // checked={formData.acceptTerms}
          // onChange={handleChange}
        />
        {label}
      </label>
    </div>
  );
};

export default AppCheckboxInput;
