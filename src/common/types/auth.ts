import { Dispatch, SetStateAction } from 'react';

export interface IUserLogInData {
  email: string;
  password: string;
}

export interface IFormAuthProps {
  setAuthType: Dispatch<SetStateAction<string>>;
}

export interface IAuth {
  isFetching: boolean;
  isSuccess: boolean;
}

export interface ILogInData {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}
