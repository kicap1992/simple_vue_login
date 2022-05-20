import { createApp } from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import store from './store'

import router from './router'
import './axios'

// Vue.config.productionTip = false

// new Vue({
//   router,
//   // store,
//   render: h => h(App),
// }).$mount('#app')


createApp(App).use(store).use(router).mount('#app')
// createApp(App).use(router).mount('#app')
