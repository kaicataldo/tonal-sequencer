/* eslint-env node */

const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? 'cheap-module-source-map' : 'inline-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        'babel-loader'
      ],
      include: path.resolve(__dirname, 'src'),
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname),
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
};
