import React, { useEffect } from 'react';
import Header from '../components/Header';
import MainInfo from '../components/MainInfo';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../redux/store';
import { querySlice } from '../../redux/slices/querySlice';

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query);

  useEffect(() => {
    const searchLS = localStorage.getItem('search');
    searchLS && dispatch(querySlice.actions.setNewSearchValue(searchLS));
  }, []);

  const updateURL = () => {
    navigate(`?search=${query.searchValue.trim()}&page=${query.page}`);
  };

  useEffect(() => {
    updateURL();
  }, [query]);

  return (
    <div className="main wrapper">
      <Header />
      <MainInfo />
    </div>
  );
};
export default Main;
