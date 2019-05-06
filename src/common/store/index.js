import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as CONFIG from '@store/actions/config';
import { isDevelopment } from '@/constants/general';
import ConfigManager from '../ConfigManager';
import reducer from './reducers';
import saga from './sagas';

const initializeStore = () => {
  if (ConfigManager.getStore()) {
    return ConfigManager.getStore();
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
  const store = createStore(reducer, appliedMiddleware);

  ConfigManager.setStore(store);

  sagaMiddleware.run(saga);

  ConfigManager.load().then((config) => {
    store.dispatch({
      type: CONFIG.CONFIG_INIT,
      state: config.config,
    });
  });

  return store;
};

export default initializeStore;
