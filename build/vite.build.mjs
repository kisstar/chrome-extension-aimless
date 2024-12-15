import { resolve as stlResolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { build } from 'vite';

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
  await build({
    configFile: false,
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
      outDir: resolve(`.output/monkey-scripts`)
    }
  });
}
