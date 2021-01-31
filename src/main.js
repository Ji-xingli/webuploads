// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/reset.css'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index.js';

import './assets/iconfont/iconfont.css'
// import { post, put, fetch, patch, del } from './api/http'
// import 'font-awesome/css/font-awesome.min.css'
import util from './assets/util/util'
Vue.prototype.util= util;


Vue.config.productionTip = false
Vue.use(ElementUI);


router.afterEach((to, from) => {
    // 设置-除首页-其他页面都不能选择分组
    if(to.meta.isDisabled){
        store.commit('setSelGroupStatus', false);
    }else{
        store.commit('setSelGroupStatus', true);
    }
})

axios.defaults.headers.post['Access-Control-Allow-Origin']="*"
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})