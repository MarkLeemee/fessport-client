import { createAsyncAction } from 'typesafe-actions';
import { IFestivalData, IArtistData } from '../../api/admin';
import { AxiosError } from 'axios';

export const POST_FESTIVAL_DATA = 'admin/POST_FESTIVAL_DATA';
export const POST_FESTIVAL_DATA_SUCCESS = 'admin/POST_FESTIVAL_DATA_SUCCESS';
export const POST_FESTIVAL_DATA_ERROR = 'admin/POST_FESTIVAL_DATA_ERROR';

export const PATCH_FESTIVAL_DATA = 'admin/PATCH_FESTIVAL_DATA';
export const PATCH_FESTIVAL_DATA_SUCCESS = 'admin/PATCH_FESTIVAL_DATA_SUCCESS';
export const PATCH_FESTIVAL_DATA_ERROR = 'admin/PATCH_FESTIVAL_DATA_ERROR';

export const DELETE_FESTIVAL_DATA = 'admin/DELETE_FESTIVAL_DATA';
export const DELETE_FESTIVAL_DATA_SUCCESS =
  'admin/DELETE_FESTIVAL_DATA_SUCCESS';
export const DELETE_FESTIVAL_DATA_ERROR = 'admin/DELETE_FESTIVAL_DATA_ERROR';

export const POST_ARTIST_DATA = 'admin/POST_ARTIST_DATA';
export const POST_ARTIST_DATA_SUCCESS = 'admin/POST_ARTIST_DATA_SUCCESS';
export const POST_ARTIST_DATA_ERROR = 'admin/POST_ARTIST_DATA_ERROR';

export const PATCH_ARTIST_DATA = 'admin/PATCH_ARTIST_DATA';
export const PATCH_ARTIST_DATA_SUCCESS = 'admin/PATCH_ARTIST_DATA_SUCCESS';
export const PATCH_ARTIST_DATA_ERROR = 'admin/PATCH_ARTIST_DATA_ERROR';

export const DELETE_ARTIST_DATA = 'admin/DELETE_ARTIST_DATA';
export const DELETE_ARTIST_DATA_SUCCESS = 'admin/DELETE_ARTIST_DATA_SUCCESS';
export const DELETE_ARTIST_DATA_ERROR = 'admin/DELETE_ARTIST_DATA_ERROR';

export const postFestivalDataAsync = createAsyncAction(
  POST_FESTIVAL_DATA,
  POST_FESTIVAL_DATA_SUCCESS,
  POST_FESTIVAL_DATA_ERROR,
)<IFestivalData, { message: string }, AxiosError>();

export const patchFestivalDataAsync = createAsyncAction(
  PATCH_FESTIVAL_DATA,
  PATCH_FESTIVAL_DATA_SUCCESS,
  PATCH_FESTIVAL_DATA_ERROR,
)<IFestivalData, { message: string }, AxiosError>();

export const deleteFestivalDataAsync = createAsyncAction(
  DELETE_FESTIVAL_DATA,
  DELETE_FESTIVAL_DATA_SUCCESS,
  DELETE_FESTIVAL_DATA_ERROR,
)<string, { message: string }, AxiosError>();

export const postArtistDataAsync = createAsyncAction(
  POST_ARTIST_DATA,
  POST_ARTIST_DATA_SUCCESS,
  POST_ARTIST_DATA_ERROR,
)<IArtistData, { message: string }, AxiosError>();

export const patchArtistDataAsync = createAsyncAction(
  PATCH_ARTIST_DATA,
  PATCH_ARTIST_DATA_SUCCESS,
  PATCH_ARTIST_DATA_ERROR,
)<IArtistData, { message: string }, AxiosError>();

export const deleteArtistDataAsync = createAsyncAction(
  DELETE_ARTIST_DATA,
  DELETE_ARTIST_DATA_SUCCESS,
  DELETE_ARTIST_DATA_ERROR,
)<string, { message: string }, AxiosError>();
