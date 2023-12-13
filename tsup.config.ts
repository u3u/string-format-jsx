import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: { resolve: true },
  entry: ['src/*.{ts,tsx}'],
  format: ['cjs', 'esm'],
  shims: true,
});
