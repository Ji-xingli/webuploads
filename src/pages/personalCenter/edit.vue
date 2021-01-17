<template>
  <div class="wrap">
    <div class="table_box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/personalCenter' }"
          >个人信息</el-breadcrumb-item
        >
        <el-breadcrumb-item>修改个人信息</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form
        ref="form"
        class="formclass"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="我的头像" prop="num">
          <el-upload
            class="headPic"
            action="api/blade-project/project/projectfiles/uploadFiles"
            :auto-upload="false"
            :limit="1"
            list-type="picture-card"
            v-model="form.img"
            :on-change="beforePicUpload"
            :on-remove="handlePicRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="当前密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="设备软件包" prop="versions">
          <div @click="changePack">
            <span>{{ form.versions }}</span>
            <span class="el-icon-s-goods" style="font-size: 20px"></span>
          </div>
        </el-form-item>
        <el-form-item label="我的分组">
          <div class="mygroup">
            <el-input
              placeholder="请输入需要添加的分组"
              v-model="mygroup"
              class="input-with-select"
            >
              <el-button
                slot="append"
                @click.native="addGroup"
                icon="el-icon-plus"
              ></el-button>
            </el-input>
            <el-input
              placeholder="可输入分组进行搜索"
              v-model="searchVal"
              class="input-with-select"
              clearable
            >
              <el-button
                @click="searchGroup"
                slot="append"
                icon="el-icon-search"
              ></el-button>
            </el-input>
          </div>
          <div class="groupList">
            <div class="item" v-for="(item, index) in groupList" :key="index">
              <el-input
                v-model="item.group.groupName"
                @blur="inputBlur(item.group)"
              ></el-input>
              <span class="del el-icon-remove" @click="delGroup(index)"></span>
            </div>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitPicForm('form')"
              >确定</el-button
            >
            <el-button type="primary" @click="editCancle">取消</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
      <!-- 设备软件包弹窗 -->
      <el-drawer
        title="上传软件包"
        :visible.sync="picMasterVisible"
        direction="rtl"
        size="50%"
      >
        <el-form
          ref="form"
          class="formclass"
          :model="form"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="软件版本号" prop="versions">
            <el-input v-model="form.versions"></el-input>
          </el-form-item>
          <el-form-item label="选择软件包" prop="num">
            <el-upload
              class="headPic"
              action="api/blade-project/project/projectfiles/uploadFiles"
              :auto-upload="false"
              :limit="1"
              list-type="picture-card"
              v-model="form.img"
              :on-change="beforePicUpload"
              :on-remove="handlePicRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="editCancle">取消</el-button>
            <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import {
  addGroup,
  queryGroup,
  updateGroup,
} from "@/api/personalCenter/index.js";
export default {
  data() {
    return {
      picMasterVisible: false, //是否编辑
      groupList: [],
      delList: [], //删除的组列表
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
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],

        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          // { validator: idcard, trigger: 'blur' },
          {
            pattern: /^1(3|4|5|6|7|8)\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
          // { max:11, message: '请输入11位手机号码', trigger: 'blur' }
        ],
        password: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getGroup();
  },
  methods: {
    changePack() {
      this.picMasterVisible = true;
    },
    submitPicForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("pass");
          // this.$router.push({
          //   name: "personalCenter",
          // });
        }
      });
    },
    getGroup() {
      // 获取组列表
      var odata = {
        name: this.searchVal,
      };
      queryGroup(odata).then((res) => {
        if (res.data.code == 200) {
          this.groupList = res.data.data;
        }
      });
    },
    searchGroup() {
      // 组查询
      this.getGroup();
    },
    addGroup() {
      if (this.mygroup) {
        addGroup(this.mygroup).then((res) => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "操作成功!",
            });
            this.mygroup = "";
            this.getGroup();
          }
        });
      } else {
        this.$message.warning("请输入需要添加的分组");
      }

      console.log(this.groupList);
    },
    inputBlur(obj) {
      // input 失去焦点保存
      // console.log(id)
      updateGroup(obj).then((res) => {
        if (res.data.code == "200") {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.getGroup();
        }
      });
    },
    delGroup(index) {
      // 删除分组
      this.delList.push(this.groupList[index]);
      this.groupList.splice(index, 1);

      this.mygroupId = "";

      // deleteGroup(){

      // }
    },
    handlePicRemove() {},
    beforePicUpload() {},
    editCancle() {
      // 取消保存
      this.$router.push({
        name: "personalCenter",
      });
    },
    save() {
      //保存
    },
  },
};
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  height: 40px;
  line-height: 30px;
  font-size: 14px;
}
.wrap {
  width: 100%;
  height: 100%;
  margin-top: 10px;
  background: #fff;
  overflow-y: scroll;
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
      margin: 10px 0 10px;
      .item {
        display: inline-block;
        padding: 0 10px 0 0;
        line-height: 40px;
        width: 200px;
        margin: 0 20px 10px 0;
        position: relative;
        .del {
          font-size: 20px;
          color: #f00;
          position: absolute;
          right: -10px;
          top: 10px;
          cursor: pointer;
        }
      }
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