export interface SimpleRequest {
  message: string;
  status: number;
}

export interface LoginRequest extends SimpleRequest {
  jwt_token: string;
}

export interface GetUserInfo extends SimpleRequest {
  user: User,
}

export interface User {
  _id: string,
  method: string,
  facebookID: string | null,
  name: string,
  surname: string,
  email: string,
  createdDate: string,
}

export interface URLParams {
  id: string,
  email: string,
  surname: string,
  name: string,
  method: string,
}

export interface MainState {
  isLoading: boolean;
}

export interface UserState {
  user: User;
}
