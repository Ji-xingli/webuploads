import Vue from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
// import { Message, Loading, Notification } from 'element-ui';
import router from '../router/index'

import {
  Message
} from 'element-ui';

let duration = 20000
axios.defaults.timeout = duration
axios.defaults.withCredentials = false
// axios.defaults.baseURL = window.baseConfig.BASE_URI
var showHideLoading = false

//http request 拦截器
axios.interceptors.request.use(
  config => {
    showHideLoading = false

    if (config.data) {
      console.log('隐藏loading=========')
      // Message({
      //     showClose: true,
      //     message: "加载中...",
      //     type: 'error',
      //     duration: 2000
      // })
    } else {

      showHideLoading = true
    }


    config.headers.token = localStorage.getItem('token'); //将token设置成请求头

    if (config.data && config.data.file) {
      console.log(config.data.file)
      config.headers['Content-Type'] = 'multipart/form-data'
      config.data = config.data.file
    } else {
      config.data = JSON.stringify(config.data)
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

let codeList = [0]

//response 拦截器
axios.interceptors.response.use(
  response => {

    //对返回结果统一处理
    if ((response.data.head.code && Number(response.data.head.code) === 100001) || (response.data.head.code && Number(response.data.head.code) === 100007)) {
      var urlgo = window.location.href
      sessionStorage.setItem("url", urlgo)

      var urlgo = window.location.href
      sessionStorage.setItem("url", urlgo)
      router.push({
        path: '/login',
      })

    } else if (!codeList.includes(Number(response.data.head.code)) && response.data.head.code !== undefined && !isNaN(response.data.head.code)) {

      // Toast({
      //     message: response.data.head.message, //提示内容分
      //     position: 'middle', //提示框位置
      //     duration: 2000, //持续时间（毫秒），若为 -1 则不会自动关闭
      // });

      Message({
        showClose: true,
        message: response.data.head.msg,
        type: 'error',
        duration: 2000
      })

      return Promise.reject(response.data)
    } else {
      return response.data
    }
  },
  error => {
    // Toast({
    //     message: '网络异常，请稍后重试...',
    //     duration: 2000
    // })

    Message({
      showClose: true,
      message: response.data.head.msg,
      type: 'error',
      duration: 2000
    })

    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}
