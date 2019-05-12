import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import enData from './en';

addLocaleData(en);

export default {
  ...enData,
  'menu.file': 'Bestand',
  'menu.file.settings': 'Instellingen',
  'menu.theme': 'Thema',
  'theme.dark': 'Donker',
  'theme.light': 'Licht',
  'dashboard.recent_projects': 'Recente projecten',
  'settings.title': 'Instellingen',
  'settings.theme': 'Thema',
  'settings.language': 'Taal',
};
