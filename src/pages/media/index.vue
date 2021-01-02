<template>
  <div class="wrap">
    <div class="contents">
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane :label="videoTotal" name="video">
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
                  class="input-with-select"
                >
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-col>
            </el-row>
          </div>
          <!-- 列表 -->
          <el-table :data="tableData" style="width: 100%" max-height="250">
            <el-table-column fixed prop="img" label="图片" width="150">
              <template slot-scope="scope">
                　　　　<img
                  :src="scope.row.img"
                  min-width="70"
                  height="40"
                  class="head_pic"
                />
                　　</template
              >
            </el-table-column>
            <el-table-column prop="desc" label="描述"> </el-table-column>
            <el-table-column prop="upTime" label="时间" width="120">
            </el-table-column>
            <el-table-column prop="totalTimes" label="总时长" width="120">
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
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- @size-change="handleSizeChange"
            @current-change="handleCurrentChange" -->
          <el-pagination
            background
            :current-page="currentPage"
            :page-sizes="[5, 10, 15]"
            :page-size="pagesize"
            layout="total,jumper,prev, pager, next,sizes"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
        <!-- 图片上传 -->
        <el-tab-pane :label="picTotal" name="pic">
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
          <el-table :data="tableData" style="width: 100%" max-height="250">
            <el-table-column fixed prop="img" label="图片" width="150">
              <template slot-scope="scope">
                　　　　<img
                  :src="scope.row.img"
                  min-width="70"
                  height="40"
                  class="head_pic"
                />
                　　</template
              >
            </el-table-column>
            <el-table-column prop="desc" label="描述"> </el-table-column>
            <el-table-column prop="upTime" label="时间" width="120">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  @click.native="editPicRow(scope.$index, scope.row)"
                  type="text"
                  size="small"
                >
                  编辑
                </el-button>
                <el-button
                  @click.native.prevent="deletePicRow(scope.$index, scope.row)"
                  type="text"
                  size="small"
                  style="color: #f00"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- @size-change="handleSizeChange"
            @current-change="handleCurrentChange" -->
          <el-pagination
            background
            :current-page="currentPage"
            :page-sizes="[5, 10, 15]"
            :page-size="pagesize"
            layout="total,jumper,prev, pager, next,sizes"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
      <el-drawer
        title="编辑"
        :visible.sync="videoEditMaster"
        direction="rtl"
        size="50%"
      >
        <el-form
          ref="form"
          :model="vidioform"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="vidioform.name"></el-input>
          </el-form-item>
          <el-form-item label="视频介绍" prop="desc">
            <el-input v-model="vidioform.desc"></el-input>
          </el-form-item>
          <el-form-item label="选择封面">
            <el-upload
              action="api/blade-project/project/projectfiles/uploadFiles"
              :auto-upload="false"
              :limit="1"
              list-type="picture-card"
              v-model="vidioform.pictureImg"
              :on-change="beforePicUpload"
              :on-remove="handlePicRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="选择视频文件">
            <el-upload
              class="video-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="false"
              :limit="1"
              v-model="vidioform.video"
              :on-change="beforeVideoUpload"
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
            <el-button type="primary" @click="submitForm('form')"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </el-drawer>
      <!-- 图片编辑 -->
      <el-drawer
        title="图片编辑"
        :visible.sync="picMasterVisible"
        direction="rtl"
        size="50%"
      >
        <el-form
          ref="picform"
          :model="picform"
          :rules="picrules"
          label-width="120px"
        >
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="picform.name"></el-input>
          </el-form-item>
          <el-form-item label="视频介绍" prop="desc">
            <el-input v-model="picform.desc"></el-input>
          </el-form-item>
          <el-form-item label="选择封面">
            <el-upload
              action="api/blade-project/project/projectfiles/uploadFiles"
              :auto-upload="false"
              :limit="1"
              list-type="picture-card"
              v-model="picform.pictureImg"
              :on-change="beforePicUpload"
              :on-remove="handlePicRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitPicForm('picform')"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      otype: "", //! 新增or上传   otype:add/edit
      vidioform: {},
      picform: {}, //上传图片绑定
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        desc: [
          { required: true, message: "请输入视频介绍", trigger: "change" },
        ],
        img: [{ required: true, message: "请选择封面", trigger: "change" }],
      },
      picrules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        desc: [
          { required: true, message: "请输入视频介绍", trigger: "change" },
        ],
        img: [{ required: true, message: "请选择封面", trigger: "change" }],
      },
      videoUrl: "", //上传视频显示地址
      videoUploadPercent: 0, //进度条
      videoEditMaster: false,
      picMasterVisible: false, //图片弹窗显示隐藏
      activeName: "video",
      searchVal: "", //搜索
      tableData: [
        {
          img:
            "https://a1.cdn.91360.com/cms/bs3/upload/section/31c9f4a94769e924b7ccd764c075b29a_t.png",
          desc:
            "上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄",
          upTime: "2016-05-02",
          totalTimes: "50分",
        },
        {
          img:
            "https://a1.cdn.91360.com/cms/bs3/upload/section/31c9f4a94769e924b7ccd764c075b29a_t.png",
          desc:
            "上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄",
          upTime: "2016-05-02",
          totalTimes: "50分",
        },
      ],
      currentPage: 1,
      pagesize: 10,
      total: 10,
      loading: true,
    };
  },
  computed: {
    videoTotal() {
      return `视频共（共${50}条）`;
    },
    picTotal() {
      return `视频共（共${50}条）`;
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitPicForm(formName) {
      //图片保存验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    beforePicUpload(file, fileList) {
      console.log(file);
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
        return true;
      }
    },
    handlePicRemove() {},
    beforeVideoUpload(file, fileList) {
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
        this.videoFile = fileList;

        //获取视频的长度
        console.log(file);
        //获取到视频的时长,高度,宽度
        this.getVideoMsg(file.raw).then((videoinfo) => {
          const { duration, height, width } = videoinfo;
          console.log(duration);
        });

        fileList.splice(-1, 1);
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
    uploadVideoProcess(event, file, fileList) {
      console.log("aa");
      console.log(event.percent, file, fileList);
      this.videoUploadPercent = file.percentage.toFixed(0);
    },
    videoRemove() {
      this.videoUrl = "";
    },
    editRow(index, row) {
      if (index && row) {
        this.otype = "edit";
      } else {
        this.otype = "add";
        this.vidioform = {};
      }
      //   行编辑
      this.videoEditMaster = true;
    },
    deleteRow(index, row) {
      this.$confirm("确认删除？")
        .then((res) => {})
        .catch((err) => {});
    },
    fileChange(file, fileList) {
      this.fileList = fileList;
      let formData = new FormData(); //  用FormData存放上传文件
      formData.append("otherFiles", file.raw);
      formData.append("type", 4);
      formData.append("typeId", this.aboutData.id);

      // 调用上传接口
      filesUpload(formData).then(
        (res) => {
          this.$message({
            type: "success",
            message: "上传成功!",
          });
          // 刷新上传文件列表
          this.getFileInfo();
        },
        (err) => {
          this.$message({
            type: "error",
            message: "操作失败!",
          });
        }
      );
    },
    editPicRow(index, row) {
      if (index && row) {
        this.oPictype = "edit";
      } else {
        this.oPictype = "add";
        this.picform = {};
      }
      //   行编辑
      this.picMasterVisible = true;
    },
    deletePicRow(index, row) {
      this.$confirm("确认删除？")
        .then((res) => {})
        .catch((err) => {});
    },
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  margin-top: 10px;
  background: #fff;
  overflow: hidden;
  .contents {
    padding: 20px;
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
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>