import { BASE_URL } from '../../common/constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserData } from '../../common/types/auth';

export const userAPI = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    createUser: builder.mutation<IUserData, Partial<IUserData>>({
      query: (user) => ({
        url: '/users',
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: user,
      }),
    }),

    signIn: builder.mutation<IUserData, Partial<IUserData>>({
      query: (user) => ({
        url: '/signin',
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: user,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useSignInMutation } = userAPI;
