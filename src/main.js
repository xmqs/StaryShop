import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
//lazy进行懒加载 监控数据
Vue.use(VueLazyLoad,{
  //error返回页面
  error:'./static/1.jpg',
  //加载页面
  loading:'./static/loading.svg'
})

Vue.use(infiniteScroll);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
