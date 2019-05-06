import { languageShort } from '@/constants/general';
import * as CONFIG from '@store/actions/config';

const initialState = {
  language: languageShort || 'en',
  theme: 'dark',
};

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONFIG.CONFIG_INIT:
      return {
        ...state,
        ...action.state,
      };
    default:
      return state;
  }
};

export default configReducer;
