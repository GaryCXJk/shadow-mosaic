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
          ['common', './src/common'],
        ],
      }
    },
  },
};

if (process.env.NODE_ENV !== 'production') {
  config.rules['no-console'] = 0;
}

module.exports = config;
