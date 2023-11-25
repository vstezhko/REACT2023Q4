import React, { BaseSyntheticEvent, FC } from 'react';

interface PageSizeParams {
  handlePageSizeChange: (newSize: number) => void;
  pageSize: number;
}

const PageSize: FC<PageSizeParams> = ({ pageSize, handlePageSizeChange }) => {
  function changeSelect(e: BaseSyntheticEvent) {
    handlePageSizeChange(e.target.value);
  }

  return (
    <div className="pageSize">
      <p>Cards per page</p>
      <select value={pageSize} onChange={changeSelect}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>
  );
};

export default PageSize;
