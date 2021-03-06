'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

let config = {
  devtool:
    process.env.NODE_ENV === 'production'
      ? 'source-map'
      : 'cheap-module-source-map',
  entry: ['./src/index.js'],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  }
};

if (process.env.NODE_ENV === 'development') {
  config = merge.strategy({
    entry: 'prepend'
  })(config, {
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server'
    ],
    devServer: {
      hot: true,
      contentBase: path.resolve(__dirname),
      publicPath: '/dist/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ]
  });
}

module.exports = config;
