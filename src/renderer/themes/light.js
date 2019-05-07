import defaultTheme from './default';

const merge = require('deepmerge');

export default merge(defaultTheme, {
  name: 'Light',
  nameId: 'theme.light',
});
