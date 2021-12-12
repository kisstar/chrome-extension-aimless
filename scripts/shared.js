const path = require('path');
const { readdirSync, existsSync } = require('fs');

const { monkeyDir } = require('./config');

const root = (exports.root = process.cwd());

const resolve = (exports.resolve = (...p) => path.resolve(root, ...p));

/**a
 * 生成插件的入口文件
 * @param {*} extensionName 插件名
 * @param {*} srcDir 插件目录
 * @returns
 */
exports.generateEntry = (extensionName, srcDir) => {
  if (extensionName === monkeyDir) {
    const scriptInputs = {};

    readdirSync(srcDir).forEach(scriptName => {
      Object.assign(scriptInputs, {
        [`${monkeyDir}/${scriptName}/main`]: resolve(srcDir, scriptName, 'index.ts'),
      });
    });

    return scriptInputs;
  }

  return {
    [`${extensionName}/js/popup`]: resolve(srcDir, 'popup.ts'),
    [`${extensionName}/js/options`]: resolve(srcDir, 'options.ts'),
    [`${extensionName}/js/background`]: resolve(srcDir, 'background.ts'),
    [`${extensionName}/js/content_script`]: resolve(srcDir, 'content_script.ts'),
  };
};
