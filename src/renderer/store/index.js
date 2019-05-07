// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { isDevelopment } from 'common/constants/general';
import ConfigManager from '@helpers/ConfigManager';
import reducer from './reducers';
import saga from './sagas';
import { APP_INIT } from './actions/app';

let store = null;

const initializeStore = () => {
  if (store) {
    return store;
  }
  const sagaMiddleware = createSagaMiddleware();
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const combinedMiddleware = applyMiddleware(
    sagaMiddleware,
  );
  const appliedMiddleware = isDevelopment
    ? composeEnhancers(combinedMiddleware)
    : combinedMiddleware;
  store = createStore(reducer, appliedMiddleware);

  sagaMiddleware.run(saga);

  ipcRenderer.on('store-update', (_event, state) => {
    store.dispatch({
      type: APP_INIT,
      state,
    });
  });

  const newState = ConfigManager.get();

  if (newState) {
    store.dispatch({
      type: APP_INIT,
      state: newState,
    });
  }

  return store;
};

export default initializeStore;
