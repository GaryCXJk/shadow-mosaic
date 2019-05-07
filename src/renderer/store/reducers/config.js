import { languageShort } from 'common/constants/general';
import {
  CONFIG_INIT,
  CONFIG_SET_THEME,
} from '@store/actions/config';

const initialState = {
  language: languageShort || 'en',
  theme: 'dark',
};

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONFIG_INIT:
      return {
        ...state,
        ...action.state,
      };
    case CONFIG_SET_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
};

export default configReducer;
