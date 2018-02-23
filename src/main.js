// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

require('./assets/css/style.css')
require('./assets/css/bootstrap/css/bootstrap.min.css')


import Vue from 'vue'
import App from './App'
import Buefy from 'buefy'
import router from './router'
import Avatar from 'vue-avatar'
import 'buefy/lib/buefy.css'
import 'vue-awesome/icons/plus-circle'
import VueLocalStorage from 'vue-localstorage'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';

import Icon from 'vue-awesome/components/Icon'


Vue.component('icon', Icon)
Vue.use(Buefy)
Vue.use(VueAxios, axios);
Vue.use(VueLocalStorage)
Vue.use(VueSweetalert2)
Vue.config.productionTip = false


export const eventBus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App, VueLocalStorage }
})
