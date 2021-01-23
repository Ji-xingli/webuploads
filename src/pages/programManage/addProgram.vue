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
                <el-breadcrumb-item>添加{{ types }}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </el-col>
          <el-col :span="12" :offset="6">
            <div class="search">
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
          <el-col :span="6" :offset="8">
            <div class="step">
              <el-steps :active="active" finish-status="success">
                <el-step></el-step>
                <el-step></el-step>
              </el-steps>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div class="top_label">
              <span class="label">{{ types }}({{ selNum }}/{{totalNo}})</span>
            </div>
          </el-col>
          <!-- <el-col>
            <div class="top_label">
              <span class="label">播放起始时间</span>
              <el-date-picker
                v-model="playStartEnd"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
              <el-button type="primary">停止播放</el-button>
            </div>
          </el-col> -->
        </el-row>
        <div class="row_box">
          <dl
            class="dl flip-list-move"
            v-for="(item, index) in listData"
            :key="index"
          >
            <dt>
              <div class="img">
                <img v-if="type==2"  :src="item.materialUrl" alt="">
                <img v-if="type==1" src="@/assets/img/media/01.png" alt />
                 <img v-if="type==3" src="@/assets/img/media/03.png" alt />
              </div>
              <div class="text">
                <div class="play_title">
                  <!-- <span v-if="type!=1">设置播放时长：</span> -->
                  <div
                    class="sel"
                    @click="itemChecked(index)"
                    :class="item.checked ? 'checked' : ''"
                  ></div>
                </div>
                <!-- <div class="play_times" v-if="item.materialType != 0">
                  <el-input v-model="item.hour" placeholder="时"></el-input>:
                  <el-input v-model="item.minute" placeholder="分"></el-input>:
                  <el-input v-model="item.second" placeholder="秒"></el-input>
                </div> -->
              </div>
            </dt>
            <dd class="total_times">
              <span class="a_title">{{ item.materialTitle }}</span>
              <span v-if="type==1">总时长：{{timeFormat(item.materialTotalTime)[0]}}时{{timeFormat(item.materialTotalTime)[1]}}分{{timeFormat(item.materialTotalTime)[2]}}秒</span>
            </dd>
            <dd class="dd">
              {{ item.materialBrief }}
              <!-- <textarea
                class="textarea"
                maxlength="100"
                v-model="item.title"
              ></textarea> -->
            </dd>
          </dl>
        </div>
      </div>
      <!-- 点击加载更多 -->
      <div class="load_more" v-if="currentPage < totalPage" @click="loadMore">
        点击加载更多
      </div>
      <div class="bottom_btn">
        <el-button @click="goBack">取消</el-button>
        <el-button type="primary" @click="handleNext">下一步</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  queryProgram, //查询节目
} from "@/api/program/index.js";
import { getVideoList } from "@/api/media/index.js";
import { getList } from "@/api/media/mediaText.js";
import { getPList } from "@/api/media/mediaPic.js";

//秒转时分秒
import { formatSeconds, timeEvent } from "@/assets/util/util.js";

export default {
  data() {
    return {
      currentPage: 1, //-分页
      pageSize: 12, //-分页
      totalNo: 0, //-分页,总条数
      totalPage: 0, //分页-总页数
      type: this.$route.query.type, //1:视频  2：图片  3：文字
      areaType:this.$route.query.areaType,//添加区域  A B  C  D
      active: 0, //步骤1
      selNum: 0, //选中了几项
      searchVal: "",
      readonly: true,
      selList:[],//选中的添加列表
      listData: [
        // {
        //   id: 1,
        //   desc:"标题标题标题标题标题标题级标题表发达范德萨范德萨",
        //   title: "11一旦房贷卡范德萨范德萨范德萨发第三范德萨范德萨",
        //   houre: 1,
        //   minute: 10,
        //   second: 10,
        //   checked: false,
        // }
      ],
    };
  },
  computed: {
    types() {
      if (this.$route.query.type == 1) {
        return "视频";
      } else if (this.$route.query.type == 2) {
        return "图片";
      } else {
        return "文字";
      }
    },
  },
  mounted() {
    console.log("area",this.areaType)

    if (this.type == 1) {
      this.getVList(this.currentPage, this.pageSize);
    } else if (this.type == 2) {
      this.getPList(this.currentPage, this.pageSize);
    } else {
      this.getTList(this.currentPage, this.pageSize);
    }
  },
  methods: {
    timeFormat(val) {
      return formatSeconds(val);
    },
    loadMore() {
      // 点击加载更多
      this.currentPage += 1; //页数++
      //请求数据
      if (this.type == 1) {
        this.getVList(this.currentPage, this.pageSize);
      } else if (this.type == 2) {
        this.getPList(this.currentPage, this.pageSize);
      } else {
        this.getTList(this.currentPage, this.pageSize);
      }
    },
    getVList(pageNo,pageSize) {
      this.currentPage = pageNo;
      var odata = {
        pageNum: pageNo,
        pageSize: pageSize,
        title: this.searchVal,
      };
      getVideoList(odata)
        .then((res) => {
          if (res.data.code == 200) {
            this.listData = res.data.data.list;
            this.totalNo = res.data.data.total;
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
    getPList(pageNo,pageSize) {
      this.currentPage = pageNo;
      var odata = {
        pageNum: pageNo,
        pageSize: pageSize,
        title: this.searchVal,
      };
      getPList(odata)
        .then((res) => {
          if (res.data.code == 200) {
            this.listData = res.data.data.list;
            this.totalNo = res.data.data.total;
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
    getTList(pageNo,pageSize) {
      this.currentPage = pageNo;
      var odata = {
        pageNum: pageNo,
        pageSize: pageSize,
        title: this.searchVal,
      };
      getList(odata)
        .then((res) => {
          if (res.data.code == 200) {
            this.listData = res.data.data.list;
            this.totalNo = res.data.data.total;
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
    handleNext() {
      if (this.selNum == 0) {
        this.$message.error("选择添加的文件");
        return false;
      }
      this.listData.forEach((item, index) => {
        if (item.checked) {
          this.selList.push(item);
        }
      });
      // console.log(this.selList)
      //  return false;
      // localStorage保存选中的数据，带入下一步
      localStorage.setItem("addSelList", JSON.stringify(this.selList)); 
      this.$router.push({
        name: "progranEdit",
        query: {
          // type: this.type,//添加内容类型
          programId:this.$route.query.programId,//节目id
          modelId:this.$route.query.modelId,//选用的模板
          // startTimes:this.$route.query.startTimes,//开始时间
          areaType:this.areaType,//内容添加的区域
          isSel:true//是否是编辑选择跳转进入
        }
      });
    },
    goBack() {
      //返回上-层
      this.$router.go(-1);
    },
    itemChecked(index) {
      console.log(index)
      this.listData[index].checked = !this.listData[index].checked;
      var num = 0;
      this.listData.forEach((item, index) => {
        if (item.checked) {
          num += 1;
        }
      });
      // if (num > 10) {
      //   this.listData[index].checked = false;
      //   this.$message.error("选择已达上限");
      //   return false;
      // }
      this.selNum = num;
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
      .step {
        padding: 20px 0 0;
        color: #f00;
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
              width: 150px!important;
              height: 80px;
              margin-right: 10px;
              img {
                width: 100%;
                height: 100%;
                display: block;
                object-fit: cover;
              }
            }
            .text {
              overflow: hidden;
              flex:1;
              .play_title {
                line-height: 40px;
                display: flex;
                justify-content: flex-end;
                .sel {
                  width: 28px;
                  height: 28px;
                  background-image: url("../../assets/img/media/radio_01.png");
                  background-repeat: no-repeat;
                  background-size: 100% 100%;
                  cursor: pointer;
                }
                .checked {
                  background-image: url("../../assets/img/media/radio_02.png");
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
              text-align:left;
            }
          }
          .dd {
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