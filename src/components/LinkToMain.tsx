import React from 'react';
import { Link } from 'react-router-dom';

const LinkToMain = () => {
  return (
    <Link to="/" className="linkToMain">
      <img src="./../../public/back_arrow.svg" className="linkToMain__img" />
      <h3>back to main page</h3>
    </Link>
  );
};

export default LinkToMain;
