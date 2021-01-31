import {
  POST_SIGNIN,
  POST_SIGNUP,
  postSigninAsync,
  postSignupAsync,
} from './actions';
import { postSignin, postSignup } from '../../api/sign';
import { call, put, takeLatest } from 'redux-saga/effects';

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

export function* signSaga() {
  yield takeLatest(POST_SIGNIN, postSigninSaga);
  yield takeLatest(POST_SIGNUP, postSignupSaga);
}
