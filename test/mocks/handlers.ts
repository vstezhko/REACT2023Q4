import { http, HttpResponse } from 'msw';
import { searchResponseMock } from './responses/searchResponseMock';
import { characterResponseMock } from './responses/characterResponseMock';
import { clearSearchResponseMock } from './responses/clearSearchResponseMock';

const baseUrl = 'https://api.potterdb.com/v1/';

export const handlers = [
  http.get(`${baseUrl}characters/309c1379-8579-4401-916e-bc6a17b2b39f`, () => {
    return HttpResponse.json(characterResponseMock);
  }),
  http.get(
    `${baseUrl}characters/?filter[name_cont]=Harry&page[number]=1&page[size]=10`,
    () => {
      return HttpResponse.json(searchResponseMock);
    }
  ),
  http.get(
    `${baseUrl}characters/?filter[name_cont]=&page[number]=1&page[size]=10`,
    () => {
      return HttpResponse.json(clearSearchResponseMock);
    }
  ),
];
