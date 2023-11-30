import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "web-component-amazing-chart",
      fileName: (format) => `amazing-chart.${format}.js`
    },
  },
});
