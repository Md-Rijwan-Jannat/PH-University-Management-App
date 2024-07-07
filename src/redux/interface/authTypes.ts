export interface IUser {
  userId: string;
  role: string;
  iat: number;
  expo: number;
}

export interface IInitialState {
  user: null | IUser;
  token: null | string;
}
