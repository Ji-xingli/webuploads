<template>
  <div class="wrap">
    <div class="manage_box">
      <div class="block_title">
        <el-row :gutter="20" class="title_box">
          <el-col :span="6">
            <div class="title">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/programManage' }"
                  >节目管理</el-breadcrumb-item
                >
                <el-breadcrumb-item>编辑节目单</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </el-col>
          <el-col :span="12" :offset="6">
            <div class="search">
              <el-dropdown>
                <el-button type="primary" size="medium">
                  选择添加内容<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-if="areaType != 'D'"
                    @click.native="handleAddSel(1)"
                    >添加视频</el-dropdown-item
                  >
                  <el-dropdown-item
                    v-if="areaType != 'D'"
                    @click.native="handleAddSel(2)"
                    >添加图片</el-dropdown-item
                  >
                  <el-dropdown-item
                    v-if="areaType == 'D'"
                    @click.native="handleAddSel(3)"
                    >添加文字</el-dropdown-item
                  >
                  <el-dropdown-item
                    v-if="areaType != 'D'"
                    @click.native="handleLiveBroadcast"
                    >插入直播</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
              <el-input
                placeholder="请输入名称搜索"
                prefix-icon="el-icon-search"
                v-model="searchVal"
                clearable
              >
                <el-button slot="append" icon="el-icon-search"></el-button
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div class="top_label">
              <span class="label">播放形式</span>
              <el-radio-group v-model="isLoop">
                <el-radio :label="1">循环播放</el-radio>
                <el-radio :label="0">不重复播放</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col>
            <div class="top_label">
              <span class="label">播放起始时间</span>
              <el-date-picker
                format="HH:mm"
                value-format="HH:mm"
                v-model="playStartEnd"
                placeholder="请选择开始时间"
                type="datetime"
              >
                <!-- range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期" -->
              </el-date-picker>
              <el-button type="primary" v-if="liveBroadcast"
                >停止播放</el-button
              >
            </div>
          </el-col>
        </el-row>
        <div class="row_box">
          <dl
            class="dl flip-list-move"
            v-for="(item, index) in listData"
            :key="index"
          >
            <dt>
              <div class="img">
                <img
                  v-if="item.materialType == 0"
                  src="@/assets/img/media/01.png"
                  alt
                />
                <img
                  v-if="item.materialType == 1"
                  :src="item.materialUrl"
                  alt
                />
                <img
                  v-if="item.materialType == 2"
                  src="@/assets/img/media/03.png"
                  alt
                />
              </div>
              <div class="text">
                <p class="play_title">
                  <span v-if="item.materialType != 0">设置播放时长：</span>
                  <el-popover
                    :ref="'refNamePopover' + item.materialId"
                    placement="left"
                    trigger="click"
                  >
                    <ul class="layer_box" v-if="listData">
                      <li
                        v-for="(i, ind) in eidtLayerList"
                        :key="ind"
                        @click="swapItems(i.id, index, item.materialId)"
                      >
                        <span
                          :class="{
                            box_hidden:
                              (index == 0 && ind == 0) ||
                              (index == 0 && ind == 1),
                            box_hidden1:
                              (index == listData.length - 1 && ind == 2) ||
                              (index == listData.length - 1 && ind == 3),
                          }"
                          >{{ i.name }}</span
                        >
                      </li>
                    </ul>
                    <span
                      slot="reference"
                      class="setting el-icon-setting"
                    ></span>
                  </el-popover>
                </p>
                <div class="play_times" v-if="item.materialType != 0">
                  <!-- <el-input
                    :readonly="readonly"
                    v-model="item.houre"
                    placeholder="时"
                  ></el-input
                  >:
                  <el-input
                    :readonly="readonly"
                    v-model="item.minute"
                    placeholder="分"
                  ></el-input
                  >: -->
                  <el-input
                    :readonly="readonly"
                    v-model="item.materialTotalTime"
                    placeholder="秒"
                  ></el-input>
                </div>
              </div>
            </dt>
            <dd class="total_times">
              <span class="a_title">{{ item.materialTitle }}</span>
              <span v-if="item.materialType == 0"
                >总设时长：{{ item.materialTotalTime }}</span
              >
            </dd>
            <dd class="dd">
              <textarea
                class="textarea"
                maxlength="100"
                v-model="item.materialBrief"
              ></textarea>
            </dd>
          </dl>
          <div class="no_list" v-if="listData.length == 0">暂无数据</div>
        </div>
      </div>
      <!-- 点击加载更多 -->
      <div class="load_more" v-if="currentPage < totalPage" @click="loadMore">
        点击加载更多
      </div>
      <div class="bottom_btn" v-if="listData.length != 0" > 
        <el-button type="primary" @click="gotoSel">完成</el-button>
        <el-button @click="goBack">取消</el-button>
      </div>
    </div>

    <!-- 插入直播 -->
    <el-dialog title="插入直播" :visible.sync="dialogTableVisible">
      <el-form ref="form1" :model="form" label-width="120px">
        <el-form-item label="直播链接">
          <el-input v-model="form.url" placeholder="请输入直播链接"></el-input>
        </el-form-item>
        <el-form-item label="播放起始时间">
          <el-input v-model="form.startTimes" type="number" placeholder="请输入播放起始时间"></el-input>
        </el-form-item>
        <div class="bottom_btn" v-if="listData.length != 0" style="text-align:center;">
          <el-button @click.native="handleLiveBroadcast">取消</el-button>
          <el-button type="primary" @click="liveSure">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryProgramList, //查询节目
  updateBroadcastStatus,
  updateProgram, //保存
} from "@/api/program/index.js";
export default {
  data() {
    return {
      form:{
        url:"",
        startTimes:""
      },
      dialogTableVisible:false,//直播弹窗
      areaType: this.$route.query.areaType, //编辑的区域 A,B,C,D
      modelId: this.$route.query.modelId, //模板
      programId: this.$route.query.programId, //当前编辑的节目组
      currentPage: 1, //-分页
      pageSize: 10, //-分页
      totalNo: 0, //-分页,总条数
      totalPage: 0, //分页-总页数
      isPopover: true, //弹出窗显示隐藏
      isLoop: 1, //设置是否循环播放  1:循环   0：非循环
      playStartEnd: "", //播放起始时间设置
      eidtLayerList: [
        {
          id: "1",
          name: "置于顶层",
        },
        {
          id: "2",
          name: "向上一层",
        },
        {
          id: "3",
          name: "向下一层",
        },
        {
          id: "4",
          name: "置于底层",
        },
        {
          id: "5",
          name: "删除",
        },
      ],
      addSel: "", //选择添加的内容
      searchVal: "",
      i_hour: "",
      i_minute: "",
      i_second: "",
      readonly: false,
      liveBroadcast: "", //直播内容/判断是否可以插入直播，有内容：无法插入   无内容：可以插入直播
      listData: [], //列表
      pickerBeginDateBefore: {
        //今日以前的日期都不能选择
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果当天可选，就不用减8.64e7
        },
      },
    };
  },
  mounted() {
    console.log("area", this.areaType);
    // 获取编辑组的列表
    this.getList(this.currentPage, this.pageSize);
    // 查询模板状态
    this.getStatus();
  },
  methods: {
    handleLiveBroadcast() {
      this.dialogTableVisible=!this.dialogTableVisible;
    },
    liveSure(){
      console.log(this.form.url)
      // 插入直播确定
      if(this.form.url==""|| typeof this.form.url=="undefined"){
        this.$message.warning("请输入播放地址");
        return false;
      }else if(this.form.startTimes==""||typeof this.form.startTimes=="undefined"){
        this.$message.warning("请输入播放起始时间");
        return false;
      }else{
        this.dialogTableVisible=false
        this.$message.success("操作成功");
      }
    },
    getStatus() {
      updateBroadcastStatus(this.programId).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data) {
            this.liveBroadcast = res.data.data;
          }
        }
      });
    },
    loadMore() {
      // 点击加载更多
      this.currentPage += 1; //页数++
      //请求数据
      this.getList(this.currentPage, this.pageSize);
    },
    getList(pageNo, pageSize) {
      // 编辑前调用--获取分组列表
      this.currentPage = pageNo;
      var odata = {
        pageNum: pageNo,
        pageSize: pageSize,
        groupId: this.$store.state.groupId,
        modelId: this.modelId,
        partionId: this.areaType, //编辑区域
        title: this.searchVal,
      };
      queryProgramList(odata)
        .then((res) => {
          if (res.data.code == 200) {
            this.listData = res.data.data.programList;
            this.totalNo = res.data.data.programTotal;
            //总页数
            this.totalPage = Math.ceil(this.totalNo / this.pageSize);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          //   this.$message.error(err.head.msg);
          console.log(err);
        });
    },
    swapItems(id, index, fid) {
      //移动操作操作 id:1 置顶  4:置地 对应相应的操作id
      //    todo  index:对应列表数组的index 用于数组移位
      // ! fid :用于操作 popover弹窗显示隐藏
      let refName = "refNamePopover" + fid;
      this.$refs[refName][0].doClose();
      if (id == 1) {
        //置顶
        this.listData.unshift(this.listData[index]);
        this.listData.splice(index + 1, 1);
        return this.listData;
      }
      if (id == 4) {
        //置底
        this.listData.push(this.listData[index]);
        this.listData.splice(index, 1);
        return this.listData;
      }
      if (id == 5) {
        //删除
        this.itemRemove(index);
        return false;
      }

      if (id == 2) {
        // 上移动
        this.listData[index] = this.listData.splice(
          index - 1,
          1,
          this.listData[index]
        )[0];
      }

      if (id == 3) {
        // 下移动
        this.listData[index] = this.listData.splice(
          index + 1,
          1,
          this.listData[index]
        )[0];
      }
      this.$message.success("操作成功");
      return this.listData;
    },
    itemRemove(index) {
      this.$confirm("确认删除？")
        .then((res) => {
          this.listData.splice(index, 1);
        })
        .catch((err) => {
          //   console.log(err)
        });
    },
    gotoSel() {
      //完成--去保存
      // this.$router.push({
      //   name: "programManage",
      // });
      var selArr = [];
      //处理选中的列表
      this.listData.forEach((item) => {
        // !1：视频  2：图片  3：文字
        if (this.type != 1) {
          selArr.push({
            materialId: item.materialId,
            totalTime: item.second,
          });
        } else {
          selArr.push({
            materialId: item.materialId,
            totalTime: item.materialTotalTime,
          });
        }
      });

      var odata = {
        program: {
          modelId: Number(this.modelId),
          programBroadcast: "",
          programBroastStartTime: this.form.startTimes,
          programBroastStatus: "",
          programBroastUrl: this.form.url,
          programCreateTime: "",
          programGroupId: Number(this.$store.state.groupId),
          programId: Number(this.programId),
          programType: this.isLoop, //是否循环
          programStartTime: this.playStartEnd,
          programUpdateTime: "",
        },
        programMaterialList: selArr,
        programPartition: "A",
      };
      console.log(selArr);
      console.log(odata);
      // return false;
      updateProgram(odata).then((res) => {
        if (res.data.code == 200) {
          this.$router.push({
            name: "programManage",
          });
        }
      });
    },
    goBack() {
      //返回上-层
      this.$router.push({
        name: "programManage",
      });
    },
    handleAddSel(type) {
      // todo type:1 添加视频   2：添加内容
      if (this.playStartEnd == "") {
        this.$message.warning("请选择播放起始时间");
        return false;
      }
      // 跳转至添加
      this.$router.push({
        name: "addProgram",
        query: {
          type: type,
          programId: this.programId,
          modelId: this.$route.query.modelId,
          startTimes: this.playStartEnd,
          areaType: this.areaType,
          // programPartition
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-popover {
  padding: 0 !important;
}
.flip-list-move {
  animation: bounce-in 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.layer_box {
  line-height: 30px;
  li {
    font-size: 12px;
    &:hover {
      background: pink;
      cursor: pointer;
      color: #f00;
    }
  }
  .box_hidden {
    display: none;
  }
  .box_hidden1 {
    display: none;
  }
}
.wrap {
  width: 100%;
  height: 100%;
  margin-top: 10px;
  background: #f1f1f1;
  overflow: hidden;

  .no_template {
    width: 300px;
    margin: 40px auto 0;
    font-size: 16px;
    text-align: center;
    display: none;
    dd {
      line-height: 40px;
    }
  }
  .manage_box {
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    .block_title {
      padding: 10px;
      .title_box {
        .title {
          font-size: 14px;
          padding-left: 10px;
          line-height: 40px;
          padding-top: 10px;
        }
        .search {
          display: flex;
          justify-content: space-between;
        }
      }
      .row_box {
        width: 100%;
        overflow: hidden;
        margin-top: 10px;
        display: flex;
        flex-flow: row wrap;
        .dl {
          // width: calc((100% - 60px)/4);
          width: 22.8%;
          margin-right: 10px;
          background: #fff;
          min-height: 280px;
          overflow: hidden;
          padding: 10px;
          margin-bottom: 10px;
          &:nth-child(4n) {
            margin-right: 0;
          }
          dt {
            display: flex;
            justify-content: space-between;
            .img {
              width: 150px !important;
              height: 80px;
              margin-right: 10px;
              img {
                width: 100%;
                height: 100%;
                display: block;
              }
            }
            .text {
              flex: 1;
              overflow: hidden;
              .play_title {
                line-height: 40px;
                display: flex;
                justify-content: space-between;
                .setting {
                  font-size: 20px;
                }
              }
              .play_times {
                display: flex;
                align-items: center;
              }
            }
          }
          .total_times {
            display: flex;
            justify-content: space-between;
            line-height: 30px;
            text-align: right;
            margin-top: 10px;
            .a_title {
              width: 55%;
              height: 30px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              text-align: left;
            }
          }
          .dd {
            margin-top: 10px;
            font-size: 14px;
            height: 100%;
            line-height: 25px;
            .textarea {
              width: 100%;
              min-height: 175px;
              resize: none;
              border: 0;
              line-height: 25px;
              font-size: 14px;
              outline-color: pink;
            }
          }
        }
        .no_list {
          font-size: 18px;
          text-align: center;
          line-height: 200px;
          width: 100%;
          color: palevioletred;
        }
      }
      .top_label {
        .label {
          line-height: 40px;
          display: inline-block;
          width: 150px;
          font-size: 14px;
        }
        .t_input {
          width: 100px;
        }
      }
    }
    .right {
      background: #fff;
      overflow: hidden;
      margin-top: 10px;
      padding: 10px;
      .date_title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        overflow: hidden;
        .ul {
          display: flex;
          white-space: nowrap;
          overflow-x: scroll;
          overflow-y: hidden;
          li {
            padding: 6px;
          }
        }
        .button {
          margin-left: 10px;
        }
      }
      .data_list {
        margin-top: 10px;
        .item {
          display: flex;
          justify-content: space-between;
          height: 40px;
          align-items: center;
          .icon {
            width: 40px;
            font-size: 30px;
          }
          .item_text {
            margin-left: 10px;
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .load_more {
      line-height: 100px;
      text-align: center;
      font-size: 18px;
      color: #999;
    }
    .bottom_btn {
      text-align: center;
      padding: 20px 0 30px;
    }
  }
}
</style>