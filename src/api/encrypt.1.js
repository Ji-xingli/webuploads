import CryptoJS from 'crypto-js'


//秘钥key
var key = "app_standard2_base64_key";

//key不足24位自动以0(最小位数是0)补齐,如果多余24位,则截取前24位,后面多余则舍弃掉
var base64 = CryptoJS.enc.Utf8.parse(key)

function encrypt(val) {
  var encrypt = CryptoJS.TripleDES.encrypt(val, base64, {
    iv: CryptoJS.enc.Utf8.parse('app_s2iv'),//iv偏移量
    mode: CryptoJS.mode.CBC,  //CBC模式
    // mode: CryptoJS.mode.ECB,  //ECB模式
    padding: CryptoJS.pad.Pkcs7//padding处理
  });
  var encryptData = encrypt.toString();//加密完成后，转换成字符串
  return encryptData;
}

//解密
function decrypt(val) {
  var decrypt = CryptoJS.TripleDES.decrypt(val, base64, {
    iv: CryptoJS.enc.Utf8.parse('app_s2iv'),
    mode: CryptoJS.mode.CBC,
    // mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  //解析数据后转为UTF-8
  var parseData = decrypt.toString(CryptoJS.enc.Utf8);
  return parseData;
}


export {
    encrypt,//加密
    decrypt//解密
}
