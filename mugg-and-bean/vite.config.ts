import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Mugg_and_bean-website/',
  plugins: [react()],
  build: { outDir: 'build', emptyOutDir: true },
});
