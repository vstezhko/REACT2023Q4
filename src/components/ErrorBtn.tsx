import React, { useState } from 'react';

const ErrorBtn = () => {
  const [isError, setIsError] = useState<boolean>(false);

  const generateError = () => {
    setIsError(true);
  };

  if (isError) {
    throw new ErrorEvent('Synthetic Btn error');
  }

  return (
    <button className="btn btn_error" onClick={generateError}>
      Generate error
    </button>
  );
};

export default ErrorBtn;
