import { createReducer } from 'typesafe-actions';
import { SignState, SignAction } from './types';
import {
  POST_SIGNIN,
  POST_SIGNIN_SUCCESS,
  POST_SIGNIN_ERROR,
  POST_SIGNUP,
  POST_SIGNUP_SUCCESS,
  POST_SIGNUP_ERROR,
} from './actions';

const initialState: SignState = {
  isLogin: true,
  loading: false,
  error: null,
  data: null,
};

const sign = createReducer<SignState, SignAction>(initialState, {
  [POST_SIGNIN]: (state) => ({
    ...state,
    isLogin: false,
    loading: true,
    error: null,
    data: null,
  }),
  [POST_SIGNIN_SUCCESS]: (state, action) => ({
    ...state,
    isLogin: true,
    loading: false,
    error: null,
    data: action.payload,
  }),
  [POST_SIGNIN_ERROR]: (state, action) => ({
    ...state,
    isLogin: false,
    loading: false,
    error: action.payload,
    data: null,
  }),
  [POST_SIGNUP]: (state) => ({
    ...state,
    isLogin: false,
    loading: true,
    error: null,
    data: null,
  }),
  [POST_SIGNUP_SUCCESS]: (state, action) => ({
    ...state,
    isLogin: false,
    loading: false,
    error: null,
    data: action.payload,
  }),
  [POST_SIGNUP_ERROR]: (state, action) => ({
    ...state,
    isLogin: false,
    loading: false,
    error: action.payload,
    data: null,
  }),
});

export default sign;
