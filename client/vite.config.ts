import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin as vePlugin } from '@vanilla-extract/vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),vanillaExtractPlugin()],
  
})
function vanillaExtractPlugin(): import("vite").PluginOption {
  return vePlugin();
}

