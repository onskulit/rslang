export interface IUserInputData {
  name: string;
  email: string;
  password: string;
}

export interface IUserAuthData {
  message: string;
  name: string;
  refreshToken: string;
  token: string;
  userId: string;
}
