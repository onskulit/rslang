import { API, BASE_URL } from '../../common/constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserInputData } from '../../common/types/user';
import { StringLiteral } from 'typescript';

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
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: user,
      }),
    }),

    signIn: builder.mutation<IUserInputData, Partial<IUserInputData>>({
      query: (user) => ({
        url: API.signin,
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: user,
      }),
    }),
    // `${API.users}/${userId}`
    getUserById: builder.query<IUserInputData, IUserDataQuery>({
      query: ({ userId, token }) => ({
        url: `${API.users}/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
    }),
    // /users/{id}/tokens
    refreshToken: builder.query<IUserTokenData, IUserDataQuery>({
      query: ({ userId, token }) => ({
        url: `${API.users}/${userId}/tokens`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
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
