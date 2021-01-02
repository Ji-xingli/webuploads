<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  font-size: 12px;
}
.el-drawer {
  overflow-y: scroll;
}
// .el-dialog__wrapper .el-dialog {
//   // width:20%!important;
//   height: 550px;
//   min-width: 670px;
//   overflow-y: scroll;
// }
// .el-dialog__body .dialogTree {
//   height: 360px;
//   overflow-y: scroll;
// }
// .top-line {
//   width: 100%;
//   background: #3ca0ec;
//   height: 50px;
//   // position: fixed;
// }
// .el-breadcrumb {
//   width:1005px!important;
// }
// .el-breadcrumb__inner {
//   color: #fff !important;
// }
// .el-breadcrumb__separator {
//   color: #fff !important;
// }
// .order_topcont .el-form--inline .el-form-item__label {
//     white-space: nowrap;
//     width: 70px!important;
//   }
//   .order_topcont .el-form--inline .el-form-item__content{
//     width: 160px;
//   }
//   .orderlistcont .el-table td, .el-table th{
//     padding:0;
//     font-size: 12px;
//   }
//   .order_topcont .el-input__inner{
//     height: 30px;
//     line-height: 30px;
//   }
//   .order_topcont .el-form-item{
//     margin-bottom: 10px;
//   }
//   .form-box .el-form--inline .el-form-item__label{
//     width: 85px;
//     white-space: nowrap;
//   }
//   .order-item .el-form-item__content{
//     width: 200px;
//   }
//   .order-item .el-input--prefix .el-input__inner{
//     width: 90%;
//   }
//   .order_topcont .el-input__inner{
//     height: 30px;
//     line-height: 30px;
//   }
//   .allindex .el-table .cell{
//     line-height: 40px;
//   }
//   .order-content .el-input__inner{
//     height: 30px;
//     line-height: 30px;
//   }
//   .el-form-item__error{
//     padding-top:0!important;
//   }
</style>
