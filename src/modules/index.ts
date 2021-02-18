import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import map, { mapSaga } from './map';
import festival, { festivalSaga } from './festival';
import artist, { artistSaga } from './artist';
import wish, { wishSaga } from './wish';
import sign, { signSaga } from './sign';
import userInfo, { userInfoSaga } from './userInfo';
import category, { categorySaga } from './category';
import image, { imageSaga } from './image';
import admin, { adminSaga } from './admin';

const rootReducer = combineReducers({
  map,
  festival,
  artist,
  wish,
  sign,
  userInfo,
  category,
  image,
  admin,
});

export function* rootSaga() {
  yield all([
    mapSaga(),
    festivalSaga(),
    artistSaga(),
    wishSaga(),
    signSaga(),
    userInfoSaga(),
    imageSaga(),
    categorySaga(),
    adminSaga(),
  ]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
