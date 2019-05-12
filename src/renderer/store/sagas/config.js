import {
  all, call, select, takeEvery,
} from 'redux-saga/effects';
import { CONFIG_SET_THEME, CONFIG_SAVE } from '@store/actions/config';
import ConfigManager from '@helpers/ConfigManager';

function* setTheme() {
  const state = yield select();

  yield call(ConfigManager.set, {
    config: state.config,
  });
}

function* setConfig(state) {
  const { config } = state;
  yield call(ConfigManager.set, {
    config,
  });
}

function* configSaga() {
  yield all([
    takeEvery(CONFIG_SET_THEME, setTheme),
    takeEvery(CONFIG_SAVE, setConfig),
  ]);
}

export default configSaga;
