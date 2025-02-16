import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  // ESM 版本
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    plugins: [resolve(), commonjs()],
  },
  // CommonJS 版本
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
    plugins: [resolve(), commonjs()],
  },
  // 浏览器 UMD 版本
  {
    input: 'src/index.js',
    output: {
      file: 'dist/networkxjs.umd.js',
      format: 'umd',
      name: 'NetworkXJS', // 浏览器全局变量
    },
    plugins: [resolve(), commonjs()],
  },
];
