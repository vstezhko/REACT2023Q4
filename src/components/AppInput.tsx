import React, { forwardRef, MutableRefObject } from 'react';

export type AppInputRef = HTMLInputElement | null;

export interface AppInputParams {
  type: string;
  id: string;
  inputName: string;
  label: string;
  ref?: MutableRefObject<AppInputRef>;
}

const AppInput = forwardRef<AppInputRef, AppInputParams>(
  ({ label, inputName, id, type }, ref) => {
    return (
      <div className="appInput inputItem">
        <label htmlFor={id}>{label}</label>
        <input ref={ref} type={type} id={id} name={inputName} />
      </div>
    );
  }
);

export default AppInput;
