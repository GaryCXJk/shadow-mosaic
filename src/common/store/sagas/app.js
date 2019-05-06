import { all, put, takeEvery } from 'redux-saga/effects';
import { APP_INIT } from '@store/actions/app';
import { CONFIG_INIT } from '@store/actions/config';

function* appInitialize(action) {
  yield put({
    type: CONFIG_INIT,
    state: action.state.config,
  });
}

function* appSaga() {
  yield all([
    takeEvery(APP_INIT, appInitialize),
  ]);
}

export default appSaga;
