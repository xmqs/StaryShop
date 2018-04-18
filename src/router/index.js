import Vue from 'vue'
import Router from 'vue-router'
import StaryHome from '@/components/StaryHome'
import Child from '@/components/ChildRouter'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'StaryHome',
      component: StaryHome
    },
    {
      path:'/child/:childId',
      name:'Child',
      component:Child
    }
  ]
})
