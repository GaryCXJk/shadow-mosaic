import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import languages from './languages';

addLocaleData(en);

export default {
  ...languages,
  'menu.file': 'File',
  'menu.file.exit': 'Exit',
  'menu.help': 'Help',
};
