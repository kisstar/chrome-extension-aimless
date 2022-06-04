const { readdirSync, existsSync } = require('fs');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const argvParser = require('minimist');

const { resolve, generateEntry } = require('./shared');

const argv = argvParser(process.argv.slice(2));
const name = argv.name || argv._[0];
const entry = {};
const plugins = [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)];

// 当前仅对单插件进行打包
if (!name) {
  console.error('请指定需要打包的插件名称。');
  process.exit(1);
}

const extensionInputs = readdirSync(resolve('src')).filter(
  dirName => dirName.toLowerCase() === name.toLowerCase(),
);
const extensionName = extensionInputs[0];

extensionInputs.forEach(extensionName_ => {
  const srcDir = resolve('src', extensionName_);
  const publicDir = resolve('public', extensionName_);

  Object.assign(entry, generateEntry(extensionName_, srcDir));

  if (existsSync(publicDir)) {
    plugins.push(
      new CopyPlugin({
        patterns: [{ from: extensionName_, to: extensionName_, context: 'public' }],
      }),
    );
  }
});

module.exports = {
  entry,
  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      name: `${extensionName}/vendor`,
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
  plugins,
};
