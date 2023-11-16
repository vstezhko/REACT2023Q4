import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { QueryParams } from './slices/querySlice';

export interface Character {
  id: string;
  type: string;
  attributes: {
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
  };
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

interface CharacterResponse {
  data: {
    attributes: Character['attributes'];
    id: string;
  };
}

export const hpApi = createApi({
  reducerPath: 'hpApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.potterdb.com/v1/' }),
  endpoints: (builder) => ({
    searchByName: builder.query<SearchResponse, QueryParams>({
      query: ({ searchValue, page, pageSize }) => {
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

export const { useGetCharacterQuery, useSearchByNameQuery } = hpApi;
