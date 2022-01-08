const { readdirSync, existsSync } = require('fs');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const argvParser = require('minimist');

const RemoveBootstrapWebpackPlugin = require('../plugins/RemoveBootstrapWebpackPlugin');
const { monkeyDir } = require('./config');
const { root, resolve, generateEntry } = require('./shared');

const argv = argvParser(process.argv.slice(2));
const name = argv.name || argv._[0];
const entry = {};
const plugins = [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)];

// 由于 splitChunks 针对多插件打包暂未有好的处理方式，所以先处理为单插件打包
if (!name) {
  console.error('请指定需要打包的插件名称。');
  process.exit(1);
}

const extensionInputs = readdirSync(resolve('src')).filter(
  dirName => dirName.toLowerCase() === name.toLowerCase(),
);

extensionInputs.forEach(extensionName => {
  const srcDir = resolve('src', extensionName);
  const publicDir = resolve(root, 'public', extensionName);

  Object.assign(entry, generateEntry(extensionName, srcDir));

  if (existsSync(publicDir)) {
    plugins.push(
      new CopyPlugin({
        patterns: [{ from: extensionName, to: extensionName, context: 'public' }],
      }),
    );
  }
});

// 目前单次只会打包一个插件
const extensionName = extensionInputs[0];
// 是否是编译油猴脚本
const isScripts = extensionName === monkeyDir;

if (isScripts) {
  plugins.push(new RemoveBootstrapWebpackPlugin());
}

module.exports = {
  entry,
  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },
  optimization: {
    minimize: !isScripts,
    splitChunks: {
      name: `${extensionName}/vendor`,
      chunks: isScripts ? () => false : 'initial',
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
