const { isDevelopment } = require('./preset');

// 油猴脚本所在目录
exports.monkeyDir = 'monkey';

// 忽略脚本目录下的指定目录
exports.ignoreScriptDirs = ['lib'];

// 油猴脚本打包产物所在目录
exports.monkeyBuildDir = `${isDevelopment ? 'dist' : 'release'}/${exports.monkeyDir}`;
