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
.el-button--primary.is-disabled:active,.el-button--primary,.el-button--primary:focus, .el-button--primary:hover {
   background-image: linear-gradient(172deg, 
		#f83e73 0%, 
		#fd6963 100%), 
	linear-gradient(
		#272d42, 
		#272d42);
	background-blend-mode: normal, 
		normal;
    background-color:none!important;
    border:0;
}
.btn_bgColor{
  background-image: linear-gradient(
		#f34648, 
		#f34648), 
	linear-gradient(
		#aaaaaa, 
		#aaaaaa);
	background-blend-mode: normal, 
		normal;
}
.btn_bgColor:hover{
  background-image: linear-gradient(
		#f34648, 
		#f34648), 
	linear-gradient(
		#aaaaaa, 
		#aaaaaa);
	background-blend-mode: normal, 
		normal;
}
.el-button--text{
  color:#2ecc71;
}
.el-tabs__item.is-active,.el-tabs__item:hover{
  color:#f34648;
}
.el-tabs__active-bar{
  background-color:#f34648;
}
.el-drawer {
  overflow-y: scroll;
}
.el-pagination {
  margin-top:10px;
  text-align: center;
}
.el-step__head.is-process{
  color:#fff;
  border-color: #f00;
}
.is-process .is-text{
  background:#f00;
}
.el-menu-item.is-active {
  background-image:url('./assets/img/bg.png') !important;
  background-repeat: no-repeat;
  background-size:140px 30px;
  background-position: center center;
  background-color: none!important;
  color: #fff;
  i,span {
    color: #fff !important;
  }
}
.el-menu-item:focus, .el-menu-item:hover{
  background-color: #fff!important;
}
.el-step__head.is-success{
  color: #f00;
    border-color: #f00;
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color: #f34648;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color: #f34648;
    border-color: #fff;
}
.el-radio__input.is-checked .el-radio__inner{
  background-color: #f34648;
    border-color: #f34648;
}
.el-radio__input.is-checked+.el-radio__label{
  color:#333;
}
.el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover{
      background-color: #b8b8b8;
}
</style>
