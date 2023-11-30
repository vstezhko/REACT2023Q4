import React, { FC } from 'react';

interface AppFileInputParams {
  inputName: string;
  label: string;
  id: string;
}

const AppFileInput: FC<AppFileInputParams> = ({ inputName, id, label }) => {
  return (
    <div className="appFileInput">
      <label htmlFor={id}>
        <span className="appFileInput__iconWrapper">
          <img
            className="appFileInput__icon"
            src="./../../public/download.svg"
            alt="Upload Picture"
            width="25"
          />
        </span>
        <span className="appFileInput__title">{label}</span>
      </label>
      <input
        type="file"
        name={inputName}
        id={id}
        // onChange={handleChange}
        accept=".png, .jpeg, .jpg"
      />
    </div>
  );
};

export default AppFileInput;
