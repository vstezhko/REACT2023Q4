import React, { BaseSyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../redux/store';
import { querySlice } from '../../redux/slices/querySlice';

const PageSize = () => {
  const { pageSize } = useSelector((state) => state.query);
  const dispatch = useDispatch();
  const [value, setValue] = useState(pageSize);

  function changeSelect(e: BaseSyntheticEvent) {
    setValue(e.target.value);
    dispatch(querySlice.actions.setPageSize(e.target.value));
  }

  return (
    <div className="pageSize">
      <p>Cards per page</p>
      <select value={value} onChange={changeSelect}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>
  );
};

export default PageSize;
