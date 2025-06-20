import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';
import { vanillaExtractPlugin as vePlugin } from '@vanilla-extract/vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    federation({
      name: 'host',
      filename: "hostEntry.js",
      remotes: {
        'Monkey': 'http://localhost:4173/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),vanillaExtractPlugin()
  ],server: {
    proxy: {
      '/inventory': 'http://localhost:4002',
      '/auth':      'http://localhost:4001',
      '/employees': 'http://localhost:4001',
    },
  },

})
function vanillaExtractPlugin(): import("vite").PluginOption {
  return vePlugin();
}

