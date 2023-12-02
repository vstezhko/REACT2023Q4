import * as Yup from 'yup';
import { ValidationError } from 'yup';

export type FormValue = string | number | File | boolean | undefined | null;

export enum FormFields {
  NAME = 'name',
  AGE = 'age',
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
  GENDER = 'gender',
  ACCEPT_TERMS = 'acceptTerms',
  PICTURE = 'picture',
  COUNTRY = 'country',
}

export enum GenderOptions {
  MALE = 'male',
  FEMALE = 'female',
}

const validationSchema = {
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Z][a-z]*$/, 'Name should start with an uppercase letter'),

  age: Yup.number()
    .required('Age is required')
    .typeError('Age must be a number')
    .positive('Age should be a positive number'),

  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),

  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
    ),

  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),

  gender: Yup.boolean().oneOf([true], 'Gender is required'),

  acceptTerms: Yup.boolean().oneOf(
    [true],
    'Accept Terms & Conditions is required'
  ),

  picture: Yup.mixed()
    .test('fileSize', 'Picture is required', (value) => {
      if (value || value instanceof File) return true;
    })

    .test('fileSize', 'File size is too large', (value) => {
      if (value instanceof File) return value.size <= 1024 * 1024;
    })
    .test('fileType', 'Invalid file type', (value) => {
      if (value instanceof File)
        return ['image/jpeg', 'image/png'].includes(value.type);
    }),

  country: Yup.string().required('Country is required'),
};

export const validateField = (data: FormValue, key: FormFields) => {
  try {
    validationSchema[key].validateSync(data);

    return {
      isError: false,
      errorMessage: '',
    };
  } catch (err) {
    if (err instanceof ValidationError) {
      return {
        isError: true,
        errorMessage: err.message,
      };
    }
  }
};
