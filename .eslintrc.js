/* eslint-env node */

module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: true
  },
  plugins: ['react', 'flowtype'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:flowtype/recommended'
  ]
};
