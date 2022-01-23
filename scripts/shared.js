const path = require('path');
const { readdirSync } = require('fs');

const { monkeyDir, ignoreScriptDirs } = require('./config');

const root = (exports.root = process.cwd());

const resolve = (exports.resolve = (...p) => path.resolve(root, ...p));

/**a
 * 生成插件的入口文件
 * @param {string} extensionName 插件名
 * @param {string} srcDir 插件目录地址
 * @param {string} bundler 可选的，指定打包工具
 * @returns
 */
exports.generateEntry = (extensionName, srcDir, bundler) => {
  if (extensionName === monkeyDir) {
    const isRollup = bundler === 'rollup';
    const scriptInputs = isRollup ? [] : {};

    readdirSync(srcDir).forEach(scriptName => {
      if (isRollup) {
        !ignoreScriptDirs.includes(scriptName) &&
          scriptInputs.push(`${srcDir}/${scriptName}/index.ts`);
      } else {
        Object.assign(scriptInputs, {
          [`${monkeyDir}/${scriptName}/main`]: resolve(srcDir, scriptName, 'index.ts'),
        });
      }
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
