import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import languages from './languages';

addLocaleData(en);

export default {
  ...languages,
  ok: 'OK',
  'menu.file': 'File',
  'menu.file.exit': 'Exit',
  'menu.help': 'Help',
  'menu.help.about': 'About',
  'help.about': 'About Shadow Mosaic',
};
