import React, { FC } from 'react';

interface PaginationParams {
  pageCount: number;
  handlePageChange: (newPage: number) => void;
  currentPage?: number;
}

const Pagination: FC<PaginationParams> = ({
  pageCount,
  handlePageChange,
  currentPage = 1,
}) => {
  const onChange = (page: number) => {
    if (page > 0 && page <= pageCount && page !== currentPage)
      handlePageChange(page);
  };

  return (
    <div className="pagination">
      <div
        className={`pagination__item ${currentPage === 1 ? 'inactive' : ''}`}
        onClick={() => onChange(1)}
      >
        <img
          className="pagination__img start"
          src="/pag-2.svg"
          alt="previous"
        />
      </div>
      <div
        className={`pagination__item ${currentPage === 1 ? 'inactive' : ''}`}
        onClick={() => onChange(currentPage - 1)}
      >
        <img className="pagination__img prev" src="/pag-1.svg" alt="previous" />
      </div>
      {currentPage !== 1 ? (
        <div
          className="pagination__item"
          onClick={() => onChange(currentPage - 1)}
        >
          <p>{currentPage - 1}</p>
        </div>
      ) : (
        ''
      )}

      <div className="pagination__item active">
        <p>{currentPage}</p>
      </div>

      {pageCount > 2 && currentPage < pageCount ? (
        <div
          className="pagination__item"
          onClick={() => onChange(currentPage + 1)}
        >
          <p>{currentPage + 1}</p>
        </div>
      ) : (
        ''
      )}
      <div
        className={`pagination__item ${
          currentPage === pageCount ? 'inactive' : ''
        }`}
        onClick={() => onChange(currentPage + 1)}
      >
        <img className="pagination__img next" src="/pag-1.svg" alt="previous" />
      </div>

      <div
        className={`pagination__item ${
          currentPage === pageCount ? 'inactive' : ''
        }`}
        onClick={() => onChange(pageCount)}
      >
        <img className="pagination__img end" src="/pag-2.svg" alt="previous" />
      </div>
    </div>
  );
};

export default Pagination;
