import React from 'react';
import LinkToMain from './LinkToMain';
import AppInput from './AppInput';
import AppCheckboxInput from './AppCheckboxInput';
import AppFileInput from './AppFileInput';
import {
  FormFields,
  GenderOptions,
  validationSchema,
} from '../utils/validateForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldError, FormProvider, useForm } from 'react-hook-form';
import { transformImage } from '../utils/transformImage';
import { useDispatch } from '../redux/store';
import { formResultsSlice } from '../redux/slices/formResultsSlice/formResultsSlice';
import { useNavigate } from 'react-router-dom';
import AppRadioInputSetHook from './AppRadioInputSetHook';
import AppDropdownHook from './AppDropdownHook';

const countryOptions = ['Belarus', 'Poland', 'Germany'];

export interface FormValues {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: GenderOptions;
  acceptTerms: boolean | undefined;
  picture: FileList | undefined;
  country: string;
}

const ReactHookForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      gender: undefined,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = methods;

  const radioOptions = [
    {
      label: 'Male',
      inputName: 'gender',
      value: GenderOptions.MALE,
    },
    {
      label: 'Female',
      inputName: 'gender',
      value: GenderOptions.FEMALE,
    },
  ];

  const onSubmitHandler = async (data: FormValues) => {
    let base64String;
    if (data.picture && data.picture instanceof FileList) {
      base64String = await transformImage(data.picture[0]);
    }
    dispatch(
      formResultsSlice.actions.addForm({
        ...data,
        picture: base64String,
      })
    );
    navigate('/');
  };

  const isValid = !Object.keys(errors).length;

  return (
    <>
      <LinkToMain />
      <div className="form">
        <h2>React Hook form</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <AppInput
              {...register(FormFields.NAME)}
              type="text"
              id={FormFields.NAME}
              inputName="name"
              label="Name:"
              error={errors[FormFields.NAME] as FieldError}
            />

            <AppInput
              {...register(FormFields.AGE)}
              type="number"
              id={FormFields.AGE}
              inputName="age"
              label="Age:"
              error={errors[FormFields.AGE] as FieldError}
            />

            <AppInput
              {...register(FormFields.EMAIL)}
              type="text"
              id={FormFields.EMAIL}
              inputName="email"
              label="Email:"
              error={errors[FormFields.EMAIL] as FieldError}
            />

            <AppInput
              {...register(FormFields.PASSWORD)}
              type="password"
              id={FormFields.PASSWORD}
              inputName="password"
              label="Password:"
              error={errors[FormFields.PASSWORD] as FieldError}
            />

            <AppInput
              {...register(FormFields.CONFIRM_PASSWORD)}
              type="password"
              id={FormFields.CONFIRM_PASSWORD}
              inputName="confirmPassword"
              label="Confirm Password:"
              error={errors[FormFields.CONFIRM_PASSWORD] as FieldError}
            />
            <AppRadioInputSetHook
              label="Gender:"
              options={radioOptions}
              error={errors[FormFields.GENDER] as FieldError}
            />

            <AppCheckboxInput
              {...register(FormFields.ACCEPT_TERMS)}
              inputName="acceptTerms"
              label="Accept Terms & Conditions"
              error={errors[FormFields.ACCEPT_TERMS] as FieldError}
            />

            <AppFileInput
              {...register(FormFields.PICTURE)}
              inputName="picture"
              label="Upload Picture:"
              id="picture"
              error={errors[FormFields.PICTURE] as FieldError}
            />
            <AppDropdownHook
              register={register(FormFields.COUNTRY)}
              id="dropdown"
              label="Select country"
              options={countryOptions}
              error={errors[FormFields.COUNTRY] as FieldError}
            />

            <button type="submit" disabled={!isValid}>
              Submit
            </button>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default ReactHookForm;
