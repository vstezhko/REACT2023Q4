import React, {
  createContext,
  Dispatch,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { ApiService } from '../api/Api.Service';
import { useNavigate } from 'react-router-dom';

interface QueryParams {
  searchValue: string;
  page: number;
  pageSize: number;
}

interface SearchResultResponse {
  meta: {
    pagination: {
      current: number;
      records: number;
      last?: number;
    };
  };
  data: {
    id: string;
    attributes: {
      name: string;
      gender: string;
      image: string;
    };
    links: {
      self: string;
    };
  }[];
}

interface QueryContextParams {
  query: QueryParams;
  setQuery: Dispatch<React.SetStateAction<QueryParams>>;
}

interface SearchResultParams {
  searchResult: {
    isLoading: boolean;
    isError: boolean;
    resultItems: SearchResultResponse | undefined;
  };
  setSearchResult: Dispatch<
    React.SetStateAction<SearchResultParams['searchResult']>
  >;
}

const initialQuery: QueryParams = {
  searchValue: '',
  page: 1,
  pageSize: 10,
};

const initialResult: SearchResultParams['searchResult'] = {
  isLoading: false,
  isError: false,
  resultItems: undefined,
};

export const QueryContext = createContext<QueryContextParams>({
  query: initialQuery,
  setQuery: () => {},
});

export const SearchResultContext = createContext<SearchResultParams>({
  searchResult: initialResult,
  setSearchResult: () => {},
});

const DataProvider = ({ children }: { children: ReactElement }) => {
  const navigate = useNavigate();
  const searchLS = localStorage.getItem('search');
  const [query, setQuery] = useState<QueryParams>(
    searchLS ? { ...initialQuery, searchValue: searchLS } : initialQuery
  );
  const [searchResult, setSearchResult] =
    useState<SearchResultParams['searchResult']>(initialResult);

  const updateSearchResults = async () => {
    try {
      setSearchResult((prevState) => {
        return {
          ...prevState,
          isLoading: true,
          isError: false,
        };
      });

      const results = await ApiService.search(query);

      if (results) {
        setSearchResult({
          isError: false,
          isLoading: false,
          resultItems: results,
        });
      }
    } catch (error) {
      console.warn(error);
      setSearchResult((prevState) => {
        return { ...prevState, isLoading: false, isError: true };
      });
    }
  };

  const updateURL = () => {
    navigate(`?search=${query.searchValue.trim()}&page=${query.page}`);
  };

  useEffect(() => {
    updateSearchResults();
    updateURL();
  }, [query]);

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      <SearchResultContext.Provider value={{ searchResult, setSearchResult }}>
        {children}
      </SearchResultContext.Provider>
    </QueryContext.Provider>
  );
};

export default DataProvider;
