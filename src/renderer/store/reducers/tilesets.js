import {
  TILESETS_CREATE,
  TILESETS_ADD_TILE,
  TILESETS_ORDER_TILE,
  TILESETS_REMOVE_TILE,
} from '@store/actions/tilesets';

const merge = require('deepmerge');

const tileset = (action, state = {
  name: '',
  file: null,
  tiles: [],
}) => {
  switch (action.type) {
    case TILESETS_ADD_TILE:
      return {
        ...state,
        tiles: [
          ...merge([], state.tiles),
          action.tile,
        ],
      };
    case TILESETS_ORDER_TILE: {
      const tiles = merge([], state.tiles);
      const tile = tiles.splice(action.oldPosition, 1);
      tiles.splice(action.newPosition, 0, tile);
      return {
        ...state,
        tiles,
      };
    }
    case TILESETS_REMOVE_TILE: {
      const tiles = merge([], state.tiles);
      tiles.splice(action.position, 1);
      return {
        ...state,
        tiles,
      };
    }
    case TILESETS_CREATE:
    default:
      return state;
  }
};

const tilesetReducer = (state = [], action) => {
  switch (action.type) {
    case TILESETS_CREATE:
      return [
        ...merge([], state),
        tileset(action),
      ];
    case TILESETS_ADD_TILE:
    case TILESETS_ORDER_TILE:
    case TILESETS_REMOVE_TILE: {
      const tilesets = merge([], state);
      tilesets[action.tileset] = tileset(action, state[action.tileset]);
      return tilesets;
    }
    default:
      return state;
  }
};

export default tilesetReducer;
