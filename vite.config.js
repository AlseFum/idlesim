import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.npm_lifecycle_event === 'dev' ? '/' : '/idlesim/',
  define: {
    'process.env': process.env
  }
})
