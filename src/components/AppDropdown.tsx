import React, {
  useState,
  useEffect,
  useRef,
  SyntheticEvent,
  FC,
  MutableRefObject,
} from 'react';
import { AppInputRef } from './AppInput';
import { FormError } from './UncontrolledForm';

export interface AppDropdownParams {
  id: string;
  label: string;
  options: string[];
  error: FormError;
  inputRef?: MutableRefObject<AppInputRef>;
}

const AppDropdown: FC<AppDropdownParams> = ({
  id,
  label,
  options,
  error,
  inputRef,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [showedOptions, setShowedOptions] = useState(options);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
      setValue(option);
      setIsOpen(false);
    }
  };

  const onChangeValue = (e: SyntheticEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    const newValue = e.target.value;
    setValue(newValue);
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
          value={value}
          onChange={onChangeValue}
          ref={inputRef}
        />
        <div
          className={`appDropdown__icon ${
            isOpen ? 'appDropdown__icon_open' : ''
          }`}
        >
          &#9660;
        </div>
      </div>
      {error.isError && (
        <p className="inputItem__error">{error.errorMessage}</p>
      )}
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
};

export default AppDropdown;
