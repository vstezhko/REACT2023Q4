import React, {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Loader from './Loader';
import { ApiService } from '../api/Api.Service';
import SearchResults from './SearchResults';
import Pagination from './Pagination';
import { useNavigate, useSearchParams, Outlet } from 'react-router-dom';

interface Search {
  searchValue: null | string;
  page: number;
}

interface SearchResultsResponse {
  meta: {
    pagination: {
      current: number | null;
      records: number | null;
      last?: number | null;
    };
  };
  data:
    | {
        id: string;
        attributes: {
          name: string;
          gender: string;
        };
        links: {
          self: string;
        };
      }[]
    | null;
}

const MainInfo = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchData, setSearchData] = useState<Search>({
    searchValue: null,
    page: 1,
  });

  const [searchResults, setSearchResults] = useState<SearchResultsResponse>({
    meta: {
      pagination: {
        current: null,
        last: null,
        records: null,
      },
    },
    data: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;

    if (search !== searchData.searchValue || +page !== searchData.page) {
      setSearchData({
        searchValue: search,
        page: +page,
      });
    }
  }, [searchParams]);

  const updateSearchResults = useCallback(
    async (searchValue: string, page: number) => {
      try {
        setIsLoading(true);

        const results: SearchResultsResponse = await ApiService.search(
          searchValue,
          page
        );

        if (results) {
          setSearchResults(results);

          const searchURL = searchParams.get('search') || '';
          const pageURL = searchParams.get('page') || 1;
          if (searchData.page !== pageURL) {
            navigate(`?search=${searchURL}&page=${searchData.page}`);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setSearchResults, searchData, searchParams, navigate]
  );

  useEffect(() => {
    if (typeof searchData.searchValue === 'string') {
      updateSearchResults(searchData.searchValue, searchData.page);
    }

    if (searchResults.data && searchData.searchValue === null) {
      const lsSearchValue = localStorage.getItem('search');
      setSearchData({ ...searchData, searchValue: lsSearchValue || '' });
    }
  }, [searchData]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      search: searchData.searchValue ? searchData.searchValue! : '',
      page: newPage.toString(),
    });
  };

  const handleClose = (e: BaseSyntheticEvent) => {
    e.stopPropagation();
    if (e.target.className === 'searchResults') {
      navigate(
        `/?search=${searchParams.get('search')}&page=${searchParams.get(
          'page'
        )}`
      );
    }
  };

  return (
    <main className="mainInfo">
      <div className="mainInfo__searchResults" onClick={handleClose}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <SearchResults results={searchResults.data || []} />
            <Pagination
              pageCount={searchResults.meta.pagination.last || searchData.page}
              currentPage={searchData.page}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </div>
      <Outlet />
    </main>
  );
};

export default MainInfo;
