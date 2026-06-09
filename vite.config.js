import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves a project site under /<repo>/. Override with
// VITE_BASE='/' for a custom domain or a user/organization Pages site.
export default defineConfig(() => ({
  base: process.env.VITE_BASE || '/dahlheimer-cup/',
  plugins: [react()],
}));
