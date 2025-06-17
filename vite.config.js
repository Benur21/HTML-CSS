
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import fs from 'fs';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url))


function reorderScriptsPlugin() {
  return {
    name: 'reorder-scripts',
    transformIndexHtml(html) {
      const jsTools = html.match(/<link[^>]*JSTools[^>]*>/)?.[0];
      const monopoly = html.match(/<script[^>]*monopoly[^>]*><\/script>/)?.[0];

      if (jsTools && monopoly) {
        html = html
          .replace(jsTools, '')
          .replace(monopoly, '')
          .replace('</head>', `${jsTools}\n${monopoly}\n</head>`);
      }

      return html;
    }
  };
}


export default defineConfig({
  plugins: [reorderScriptsPlugin()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        monopoly: resolve(__dirname, 'Monopoly.html'),
      },
    },
    sourcemap: true
  },
  server: {
    open: true,
  },
  base: './',
});
