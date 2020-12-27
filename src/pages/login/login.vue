<template>
  <div class="login-wrap">
    <div class="headers">
      <ul>
        <li class="title">
          <span>业务系统</span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp; 人类就是在挑战不可能中进步
        </li>
        <li class="user-li">
          <img class="user-headpic" src="../../assets/logo.png" alt>
          <span>您好，欢迎您回来</span>
        </li>
      </ul>
    </div>
    <div class="login-main">
      <div class="login-text">
        <img src="../../assets/text.png" alt>
      </div>
      <div class="login-box">
        <el-form :model="form" @keyup.enter.native="submit()">
          <div class="login-title">业务系统</div>
          <el-form-item>
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" v-model="form.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item style="text-align:left;line-height:0;margin-top:0;">
            <el-checkbox v-model="checked" id="rememberPwd" @change="changeCheck">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item style="margin-top:0;">
            <el-button type="primary" style="width: 100%;" @click="submit()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { reqGetLogin, reqGetWallet,reqofficeTree } from "@/api/api";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      checked: false,
      flg:"",//1：记住密码
      token: localStorage.getItem("token")
    };
  },
  mounted(){
    //验证判断是否记住密码
    if(localStorage.getItem("flg")&&localStorage.getItem("pwd")&&localStorage.getItem("userName")){
      this.checked=true
      this.flg=1
      this.form.username=localStorage.getItem("userName")
      this.form.password=localStorage.getItem("pwd")
    }else{
      this.checked=false
      this.flg=""
      this.form.username=""
      this.form.password=""
    }
  },
  methods: {
    submit() {
      this.$router.push({ name:"index"});
      return false;
      if (this.form.username == "" || this.form.password == "") {
        this.$message.error("用户名或密码不能为空");
      } else {
        let params = {
          loginName: this.form.username,
          password: this.form.password
        };
        reqGetLogin(this, params)
          .then(res => {
            if (res.head.code == "000000") {
              console.log(res.body)
              
              localStorage.setItem("token", res.body.token);
              localStorage.setItem("officeId", res.body.officeId);
              localStorage.setItem("officeName", res.body.officeName);
              localStorage.setItem("companyName", res.body.companyName);

              //验证判断是否记住密码
              if(this.flg==1){
                localStorage.setItem("flg",1)
                localStorage.setItem("pwd",this.form.password)
                localStorage.setItem("userName",this.form.username)
              }else{
                localStorage.setItem("flg","")
                localStorage.setItem("pwd","")
                localStorage.setItem("userName","")
              }
              //用户姓名
              localStorage.setItem("loginName",res.body.name)
               localStorage.setItem("userId",res.body.id)
              localStorage.setItem("userRoleType",res.body.userRoleType)
              
              this.$message({
                message: res.head.msg,
                type: "success",
                duration: 1000,
                onClose: () => {
                  this.$router.push({ path: "/" });
                }
              });

            }

          })
          .catch(err => {
            console.log(err);
            // this.$message.error(err.head.msg);
          });
      }
    },
    changeCheck(){
      //记住密码
      //获取当前--选择是否记住密码的状态
      if(this.checked){
        this.flg=1
      }else{
        this.flg=""
      }
    },
  }
};
</script>
<style lang="scss">
.login-wrap {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/loginBg.jpg");
  background-size: cover;
  overflow: hidden;
  .headers {
    background-color: #2c395c;
    height: 65px;
    ul {
      border-bottom: none;
      margin: 0 auto;
      padding: 0 44px;
      color: #fff;
      .user-li {
        float: right;
        height: 100%;
        line-height: 60px;
        font-size: 13px;
        color: #fff;
        .user-headpic {
          display: inline-block;
          width: 30px;
          vertical-align: middle;
        }
        .user-name {
          padding-right: 15px;
          border-right: 1px solid #fff;
        }
        .el-button {
          color: #fff;
          width: 22px;
          margin-left: 10px;
        }
      }
      .title {
        float: left;
        line-height: 60px;
        span {
          font-size: 28px;
        }
      }
    }
  }
  .login-main {
    width: 1200px;
    height: 360px;
    margin: 10% auto 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .login-text {
      width: 636px;
      height: 186px;
      margin-top: 72px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .login-box {
      width: 256px;
      height: 310px;
      background-color: rgba(255, 255, 255, 0.5);
      padding: 50px 72px 0;
      .login-title {
        height: 31px;
        font-size: 24px;
        color: #2c395c;
        text-align: left;
      }
      .el-form-item {
        margin-top: 22px;
        margin-bottom: 0;
      }
    }
  }
}
</style>

