//let BASE_URI = "http://39.105.132.153:9899"
//let BASE_URI ="/api"
//测试
// let BASE_URI = "http://39.105.132.153:9899"
// let BASE_URI ="http://webchudan.huatiinfo.cn"
//正式
let BASE_URI ="http://m.jmd724.com"

var config = {
  login: '/webOrder/webLogin', //登录
  getAnalysis: '/webOrder/getAnalysis', //首页统计 old
  getSaleData: '/webOrder/getSaleData', //首页统计


  getAnalysisDetail: '/webOrder/getAnalysisDetail', //详情
  toOrderForm: '/webOrder/toOrderForm', //添加订单预加载
  getInvestTerm: '/webOrder/getProTerms', //获取投资期限
  getProFees: '/webOrder/getProFees', //获取业绩比较基准
  getChannelList: '/webOrder/getChannelOrStudio', //获取渠道列表
  getCustomBankList: '/webOrder/getCustomBankList', //获取客户银行卡列表
  saveOrder: '/webOrder/saveOrder', //订单录入-保存
  queryWebProduct: '/webOrder/queryWebProduct', //获取产品列表
  getOrderDetail: '/webOrder/getOrderDetail', //订单详情
  getOrderList: '/webOrder/getOrderList', //订单查询
  officeTree: '/webOrder/officeTree', //用户树
  updateOrder: '/webOrder/updateOrder', //订单修改
  upload: '/webOrder/upload', //上传文件
  saveVideo: "/webOrder/saveVideo", //保存视频
  saveFilesPdf:"/webOrder/saveOtherFiles",
  //客户管理
  getCustomList: '/webOrder/getCustomList', //客户列表
  logOut: '/webOrder/logOut', //退出

  //销售管理'
  getSalesAdmin: '/webOrder/getSalesAdmin', //销售管理列表
  getOrderInfo: '/webOrder/getOrderInfo', //销售详情订单
  getFollowInfo: '/webOrder/getFollowInfo', //销售详情跟单
  getPendingList: '/webOrder/getPendingList', //离职处理 待处理
  getHandledList: '/webOrder/getHandledList', //离职处理 已处理
  doOperate: '/webOrder/doOperate', //处理
  getUserByOffice: '/webOrder/getUserByOffice', //获取部门用户列表接口
  //我的联系人
  getUserGroup: '/webOrder/getUserGroup', //获取用户下的分组
  getMyCustomer: '/webOrder/getMyCustomer', //所有联系人列表接口
  getCustomTopData: '/webOrder/getCustomTopData', //联系人详情-顶部数据接口
  getCustomDetail: '/webOrder/getCustomDetail', //联系人资料接口
  changeCustomDetail:'/webOrder/changeCustomDetail',//修改资料信息接口
  getCustomFollowList:'/webOrder/getCustomFollowList',//-跟进的列表（新）
  getCustomOrderList:'/webOrder/getCustomOrderList',//-投资的列表（新）
  getCustomFollowDefault:'/webOrder/getCustomFollowDefault',//跟进的默认数据接口
  getCustomVisitLog:'/webOrder/getCustomVisitLog',//访问记录接口
}
//本地
// for (let val in config) {
//     config[val] = BASE_URI +"/sdic-app"+ config[val];
// }


//测试
for (let val in config) {
  config[val] = BASE_URI + config[val];
}

let uploadURl = config.upload //上传视频地址

//登录
function reqGetLogin(self, data) {
  let reqUrl = config.login;
  return self.$post(reqUrl, data);
}
//统计old
function reqGetAnalysis(self, data) {
  let reqUrl = config.getAnalysis;
  return self.$post(reqUrl, data);
}
//统计
function reqGetSaleData(self, data) {
  let reqUrl = config.getSaleData;
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
// 2020-07-24

function reqSaveFilesPdf(self, data) {
  let reqUrl = config.saveFilesPdf;
  return self.$post(reqUrl, data);
}
// 退出
function reqlogOut(self, data) {
  let reqUrl = config.logOut;
  return self.$post(reqUrl, data);
}

//销售管理
function reqGetSalesAdmin(self, data) {
  let reqUrl = config.getSalesAdmin;
  return self.$post(reqUrl, data);
}
//销售管理 详情订单
function reqGetOrderInfo(self, data) {
  let reqUrl = config.getOrderInfo;
  return self.$post(reqUrl, data);
}
//销售管理 详情订单
function reqGetFollowInfo(self, data) {
  let reqUrl = config.getFollowInfo;
  return self.$post(reqUrl, data);
}


//销售管理离职 已处理
function reqGetPendingList(self, data) {
  let reqUrl = config.getPendingList;
  return self.$post(reqUrl, data);
}
//销售管理离职 待处理
function reqGetHandledList(self, data) {
  let reqUrl = config.getHandledList;
  return self.$post(reqUrl, data);
}
//销售管理离职 处理
function reqGetdoOperate(self, data) {
  let reqUrl = config.doOperate;
  return self.$post(reqUrl, data);
}
//销售管理处理 人组
function reqGetUserByOffice(self, data) {
  let reqUrl = config.getUserByOffice;
  return self.$post(reqUrl, data);
}

//我的联系人 分组
function reqGetUserGroup(self, data) {
  let reqUrl = config.getUserGroup;
  return self.$post(reqUrl, data);
}
//我的联系人 list
function reqGetMyCustomer(self, data) {
  let reqUrl = config.getMyCustomer;
  return self.$post(reqUrl, data);
}
//我的联系人 联系人详情-顶部数据接口
function reqGetCustomTopData(self, data) {
  let reqUrl = config.getCustomTopData;
  return self.$post(reqUrl, data);
}
//我的联系人 联系人资料接口
function reqGetCustomDetail(self, data) {
  let reqUrl = config.getCustomDetail;
  return self.$post(reqUrl, data);
}
//我的联系人 联系人资料修改接口
function reqGetchangeCustomDetail(self, data) {
  let reqUrl = config.changeCustomDetail;
  return self.$post(reqUrl, data);
}
//我的联系人 跟进
function reqGetCustomFollowList(self, data) {
  let reqUrl = config.getCustomFollowList;
  return self.$post(reqUrl, data);
}
//我的联系人 order
function reqGetCustomOrderList(self, data) {
  let reqUrl = config.getCustomOrderList;
  return self.$post(reqUrl, data);
}
//我的联系人 跟进的默认数据接口
function reqGetCustomFollowDefault(self, data) {
  let reqUrl = config.getCustomFollowDefault;
  return self.$post(reqUrl, data);
}
//访问记录接口
function reqGetCustomVisitLog(self, data) {
  let reqUrl = config.getCustomVisitLog;
  return self.$post(reqUrl, data);
}


export {
  reqGetLogin, //登录
  reqGetAnalysis, //首页统计old
  reqGetSaleData, //首页统计
  reqGetAnalysisDetail, //统计详情
  reqToOrderForm, //添加订单预加载
  getInvestTerm, //获取投资期限
  getProFees, //获取业绩比较基准
  getChannelList, //获取渠道列表
  getCustomBankList, //获取客户银行卡列表
  reqqueryWebProduct, //订单查询获取产品列表
  saveOrder, //订单录入保存
  reqgetOrderDetail, //订单详情
  reqgetCustomList, //客户管理
  reqgetOrderList, //订单查询
  reqofficeTree, //用户树
  requpdateOrder, //订单修改
  reqUpload, //上传文件
  saveVideo, //保存视频
  reqSaveFilesPdf,//保存其他附件
  uploadURl, //上传视频地址-----
  reqlogOut, //退出登录
  reqGetSalesAdmin, //销售管理
  reqGetOrderInfo, //销售详情的订单列表
  reqGetFollowInfo, //销售详情的跟单列表
  reqGetHandledList, //离职处理 已处理
  reqGetPendingList, //离职处理 待处理
  reqGetdoOperate, //离职处理
  reqGetUserByOffice, ////销售管理处理 人组
  reqGetUserGroup, //我的联系人 分组
  reqGetMyCustomer, ////我的联系人 list
  reqGetCustomTopData, //联系人详情-顶部数据接口
  reqGetCustomDetail, //联系人资料接口 
  reqGetchangeCustomDetail,//联系人资料修改接口 
  reqGetCustomFollowList,//-跟进的列表（新）
  reqGetCustomOrderList,//-投资的列表（新）
  reqGetCustomFollowDefault,//跟进的默认数据接口
  reqGetCustomVisitLog,//访问记录接口
}
