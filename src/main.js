import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 引入初始化样式
import'@/styles/common.scss'
// 引入懒加载指令插件并且注册
import { lazyPlugin } from './directives'
// 引入全局组件
import { componentPlugin } from '@/components/index.js'

import pinia from '@/stores/index'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')
