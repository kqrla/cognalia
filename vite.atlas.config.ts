import { defineConfig } from 'vite';
export default defineConfig({
  build: { outDir: 'dist-atlas', rollupOptions: { input: 'demos/atlas/index.html' } },
});
