// mf-remotes/inventory-ui/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'inventory-ui',
            filename: 'remoteEntry.js',
            exposes: {
                './ProductTable': './src/ProductTable.tsx',
            },
            shared: ['react', 'react-dom'],
        }),
    ],
    server: { port: 5174 },
    build: { target: 'esnext' },
});
