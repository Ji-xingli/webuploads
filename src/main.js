// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '../static/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import { post, put, fetch, patch, del } from './api/http'
// import 'font-awesome/css/font-awesome.min.css'
import util from './assets/util/util'
Vue.prototype.util= util;


Vue.config.productionTip = false
Vue.use(ElementUI);

axios.defaults.headers.post['Access-Control-Allow-Origin']="*"
Vue.prototype.$http = axios
Vue.prototype.$cookies = VueCookies
Vue.prototype.$get = fetch;
Vue.prototype.$post = post;
Vue.prototype.$put = put;
Vue.prototype.$patch = patch;
Vue.prototype.$del = del;
Vue.config.devtools = true;
Vue.$post = post
Vue.$get = fetch
Vue.$put = put
Vue.$del = del
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})