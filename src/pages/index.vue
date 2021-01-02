<template>
  <div id="app">
    <!-- <div class="headers">
      <ul>
        <li class="title">
          <el-select v-model="groupVal" placeholder="请选择">
            <el-option
              v-for="item in groups"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </li>
        <li class="user-li">
          <span class="el-icon-s-check admin"></span>
          <span>{{ loginName }}，欢迎您回来</span>
          <span class="loout" @click="outlogin">退出</span>
        </li>
      </ul>
    </div> -->
    <el-container class="main">
      <el-aside style="width: 160px; min-width: 160px"></el-aside>
      <el-container class="inner">
        <el-header></el-header>
        <el-main class="content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { reqlogOut } from "@/api/api";
import Header from "@/components/header/header.vue";
import Menu from "@/components/menu/menu.vue";

export default {
  name: "app",
  components: {
    "el-header": Header,
    "el-aside": Menu,
  },
  data() {
    return {
      loginName: localStorage.getItem("loginName"),

      userRoleType: localStorage.getItem("userRoleType"),
    };
  },
  methods: {
    outlogin() {
      reqlogOut(this)
        .then((res) => {
          if ((res.head.code = "000000")) {
            console.log(res);
            this.$router.push({
              name: "login",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss">
#app {
  overflow: hidden;
  .main {
    height: 100%;
    min-height: 600px;
    background-color: #e6edf5;
    .el-main {
      padding: 0 10px;
    }
    .el-container.is-vertical {
      display: inherit;
    }
  }
  .copyright {
    color: #ffffff;
  }
}
</style>
