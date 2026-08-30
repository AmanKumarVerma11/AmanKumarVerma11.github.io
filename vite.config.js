import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Split by resolved module path rather than by entry name: the array form of
// manualChunks let react-dom get pulled into the router chunk once routes.jsx
// became the shared import, which collapsed the react chunk to nothing.
// Order matters — react-router must be matched before the generic react
// rule, since it also contains "react".
function manualChunks(id) {
  if (!id.includes('node_modules')) return undefined
  if (/[\\/]node_modules[\\/](roughjs|path-data-parser|points-on-curve|points-on-path)[\\/]/.test(id)) return 'rough'
  if (/[\\/]node_modules[\\/]react-router/.test(id)) return 'router'
  if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
  return undefined
}

export default defineConfig(({ isSsrBuild }) => ({
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
      output: isSsrBuild ? {} : { manualChunks },
    },
  },
}))
