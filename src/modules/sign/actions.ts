import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { ISigninInfo, ISignupInfo } from '../../api/sign';

export const POST_SIGNIN = 'sign/POST_SIGNIN' as const;
export const POST_SIGNIN_SUCCESS = 'sign/POST_SIGNIN_SUCCESS' as const;
export const POST_SIGNIN_ERROR = 'sign/POST_SIGNIN_ERROR' as const;

export const POST_SIGNUP = 'sign/POST_SIGNUP' as const;
export const POST_SIGNUP_SUCCESS = 'sign/POST_SIGNUP_SUCCESS' as const;
export const POST_SIGNUP_ERROR = 'sign/POST_SIGNUP_ERROR' as const;

export const GET_SIGNOUT = 'sign/GET_SIGNOUT' as const;
export const GET_SIGNOUT_SUCCESS = 'sign/GET_SIGNOUT_SUCCESS' as const;
export const GET_SIGNOUT_ERROR = 'sign/GET_SIGNOUT_ERROR' as const;

export const postSigninAsync = createAsyncAction(
  POST_SIGNIN,
  POST_SIGNIN_SUCCESS,
  POST_SIGNIN_ERROR,
)<ISigninInfo, { message: string }, AxiosError>();

export const postSignupAsync = createAsyncAction(
  POST_SIGNUP,
  POST_SIGNUP_SUCCESS,
  POST_SIGNUP_ERROR,
)<ISignupInfo, { message: string }, AxiosError>();

export const getSignoutAsync = createAsyncAction(
  GET_SIGNOUT,
  GET_SIGNOUT_SUCCESS,
  GET_SIGNOUT_ERROR,
)<undefined, { message: string }, AxiosError>();
