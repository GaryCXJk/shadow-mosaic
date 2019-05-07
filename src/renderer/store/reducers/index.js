import { combineReducers } from 'redux';
import config from './config';
import tilesets from './tilesets';

const reducer = combineReducers({
  config,
  tilesets,
});

export default reducer;
