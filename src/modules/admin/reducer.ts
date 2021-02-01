import { createReducer } from 'typesafe-actions';
import { AdminState, AdminAction } from './types';
import {
  POST_FESTIVAL_DATA,
  POST_FESTIVAL_DATA_SUCCESS,
  POST_FESTIVAL_DATA_ERROR,
  PATCH_FESTIVAL_DATA,
  PATCH_FESTIVAL_DATA_SUCCESS,
  PATCH_FESTIVAL_DATA_ERROR,
  DELETE_FESTIVAL_DATA,
  DELETE_FESTIVAL_DATA_SUCCESS,
  DELETE_FESTIVAL_DATA_ERROR,
  POST_ARTIST_DATA,
  POST_ARTIST_DATA_SUCCESS,
  POST_ARTIST_DATA_ERROR,
  PATCH_ARTIST_DATA,
  PATCH_ARTIST_DATA_SUCCESS,
  PATCH_ARTIST_DATA_ERROR,
  DELETE_ARTIST_DATA,
  DELETE_ARTIST_DATA_SUCCESS,
  DELETE_ARTIST_DATA_ERROR,
} from './actions';

const initialState: AdminState = {
  loading: false,
  error: null,
  data: null,
};

const admin = createReducer<AdminState, AdminAction>(initialState, {
  [POST_FESTIVAL_DATA]: (state) => ({
    loading: true,
    error: null,
    data: null,
  }),
  [POST_FESTIVAL_DATA_SUCCESS]: (state, action) => ({
    loading: false,
    error: null,
    data: action.payload,
  }),
  [POST_FESTIVAL_DATA_ERROR]: (state, action) => ({
    loading: false,
    error: action.payload,
    data: null,
  }),
  [PATCH_FESTIVAL_DATA]: (state) => ({
    loading: true,
    error: null,
    data: null,
  }),
  [PATCH_FESTIVAL_DATA_SUCCESS]: (state, action) => ({
    loading: false,
    error: null,
    data: action.payload,
  }),
  [PATCH_FESTIVAL_DATA_ERROR]: (state, action) => ({
    loading: false,
    error: action.payload,
    data: null,
  }),
  [DELETE_FESTIVAL_DATA]: (state) => ({
    loading: true,
    error: null,
    data: null,
  }),
  [DELETE_FESTIVAL_DATA_SUCCESS]: (state, action) => ({
    loading: false,
    error: null,
    data: action.payload,
  }),
  [DELETE_FESTIVAL_DATA_ERROR]: (state, action) => ({
    loading: false,
    error: action.payload,
    data: null,
  }),
  [POST_ARTIST_DATA]: (state) => ({
    loading: true,
    error: null,
    data: null,
  }),
  [POST_ARTIST_DATA_SUCCESS]: (state, action) => ({
    loading: false,
    error: null,
    data: action.payload,
  }),
  [POST_ARTIST_DATA_ERROR]: (state, action) => ({
    loading: false,
    error: action.payload,
    data: null,
  }),
  [PATCH_ARTIST_DATA]: (state) => ({
    loading: true,
    error: null,
    data: null,
  }),
  [PATCH_ARTIST_DATA_SUCCESS]: (state, action) => ({
    loading: false,
    error: null,
    data: action.payload,
  }),
  [PATCH_ARTIST_DATA_ERROR]: (state, action) => ({
    loading: false,
    error: action.payload,
    data: null,
  }),
  [DELETE_ARTIST_DATA]: (state) => ({
    loading: true,
    error: null,
    data: null,
  }),
  [DELETE_ARTIST_DATA_SUCCESS]: (state, action) => ({
    loading: false,
    error: null,
    data: action.payload,
  }),
  [DELETE_ARTIST_DATA_ERROR]: (state, action) => ({
    loading: false,
    error: action.payload,
    data: null,
  }),
});

export default admin;
