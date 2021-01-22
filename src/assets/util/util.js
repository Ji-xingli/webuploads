// 时间戳转年月日
function getData(time) {
  let datetime = new Date();
  datetime.setTime(time);
  var year = datetime.getFullYear();
  var month =
    datetime.getMonth() + 1 < 10 ?
    "0" + (datetime.getMonth() + 1) :
    datetime.getMonth() + 1;
  var date =
    datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
  // console.log(year + "-" + month + "-" + date)
  return year + "-" + month + "-" + date;
}

// 秒转时分秒
function formatSeconds(value) {
  let result = parseInt(value);
  let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
  let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
  let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
  return [h, m, s];
}

// 秒转为时分秒
function timeEvent(h,m,s) {
  // var time = e;
  // var len = time.split(':')
  // if (len.length == 3) {
    var hour =h;
    var min =m;
    var sec = s;
    return Number(hour * 3600) + Number(min * 60) + Number(sec);
  // }
  // if (len.length == 2) {
  //   var min = time.split(':')[0];
  //   var sec = time.split(':')[1];
  //   return Number(min * 60) + Number(sec);
  // }
  // if (len.length == 1) {
  //   var sec = time.split(':')[0];
  //   return Number(sec);
  // }

  // var hour = time.split(':')[0];
  // var min = time.split(':')[1];
  // var sec = time.split(':')[2];
  // return  Number(hour*3600) + Number(min*60) + Number(sec);
}

export{
  getData,
  formatSeconds,
  timeEvent
}