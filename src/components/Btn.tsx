import React, { BaseSyntheticEvent, FC } from 'react';

interface BtnParams {
  onClick: (e: BaseSyntheticEvent) => void;
  title: string;
}

const Btn: FC<BtnParams> = ({ onClick, title }) => {
  return (
    <button className="btn" onClick={onClick}>
      {title}
    </button>
  );
};

export default Btn;
