import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/techpoll'
import LoggedIn from '@/components/LoggedIn'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Home
    },
     {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home/:username',
      name: 'LoggedIn',
      component: LoggedIn
    }
  ]
})
export default router
