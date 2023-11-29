import React, { useState } from 'react';
import LinkToMain from './LinkToMain';
import AppInput from './AppInput';

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

          <div>
            <label>Gender:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  // onChange={handleChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  // onChange={handleChange}
                />
                Female
              </label>
            </div>
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                // onChange={handleChange}
              />
              Accept Terms & Conditions
            </label>
          </div>

          <div>
            <label htmlFor="picture">Upload Picture:</label>
            <input
              type="file"
              id="picture"
              name="picture"
              // onChange={handleChange}
              accept=".png, .jpeg, .jpg"
            />
          </div>

          <div>
            <label htmlFor="country">Select Country:</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              // onChange={handleChange}
            >
              {/* Populate options with countries stored in Redux */}
              {/* <option value="country1">Country 1</option> */}
              {/* <option value="country2">Country 2</option> */}
            </select>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default UncontrolledForm;
