'use strict';

module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true
  },
  plugins: ['react', 'flowtype'],
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:react/recommended',
    'plugin:flowtype/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [
    {
      files: ['src/**/*'],
      env: {
        browser: true,
        node: false
      }
    }
  ]
};
