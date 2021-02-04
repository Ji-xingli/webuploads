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
            >上传视频</el-button
          ></el-col
        >
        <el-col :span="10">
          <el-input
            placeholder="搜索名称"
            v-model="searchVal"
            clearable
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="videoSearch"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <!-- 列表 -->
    <el-table :data="tableData" style="width: 100%" :height="screenHeight" v-loading="loading"  element-loading-text="正在努力加载中...">
      <el-table-column fixed prop="img" label="图片" width="230">
        <template slot-scope="scope">
          　　　　<img
            src="@/assets/img/media/01.png"
            class="head_pic"
          />
          　　</template
        >
      </el-table-column>
      <el-table-column prop="materialBrief" label="描述">
        <template slot-scope="scope">
          <dl>
            <dt class="title">{{ scope.row.materialTitle }}</dt>
            <dd>{{ scope.row.materialBrief }}</dd>
          </dl>
        </template>
      </el-table-column>
      <el-table-column prop="materialCreateTime" label="时间" width="180">
      </el-table-column>
      <el-table-column prop="materialTotalTime" label="总时长" width="120">
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
      title="视频"
      :visible.sync="videoEditMaster"
      :before-close="visibleBefore"
      :wrapperClosable="false"
      direction="rtl"
      size="50%"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="视频标题" prop="materialTitle">
          <el-input v-model="form.materialTitle"></el-input>
        </el-form-item>
        <el-form-item label="视频介绍" prop="materialBrief">
          <el-input
            type="textarea"
            maxlength="100"
            v-model="form.materialBrief"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择视频文件" v-if="otype == 'add'">
          <el-upload
            class="video-uploader"
            :action="ouploadUrl()"
            :auto-upload="false"
            :limit="1"
            v-model="form.video"
            v-if="!videoUrl"
            :on-change="beforeVideoUpload"
            :on-success="handleVideoSuccess"
            :on-progress="uploadVideoProcess"
            list-type="picture-card"
            accept=".mp4"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="up_video_box">
            <div class="remove" @click="videoRemove" v-if="videoUrl">
              <span class="el-icon-delete"></span>
            </div>
            <video
              v-if="videoUrl"
              :src="videoUrl"
              class="videoClass"
              controls="controls"
            >
              您的浏览器不支持视频播放
            </video>
            <!-- <el-progress
               
                type="circle"
                :percentage="videoUploadPercent"
                
                style="margin-top: 30px"
              ></el-progress> -->
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import {
  getVideoList,
  videoUpLoad,
  videoUpDate,
  getEditBefore,
  getRemove,
} from "@/api/media/index.js";
export default {
  data() {
    return {
      screenHeight: `${document.documentElement.clientHeight}` - 242,
      otype: "", //! 新增or上传   otype:add/edit
      form: {},
      rules: {
        materialTitle: [
          { required: true, message: "请输入视频标题", trigger: "blur" },
        ],
        materialBrief: [
          { required: true, message: "请输入视频简介", trigger: "change" },
        ],
        img: [{ required: true, message: "请选择封面", trigger: "change" }],
      },
      videoUrl: "", //上传视频显示地址
      videoUploadPercent: 0, //进度条
      videoEditMaster: false,
      searchVal: "", //搜索
      duration: "", //视频总时长
      fileList: [], //上传视频列表
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalNo: 0,
      loading: true,
    };
  },
  mounted() {
    const _this = this;
    window.onresize = function temp() {
      _this.screenHeight = `${document.documentElement.clientHeight}` - 242;
    };
    _this.getList(_this.currentPage, _this.pageSize);
  },
  methods: {
    ouploadUrl(){
      //上传地址
      return "http://118.31.122.133:9090/sqfc/material/uploadVideo";
    },
    visibleBefore() {
      //   遮罩关闭前
      this.videoUrl = "";
      this.fileList = [];
      this.duration = "";
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
      getVideoList(odata)
        .then((res) => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.totalNo = res.data.data.total;

            this.$emit("getTopTotal");

            //取消加载
            this.loading=false;
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
      console.log(row);
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
    beforeVideoUpload(file, fileList) {
      console.log("fileList",file)
      this.videoUploadPercent = 0;
      // 视频上传前校验
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
        ].indexOf(file.raw.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式");
        //不匹配不展示
        fileList.splice(-1, 1);
        return false;
      } else {
        this.videoUrl = file.url;
        this.fileList = file;

        //获取视频的长度
        //获取到视频的时长,高度,宽度
        this.getVideoMsg(file.raw).then((videoinfo) => {
          const { duration, height, width } = videoinfo;
          //视频总时长
          this.duration = Math.round(duration * 100) / 100;//保留两位小数
          console.log("视频时长：",this.duration)
        });

        //fileList.splice(-1, 1);
        return true;
      }
    },
    handleVideoSuccess(res,file){
      console.log(res)
      console.log("status",file.status)
    },
    uploadVideoProcess(event, file, fileList){
      console.log(event.percent)
      console.log("进度条",file.percentage)
      console.log(file.percentage.toFixed(0) * 1)
      console.log(fileList)
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
            formData.append("file", this.fileList.raw);
            formData.append("materialBrief", this.form.materialBrief);
            formData.append("materialTitle", this.form.materialTitle);
            formData.append("materialTotalTime", this.duration);
            videoUpLoad(formData).then(
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
                  //清空上传内容
                  this.fileList=[];
                  this.videoUrl="";
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
            formData.append("videoId", this.form.materialId);
            formData.append("file", "");
            formData.append("materialBrief", this.form.materialBrief);
            formData.append("materialTitle", this.form.materialTitle);
            formData.append("materialTotalTime", this.form.materialTotalTime);
            videoUpDate(formData).then(
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
                  //清空上传内容
                  this.fileList=[];
                  this.videoUrl="";
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
    videoRemove() {
      // 视频移除
      this.videoUrl = "";
      this.fileList = [];
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