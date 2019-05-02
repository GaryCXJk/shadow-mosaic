import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import saga from './sagas';
import { isDevelopment } from '../../constants/general';

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

sagaMiddleware.run(saga);

export default store;
