import {
  POST_SIGNIN,
  POST_SIGNUP,
  GET_SIGNOUT_SUCCESS,
  postSigninAsync,
  postSignupAsync,
  getSignoutAsync,
} from './actions';
import { postSignin, postSignup } from '../../api/sign';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

function* postSigninSaga(action: ReturnType<typeof postSigninAsync.request>) {
  try {
    const message: { message: string } = yield call(postSignin, action.payload);
    yield put(postSigninAsync.success(message));
  } catch (e) {
    yield put(postSigninAsync.failure(e));
  }
}

function* postSignupSaga(action: ReturnType<typeof postSignupAsync.request>) {
  try {
    const message: { message: string } = yield call(postSignup, action.payload);
    yield put(postSignupAsync.success(message));
  } catch (e) {
    yield put(postSignupAsync.failure(e));
  }
}

function* getSignoutSaga() {
  try {
    yield put(getSignoutAsync.success({ message: 'Signout' }));
  } catch (e) {
    yield put(getSignoutAsync.failure(e));
  }
}

export function* signSaga() {
  yield takeLatest(POST_SIGNIN, postSigninSaga);
  yield takeLatest(POST_SIGNUP, postSignupSaga);
  yield takeEvery(GET_SIGNOUT_SUCCESS, getSignoutSaga);
}
