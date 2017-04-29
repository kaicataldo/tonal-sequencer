module.exports = {
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    },
    sourceType: 'module'
  },
  env: {
    es6: true,
    browser: true
  },
  plugins: [
    "react"
  ],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    semi: 'error',
    quotes: ['error', 'single']
  }
};
