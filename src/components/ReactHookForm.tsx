import React from 'react';
import LinkToMain from './LinkToMain';
import AppInput from './AppInput';
import AppCheckboxInput from './AppCheckboxInput';
import AppFileInput from './AppFileInput';
import AppDropdown from './AppDropdown';
import AppRadioInputSet from './AppRadioInputSet';
import { FormFields, validationSchema } from '../utils/validateForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const countryOptions = ['Belarus', 'Poland', 'Germany'];
const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  // const dispatch = useDispatch();
  // const [errors, setErrors] = useState(startErrorsFormData);

  const radioOptions = [
    {
      label: 'Male',
      inputName: 'gender',
      value: 'male',
    },
    {
      label: 'Female',
      inputName: 'gender',
      value: 'female',
    },
  ];
  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //
  //   const validationErrors = validateField(inputsData, startErrorsFormData);
  //
  //   setErrors(validationErrors);
  //
  //   if (
  //     !Object.values(validationErrors).filter((field) => field.isError).length
  //   ) {
  //     dispatch(formResultsSlice.actions.addForm(inputsData));
  //   }
  // };

  const onSubmitHandler = (data) => {
    console.log({ data });
    reset();
  };

  return (
    <>
      <LinkToMain />
      <div className="form">
        <h2>React Hook form</h2>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <AppInput
            {...register(FormFields.NAME)}
            type="text"
            id={FormFields.NAME}
            inputName="name"
            label="Name:"
            error={errors[FormFields.NAME]}
          />

          <AppInput
            {...register(FormFields.AGE)}
            type="number"
            id={FormFields.AGE}
            inputName="age"
            label="Age:"
            error={errors[FormFields.AGE]}
          />

          <AppInput
            {...register(FormFields.EMAIL)}
            type="text"
            id={FormFields.EMAIL}
            inputName="email"
            label="Email:"
            error={errors[FormFields.EMAIL]}
          />

          <AppInput
            {...register(FormFields.PASSWORD)}
            type="password"
            id={FormFields.PASSWORD}
            inputName="password"
            label="Password:"
            error={errors[FormFields.PASSWORD]}
          />

          <AppInput
            {...register(FormFields.CONFIRM_PASSWORD)}
            type="password"
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
            {...register(FormFields.ACCEPT_TERMS)}
            inputName="acceptTerms"
            label="Accept Terms & Conditions"
            error={errors[FormFields.ACCEPT_TERMS]}
          />

          <AppFileInput
            {...register(FormFields.PICTURE)}
            inputName="picture"
            label="Upload Picture:"
            id="picture"
            error={errors[FormFields.PICTURE]}
          />
          <AppDropdown
            {...register(FormFields.COUNTRY)}
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

export default ReactHookForm;
