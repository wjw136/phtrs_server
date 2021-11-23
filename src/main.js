import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.use(ElementUI); //多个全局注入
Vue.config.productionTip = false

Vue.prototype.$axios = axios //全局注册 定义this.$axios
axios.defaults.baseURL = '/api'

new Vue({
    el: '#app',
    router: router,
    render: h => h(App),
})