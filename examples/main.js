import { createApp } from 'vue'
import App from './App.vue'

// 全量引入
import VerifySlider from '~'
// 按需引入
// import VerifySlider from '~/VerifySlider'

const app = createApp(App)

app.use(VerifySlider)

app.mount('#app')
