import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { ISigninInfo, ISignupInfo } from '../../api/sign';

export const POST_SIGNIN = 'sign/POST_SIGNIN' as const;
export const POST_SIGNIN_SUCCESS = 'sign/POST_SIGNIN_SUCCESS' as const;
export const POST_SIGNIN_ERROR = 'sign/POST_SIGNIN_ERROR' as const;

export const POST_SIGNUP = 'sign/POST_SIGNUP' as const;
export const POST_SIGNUP_SUCCESS = 'sign/POST_SIGNUP_SUCCESS' as const;
export const POST_SIGNUP_ERROR = 'sign/POST_SIGNUP_ERROR' as const;

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
