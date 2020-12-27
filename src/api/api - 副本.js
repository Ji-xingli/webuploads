// 测试
let BASE_URI = "http://39.105.132.153:9899"

// let BASE_URI ="/api"

//正式
// let BASE_URI ="http://m.jmd724.com"

var config = {
    login: '/webOrder/webLogin',//登录
    getAnalysis:'/webOrder/getAnalysis',//首页统计
    getAnalysisDetail:'/webOrder/getAnalysisDetail',//详情
    toOrderForm:'/webOrder/toOrderForm',//添加订单预加载
    getInvestTerm:'/webOrder/getProTerms',//获取投资期限
    getProFees:'/webOrder/getProFees',//获取业绩比较基准
    getChannelList:'/webOrder/getChannelOrStudio',//获取渠道列表
    getCustomBankList:'/webOrder/getCustomBankList',//获取客户银行卡列表
    saveOrder:'/webOrder/saveOrder',//订单录入-保存
    queryWebProduct:'/webOrder/queryWebProduct',//获取产品列表
    getOrderDetail:'/webOrder/getOrderDetail',//订单详情
    getOrderList:'/webOrder/getOrderList',//订单查询
    officeTree:'/webOrder/officeTree',//用户树
    updateOrder:'/webOrder/updateOrder',//订单修改
    upload:'/webOrder/upload',//上传文件
    saveVideo:"/webOrder/saveVideo",//保存视频
    //客户管理
    getCustomList:  '/webOrder/getCustomList',//客户列表
    logOut:'/webOrder/logOut'//退出

}
//本地
// for (let val in config) {
//     config[val] = BASE_URI +"/sdic-app"+ config[val];
// }


//测试+正式
for (let val in config) {
    config[val] = BASE_URI + config[val];
}

let uploadURl=config.upload//上传视频地址

//登录
function reqGetLogin(self, data) {
    let reqUrl = config.login;
    return self.$post(reqUrl, data);
}
//统计
function reqGetAnalysis(self, data) {
    let reqUrl = config.getAnalysis;
    return self.$post(reqUrl, data);
}
//统计详情
function reqGetAnalysisDetail(self, data) {
    let reqUrl = config.getAnalysisDetail;
    return self.$post(reqUrl, data);
}


//添加订单预加载
function reqToOrderForm(self, data) {
    let reqUrl = config.toOrderForm;
    return self.$post(reqUrl, data);
}
//获取投资期限
function getInvestTerm(self, data) {
    let reqUrl = config.getInvestTerm;
    return self.$post(reqUrl, data);
}
//获取业绩比较基准
function getProFees(self, data) {
    let reqUrl = config.getProFees;
    return self.$post(reqUrl, data);
}
//获取渠道列表
function getChannelList(self, data) {
    let reqUrl = config.getChannelList;
    return self.$post(reqUrl, data);
}
//获取客户银行卡列表
function getCustomBankList(self, data) {
    let reqUrl = config.getCustomBankList;
    return self.$post(reqUrl, data);
}
// 订单录入保存
function saveOrder(self, data) {
    let reqUrl = config.saveOrder;
    return self.$post(reqUrl, data);
}
// 订单查询--获取产品列表
function reqqueryWebProduct(self, data) {
    let reqUrl = config.queryWebProduct;
    return self.$post(reqUrl, data);
}
//订单详情
function reqgetOrderDetail(self, data) {
    let reqUrl = config.getOrderDetail;
    return self.$post(reqUrl, data);
}
// 订单查询
function reqgetOrderList(self, data) {
    let reqUrl = config.getOrderList;
    return self.$post(reqUrl, data);
}
// 客户管理
function reqgetCustomList(self, data) {
    let reqUrl = config.getCustomList;
    return self.$post(reqUrl, data);
}

// 用户树
function reqofficeTree(self, data) {
    let reqUrl = config.officeTree;
    return self.$post(reqUrl, data);
}
// 订单修改
function requpdateOrder(self, data) {
    let reqUrl = config.updateOrder;
    return self.$post(reqUrl, data);
}
// 上传文件
function reqUpload(self, data) {
    let reqUrl = config.upload;
    return self.$post(reqUrl, data);
}

//保存视频
function saveVideo(self, data) {
    let reqUrl = config.saveVideo;
    return self.$post(reqUrl, data);
}
// 退出
function reqlogOut(self, data) {
    let reqUrl = config.logOut;
    return self.$post(reqUrl, data);
}

export {
    reqGetLogin,//登录
    reqGetAnalysis,//首页统计
    reqGetAnalysisDetail,//统计详情
    reqToOrderForm,//添加订单预加载
    getInvestTerm,//获取投资期限
    getProFees,//获取业绩比较基准
    getChannelList,//获取渠道列表
    getCustomBankList,//获取客户银行卡列表
    reqqueryWebProduct,//订单查询获取产品列表
    saveOrder,//订单录入保存
    reqgetOrderDetail,//订单详情
    reqgetCustomList,//客户管理
    reqgetOrderList,//订单查询
    reqofficeTree,//用户树
    requpdateOrder,//订单修改
    reqUpload,//上传文件
    saveVideo,//保存视频
    uploadURl,//上传视频地址-----
    reqlogOut//退出登录
}