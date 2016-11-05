# react-minimal-starter-kit

This is a minimal starter kit for anyone interested in playing around with React - no additional setup necessary!

## About

The goal for this project is to make it as easy as possible for anyone to hit the ground running, allowing them to start writing code immediately, looking at configuration and tooling as they get more comfortable. The author's desire to keep this simple and minimal comes from wanting to make the setup as light and unopinionated as possible and the hope that, for those unfamiliar, the tooling configuration is both readable and easy to understand.

This project is *not* intended for production use.

## Features

 * Bundling and hot module replacement with [Webpack](https://webpack.github.io/)
 * Transpilation with [Babel](http://babeljs.io/) (with all the latest ECMAScript features)
 * Static analysis with [ESLint](http://eslint.org/)

## Setup

Setting everything up is easy! Simply download this repository and run `npm install`.  
Note: Requires that Git and Node >= 4 are installed.

1. `git clone git@github.com:kaicataldo/react-minimal-starter-kit.git`
2. `cd react-minimal-starter-kit`
3. `npm install`

## Use

To start writing code, follow the steps below:

2. In the react-minimal-starter-kit directory, run `npm start`.
3. Navigate to `http://localhost:8080/` in your browser.
4. Start writing code!

To just build the JavaScript bundle once without watching for further changes, run `npm run build`. Note that `dist` is in the .gitignore file and should be removed if you want to check the built JavaScript bundle into your repository.
