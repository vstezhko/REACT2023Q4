import React, { FC, FormEvent, MutableRefObject, useRef } from 'react';
import LinkToMain from './LinkToMain';
import AppInput, { AppInputRef } from './AppInput';
import AppCheckboxInput from './AppCheckboxInput';
import AppFileInput from './AppFileInput';
import AppDropdown from './AppDropdown';
import AppRadioInputSet from './AppRadioInputSet';

const countryOptions = ['Belarus', 'Poland', 'Germany'];

export interface InputWithRef {
  ref: MutableRefObject<FC>;
}

const UncontrolledForm = () => {
  const nameInputRef = useRef<AppInputRef>(null);
  const ageInputRef = useRef<AppInputRef>(null);
  const emailInputRef = useRef<AppInputRef>(null);
  const passwordInputRef = useRef<AppInputRef>(null);
  const confirmPasswordInputRef = useRef<AppInputRef>(null);
  const maleRadioRef = useRef<AppInputRef>(null);
  const femaleRadioRef = useRef<AppInputRef>(null);
  const acceptTermsRef = useRef<AppInputRef>(null);
  const pictureRef = useRef<AppInputRef>(null);
  const dropdownInputRef = useRef<AppInputRef>(null);

  const radioOptions = [
    {
      label: 'Male',
      inputName: 'gender',
      value: 'male',
      radioRef: maleRadioRef,
    },
    {
      label: 'Female',
      inputName: 'gender',
      value: 'female',
      radioRef: femaleRadioRef,
    },
  ];
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameInputRef.current?.value;
    const age = ageInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const confirmPassword = confirmPasswordInputRef.current?.value;
    const male = maleRadioRef.current?.checked;
    const female = femaleRadioRef.current?.checked;
    const isAcceptedTerms = acceptTermsRef.current?.checked;
    const picture = pictureRef.current?.files;
    const dropdownInput = dropdownInputRef.current?.value;
    console.log(
      name,
      age,
      email,
      password,
      confirmPassword,
      male,
      female,
      isAcceptedTerms,
      picture,
      dropdownInput
    );
  };

  return (
    <>
      <LinkToMain />
      <div className="form">
        <h2>Uncontrolled form</h2>
        <form onSubmit={handleSubmit}>
          <AppInput
            ref={nameInputRef}
            type="text"
            id="name"
            inputName="name"
            label="Name:"
          />

          <AppInput
            ref={ageInputRef}
            type="number"
            id="age"
            inputName="age"
            label="Age:"
          />

          <AppInput
            ref={emailInputRef}
            type="text"
            id="email"
            inputName="email"
            label="Email:"
          />

          <AppInput
            ref={passwordInputRef}
            type="password"
            id="password"
            inputName="password"
            label="Password:"
          />

          <AppInput
            ref={confirmPasswordInputRef}
            type="password"
            id="confirmPassword"
            inputName="confirmPassword"
            label="Confirm Password:"
          />
          <AppRadioInputSet label="Gender:" options={radioOptions} />

          <AppCheckboxInput
            checkboxRef={acceptTermsRef}
            inputName="acceptTerms"
            label="Accept Terms & Conditions"
          />

          <AppFileInput
            pictureRef={pictureRef}
            inputName="picture"
            label="Upload Picture:"
            id="picture"
          />
          <AppDropdown
            id="dropdown"
            label="Select country"
            inputRef={dropdownInputRef}
            options={countryOptions}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default UncontrolledForm;
