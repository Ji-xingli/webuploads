<template>
  <div id="header" class="headers">
    <ul>
      <li class="title">
        <el-select
          v-model="groupVal"
          v-show="!this.$store.state.isSel"
          @change="changeVal"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in groups"
            :key="index"
            :label="item.group.groupName"
            :value="item.group.groupId"
          >
          </el-option>
        </el-select>
      </li>
      <li class="user-li">
        <el-dropdown>
          <span class="el-dropdown-link">
            <span class="el-icon-user-solid"></span>
            admin<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="gotoCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="outlogin">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>
<script>
import { queryGroup } from "@/api/personalCenter/index.js";
import {
  loginout//退出登录
} from "@/api/login/index.js";
export default {
  data() {
    return {
      groupVal: this.$store.state.groupId,
      groups: [],
    };
  },
  mounted() {
    this.getGroup();
    //
  },
  watch: {
    "$store.state.groupLen": function() {
        this.getGroup();
      
    }
  },
  methods: {
    changeVal(selVal) {
      this.$store.commit("setGroupId", selVal);
      console.log(selVal)
      this.groupVal=selVal;
    },
    getGroup() {
      var odata = {
        name: "",
      };
      queryGroup(odata).then((res) => {
        if (res.data.code == 200) {
          this.groups=res.data.data;
          // var arr = { group: { groupId: 999, groupName: "总组" }, total: 2 };
          // this.groups[0].unshift(arr);
          
          // 默认显
          // if(res.data.data.length!=0){
          //   this.groupVal=this.groups[0].group.groupId;
          // }
        }
      });
    },
    gotoCenter(){
      // 跳转个人中心
      this.$router.push({
        name:"personalCenter"
      })
    },
    outlogin() {
      loginout().then(res=>{
        if(res.data.code==200){
          localStorage.removeItem('Token')
          this.$router.push({
            name:"login"
          })

        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.headers {
  background-color: #fff;
  height: 65px;
  ul {
    border-bottom: none;
    margin: 0 auto;
    padding: 0 44px;
    .user-li {
      float: right;
      height: 100%;
      line-height: 60px;
      font-size: 13px;
      color: #fff;
      display: flex;
      align-items: center;
      .admin {
        font-size: 30px;
      }
      .loout {
        color: #ecd63c;
        font-size: 16px;
        margin-left: 15px;
      }
      .user-headpic {
        display: inline-block;
        width: 30px;
        // height:60px;
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
      a {
        color: #ffffff;
      }
    }
  }
}
</style>

