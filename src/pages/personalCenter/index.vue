<template>
  <div class="wrap">
    <div class="table_box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form ref="form" class="formclass" :model="form" label-width="120px">
        <el-form-item label="我的头像">
          <img class="head_pic" :src="form.img" alt="" />
        </el-form-item>
        <el-form-item label="用户名">
          <span class="text">{{ form.name }}</span>
        </el-form-item>
        <el-form-item label="手机号">
          <span class="text">{{ form.phone }}</span>
        </el-form-item>
        <el-form-item label="当前密码" prop="password">
          <span class="text">{{ form.password }}</span>
        </el-form-item>
        <el-form-item label="设备软件包" prop="versions">
          <span class="text">{{ form.versions }}</span>
        </el-form-item>
        <el-form-item label="我的分组">
          <div class="groupList">
            <div class="item" v-for="(item, index) in groupList" :key="index">
              <span class="text">{{ item.name }}{{ item.num }}</span>
            </div>
          </div>
          <el-form-item>
            <el-button type="primary" @click="goEdit">编辑</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isEdit: false, //是否编辑
      groupList: [
        { name: "a组", id: 1, num: 100 },
        { name: "bdsfdfsf组", id: 2, num: 120 },
        { name: "c组", id: 3, num: 130 },
        { name: "a组", id: 1, num: 100 },
        { name: "bdsfdfsf组", id: 2, num: 120 },
        { name: "c组", id: 3, num: 130 },
      ],
      mygroup: "", //添加的分组名称
      searchVal: "", //搜索分组
      form: {
        img:
          "https://c-ssl.duitang.com/uploads/item/202001/10/20200110192530_EjxRV.jpeg",
        name: "张三",
        phone: "15523658956",
        password: "123456789",
        versions: "V1.0",
      },
    };
  },
  methods: {
    goEdit() {
      //   跳转编辑页面
      this.$router.push({
          name:"personalCenterEdit"
      })
    },
    addGroup() {
      console.log("djil");
      if (this.mygroup) {
        this.groupList.push({ name: this.mygroup });
        this.mygroup = "";
      } else {
        this.$message.warning("请输入需要添加的分组");
      }
    },
    handlePicRemove() {},
    beforePicUpload() {},
  },
};
</script>
<style lang="scss" scoped>
.el-breadcrumb{
    height:40px;
    line-height:30px;
    font-size:14px;
}
.wrap {
  width: 100%;
  height: 100%;
  margin-top: 10px;
  background: #fff;
  overflow: hidden;
  .table_box {
    padding: 10px;
    .title {
      font-size: 18px;
      line-height: 40px;
    }
    .input-with-select {
      width: 230px;
    }
    .head_pic {
      width: 100px;
      height: 100px;
    }
    .groupList {
      margin: 0 0 10px;
      .item {
        width: 150px;
        text-align: center;
        border-radius: 5px;
        display: inline-block;
        padding: 0 10px;
        line-height: 40px;
        border: 1px solid #999;
        margin: 0 10px 10px 0;
        position: relative;
        .del {
          font-size: 20px;
          color: #f00;
          position: absolute;
          right: -10px;
          top: -10px;
          cursor: pointer;
        }
      }
    }
    .text {
      font-size: 14px;
      color: #666;
    }
  }
  .group_title {
    line-height: 40px !important;
    padding: 0 10px;
    font-size: 18px;
    color: #666;
    background: #098;
  }
}
</style>