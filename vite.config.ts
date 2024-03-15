// vite.config.js или vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /~(.+)/,
        replacement: join(process.cwd(), 'node_modules/$1'),
      },

      {
        find: /@\//,
        replacement: join(process.cwd(), './src') + '/',
      },
    ],
  },
});
