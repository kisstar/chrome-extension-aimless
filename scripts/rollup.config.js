import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import argvParser from 'minimist';

const { monkeyDir } = require('./config');
const { resolve, generateEntry } = require('./shared');

const argv = argvParser(process.argv.slice(2));
const name = argv.name || argv._[0];

// 当前仅对单脚本进行打包
if (!name) {
  console.error('请指定需要打包的脚本名称。');
  process.exit(1);
}

const srcDir = resolve('src', monkeyDir);
const input = generateEntry(monkeyDir, srcDir, 'rollup');

export default {
  input,
  output: [
    {
      file: `dist/monkey/${name}.js`,
      format: 'iife',
    },
  ],
  watch: {
    include: `src/monkey/${name}`,
  },
  plugins: [typescript(), json(), commonjs(), nodeResolve()],
};
