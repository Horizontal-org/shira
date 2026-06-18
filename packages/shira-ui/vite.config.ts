import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'styled-components',
  'react-icons',
  /^react-icons\//,
  'react-i18next',
  'i18next'
]

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'shira-ui',
      formats: ['es', 'cjs'],
      cssFileName: 'styles',
      fileName: (format) => `index.${format}.js`
    },
    emptyOutDir: true,
    rollupOptions: {
      external,
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled'
        }
      }
    }
  }
})