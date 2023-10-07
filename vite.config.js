import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-project/', // Add this line to specify the base path
  plugins: [react()],
  build: {
    target: 'esnext', // Set this to 'esnext'
  },
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
});




