import React, { FC } from 'react';

interface AppBtnParams {
  label: string;
}

const AppBtn: FC<AppBtnParams> = ({ label }) => {
  return <button className="btn">{label}</button>;
};

export default AppBtn;
