const getData = function (time) {
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
export default {
  getData
}
