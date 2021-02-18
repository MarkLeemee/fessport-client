import {
  postFestivalDataAsync,
  patchFestivalDataAsync,
  deleteFestivalDataAsync,
  postArtistDataAsync,
  patchArtistDataAsync,
  deleteArtistDataAsync,
  POST_FESTIVAL_DATA,
  PATCH_FESTIVAL_DATA,
  DELETE_FESTIVAL_DATA,
  POST_ARTIST_DATA,
  PATCH_ARTIST_DATA,
  DELETE_ARTIST_DATA,
} from './actions';
import {
  postFestivalData,
  patchFestivalData,
  deleteFestivalData,
  postArtistData,
  patchArtistData,
  deleteArtistData,
} from '../../api/admin';
import { call, put, takeLatest } from 'redux-saga/effects';

function* postFestivalDataSaga(
  action: ReturnType<typeof postFestivalDataAsync.request>,
) {
  try {
    const message: { message: string } = yield call(
      postFestivalData,
      action.payload,
    );
    yield put(postFestivalDataAsync.success(message));
  } catch (e) {
    yield put(postFestivalDataAsync.failure(e));
  }
}

function* patchFestivalDataSaga(
  action: ReturnType<typeof patchFestivalDataAsync.request>,
) {
  try {
    const message: { message: string } = yield call(
      patchFestivalData,
      action.payload,
    );
    yield put(patchFestivalDataAsync.success(message));
  } catch (e) {
    yield put(patchFestivalDataAsync.failure(e));
  }
}

function* deleteFestivalDataSaga(
  action: ReturnType<typeof deleteFestivalDataAsync.request>,
) {
  try {
    const message: { message: string } = yield call(
      deleteFestivalData,
      action.payload,
    );
    yield put(deleteFestivalDataAsync.success(message));
  } catch (e) {
    yield put(deleteFestivalDataAsync.failure(e));
  }
}

function* postArtistDataSaga(
  action: ReturnType<typeof postArtistDataAsync.request>,
) {
  try {
    const message: { message: string } = yield call(
      postArtistData,
      action.payload,
    );
    yield put(postArtistDataAsync.success(message));
  } catch (e) {
    yield put(postArtistDataAsync.failure(e));
  }
}

function* patchArtistDataSaga(
  action: ReturnType<typeof patchArtistDataAsync.request>,
) {
  try {
    const message: { message: string } = yield call(
      patchArtistData,
      action.payload,
    );
    yield put(patchArtistDataAsync.success(message));
  } catch (e) {
    yield put(patchArtistDataAsync.failure(e));
  }
}

function* deleteArtistDataSaga(
  action: ReturnType<typeof deleteArtistDataAsync.request>,
) {
  try {
    const message: { message: string } = yield call(
      deleteArtistData,
      action.payload,
    );
    yield put(deleteArtistDataAsync.success(message));
  } catch (e) {
    yield put(deleteArtistDataAsync.failure(e));
  }
}

export function* adminSaga() {
  yield takeLatest(POST_FESTIVAL_DATA, postFestivalDataSaga);
  yield takeLatest(PATCH_FESTIVAL_DATA, patchFestivalDataSaga);
  yield takeLatest(DELETE_FESTIVAL_DATA, deleteFestivalDataSaga);
  yield takeLatest(POST_ARTIST_DATA, postArtistDataSaga);
  yield takeLatest(PATCH_ARTIST_DATA, patchArtistDataSaga);
  yield takeLatest(DELETE_ARTIST_DATA, deleteArtistDataSaga);
}
