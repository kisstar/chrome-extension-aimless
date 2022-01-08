const PRE_CODE_REGEXP = /(.|\n)*\/\*{3}\/\s\(function\(module\,\sexports\)\s\{/;
const POST_CODE_REGEXP = /(\/\*{3}\/\s\}\)+(.|\n)*)/;

/**
 * Remove webpck bootstrap code
 */
class RemoveBootstrapWebpackPlugin {
  apply(compiler) {
    compiler.plugin('emit', function (compilation, callback) {
      // compilation.assets 是一个包含所有需要输出的资源的键值对，键为需要输出的文件名称，值为文件对应的内容
      const assets = compilation.assets;

      Object.keys(assets).forEach(fileName => {
        const asset = assets[fileName];
        const fileContent = asset.source();
        const retContent = fileContent
          .replace(PRE_CODE_REGEXP, '')
          .replace(POST_CODE_REGEXP, '')
          .trim();

        assets[fileName] = {
          source() {
            return retContent;
          },

          size() {
            return Buffer.byteLength(retContent, 'utf8');
          },
        };
      });

      callback();
    });
  }
}

module.exports = RemoveBootstrapWebpackPlugin;
