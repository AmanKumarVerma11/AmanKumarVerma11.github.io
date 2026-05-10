import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/github-contributions': {
        target: 'https://github-contributions-api.jogruber.de',
        changeOrigin: true,
        rewrite: () => '/v4/AmanKumarVerma11?y=last',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react:  ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons:  ['react-icons'],
          rough:  ['roughjs'],
        },
      },
    },
  },
})
