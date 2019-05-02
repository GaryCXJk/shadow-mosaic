import { languageShort } from '../../../constants/general';

const initialState = {
  language: languageShort || 'en',
  theme: 'dark',
};

const configReducer = (state = initialState) => {
  switch (state) {
    default:
      return state;
  }
};

export default configReducer;
