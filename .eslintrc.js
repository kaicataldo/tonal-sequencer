'use strict';

module.exports = {
  parserOptions: {
    sourceType: 'module',
    jsx: true,
  },
  env: {
    es6: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:react/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
    },
    {
      files: ['src/**/*'],
      env: {
        browser: true,
        node: false,
      },
    },
  ],
};
