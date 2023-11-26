import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import nextConfig from './next.config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default mergeConfig(
  nextConfig,
  defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './setup.ts',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  })
);
