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
            >上传文本</el-button
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
              @click="goSearch"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <!-- 列表 -->
    <el-table :data="tableData" style="width: 100%" :height="screenHeight">
      <el-table-column fixed prop="img" label="图片" width="230">
        <template slot-scope="scope">
          <img
            src="@/assets/img/media/03.png"
            class="head_pic"
          />
          　　</template
        >
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
      title="文本"
      :visible.sync="videoEditMaster"
      direction="rtl"
      size="50%"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="文本标题" prop="materialTitle">
          <el-input v-model="form.materialTitle"></el-input>
        </el-form-item>
        <el-form-item label="文本简介" prop="materialBrief">
          <el-input
            type="textarea"
            maxlength="100"
            v-model="form.materialBrief"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import { getList, upLoad, upDate, getRemove } from "@/api/media/mediaText.js";
import { getEditBefore } from "@/api/media/index.js";
export default {
  data() {
    return {
      screenHeight: `${document.documentElement.clientHeight}` - 242,
      otype: "", //! 新增or上传   otype:add/edit
      form: {},
      rules: {
        materialTitle: [
          { required: true, message: "请输入文本标题", trigger: "blur" },
        ],
        materialBrief: [
          { required: true, message: "请输入文本简介", trigger: "change" },
        ],
      },
      videoEditMaster: false,
      searchVal: "", //搜索
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
    goSearch() {
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
      getList(odata)
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
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.otype == "add") {
            var odata = {
              content: this.form.materialBrief,
              title: this.form.materialTitle,
            };
            //添加
            upLoad(odata).then(
              (res) => {
                if (res.data.code == 200) {
                  this.$message({
                    type: "success",
                    message: "保存成功!",
                  });
                  // 刷新列表
                  this.getList(this.currentPage, this.pageSize);
                  // 弹窗消失
                  this.videoEditMaster = false;
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
            var odata = {
              content: this.form.materialBrief,
              title: this.form.materialTitle,
              textId: this.form.materialId,
            };
            upDate(odata).then(
              (res) => {
                if (res.data.code == 200) {
                  this.$message({
                    type: "success",
                    message: "保存成功!",
                  });
                  // 刷新上传文件列表
                  this.getList(this.currentPage, this.pageSize);
                  // 弹窗消失
                  this.videoEditMaster = false;
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