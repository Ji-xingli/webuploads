/**
 * 全站http配置
 *
 */
import axios from 'axios';
import router from '../router/index'
import {Message} from 'element-ui';

//默认超时时间
axios.defaults.timeout = 300000;
//返回其他状态码
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500;
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// axios.defaults.baseURL ='http://118.31.122.133:9099'//测试
axios.defaults.baseURL ='http://118.31.122.133:9090'//线上

// axios.defaults.baseURL= process.env.BASE_API;// 配置的请求前缀,可以配置不同环境下不同路径

//http request拦截
axios.interceptors.request.use(config => {
  const meta = (config.meta || {});

  // const isToken = meta.isToken === false;

  //让每个请求携带token
  if (localStorage.getItem('Token')) {
    config.headers.Token = localStorage.getItem('Token');
  }

  //headers中配置text请求
  if (config.text === true) {
    config.headers["Content-Type"] = "text/plain";
  }

// headers中文件上传配置
  if(config.data&&config.data.file){
    config.headers['Content-Type'] = 'multipart/form-data'
  }
  
  return config
}, error => {
  return Promise.reject(error)
});
//http response 拦截
axios.interceptors.response.use(res => {

  //获取状态码
  const status = res.data.code || res.status;
  const message = res.data.data || res.data.msg || '未知错误';
console.log("res",res)
  //如果是401则跳转到登录页面
  if (status === 401){
    router.push({
      path: '/login',
    })
  }
  // 如果请求为非200否者默认统一处理
  if (status !== 200) {
    Message({
      message: message,
      type: 'error'
    });
    return Promise.reject(new Error(message))
  }
  return res;
}, error => {
  Message({
    message: error.data.data||error.data.msg,
    type: 'error'
  });
  return Promise.reject(new Error(error));
});

export default axios;
