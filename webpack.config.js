/* eslint-env node */

const path = require('path');

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? 'cheap-module-source-map' : 'eval',
  entry: [
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "app.js",
    publicPath: '/dist/'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src'),
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['', '.js'],
    root: [path.join(__dirname, 'src')]
  },
  devServer: {
    quiet: false,
    noInfo: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  }
}
