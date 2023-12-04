import React, {
  useState,
  useEffect,
  useRef,
  SyntheticEvent,
  forwardRef,
} from 'react';
import { AppInputRef } from './AppInput';
import { FormError } from './UncontrolledForm';
import {
  FieldError,
  useFormContext,
  UseFormRegisterReturn,
} from 'react-hook-form';
import { FormFields } from '../utils/validateForm';

export interface AppDropdownParams {
  id: string;
  label: string;
  options: string[];
  error: FormError | FieldError | undefined;
  register?: UseFormRegisterReturn;
}

const AppDropdownHook = forwardRef<AppInputRef, AppDropdownParams>(
  ({ id, label, options, error, register }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [showedOptions, setShowedOptions] = useState(options);
    const dropdownRef = useRef(null);
    const { setValue } = useFormContext();

    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('click', handleOutsideClick);

      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }, []);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const selectOption = (e: SyntheticEvent<HTMLDivElement>) => {
      if (!(e.target instanceof HTMLDivElement)) {
        return;
      }
      const option = e.target.dataset.option;
      if (option) {
        setInputValue(option);
        setValue(FormFields.COUNTRY, option, { shouldValidate: true });
        setIsOpen(false);
      }
    };

    const onChangeValue = (e: SyntheticEvent<HTMLInputElement>) => {
      if (!(e.target instanceof HTMLInputElement)) {
        return;
      }

      const newValue = e.target.value;
      setInputValue(newValue);
      setValue(FormFields.COUNTRY, newValue, { shouldValidate: true });
      if (newValue) {
        setShowedOptions(
          options.filter((option) =>
            option.toLowerCase().includes(newValue.toLowerCase())
          )
        );
        return;
      }
      setShowedOptions(options);
    };

    const isError = error?.message;

    return (
      <div className="appDropdown inputItem" ref={dropdownRef}>
        <div className="appDropdow__label">{label}</div>
        <div
          className={`appDropdown__selected ${
            isOpen ? 'appDropdown__selected_open' : ''
          }`}
          onClick={toggleDropdown}
        >
          <input
            className="appDropdown__input"
            type="text"
            id={id}
            value={inputValue}
            {...register}
            onChange={onChangeValue}
            ref={ref}
          />
          <div
            className={`appDropdown__icon ${
              isOpen ? 'appDropdown__icon_open' : ''
            }`}
          >
            &#9660;
          </div>
        </div>
        <p className="inputItem__error">{isError ? error.message : ' '}</p>
        {isOpen && (
          <div className="appDropdown__options">
            {showedOptions.map((option) => (
              <div
                key={option}
                className="appDropdown__option"
                data-option={option}
                onClick={selectOption}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default AppDropdownHook;
