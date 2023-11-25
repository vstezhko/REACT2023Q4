export const useManagePage = (router, query) => {
  const handlePageChange = async (targetPage: number) => {
    router.push(
      `${
        query.id ? `${query.id}` : ''
      }?searchValue=${query.searchValue.trim()}&page=${targetPage}&pageSize=${Number(
        query.pageSize
      )}`
    );
  };

  const handlePageSizeChange = async (newSize: number) => {
    router.push(
      `${
        query.id ? `${query.id}` : ''
      }?searchValue=${query.searchValue.trim()}&page=1&pageSize=${newSize}`
    );
  };

  return { handlePageChange, handlePageSizeChange };
};
