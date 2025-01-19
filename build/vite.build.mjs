import { resolve as stlResolve, dirname } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { build } from 'vite';
import banner from '../plugins/vite-plugin-banner/index.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const resolve = (...paths) => stlResolve(__dirname, '../', ...paths);

// 是否开启监听
const isWatchMode = process.argv.includes('--watch');

// 模块打包配置
const monkeyScripts = ['csdn', 'dlink', 'zhihu'];
const libraries = monkeyScripts.map((name) => {
  return {
    entry: resolve(`packages/monkey-scripts/${name}/index.ts`),
    name,
    formats: ['iife'],
    fileName: (format) => `${name}.${format}.js`
  };
});

for (const lib of libraries) {
  const metaHeader = readFileSync(
    resolve(`packages/monkey-scripts/${lib.name}/manifests.ts`),
    'utf-8'
  );

  await build({
    configFile: false,
    plugins: [
      banner({
        content: metaHeader
      })
    ],
    build: {
      watch: isWatchMode
        ? {
            include: ['packages/monkey-scripts/**/*.ts']
          }
        : null,
      emptyOutDir: false,
      lib: {
        ...lib
      },
      outDir: resolve(`.output/scripts`)
    }
  });
}
