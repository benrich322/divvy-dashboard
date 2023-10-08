//import { defineConfig } from 'vite';
//import react from '@vitejs/plugin-react';
//
//// https://vitejs.dev/config/
//export default defineConfig({
//  base: '/divvy-dashboard/', // Add this line to specify the base path
//  plugins: [react()],
//  build: {
//    target: 'esnext', // Set this to 'esnext'
//  },
//  esbuild: {
//    jsxFactory: 'React.createElement',
//    jsxFragment: 'React.Fragment',
//  },
//});

// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/divvy-dashboard/', // Specify the base path

  // Plugins
  plugins: [],

  // Build Configuration
  build: {
    target: 'esnext', // Set the target to 'esnext'
    rollupOptions: {
      // Define multiple entry points
      input: {
        main: './index.html', // Main page (index.html) in the root directory
        weather: './weather.html', // Secondary page (weather.html) in the root directory
      },
    },
  },

  // ESBuild Configuration
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
});











