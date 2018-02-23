import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import User from '@/components/User'
import SearchResult from '@/components/SearchResult'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
     {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/:username',
      name: 'User',
      component: User
    },
    {
      path: '/search/user/:username',
      name: 'SearchResult',
      component: SearchResult
    }
  ]
})
export default router
