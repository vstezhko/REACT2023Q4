import { useRef } from 'react';
import { AppInputRef } from '../components/AppInput';
import { FormFields, GenderOptions } from '../utils/validateForm';

export const useCreateRefs = () => {
  return {
    [FormFields.NAME]: useRef<AppInputRef>(null),
    [FormFields.AGE]: useRef<AppInputRef>(null),
    [FormFields.EMAIL]: useRef<AppInputRef>(null),
    [FormFields.PASSWORD]: useRef<AppInputRef>(null),
    [FormFields.CONFIRM_PASSWORD]: useRef<AppInputRef>(null),
    [GenderOptions.MALE]: useRef<AppInputRef>(null),
    [GenderOptions.FEMALE]: useRef<AppInputRef>(null),
    [FormFields.ACCEPT_TERMS]: useRef<AppInputRef>(null),
    [FormFields.PICTURE]: useRef<AppInputRef>(null),
    [FormFields.COUNTRY]: useRef<AppInputRef>(null),
  };
};
