import { NextRouter } from 'next/router';
import { QueryParams } from '@/redux/slices/querySlice';

export const useManagePage = (router: NextRouter, query: QueryParams) => {
  const handlePageChange = async (targetPage: number) => {
    router.push(
      `${
        query.id ? `${query.id}` : ''
      }?searchValue=${query.searchValue?.trim()}&page=${targetPage}&pageSize=${Number(
        query.pageSize
      )}`
    );
  };

  const handlePageSizeChange = async (newSize: number) => {
    router.push(
      `${
        query.id ? `${query.id}` : ''
      }?searchValue=${query.searchValue?.trim()}&page=1&pageSize=${newSize}`
    );
  };

  return { handlePageChange, handlePageSizeChange };
};
