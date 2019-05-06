import {
  TILESETS_CREATE,
  TILESETS_ADD_TILE,
  TILESETS_ORDER_TILE,
  TILESETS_REMOVE_TILE,
} from '@store/actions/tilesets';

const tilesetReducer = (state = [], action) => {
  switch (action.type) {
    case TILESETS_CREATE:
      return state;
    case TILESETS_ADD_TILE:
      return state;
    case TILESETS_ORDER_TILE:
      return state;
    case TILESETS_REMOVE_TILE:
      return state;
    default:
      return state;
  }
};

export default tilesetReducer;
