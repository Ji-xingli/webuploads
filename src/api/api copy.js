//let BASE_URI ="/api"
//测试
// let BASE_URI = "http://39.105.132.153:9899"
// let BASE_URI ="http://webchudan.huatiinfo.cn"
//正式
let BASE_URI ="http://118.31.122.133:9090"

var config = {
  login: '/webOrder/webLogin', //登录
  mediaAddText:'/sqfc/material/addText',//添加文本
}
//本地
// for (let val in config) {
//     config[val] = BASE_URI +"/sdic-app"+ config[val];
// }


//测试
for (let val in config) {
  config[val] = BASE_URI + config[val];
}


//登录
function reqGetLogin(self, data) {
  let reqUrl = config.login;
  return self.$post(reqUrl, data);
}

// 添加文本
function reqMediaAddtext(self, data) {
  let reqUrl = config.mediaAddText;
  return self.$post(reqUrl, data);
}



export {
  reqGetLogin, //登录
  reqMediaAddtext,//添加文本
}
