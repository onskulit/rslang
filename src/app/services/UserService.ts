import { API, BASE_URL, HEADERS, METHODS } from '../../common/constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserInputData } from '../../common/types/user';

interface IUserDataQuery {
  userId: string;
  token: string;
}

interface IUserTokenData {
  token: string;
  refreshToken: string;
}

export const userAPI = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    createUser: builder.mutation<IUserInputData, Partial<IUserInputData>>({
      query: (user) => ({
        url: API.users,
        method: METHODS.post,
        headers: {
          Accept: HEADERS.accept,
          'Content-Type': HEADERS.contentType,
        },
        body: user,
      }),
    }),

    signIn: builder.mutation<IUserInputData, Partial<IUserInputData>>({
      query: (user) => ({
        url: API.signin,
        method: METHODS.post,
        headers: {
          Accept: HEADERS.accept,
          'Content-Type': HEADERS.contentType,
        },
        body: user,
      }),
    }),

    getUserById: builder.query<IUserInputData, IUserDataQuery>({
      query: ({ userId, token }) => ({
        url: `${API.users}/${userId}`,
        headers: {
          Authorization: HEADERS.authorization(token),
          Accept: HEADERS.accept,
          'Content-Type': HEADERS.contentType,
        },
      }),
    }),

    refreshToken: builder.query<IUserTokenData, IUserDataQuery>({
      query: ({ userId, token }) => ({
        url: `${API.users}/${userId}/tokens`,
        headers: {
          Authorization: HEADERS.authorization(token),
          Accept: HEADERS.accept,
          'Content-Type': HEADERS.contentType,
        },
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useSignInMutation,
  useGetUserByIdQuery,
  useRefreshTokenQuery,
} = userAPI;
