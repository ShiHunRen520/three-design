import { createApp } from 'vue'
import '../src/assets/style/style.css'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
// 增加的引入
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App);
app.use(router);
app.use(ElementPlus)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
