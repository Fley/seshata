const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ouputDirectory = 'build';
const outputJS = 'seshata-api.js';

module.exports = {
  entry: './src/index.js',
  target: 'node',
  plugins: [
    new CleanWebpackPlugin([ouputDirectory])
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