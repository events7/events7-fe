import './assets/main.css'

import { createApp } from 'vue'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import App from './App.vue'
import i18n from './i18n'
import router from './router'

const app = createApp(App)

app.use(i18n)
app.use(router)

app.use(Vue3Toastify, {
  icon: '✅',
} as ToastContainerOptions)

app.mount('#app')
