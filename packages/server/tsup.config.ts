import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm'],
    minify: false,
    sourcemap: false,
    dts: false,
    outDir: 'dist',
    outExtension({}) {
        return {
            js: `.js`
        };
    }
});
