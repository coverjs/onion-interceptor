import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      outDir: 'dist',
      exclude: 'vite.config.ts'
    })
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'onion-interceptor',
      fileName: 'index',
      formats: ['es']
    }
  }
})
