import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { ILogInData, IUserLogInData } from '../../common/types/auth';
import { IUserInputData } from '../../common/types/user';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query';
import { STORAGE_KEY } from '../../common/constants/localStorage';
import { storage } from '../../utils/localStorage';
import { DATA_UNDERFINED } from '../../common/constants/auth';
import { useEffect } from 'react';
import { useSignInMutation } from '../../app/services/UserService';
import { useAppDispatch } from '../../app/hooks';
import { changeValidation } from '../../app/reducers/userSlice';
import { SerializedError } from '@reduxjs/toolkit';

type MutationTriggerSignIn = MutationTrigger<
  MutationDefinition<
    Partial<IUserInputData>,
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      Record<string, unknown>,
      FetchBaseQueryMeta
    >,
    never,
    IUserInputData,
    'auth'
  >
>;

interface IPerformSignIn {
  signIn: MutationTrigger<
    MutationDefinition<
      Partial<IUserInputData>,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, unknown>,
        FetchBaseQueryMeta
      >,
      never,
      IUserInputData,
      'auth'
    >
  >;
  isSignInLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

export const userSignIn = (
  data: IUserLogInData,
  signIn: MutationTriggerSignIn
): void => {
  if (data) {
    storage.set(STORAGE_KEY.userLogInData, JSON.stringify(data));
    signIn(data);
  }
};

export const performSignIn = (): IPerformSignIn => {
  const [signIn, { data: userSignInData, isLoading: isSignInLoading, error }] =
    useSignInMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof userSignInData !== DATA_UNDERFINED) {
      const jsonData = JSON.stringify(userSignInData);
      storage.set(STORAGE_KEY.userAuthData, jsonData);
      dispatch(changeValidation(true));
    }
  }, [userSignInData]);

  return { signIn, isSignInLoading, error };
};
