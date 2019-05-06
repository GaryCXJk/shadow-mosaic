import {
  all, call, select, takeEvery,
} from 'redux-saga/effects';
import { CONFIG_SET_THEME } from '@store/actions/config';
import ConfigManager from 'common/ConfigManager';

function* setTheme() {
  const state = yield select();

  yield call(ConfigManager.set, {
    config: state.config,
  });
}

function* configSaga() {
  yield all([
    takeEvery(CONFIG_SET_THEME, setTheme),
  ]);
}

export default configSaga;
