// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Buefy from 'buefy'
import router from './router'
import Avatar from 'vue-avatar'
import 'buefy/lib/buefy.css'

import 'vue-awesome/icons/plus-circle'
import VueLocalStorage from 'vue-localstorage'
import axios from 'axios'

import Icon from 'vue-awesome/components/Icon'

Vue.component('icon', Icon)
Vue.use(Buefy)
Vue.use(axios);
Vue.use(VueLocalStorage)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App, VueLocalStorage }
})
