module.exports = {
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
}
