import Vue from 'vue'
import App from './App.vue'

// 全量引入
import VerifySlider from '~'
Vue.use(VerifySlider)

// 按需引入
// import VerifySlider from '~/VerifySlider'
// Vue.use(VerifySlider)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
