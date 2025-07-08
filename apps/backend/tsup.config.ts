import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  dts: true,
  minify: true,
  outDir: 'dist',
  target: 'node18',
  platform: 'node',
  noExternal: ['@repo/db'],
}); 