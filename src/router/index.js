import Vue from 'vue'
import Router from 'vue-router'
import StaryHome from '@/components/StaryHome'
import Child from '@/components/ChildRouter'
import GoodList from '@/components/Views/GoodList'
import Cart from '@/components/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodList',
      component: GoodList
    },
    {
      path:'/child/:childId',
      name:'Child',
      component:Child
    },
    {
      path:'/cart',
      name:'Cart',
      component:Cart
    }
  ]
})
