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
};

if (process.env.NODE_ENV !== 'production') {
  config.rules['no-console'] = 0;
}

module.exports = config;
