import { http, HttpResponse } from 'msw';
import { searchResponseMock } from './responses/searchResponseMock';
import { characterResponseMock } from './responses/characterResponseMock';
import { clearSearchResponseMock } from './responses/clearSearchResponseMock';

const baseUrl = 'https://api.potterdb.com/v1/';

export const handlers = [
  http.get(`${baseUrl}characters/309c1379-8579-4401-916e-bc6a17b2b39f`, () => {
    return HttpResponse.json(characterResponseMock);
  }),
  http.get(`${baseUrl}characters/`, ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('filter[name_cont]');
    const page = url.searchParams.get('page[number]');
    const pageSize = url.searchParams.get('page[size]');
    if (search === 'Harry' && page === '1' && pageSize === '10')
      return HttpResponse.json(searchResponseMock);
    if (search === '' && page === '1' && pageSize === '10')
      return HttpResponse.json(clearSearchResponseMock);
  }),
];
