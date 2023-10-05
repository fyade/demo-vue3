import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createHtmlPlugin } from "vite-plugin-html";
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  return {
    plugins: [
      vue(),
      viteCompression({
        threshold: 102400
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE
          }
        }
      })
    ],
    resolve: {
      alias: {
        '@': join(__dirname, 'src')
      }
    },
    server: {
      proxy: {
        [env.VITE_APP_REQ_PREFIX]: {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.substring(env.VITE_APP_REQ_PREFIX.length)
        }
      }
    },
  }
})
