import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

// import Vue3GrifLayout from 'vue3-grid-layout-picker'
// import "vue3-grid-layout-drop/dist/style.css" // 引入组件样式

const app = createApp(App)

app.use(router)

app.mount('#app')
