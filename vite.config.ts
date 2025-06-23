import { defineConfig, loadEnv } from 'vite';
import { dirname, resolve } from 'path';

import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3001,
      proxy: { // 开发环境API代理配置
        '/api': {
          target: 'https://jolly-sea-0d3061c1e.6.azurestaticapps.net/output',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          },
        }
      }
    },
    build: {
      outDir: 'dist',
      // sourcemap: mode === 'development',
      // // 生产环境特定配置
      // ...(mode === 'production' && {
      //   minify: 'terser',
      //   terserOptions: {
      //     compress: {
      //       drop_console: true, // 移除console
      //       drop_debugger: true, // 移除debugger
      //     },
      //   },
      //   // rollupOptions: {
      //   //   output: {
      //   //     // 分包配置
      //   //     manualChunks: {
      //   //       vendor: ['react', 'react-dom'],
      //   //       // 其他需要分包的库
      //   //     },
      //   //   },
      //   // },
      // }),
    },
    // 定义全局常量
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
    },
  }
});