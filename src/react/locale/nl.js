import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import enData from './en';

addLocaleData(en);

export default {
  ...enData,
  'menu.file': 'Bestand',
  'dashboard.recent_projects': 'Recente projecten',
};
