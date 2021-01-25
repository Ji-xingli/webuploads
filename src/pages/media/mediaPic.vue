<template>
  <div class="video_content">
    <div class="upload_video">
      <el-row>
        <el-col :span="4"
          ><el-button
            type="primary"
            @click.native="editRow()"
            size="medium"
            icon="el-icon-upload2"
            >上传图片</el-button
          ></el-col
        >
        <el-col :span="10">
          <el-input
            placeholder="搜索名称"
            v-model="searchVal"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <!-- 列表 -->
    <el-table :data="tableData" style="width: 100%" max-height="500">
      <el-table-column fixed prop="materialUrl" label="图片" width="230">
        <template slot-scope="scope">
          　<img
            :src="scope.row.materialUrl"
            class="head_pic"
          />
        </template>
      </el-table-column>
      <el-table-column prop="materialTitle" label="内容">
        <template slot-scope="scope">
          <dl>
            <dt class="title">{{ scope.row.materialTitle }}</dt>
            <dd>{{ scope.row.materialBrief }}</dd>
          </dl>
        </template>
      </el-table-column>
      <el-table-column prop="materialCreateTime" label="时间" width="180">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native="editRow(scope.$index, scope.row)"
            type="text"
            size="small"
          >
            编辑
          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, scope.row)"
            type="text"
            size="small"
            style="color: #f00"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next,jumper"
      @prev-click="getPrev"
      @next-click="getNext"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      :total="totalNo"
    ></el-pagination>
    <el-drawer
      title="图片"
      :visible.sync="videoEditMaster"
      :before-close="visibleBefore"
      direction="rtl"
      size="50%"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="图片标题" prop="materialTitle">
          <el-input v-model="form.materialTitle"></el-input>
        </el-form-item>
        <el-form-item label="图片介绍" prop="materialBrief">
          <el-input
            type="textarea"
            maxlength="100"
            v-model="form.materialBrief"
          ></el-input>
        </el-form-item>
        <el-form-item label="上传图片" v-if="otype == 'add'">
          <el-upload
            class="video-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :auto-upload="false"
            :limit="1"
            :file-list="fileList"
            :on-change="beforeUpload"
            list-type="picture-card"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import { getPList, upLoad, upDate, getRemove } from "@/api/media/mediaPic.js";
import { getEditBefore } from "@/api/media/index.js";
export default {
  data() {
    return {
      otype: "", //! 新增or上传   otype:add/edit
      form: {},
      rules: {
        materialTitle: [
          { required: true, message: "请输入图片标题", trigger: "blur" },
        ],
        materialBrief: [
          { required: true, message: "请输入图片简介", trigger: "change" },
        ],
        img: [{ required: true, message: "请选择上传图片", trigger: "change" }],
      },
      videoUrl: "", //上传视频显示地址
      videoUploadPercent: 0, //进度条
      videoEditMaster: false,
      searchVal: "", //搜索
      fileList: [], //上传列表
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalNo: 0,
      loading: true,
    };
  },
  mounted() {
    this.getList(this.currentPage, this.pageSize);
  },
  methods: {
    visibleBefore() {
      //   遮罩关闭前
      this.fileList = [];
      this.videoEditMaster = false;
    },
    videoSearch() {
      this.getList(1, this.pageSize);
    },
    //分页
    //点击上一页获取数据
    getPrev(val) {
      this.getList(val, this.pageSize);
    },
    //点击下一页获取数据
    getNext(val) {
      this.getList(val, this.pageSize);
    },
    //点击页数直接获取数据
    getCurrent(val) {
      this.currentPage = val;
      this.getList(val, this.pageSize);
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList(val, this.pageSize);
    },
    getList(pageNo, pageSize) {
      //获取列表
      this.currentPage = pageNo;
      var odata = {
        pageNum: pageNo,
        pageSize: pageSize,
        title: this.searchVal,
      };
      getPList(odata)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.totalNo = res.data.data.total;
            // 顶部总数
            this.$emit('getTopTotal')
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          //   this.$message.error(err.head.msg);
          console.log(err);
        });
    },
    editRow(index, row) {
      if (index || row) {
        this.otype = "edit";
        //获取编辑信息
        this.beforeEdit(row.materialId);
      } else {
        this.otype = "add";
        this.form = {};
      }
      //   行编辑
      this.videoEditMaster = true;
    },
    beforeEdit(id) {
      getEditBefore(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.data;
          console.log("form", this.form);
        }
      });
    },
    beforeUpload(file, fileList) {
      console.log(file);
      console.log(fileList)
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
        this.fileList = fileList;
        return true;
      }
    },
    getVideoMsg(file) {
      //获取视频信息
      return new Promise((resolve) => {
        let videoElement = document.createElement("video");
        videoElement.src = URL.createObjectURL(file);
        videoElement.addEventListener("loadedmetadata", function () {
          resolve({
            duration: videoElement.duration,
            height: videoElement.videoHeight,
            width: videoElement.videoWidth,
          });
        });
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.otype == "add") {
            if (this.fileList.length == 0) {
              this.$message.error("请上传视频");
              return false;
            }
            //添加上传
            let formData = new FormData(); //  用FormData存放上传文件
            formData.append("file", this.fileList[0].raw);
            formData.append("materialBrief", this.form.materialBrief);
            formData.append("materialTitle", this.form.materialTitle);
            formData.append("materialTotalTime", this.duration);
            upLoad(formData).then(
              (res) => {
                if (res.data.code == 200) {
                  this.$message({
                    type: "success",
                    message: "上传成功!",
                  });
                  // 刷新列表
                  this.getList(this.currentPage, this.pageSize);
                  // 弹窗消失
                  this.videoEditMaster = false;
                  //重置表单
                  this.fileList =[]
                }
              },
              (err) => {
                this.$message({
                  type: "error",
                  message: "操作失败!",
                });
              }
            );
          } else {
            let formData = new FormData(); //  用FormData存放上传文件
            formData.append("imageId", this.form.materialId);
            formData.append("file", "");
            formData.append("materialBrief", this.form.materialBrief);
            formData.append("materialTitle", this.form.materialTitle);
            formData.append("materialTotalTime", "");
            upDate(formData).then(
              (res) => {
                if (res.data.code == 200) {
                  this.$message({
                    type: "success",
                    message: "上传成功!",
                  });
                  // 刷新上传文件列表
                  this.getList(this.currentPage, this.pageSize);
                  // 弹窗消失
                  this.videoEditMaster = false;
                  this.fileList =[]
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    deleteRow(index, row) {
      this.$confirm("确认删除？")
        .then((res) => {
          getRemove(row.materialId).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              // 刷新列表
              this.getList(this.currentPage, this.pageSize);
            }
          });
        })
        .catch((err) => {
          //   console.log(err)
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.video_content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .head_pic{
      width:184px;
      height:104px;
  }
}
.title {
  font-weight: bold;
  font-size: 14px;
}
.desc {
  font-size: 12px;
  color: #999;
}
.up_video_box {
  width: 200px;
  height: 100px;
  margin-top: 10px;
  position: relative;
  .videoClass {
    width: 100%;
    height: 100%;
  }
  .remove {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 4;
    font-size: 30px;
    color: #fff;
    cursor: pointer;
  }
}
</style>