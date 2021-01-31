import { createReducer } from 'typesafe-actions';
import { SignState, SignAction } from './types';
import {
  POST_SIGNIN,
  POST_SIGNIN_SUCCESS,
  POST_SIGNIN_ERROR,
  POST_SIGNUP,
  POST_SIGNUP_SUCCESS,
  POST_SIGNUP_ERROR,
  GET_SIGNOUT,
  GET_SIGNOUT_SUCCESS,
  GET_SIGNOUT_ERROR,
} from './actions';

const initialState: SignState = {
  isLogin: false,
  signupSuccess: false,
  loading: false,
  error: null,
  data: null,
};

const sign = createReducer<SignState, SignAction>(initialState, {
  [POST_SIGNIN]: (state) => ({
    isLogin: false,
    signupSuccess: false,
    loading: true,
    error: null,
    data: null,
  }),
  [POST_SIGNIN_SUCCESS]: (state, action) => ({
    isLogin: true,
    signupSuccess: false,
    loading: false,
    error: null,
    data: action.payload,
  }),
  [POST_SIGNIN_ERROR]: (state, action) => ({
    isLogin: false,
    signupSuccess: false,
    loading: false,
    error: action.payload,
    data: null,
  }),
  [POST_SIGNUP]: (state) => ({
    isLogin: false,
    signupSuccess: false,
    loading: true,
    error: null,
    data: null,
  }),
  [POST_SIGNUP_SUCCESS]: (state, action) => ({
    isLogin: false,
    signupSuccess: true,
    loading: false,
    error: null,
    data: action.payload,
  }),
  [POST_SIGNUP_ERROR]: (state, action) => ({
    isLogin: false,
    signupSuccess: false,
    loading: false,
    error: action.payload,
    data: null,
  }),
  [GET_SIGNOUT]: (state) => ({
    isLogin: false,
    signupSuccess: false,
    loading: true,
    error: null,
    data: null,
  }),
  [GET_SIGNOUT_SUCCESS]: (state, action) => ({
    isLogin: false,
    signupSuccess: false,
    loading: false,
    error: null,
    data: action.payload,
  }),
  [GET_SIGNOUT_ERROR]: (state, action) => ({
    isLogin: false,
    signupSuccess: false,
    loading: false,
    error: action.payload,
    data: null,
  }),
});

export default sign;
