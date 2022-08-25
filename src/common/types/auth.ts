import { Dispatch, SetStateAction } from 'react';

export interface IUserLogInData {
  email: string;
  password: string;
}

export interface IFormAuthProps {
  setAuthType: Dispatch<SetStateAction<string>>;
}
