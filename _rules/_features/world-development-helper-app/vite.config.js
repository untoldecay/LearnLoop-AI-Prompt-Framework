import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  server: {
    port: 3001,
    strictPort: true,
    open: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/renderer'),
      '@components': resolve(__dirname, 'src/renderer/components'),
      '@utils': resolve(__dirname, 'src/renderer/utils')
    }
  },
  optimizeDeps: {
    exclude: ['electron']
  }
});