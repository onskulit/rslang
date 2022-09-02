// http://localhost:9011 | https://rs-lang-en.herokuapp.com
export const BASE_URL = 'https://rs-lang-en.herokuapp.com';

export const REDUCER_PATH = 'api';

export const API = {
  words: '/words',
  users: '/users',
  signin: '/signin',
  statistics: '/statistics',
};

export const METHODS = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  patch: 'PATCH',
  delete: 'DELETE',
};

export const HEADERS = {
  accept: 'application/json',
  contentType: 'application/json',
  authorization: (token: string): string => `Bearer ${token}`,
};
