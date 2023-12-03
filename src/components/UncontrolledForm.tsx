import React, { FormEvent, useState } from 'react';
import LinkToMain from './LinkToMain';
import AppInput from './AppInput';
import AppCheckboxInput from './AppCheckboxInput';
import AppFileInput from './AppFileInput';
import AppDropdown from './AppDropdown';
import AppRadioInputSet from './AppRadioInputSet';
import { useCreateRefs } from '../hooks/useCreateRefs';
import {
  FormFields,
  FormValue,
  GenderOptions,
  validateField,
} from '../utils/validateForm';
import { useDispatch, useSelector } from '../redux/store';
import { formResultsSlice } from '../redux/slices/formResultsSlice/formResultsSlice';
import { transformImage } from '../utils/transformImage';
import { useNavigate } from 'react-router-dom';
import AppPasswordInput from './AppPasswordInput';

const startErrorsFormData: Record<FormFields, FormError> = {
  [FormFields.NAME]: { isError: false },
  [FormFields.AGE]: { isError: false },
  [FormFields.EMAIL]: { isError: false },
  [FormFields.PASSWORD]: { isError: false },
  [FormFields.CONFIRM_PASSWORD]: { isError: false },
  [FormFields.GENDER]: { isError: false },
  [FormFields.ACCEPT_TERMS]: { isError: false },
  [FormFields.PICTURE]: { isError: false },
  [FormFields.COUNTRY]: { isError: false },
};

export interface FormError {
  isError: boolean;
  message?: string;
}

const UncontrolledForm = () => {
  const refs = useCreateRefs();
  const countryOptions = useSelector((state) => state.countriesSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(startErrorsFormData);

  const radioOptions = [
    {
      label: 'Male',
      inputName: 'gender',
      value: 'male',
      radioRef: refs[GenderOptions.MALE],
    },
    {
      label: 'Female',
      inputName: 'gender',
      value: 'female',
      radioRef: refs[GenderOptions.FEMALE],
    },
  ];
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const genderValue = refs[GenderOptions.MALE].current?.checked
      ? GenderOptions.MALE
      : refs[GenderOptions.FEMALE].current?.checked
        ? GenderOptions.FEMALE
        : undefined;

    const inputsData: Record<FormFields, FormValue> = {
      [FormFields.NAME]: refs[FormFields.NAME].current?.value || undefined,
      [FormFields.AGE]: refs[FormFields.AGE].current?.value || undefined,
      [FormFields.EMAIL]: refs[FormFields.EMAIL].current?.value || undefined,
      [FormFields.PASSWORD]:
        refs[FormFields.PASSWORD].current?.value || undefined,
      [FormFields.CONFIRM_PASSWORD]:
        refs[FormFields.CONFIRM_PASSWORD].current?.value || undefined,
      [FormFields.GENDER]: genderValue,
      [FormFields.ACCEPT_TERMS]: refs[FormFields.ACCEPT_TERMS].current?.checked,
      [FormFields.PICTURE]: refs[FormFields.PICTURE].current?.files,
      [FormFields.COUNTRY]:
        refs[FormFields.COUNTRY].current?.value || undefined,
    };

    const validationErrors = validateField(inputsData, startErrorsFormData);

    setErrors(validationErrors);

    if (
      !Object.values(validationErrors).filter((field) => field.isError).length
    ) {
      let base64String;
      if (inputsData.picture && inputsData.picture instanceof FileList) {
        base64String = await transformImage(inputsData.picture[0]);
      }
      dispatch(
        formResultsSlice.actions.addUncontrolledForm({
          ...inputsData,
          picture: base64String,
        })
      );
      navigate('/');
    }
  };

  return (
    <>
      <LinkToMain />
      <div className="form">
        <h2>Uncontrolled form</h2>
        <form onSubmit={handleSubmit}>
          <AppInput
            ref={refs[FormFields.NAME]}
            type="text"
            id={FormFields.NAME}
            inputName="name"
            label="Name:"
            error={errors[FormFields.NAME]}
          />

          <AppInput
            ref={refs[FormFields.AGE]}
            type="number"
            id={FormFields.AGE}
            inputName="age"
            label="Age:"
            error={errors[FormFields.AGE]}
          />

          <AppInput
            ref={refs[FormFields.EMAIL]}
            type="text"
            id={FormFields.EMAIL}
            inputName="email"
            label="Email:"
            error={errors[FormFields.EMAIL]}
          />

          <AppPasswordInput
            ref={refs[FormFields.PASSWORD]}
            id={FormFields.PASSWORD}
            inputName="password"
            label="Password:"
            error={errors[FormFields.PASSWORD]}
          />

          <AppPasswordInput
            ref={refs[FormFields.CONFIRM_PASSWORD]}
            id={FormFields.CONFIRM_PASSWORD}
            inputName="confirmPassword"
            label="Confirm Password:"
            error={errors[FormFields.CONFIRM_PASSWORD]}
          />
          <AppRadioInputSet
            label="Gender:"
            options={radioOptions}
            error={errors[FormFields.GENDER]}
          />

          <AppCheckboxInput
            ref={refs[FormFields.ACCEPT_TERMS]}
            inputName="acceptTerms"
            label="Accept Terms & Conditions"
            error={errors[FormFields.ACCEPT_TERMS]}
          />

          <AppFileInput
            ref={refs[FormFields.PICTURE]}
            inputName="picture"
            label="Upload Picture:"
            id="picture"
            error={errors[FormFields.PICTURE]}
          />
          <AppDropdown
            ref={refs[FormFields.COUNTRY]}
            id="dropdown"
            label="Select country"
            options={countryOptions}
            error={errors[FormFields.COUNTRY]}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default UncontrolledForm;
