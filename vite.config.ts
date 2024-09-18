import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      /* prettier-ignore */
      "componentsPath": path.resolve(__dirname, './src/components'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://lottery-api.venom.rs/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
});
