const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: { index: './src/entry-point.ts' },
  module: {
    rules: [
      { test: /\.ts?$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.(png|jpe?g|gif)$/i, use: 'file-loader', exclude: /node_modules/ },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'], exclude: /node_modules/ },
    ],
  },
  resolve: {
    extensions: ['.ts', '.ts', '.js'],
    fallback: {
      'fs': false, // Needed for image-clipper that uses fs
    },
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['ts']
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      chunks: ['index'],
    }),
  ],
  output: { filename: '[name].js', path: path.resolve(__dirname, 'dist') },
};