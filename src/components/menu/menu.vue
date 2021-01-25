<template>
  <div id="menu">
    <div class="logo"><img src="@/assets/img/logo.png" alt="" /></div>
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="getActive"
      router
    >
    <!-- default-active="/" -->
      <div v-for="(item, index) in list" :key="index">
        <el-menu-item :index="item.route">
          <i class="iconfont" :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </div>
      <!-- <el-menu-item index="/media">
        <i class="el-icon-video-camera"></i>
        <span slot="title">多媒体素材</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-files"></i>
        <span slot="title">站点管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-data-line"></i>
        <span slot="title">节目管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-user"></i>
        <span slot="title">个人中心</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginName: localStorage.getItem("loginName"),
      userRoleType: localStorage.getItem("userRoleType"), //1为销售权限杨辉 2为营业部权限刘浩 3为运营权限馨甜  0为共同权限
      phoneNumber: "",
      name: "",
      list: [
        {
          name: "首页",
          icon: "icon-shouye",
          route: "/",
          userRoleType: [0, 1, 2, 3],
          child: [],
        },
        // {
        //   name: "订单录入",
        //   icon: "fa-pencil-square-o",
        //   route: "",
        //   userRoleType: [0, 1, 2, 3],
        //   child: [
        //     { name: "订单录入", icon: "el-icon-s-menu", route: "/orderEntry" },
        //   ],
        // },
        {
          name: "多媒体素材",
          icon: "icon-sucaiku",
          route: "/media",
          userRoleType: [0, 1, 2, 3],
          child: [],
        },
        {
          name: "站点管理",
          icon: "icon-zhandian",
          route: "/siteManage",
          userRoleType: [0, 1, 2, 3],
          child: [],
        },
        {
          name: "节目管理",
          icon: "icon-caidan",
          route: "/programManage",
          userRoleType: [0, 1, 2, 3],
          child: [],
        },
        {
          name: "模板中心",
          icon: "icon-mobanguanli",
          route: "/templateCenter",
          userRoleType: [0, 1, 2, 3],
          child: [],
        },
        // {
        //   name: "个人中心",
        //   icon: "fa-search",
        //   route: "/personalCenter",
        //   userRoleType: [0, 1, 2, 3],
        //   child: [],
        // },
      ],
    };
  },

  mounted() {

  },
  computed:{
    getActive(){
      // 导航蓝根据当前页面关联高亮
      if (this.$route.path.indexOf("/programManage") == 0) {
        return "/programManage";
      } else {
        console.log(this.$route.path)
        return this.$route.path;
      }
    }
  },
  methods: {
    getmenu(index) {
      for (var i = 0; i < this.list[index].userRoleType.length; i++) {
        if (this.list[index].userRoleType[i] == this.userRoleType) {
          return 1;
        }
      }
    },
    //索引字符串转换
    gernerateId: function (index) {
      return index.toString();
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    //导航蓝根据当前页面关联高亮
    // activedMenu() {
    //   if (this.$route.path.indexOf("/programManage") == 0) {
    //     return "/programManage";
    //   } else {
    //     console.log(this.$route.path)
    //     return this.$route.path;
    //   }
    // },
  },
};
</script>
<style lang="scss" scoped>
#menu {
  .logo {
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    img {
      width: 120px;
    }
  }
  background-color: #ffffff;
  .el-menu .el-menu-item i {
    margin-right: 4px;
  }
  .el-submenu__title i {
    color: #646986;
    margin-right: 4px;
  }
  .el-menu {
    border: none;
    h5 {
      height: 50px;
      line-height: 50px;
      background: #f3f3fb;
      color: #71758f;
      img {
        vertical-align: middle;
        width: 30px;
        margin-right: 6px;
      }
      span {
        line-height: 50px;
      }
    }
    .eskimo-logo {
      margin: 40px;
      width: 37%;
    }
    .el-menu-item-group > ul {
      overflow: hidden;
      font-weight: 400;
      li.is-active {
        background: #f3f3fb;
        box-sizing: border-box;
        border-left: 3px solid #3ca0ec;
      }
    }
    .el-menu-item,
    .el-submenu__title {
      font-size: 14px;
      text-align: center;
      color: #646986;
      text-align: left;
    }
    .el-menu-item i {
      color: #646986;
    }
    .el-menu-item span,
    .el-submenu span {
      color: #646986;

      // font-weight: 900;
    }

    p {
      color: #ffffff;
      line-height: 2rem;
      font-size: 14px;
    }
  }
}
</style>
