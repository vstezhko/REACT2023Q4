import React, { BaseSyntheticEvent, useContext, useState } from 'react';
import { QueryContext } from './DataProvider';

const PageSize = () => {
  const { query, setQuery } = useContext(QueryContext);
  const [value, setValue] = useState(query.pageSize);

  function changeSelect(e: BaseSyntheticEvent) {
    setValue(e.target.value);
    setQuery((prevState) => {
      return { ...prevState, pageSize: e.target.value, page: 1 };
    });
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
