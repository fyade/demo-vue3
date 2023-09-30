import { createApp } from 'vue'
import './style.scss'
import { createPinia } from 'pinia'
import router from "./router";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import directives from "@/directive/index.js";
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(router)
app.use(directives)
app.mount('#app')
