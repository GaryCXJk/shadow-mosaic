import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import languages from './languages';
import * as themes from '@themes';

addLocaleData(en);

const themeStr = {};

Object.keys(themes).forEach((themeId) => {
  const theme = themes[themeId];
  themeStr[theme.nameId] = theme.name;
});

export default {
  ...languages,
  ...themeStr,
  ok: 'OK',
  'menu.file': 'File',
  'menu.file.exit': 'Exit',
  'menu.theme': 'Theme',
  'menu.help': 'Help',
  'menu.help.about': 'About',
  'dashboard.recent_projects': 'Recent projects',
  'help.about': 'About Shadow Mosaic',
};
