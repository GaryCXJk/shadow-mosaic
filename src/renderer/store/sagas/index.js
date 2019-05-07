import { all, fork } from 'redux-saga/effects';
import appSaga from './app';
import configSaga from './config';

function* rootSaga() {
  yield all([
    fork(appSaga),
    fork(configSaga),
  ]);
}

export default rootSaga;
