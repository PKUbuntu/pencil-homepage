import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/pencil-homepage/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/spacex': {
        target: 'https://spacex-api.fly.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/spacex/, '/graphql'),
      },
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.test.js'],
  },
})
