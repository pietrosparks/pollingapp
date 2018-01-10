// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Buefy from 'buefy'
import router from './router'
import Avatar from 'vue-avatar'
import 'buefy/lib/buefy.css'
require('./assets/css/style.css')
require('./assets/css/bootstrap/css/bootstrap.min.css')
import 'vue-awesome/icons/plus-circle'
import axios from 'axios'

import Icon from 'vue-awesome/components/Icon'

Vue.component('icon', Icon)
Vue.use(Buefy)
Vue.use(axios);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
