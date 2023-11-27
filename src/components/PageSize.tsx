import React, { BaseSyntheticEvent, FC } from 'react';

interface PageSizeParams {
  handlePageSizeChange: (newSize: number) => void;
  pageSize: number;
}

const pageSizeVariants = [5, 10, 15];

const PageSize: FC<PageSizeParams> = ({ pageSize, handlePageSizeChange }) => {
  function changeSelect(e: BaseSyntheticEvent) {
    handlePageSizeChange(e.target.value);
  }

  return (
    <div className="pageSize">
      <p>Cards per page</p>
      <select value={pageSize} onChange={changeSelect}>
        {pageSizeVariants.map((variant) => (
          <option key={variant} value={variant}>
            {variant}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageSize;
