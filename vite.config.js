import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // 按需引入 Element Plus 组件
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // 配置 ElementPlus 使用 sass 样式配色系统
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    // css预处理器配置
    // 该配置项的作用是将 scss 文件中的变量和 mixin 引入到所有的 scss 文件中
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
        `,
      },
    },
  },
  server: {
    host: '0.0.0.0', // 允许监听所有网络接口
    port: 8080,      // 开发服务器端口
    allowedHosts: ['www.corho.com'], // ✅ 添加这一行以允许指定域名访问
    proxy: {
      '/api': {
        target: 'https://excashier-sandbox.dl.alipaydev.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  // 构建配置项：用于控制项目打包输出行为的配置项
  build: {
    rollupOptions: {
      // 该配置项的作用是将 qc.js 文件排除在打包之外
      external: ['qc'],
      output: {
        globals: {
          qc: 'QC',
        },
      },
    },
  },
})