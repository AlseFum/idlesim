import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
const app=createApp(App);
app.use(naive)
import {createPinia} from 'pinia'
app.use(createPinia())
app.mount('#app')
