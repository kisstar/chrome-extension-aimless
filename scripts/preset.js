const argvParser = require('minimist');

const { NODE_ENV } = process.env;
const isDevelopment = NODE_ENV !== 'production';

const argv = argvParser(process.argv.slice(2));
const name = argv.name || argv._[0];

// 当前的打包模式是否为开发模式
exports.isDevelopment = isDevelopment;

// 当前打包插件或脚本的名称
exports.name = name;
