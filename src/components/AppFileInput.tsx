import React, { FC, MutableRefObject } from 'react';
import { AppInputRef } from './AppInput';

export interface AppFileInputParams {
  inputName: string;
  label: string;
  id: string;
  pictureRef?: MutableRefObject<AppInputRef>;
}

const AppFileInput: FC<AppFileInputParams> = ({
  inputName,
  id,
  label,
  pictureRef,
}) => {
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
        ref={pictureRef}
        type="file"
        name={inputName}
        id={id}
        accept=".png, .jpeg, .jpg"
      />
    </div>
  );
};

export default AppFileInput;
