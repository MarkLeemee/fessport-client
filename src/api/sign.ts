import axios from 'axios';
axios.defaults.withCredentials = true;

export async function postSignin(
  param: ISigninInfo,
): Promise<{ message: string } | void> {
  const response = await axios.post<{ message: string }>(
    'https://fessport-server.com/login',
    param,
  );
  return response.data;
}

export async function postSignup(
  param: ISignupInfo,
): Promise<{ message: string } | void> {
  const response = await axios.post<{ message: string }>(
    'https://fessport-server.com/signup',
    param,
  );
  return response.data;
}

export interface ISigninInfo {
  email: string;
  password: string;
}

export interface ISignupInfo {
  email: string;
  nickname: string;
  password: string;
}
