const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

const entry = './src/index.js';
const ouputDirectory = 'build';
const outputJS = 'seshata-api.js';

const config = {
  entry,
  target: 'node',
  devtool: 'sourcemap',
  plugins: [
    new CleanWebpackPlugin([ouputDirectory]),
    new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false })
  ],
  externals: [
    nodeExternals() // in order to ignore all modules in node_modules folder
  ],
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader' }
    ]
  },
  output: {
    filename: outputJS,
    path: path.resolve(__dirname, ouputDirectory)
  }
};

if (process.env.NODE_ENV !== 'production') {
  config.plugins.push(new WebpackShellPlugin({ onBuildEnd: ['nodemon ' + ouputDirectory + '/' + outputJS] }));
}

module.exports = config;