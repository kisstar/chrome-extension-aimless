const { readdirSync } = require('fs');
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const argvParser = require('minimist');

const root = process.cwd();
const resolve = (...p) => path.resolve(root, ...p);
const argv = argvParser(process.argv.slice(2));
const name = argv.name || argv._[0];
const extension = readdirSync(resolve('src')).find(dirname => new RegExp(name, 'i').test(dirname));
const srcDir = resolve('src', extension);

module.exports = {
  entry: {
    [`${extension}/js/popup`]: resolve(srcDir, 'popup.ts'),
    [`${extension}/js/options`]: resolve(srcDir, 'options.ts'),
    [`${extension}/js/background`]: resolve(srcDir, 'background.ts'),
    [`${extension}/js/content_script`]: resolve(srcDir, 'content_script.ts'),
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      name: `${extension}/vendor`,
      chunks: 'initial',
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CopyPlugin({
      patterns: [{ from: extension, to: extension, context: 'public' }],
    }),
  ],
};
