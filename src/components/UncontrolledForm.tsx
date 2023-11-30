import React, { useState } from 'react';
import LinkToMain from './LinkToMain';
import AppInput from './AppInput';
import AppRadioInput from './AppRadioInput';
import AppCheckboxInput from './AppCheckboxInput';
import AppFileInput from './AppFileInput';
import AppDropdown from './AppDropdown';

const options = ['Belarus', 'Poland', 'Germany'];

const UncontrolledForm = () => {
  const [formData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    acceptTerms: false,
    picture: null,
    country: '',
  });

  return (
    <>
      <LinkToMain />
      <div className="form">
        <h2>Uncontrolled form</h2>
        <form>
          <AppInput
            type="text"
            id="name"
            inputName="name"
            value={formData.name}
            handleChange={() => {}}
            label="Name:"
            required={true}
          />

          <AppInput
            type="number"
            id="age"
            inputName="age"
            value={formData.age}
            handleChange={() => {}}
            label="Age:"
            required={true}
          />

          <AppInput
            type="email"
            id="email"
            inputName="email"
            value={formData.email}
            handleChange={() => {}}
            label="Email:"
            required={true}
          />

          <AppInput
            type="password"
            id="password"
            inputName="password"
            value={formData.password}
            handleChange={() => {}}
            label="Password:"
            required={true}
          />

          <AppInput
            type="password"
            id="confirmPassword"
            inputName="confirmPassword"
            value={formData.confirmPassword}
            handleChange={() => {}}
            label="Confirm Password:"
            required={true}
          />

          <div className="inputItem">
            <label>Gender:</label>
            <div className="radioGroup">
              <AppRadioInput label="Male" inputName="gender" value="male" />
              <AppRadioInput label="Female" inputName="gender" value="female" />
            </div>
          </div>
          <AppCheckboxInput
            inputName="acceptTerms"
            label="Accept Terms & Conditions"
          />

          <AppFileInput
            inputName="picture"
            label="Upload Picture:"
            id="picture"
          />
          <AppDropdown id="dropdown" label="Select country" options={options} />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default UncontrolledForm;
