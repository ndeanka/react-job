import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000, // Frontend port
        proxy: {
            '/api': {
                target: 'http://localhost:8000', // Backend port
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api'),
            }
        }
    }
});
