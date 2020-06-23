import { httpClient } from './httpClient';
import { newsApi } from './newsApi';
import {API_BASE_URL} from '../constants';

export function apiFactory(http) {
  return {
    news: newsApi(http)
  };
}

const http = httpClient(API_BASE_URL);
export const api = apiFactory(http);
