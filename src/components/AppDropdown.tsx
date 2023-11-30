import React, { useState, useEffect, useRef, SyntheticEvent } from 'react';

const AppDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
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
      setSelectedOption(option);
      setIsOpen(false);
    }
  };

  return (
    <div className="appDropdown inputItem" ref={dropdownRef}>
      <div className="appDropdow__label">Select country</div>
      <div
        className={`appDropdown__selected ${
          isOpen ? 'appDropdown__selected_open' : ''
        }`}
        onClick={toggleDropdown}
      >
        <span>{selectedOption}</span>
        <div
          className={`appDropdown__icon ${
            isOpen ? 'appDropdown__icon_open' : ''
          }`}
        >
          &#9660;
        </div>
      </div>
      {isOpen && (
        <div className="appDropdown__options">
          <div
            className="appDropdown__option"
            data-option="Country 1"
            onClick={selectOption}
          >
            Country 1
          </div>
          <div
            className="appDropdown__option"
            data-option="Country 2"
            onClick={selectOption}
          >
            Country 2
          </div>
        </div>
      )}
    </div>
  );
};

export default AppDropdown;
