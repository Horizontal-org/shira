import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), dts()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'es' : 'cjs'}.js`
    },
    rollupOptions: {
      external: (id) => {
        if (id.startsWith('.') || id.startsWith('/') || id.startsWith('\0')) {
          return false
        }
        const externals = [
          'react',
          'react-dom',
          'react/jsx-runtime',
          'react/jsx-dev-runtime',
          'styled-components',
          '@floating-ui/react',
          '@tanstack/react-table',
          'date-fns',
          'polished',
          'react-popper',
        ]
        return externals.some(ext => id === ext || id.startsWith(ext + '/'))
          || id.startsWith('react-icons/')
      },
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled'
        },
        preserveModules: true,
        preserveModulesRoot: 'src',
      }
    }
  }
})
