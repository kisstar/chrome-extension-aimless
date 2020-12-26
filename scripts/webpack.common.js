const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const srcDir = '../src/';
const resolve = (...p) => path.resolve(__dirname, ...p);

module.exports = {
  entry: {
    popup: resolve(srcDir, 'popup.ts'),
    options: resolve(srcDir, 'options.ts'),
    background: resolve(srcDir, 'background.ts'),
    content_script: resolve(srcDir, 'content_script.ts'),
  },
  output: {
    path: resolve('../dist/js'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CopyPlugin({
      patterns: [{ from: '.', to: '../', context: 'public' }],
    }),
  ],
};
