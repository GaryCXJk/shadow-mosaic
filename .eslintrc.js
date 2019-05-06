const path = require('path');

const config = {
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': false,
  },

  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  globals: {
    __static: true,
  },

  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', path.resolve(__dirname, 'src')],
          ['common', path.resolve(__dirname, 'src/common')],
          ['@store', path.resolve(__dirname, 'src/common/store')],
          ['@components', path.resolve(__dirname, 'src/react/components')],
          ['@elements', path.resolve(__dirname, 'src/react/components/elements')],
          ['@layout', path.resolve(__dirname, 'src/react/components/layout')],
          ['@pages', path.resolve(__dirname, 'src/react/components/pages')],
          ['@containers', path.resolve(__dirname, 'src/react/containers')],
          ['@constants', path.resolve(__dirname, 'src/react/constants')],
          ['@helpers', path.resolve(__dirname, 'src/react/helpers')],
          ['@themes', path.resolve(__dirname, 'src/react/themes')],
        ],
      }
    },
  },
};

if (process.env.NODE_ENV !== 'production') {
  config.rules['no-console'] = 0;
}

module.exports = config;
