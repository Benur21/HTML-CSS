import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        monopoly: resolve(__dirname, 'Monopoly.html'),
        theballgame: resolve(__dirname, 'TheBallGame.html'),
        animation1: resolve(__dirname, 'Animation1.html'),
        animation2: resolve(__dirname, 'Animation2.html'),
      },
    },
    sourcemap: true
  },
  server: {
    open: true,
  },
  base: './',
});
