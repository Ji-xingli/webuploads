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
        <el-form-item label="我的头像">
          <el-upload
            class="headPic headImg"
            action="api/blade-project/project/projectfiles/uploadFiles"
            :auto-upload="false"
            :limit="1"
            list-type="picture-card"
            :file-list="fileList"
            accept=".jpg,.png,.jpeg,JPG,JPEG"
            :on-change="beforePicUpload"
            :on-remove="handlePicRemove"
          >
            <!-- v-model="form.userLogoUrl"
             :show-file-list="false"
            :file-list="dialogImageUrlArray" -->
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="userPhone">
          <el-input v-model="form.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="当前密码" prop="userPassword">
          <el-input v-model="form.userPassword"></el-input>
        </el-form-item>
        <el-form-item label="设备软件包" prop="userDeviceVersion">
          <div @click="changePack">
            <span>{{ form.userDeviceVersion }}</span>
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
                v-if="item.group.groupId!=999"
              >
                <template slot="append">({{ item.total }})</template>
              </el-input>
              <el-input
                v-model="item.group.groupName"
                readonly="readonly"
                v-else
              >
                <template slot="append">({{ item.total }})</template>
              </el-input>
              <span
                class="del el-icon-remove"
                @click="delGroup(item.group.groupId)"
                v-if="item.group.groupId!=999"
              ></span>
            </div>
          </div>
          <el-form-item>
            <el-button @click="editCancle(2)">取消</el-button>
            <el-button type="primary" @click="submitPicForm('form')"
              >确定</el-button
            >
          </el-form-item>
        </el-form-item>
      </el-form>
      <!-- 设备软件包弹窗 -->
      <el-drawer
        title="上传软件包"
        :visible.sync="picMasterVisible"
        direction="rtl"
        :before-close="beforeCloseDrawer"
        :wrapperClosable="false"
        size="50%"
      >
        <el-form
          ref="form_device"
          class="formclass deviceClass"
          :model="form"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="软件版本号" prop="userDeviceVersion">
            <el-input v-model="form.userDeviceVersion"></el-input>
          </el-form-item>
          <el-form-item label="选择软件包" prop="userDeviceUrl">
            <el-upload
              class="headPic"
              action="sqfc/user/updateDevice"
              :auto-upload="false"
              :limit="1"
              :file-list="fileDeviceList"
              :on-change="beforeDeviceUpload"
              :on-remove="handleDeviceRemove"
            >
              <!-- :file-list="fileDeviceList" -->
              <!-- <i class="el-icon-plus"></i> -->
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button @click="editCancle(1)">取消</el-button>
            <el-button type="primary" @click="save('form_device')"
              >保存</el-button
            >
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
  deleteGroup,
  getUserInfo, //个人中心信息
  userInfoUpdate, //信息更新
  updateDevice, //更新上传软件包
} from "@/api/personalCenter/index.js";
export default {
  data() {
    return {
      fileList: [], //头像回显
      file: {}, //上传头像的文件
      fileDevice: {}, //上传设备的文件
      fileDeviceList: [], //设备软件包回显
      picMasterVisible: false, //是否编辑
      groupList: [],
      delList: [], //删除的组列表
      mygroup: "", //添加的分组名称
      searchVal: "", //搜索分组
      form: {},
      rules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],

        userPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          // { validator: idcard, trigger: 'blur' },
          {
            pattern: /^1(3|4|5|6|7|8)\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
          // { max:11, message: '请输入11位手机号码', trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        userDeviceVersion: [
          { required: true, message: "请输入软件版本号", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // 获取用户信息
    this.getInfo();
    // 获取组信息
    this.getGroup();
  },
  methods: {
    getInfo() {
      // 获取用户信息
      getUserInfo().then((res) => {
        if (res.data.code == "200") {
          this.form = res.data.data;
          //头像回显
          this.fileList = [{ url: this.form.userLogoUrl }];
          // this.fileDeviceList = [
          //   {
          //     name: "软件包" + this.form.userDeviceVersion,
          //     url: this.form.userDeviceUrl,
          //   },
          // ];
        }
      });
    },
    changePack() {
      this.picMasterVisible = true;
    },
    submitPicForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form.userLogoUrl);
          if (this.form.userLogoUrl == "") {
            this.$message({
              type: "error",
              message: "请选择头像!",
            });
            return false;
          }

          // 更新提交
          let formData = new FormData(); //  用FormData存放上传文件
          if (this.file) {
            formData.append("file", this.file.raw);
          } else {
            formData.append("file", this.form.userLogoUrl);
          }
          // 版本
          formData.append("userDeviceVersion", this.form.userDeviceVersion);
          formData.append("userName", this.form.userName);
          formData.append("userPassword", this.form.userPassword);
          formData.append("userPhone", this.form.userPhone);
          userInfoUpdate(formData).then(
            (res) => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "保存成功!",
                });
                // 跳转到个人中心
                this.$router.push({
                  name: "personalCenter",
                });
              }
            },
            (err) => {
              this.$message({
                type: "error",
                message: "操作失败!",
              });
            }
          );
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
          this.$store.commit("setGroupLen", res.data.data.length);
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
            //! 添加或删除、修改后默认总组- 默认选择总组
            this.$store.commit("setGroupId", 999);
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
      var odata = {
        groupId: obj.groupId,
        name: obj.groupName,
      };
      updateGroup(odata).then((res) => {
        if (res.data.code == "200") {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.getGroup();
          //! 添加或删除、修改后默认总组- 默认选择总组
          this.$store.commit("setGroupId", 999);
        }
      });
    },
    delGroup(id) {
      // 删除分组
      // this.delList.push(this.groupList[index]);
      // this.groupList.splice(index, 1);

      // this.mygroupId = "";
      this.$confirm("删除分组后，分组中的所有站点也将删除！确认删除？")
        .then((res) => {
          deleteGroup(id).then((r) => {
            if (r.data.code == "200") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              //! 添加或删除、修改后默认总组- 默认选择总组
              this.$store.commit("setGroupId", 999);
              this.getGroup();
            }
          });
        })
        .catch((err) => {
          //   console.log(err)
        });
    },
    handlePicRemove() {
      // 头像删除
      this.form.userLogoUrl = "";
      this.file = {};
    },
    beforePicUpload(file, fileList) {
      const IMG_ALLOWD = ["jpeg", "jpg", "gif", "png"];
      const imgType = file.raw.type.split("/")[1];
      const imgSize = file.size / 1024 / 1024;
      if (IMG_ALLOWD.indexOf(imgType) === -1) {
        this.$message.warning("上传图片格式错误");
        //不匹配不展示
        fileList.splice(-1, 1);
        return false;
      } else if (imgSize >= 400) {
        // 判断图片大小
        this.$message.warning("图片大小大于5M");
        //不匹配不展示
        fileList.splice(-1, 1);
        return false;
      } else {
        console.log("file", file);
        this.form.userLogoUrl = file.url;
        this.file = file;
        console.log(file);
        return true;
      }
    },
    beforeDeviceUpload(file, fileList) {
      this.form.userDeviceUrl = file.url;
      this.fileDevice = file;
      console.log(this.fileDevice);
      return true;
    },
    handleDeviceRemove() {
      // 软件包删除
      this.form.userDeviceUrl = "";
      this.fileDevice = {};
      
    },
    beforeCloseDrawer(){
      // 软件包删除
        this.form.userDeviceUrl = "";
        this.fileDevice = {};
        this.picMasterVisible = false;
        this.fileDeviceList=[]
    },
    editCancle(flg) {
      // 取消保存
      if (flg == 1) {
        
        
        this.picMasterVisible = false;
        // 软件包删除
        this.form.userDeviceUrl = "";
        this.fileDevice = {};
        this.fileDeviceList=[]


      } else {
        this.$router.push({
          name: "personalCenter",
        });
      }
    },
    save(formName) {
      //设备软件包--保存
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.userDeviceUrl == "") {
            this.$message({
              type: "error",
              message: "请上传设备软件包!",
            });
            return false;
          }

          let formData = new FormData(); //  用FormData存放上传文件
          if (this.fileDevice) {
            formData.append("file", this.fileDevice.raw);
          } else {
            formData.append("file", this.form.userDeviceUrl);
          }
          // 版本
          formData.append("userDeviceVersion", this.form.userDeviceVersion);
          formData.append("userName", this.form.userName);
          formData.append("userPassword", this.form.userPassword);
          formData.append("userPhone", this.form.userPhone);
          updateDevice(formData)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "更新成功!",
                });
                //刷新个人信息
                this.getInfo();
                // 隐藏弹窗
                this.picMasterVisible = false;

                // 软件包删除
                this.form.userDeviceUrl = "";
                this.fileDevice = {};

              }
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: "操作失败!",
              });
            });
        }
      });
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
  .headImg {
    width: 500px;
    // height:1rem;
    img {
      width: 148px;
      height: 148px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .oImg {
    width: 148px;
    height: 148px;
  }
  .deviceClass {
    /deep/.el-upload-list__item-name {
      width: 200px;
    }
  }
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