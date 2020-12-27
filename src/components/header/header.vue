<template>
  <div id="header" class="headers">
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
        <span>admin，欢迎您回来</span>
        <span class="loout" @click="outlogin">退出</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      groupVal: "0",
      groups: [
        {
          label: "总组",
          value: "0",
        },
        {
          label: "A组",
          value: "1",
        },
        {
          label: "B组",
          value: "2",
        },
      ],
    };
  },
  methods: {
    outlogin(){

    }
  },
};
</script>

<style lang="scss" scoped>
.headers {
  background-color: #409eff;
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
        margin-left:15px;
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

