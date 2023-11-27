import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { QueryParams } from './querySlice';
import { HYDRATE } from 'next-redux-wrapper';

export interface CharacterAttributes {
  slug: string;
  alias_names: string[];
  animagus: string | null;
  blood_status: string | null;
  boggart: string | null;
  born: string | null;
  died: string | null;
  eye_color: string | null;
  family_members: string[];
  gender: string | null;
  hair_color: string | null;
  height: string | null;
  house: string | null;
  image: string | null;
  jobs: string[];
  marital_status: string | null;
  name: string;
  nationality: string | null;
  patronus: string | null;
  romances: string[];
  skin_color: string | null;
  species: string | null;
  titles: string[];
  wands: string[];
  weight: string | null;
  wiki: string;
}

export interface Character {
  id: string;
  type: string;
  attributes: CharacterAttributes;
  links: {
    self: string;
  };
}

export interface SearchResponse {
  meta: {
    pagination: {
      current: number;
      records: number;
      last?: number;
    };
  };
  data: Character[];
}

export interface CharacterResponse {
  data: {
    attributes: CharacterAttributes;
    id: string;
  };
}

export interface StoreSearchResponse {
  data: SearchResponse;
}

export interface StoreCharacterResponse {
  data: CharacterResponse;
}

export const hpApi = createApi({
  reducerPath: 'hpApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.potterdb.com/v1/' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    searchByName: builder.query<SearchResponse, QueryParams>({
      query: ({ searchValue = '', page = 1, pageSize = 10 }) => {
        const defaultPageSize = 10;
        return `characters/?filter[name_cont]=${searchValue}&page[number]=${page}&page[size]=${
          pageSize || defaultPageSize
        }`;
      },
    }),
    getCharacter: builder.query<CharacterResponse, string>({
      query: (id) => `characters/${id}`,
    }),
  }),
});

export const {
  util: { getRunningQueriesThunk },
} = hpApi;
export const { searchByName, getCharacter } = hpApi.endpoints;
