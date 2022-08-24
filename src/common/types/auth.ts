import { Dispatch, SetStateAction } from 'react';

export interface IUserData {
  name: string;
  email: string;
  password: string;
}

export interface IUserLogInData {
  email: string;
  password: string;
}

export interface IFormAuthProps {
  setAuthType: Dispatch<SetStateAction<string>>;
}
