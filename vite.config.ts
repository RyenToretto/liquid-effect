import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/liquid-effect/',
  plugins: [vue()],
  server: {
    port: 9886,
    host: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // 使用新的 Sass API
        silenceDeprecations: ['legacy-js-api'] // 静默废弃警告
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
