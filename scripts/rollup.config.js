import { dirname } from 'path';
import fs from 'fs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import argvParser from 'minimist';

const { monkeyDir } = require('./config');
const { resolve, generateEntry } = require('./shared');

const { NODE_ENV } = process.env;
const argv = argvParser(process.argv.slice(2));
const name = argv.name || argv._[0];

const isDevelopment = NODE_ENV !== 'production';
const srcDir = resolve('src', monkeyDir);
const inputs = generateEntry(monkeyDir, srcDir, 'rollup');

// 当前仅对单脚本进行打包
if (!name) {
  console.error('请指定需要打包的脚本名称。');
  process.exit(1);
}

const input = inputs.filter(item => item.includes(`src/${monkeyDir}/${name}/index.ts`));
const metaHeader = fs.readFileSync(resolve(dirname(input[0]), 'manifests.ts'));

export default {
  input,
  output: [
    {
      file: `${isDevelopment ? 'dist' : 'release'}/monkey/${name}.js`,
      banner: metaHeader,
      format: 'iife',
    },
  ],
  watch: {
    include: `src/${monkeyDir}/${name}/**`,
  },
  plugins: [
    typescript(),
    json(),
    commonjs(),
    nodeResolve(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
    }),
    alias({
      entries: [{ find: '@utils', replacement: resolve('src/utils') }],
    }),
  ],
};
