import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'dayjs/locale/zh-cn'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import mavonEditor from 'mavon-editor'

createApp(App).use(store).use(router).use(mavonEditor).use(ElementPlus).mount('#app')

