import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
      tsconfigPaths(),
    ],
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    server: {
      open: true,
      port: 3100,
      proxy: {
        [env.VITE_BACKEND_API_BASE]: {
          target: env.VITE_BACKEND_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(env.VITE_BACKEND_API_BASE, ''),
        },
      },
    },
    test: {
      deps: {
        inline: ['@mui/x-data-grid'],
      },
    },
  }
})
