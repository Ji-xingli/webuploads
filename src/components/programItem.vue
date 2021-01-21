<template>
  <div class="manage_box">
    <div class="block_title">
      <el-row :gutter="20" class="title_box">
        <el-col :span="6">
          <div class="title">
            {{ areaType == "D" ? "文字专" : areaType }}区节目播放
          </div>
        </el-col>
        <el-col :span="12" :offset="6">
          <div class="search">
            <el-button type="primary" @click="gotoEdit(areaType)"
              >编辑节目单</el-button
            >
            <el-input
              placeholder="请输入名称搜索"
              prefix-icon="el-icon-search"
              v-model="searchVal"
              clearable
            >
              <el-button
                slot="append"
                @click="goSearch"
                icon="el-icon-search"
              ></el-button
            ></el-input>
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
                v-if="item.materialType == 1"
                :src="item.materialUrl"
                alt=""
              />
              <img
                v-if="item.materialType == 0"
                src="@/assets/img/media/01.png"
                alt
              />
              <img
                v-if="item.materialType == 2"
                src="@/assets/img/media/03.png"
                alt
              />
            </div>
            <div class="text" v-if="item.materialType != 0">
              <p class="play_title">
                <span>已置播放时长：</span>
              </p>
              <div class="play_times">
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
                  v-model="item.programStartTime"
                  placeholder="秒"
                ></el-input
                >s
              </div>
            </div>
          </dt>
          <dd class="total_times">
            <span class="a_title">{{ item.materialTitle }}</span>
            <!-- <span v-if="item.materialType==0">已设时长：{{item.programMaterialTotalTime}}</span> -->
            <span v-if="item.materialType == 0"
              >总时长：{{ item.programMaterialTotalTime }}s
            </span>
          </dd>
          <dd class="dd">
            {{ item.materialBrief }}
          </dd>
        </dl>
        <div class="no_list" v-if="listData.length == 0">暂无节目</div>
      </div>
    </div>
    <el-pagination
      layout="prev, pager, next"
      :hide-on-single-page="value"
      :total="totalNo"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      @prev-click="getPrev"
      @next-click="getNext"
    >
    </el-pagination>
  </div>
</template>
<script>
import {
  queryProgram, //查询是否有分组
  queryProgramList, //查询组列表数据
} from "@/api/program/index.js";
export default {
  props: ["info", "areaType"],
  data() {
    return {
      value:false,
      readonly: false,
      searchVal: "",
      listData: [],
      pageNo: 1, //当前页
      pageSize: 3, //每页显示多少条
      totalNo: 5, //总页数
    };
  },
  mounted() {
    //   console.log("获取到区域",this.areaType)  //A  B  C  D 等
    console.log("info", this.info);
    this.getTemplateList(1, this.pageSize);
  },
  methods: {
    goSearch() {
      // 搜索内容
      this.getTemplateList(1, this.pageSize);
    },
    gotoEdit(areaType) {
      // 跳转编辑页面
      // areaType: A： A区  B:B区   C: C区    D:文字专区
      this.$router.push({
        name: "progranEdit",
        query: {
          programId: this.info[0].programId,
          modelId: this.info[0].modelId,
          areaType: areaType,
        },
      });
    },
    getTemplateList(pageNo, pageSize) {
      var odata = {
        groupId: this.$store.state.groupId,
        pageNum: pageNo,
        pageSize: this.pageSize,
        modelId: this.info[0].modelId,
        partionId: this.areaType,
        title: this.searchVal,
      };
      //获取模板列表
      queryProgramList(odata).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length != 0) {
            this.listData = res.data.data.programList;
            this.totalNo = res.data.data.programTotal;
            console.log(res.data.data.programTotal)
            console.log(this.totalNo)
            // this.programId = this.info[0].programId;
          }
        }
      });
    },
    //点击上一页获取数据
    getPrev(val) {
      this.getTemplateList(val, this.pageSize);
    },
    //点击下一页获取数据
    getNext(val) {
      console.log("next",val)
      this.getTemplateList(val, this.pageSize);
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getTemplateList(val, this.pageSize);
    },
  },
};
</script>
<style lang="scss" scoped>
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
        width: 30%;
        margin-right: 10px;
        background: #fff;
        min-height: 280px;
        overflow: hidden;
        padding: 10px;
        margin-bottom: 10px;
        &:nth-child(3n) {
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
}
</style>