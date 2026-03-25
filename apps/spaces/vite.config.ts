import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  server: {
    port: 3002,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react'
            }
            if (id.includes('@tiptap/') || id.includes('prosemirror')) {
              return 'vendor-editor'
            }
            if (
              id.includes('react-beautiful-dnd') ||
              id.includes('@hello-pangea/dnd') ||
              id.includes('@atlaskit/')
            ) {
              return 'vendor-dnd'
            }
            if (id.includes('styled-components')) {
              return 'vendor-react'
            }
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'vendor-i18n'
            }
          }
        },
      },
    },
  },
})
