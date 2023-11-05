import React, { FC, ReactNode } from 'react';
import Loader from './Loader';

interface MainInfoParams {
  children: ReactNode;
  isLoading: boolean;
}

const MainInfo: FC<MainInfoParams> = ({ isLoading, children }) => {
  return <main className="mainInfo">{isLoading ? <Loader /> : children}</main>;
};

export default MainInfo;
