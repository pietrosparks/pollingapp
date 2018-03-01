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
import VueTimeago from 'vue-timeago'
import store from './store/store.js'
import VueFuse from 'vue-fuse'

Vue.use(VueFuse)





Vue.component('icon', Icon)
Vue.use(Buefy)
Vue.use(VueAxios, axios);
Vue.use(VueLocalStorage)
Vue.use(VueSweetalert2)



Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: 'en-US',
  locales: {
    // you will need json-loader in webpack 1
    'en-US': require('vue-timeago/locales/en-US.json')
  }
})


Vue.config.productionTip = false


export const EventBus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App, VueLocalStorage }
})
