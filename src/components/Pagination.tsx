import React, { BaseSyntheticEvent, FC, useMemo } from 'react';

interface PaginationParams {
  handlePageChange: (newPage: number) => void;
  currentPage: number;
  pageCount?: number;
}

const Pagination: FC<PaginationParams> = ({
  handlePageChange,
  currentPage,
  pageCount = currentPage,
}) => {
  const startPage = 1;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const lastPage = pageCount;
  const onChange = (e: BaseSyntheticEvent) => {
    const targetPage: number = e.currentTarget.dataset.page;
    const isTargetPageValid =
      targetPage > 0 && targetPage <= pageCount && targetPage !== currentPage;

    if (isTargetPageValid) handlePageChange(targetPage);
  };

  const checkPage = (page: number) => {
    if (currentPage === page) return 'pagination__item_inactive';
  };

  const checkStartPage = useMemo(() => {
    return checkPage(startPage);
  }, [currentPage]);

  const checkLastPage = useMemo(() => {
    return checkPage(pageCount);
  }, [currentPage, pageCount]);

  return (
    <div className="pagination">
      <div
        className={`pagination__item ${checkStartPage}`}
        data-page={startPage}
        onClick={onChange}
      >
        <img className="pagination__img start" src="/pag-2.svg" alt="start" />
      </div>
      <div
        className={`pagination__item ${checkStartPage}`}
        data-page={prevPage}
        onClick={onChange}
      >
        <img className="pagination__img prev" src="/pag-1.svg" alt="previous" />
      </div>

      {currentPage !== 1 ? (
        <div
          className="pagination__item"
          data-page={prevPage}
          onClick={onChange}
        >
          <p>{prevPage}</p>
        </div>
      ) : null}

      <div className="pagination__item pagination__item_active">
        <p>{currentPage}</p>
      </div>

      {pageCount > 2 && currentPage < pageCount ? (
        <div
          className="pagination__item"
          data-page={nextPage}
          onClick={onChange}
        >
          <p>{nextPage}</p>
        </div>
      ) : null}

      <div
        className={`pagination__item ${checkLastPage}`}
        data-page={nextPage}
        onClick={onChange}
      >
        <img
          className="pagination__img pagination__img_next"
          src="/pag-1.svg"
          alt="next"
        />
      </div>

      <div
        className={`pagination__item ${checkLastPage}`}
        data-page={lastPage}
        onClick={onChange}
      >
        <img
          className="pagination__img pagination__img_last"
          src="/pag-2.svg"
          alt="last"
        />
      </div>
    </div>
  );
};
export default Pagination;
