import { API, BASE_URL, HEADERS, METHODS } from '../../common/constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserAuthData, IUserInputData } from '../../common/types/user';
import { storage } from '../../utils/localStorage';
import { STORAGE_KEY } from '../../common/constants/localStorage';

export interface IUserWord {
  difficulty: string;
  optional: {
    percentCorrectAnswers: number;
    isNew: boolean;
  };
}

export interface IUserWordResponse {
  id: string;
  difficulty: string;
  optional: {
    percentCorrectAnswers: number;
    isNew: boolean;
  };
  wordId: string;
}

interface IUserWordQuery {
  wordId: string;
  body?: IUserWord;
}

interface IUserAggregatedWordData {
  _id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
  userWord: IUserWord;
}

interface IUserAggregatedWordsData {
  paginatedResults: IUserAggregatedWordData[];
  totalCount: { count: number }[];
}

type IUserAggregatedWordsArray = IUserAggregatedWordsData[];

interface IUserAggregatedWordsQuery {
  filter: string;
  wordsPerPage: number;
  group: number;
}

const authData: IUserAuthData = JSON.parse(
  storage.get(STORAGE_KEY.userAuthData)
);

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

    getUserById: builder.query<IUserInputData, void>({
      query: () => ({
        url: `${API.users}/${authData.userId}`,
        headers: {
          Authorization: HEADERS.authorization(authData.token),
          Accept: HEADERS.accept,
          'Content-Type': HEADERS.contentType,
        },
      }),
    }),

    getUserWord: builder.query<IUserWordResponse, IUserWordQuery>({
      query: ({ wordId }) => ({
        url: `${API.users}/${authData.userId}/words/${wordId}`,
        headers: {
          Authorization: HEADERS.authorization(authData.token),
          Accept: HEADERS.accept,
          'Content-Type': HEADERS.contentType,
        },
      }),
    }),

    postUserWord: builder.mutation<IUserWordResponse, Partial<IUserWordQuery>>({
      query: ({ wordId, body }) => ({
        url: `${API.users}/${authData.userId}/words/${wordId}`,
        method: METHODS.post,
        headers: {
          Authorization: HEADERS.authorization(authData.token),
          Accept: HEADERS.accept,
          'Content-Type': HEADERS.contentType,
        },
        body: body,
      }),
    }),

    putUserWord: builder.mutation<IUserWordResponse, Partial<IUserWordQuery>>({
      query: ({ wordId, body }) => ({
        url: `${API.users}/${authData.userId}/words/${wordId}`,
        method: METHODS.put,
        headers: {
          Authorization: HEADERS.authorization(authData.token),
          Accept: HEADERS.accept,
          'Content-Type': HEADERS.contentType,
        },
        body: body,
      }),
    }),

    getAggregatedWords: builder.query<
      IUserAggregatedWordsArray,
      IUserAggregatedWordsQuery
    >({
      query: ({ filter, wordsPerPage, group }) => ({
        url: `${API.users}/${authData.userId}/aggregatedWords?filter=${filter}&wordsPerPage=${wordsPerPage}&group=${group}`,
        headers: {
          Authorization: HEADERS.authorization(authData.token),
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
  usePostUserWordMutation,
  useGetAggregatedWordsQuery,
  useGetUserWordQuery,
  usePutUserWordMutation,
} = userAPI;
