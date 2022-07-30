import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import MyPagination from '@/components/Pagination'
// import swiper from 'swiper/css/swiper.css'


import '@/plugins/swiper'  //这是swiper配置，用于轮播图
import '@/mock/mockServe' //这是mock配置，用于模拟数据
import '@/plugins/element'  //这是element-ui配置，用于搭建页面

import * as API from '@/api'  //这是ajax接口配置，用于全局发送请求

Vue.config.productionTip = false

// 全局组件注册
Vue.component(TypeNav.name, TypeNav)
Vue.component(MyPagination.name, MyPagination)



new Vue({
  beforeCreate(){
    // 定义全局事件总线
    Vue.prototype.$bus = this

    // 把api接口添加到vue的原型上，在任意组件都可以通过$api访问
    Vue.prototype.$API = API
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')
