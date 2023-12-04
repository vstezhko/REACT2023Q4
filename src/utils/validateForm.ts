import * as Yup from 'yup';
import { object, ValidationError } from 'yup';
import { FormError } from '../components/UncontrolledForm';

export type FormValue = string | number | FileList | boolean | undefined | null;

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

export const validationSchema = object().shape({
  [FormFields.NAME]: Yup.string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name should start with an uppercase letter'),

  [FormFields.AGE]: Yup.number()
    .required('Age is required')
    .typeError('Age must be a number')
    .positive('Age should be a positive number'),

  [FormFields.EMAIL]: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),

  [FormFields.PASSWORD]: Yup.string()
    .required('Password is required')
    .matches(/^(?=.*\d)/, 'need 1 digit')
    .matches(/(?=.*[A-Z])/, 'need 1 uppercase (A-Z)')
    .matches(/(?=.*[a-z])/, 'need 1 lowercase (a-z)')
    .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, 'need 1 special symbol'),

  [FormFields.CONFIRM_PASSWORD]: Yup.string()
    .required('Confirm Password is required')
    .matches(/(?=.*[A-Z])/, 'need 1 uppercase (A-Z)')
    .matches(/(?=.*[a-z])/, 'need 1 lowercase (a-z)')
    .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, 'need 1 special symbol')
    .oneOf([Yup.ref(FormFields.PASSWORD)], 'Passwords must match'),

  [FormFields.GENDER]: Yup.string()
    .required('Gender is required')
    .oneOf([GenderOptions.MALE, GenderOptions.FEMALE], 'Gender is required'),

  [FormFields.ACCEPT_TERMS]: Yup.boolean()
    .required('This field is required')
    .oneOf([true], 'Accept Terms & Conditions is required'),

  [FormFields.PICTURE]: Yup.mixed()
    .required('Picture is required')
    .test('fileSize', 'Picture is required', (value) => {
      if (value && value instanceof FileList && value.length) return true;
      if (value && value instanceof File) return true;
    })
    .test('fileSize', 'File size is too large (max size is 5MB)', (value) => {
      if (value instanceof File) return value.size <= 5 * 1024 * 1024;
      if (value instanceof FileList && !!value[0])
        return value[0].size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Invalid file type', (value) => {
      if (value instanceof FileList && !!value[0])
        return ['image/jpeg', 'image/png'].includes(value[0].type);
      if (value instanceof File)
        return ['image/jpeg', 'image/png'].includes(value.type);
    }),

  [FormFields.COUNTRY]: Yup.string().required('Country is required'),
});

export const validateField = (
  data: Record<FormFields, FormValue>,
  errors: Record<FormFields, FormError>
) => {
  const errorsCopy = { ...errors };

  try {
    validationSchema.validateSync(data, { abortEarly: false });
    return errorsCopy;
  } catch (err) {
    if (err instanceof ValidationError) {
      return err.inner.reduce(
        (acc: Record<FormFields, FormError>, error: ValidationError) => {
          if (error.path) {
            acc[error.path as FormFields] = {
              isError: true,
              message: error.message,
            } as FormError;
          }
          return acc;
        },
        errorsCopy
      );
    }
    return errorsCopy;
  }
};
