<template>
  <div class="right">
    <div class="date_title">
      <ul class="ul">
        <li
          v-for="(item, index) in titleDate"
          :key="index"
          :class="item == nowDate ? 'active' : ''"
          @click="getNowData(item)"
        >
          {{ item }}
        </li>
      </ul>
      <el-button
        class="button"
        type="primary"
        icon="el-icon-download"
        circle
        @click="handleExport()"
      ></el-button>
    </div>
    <div
      class="data_list"
      v-loading="loading"
      element-loading-text="正在努力加载中..."
    >
      <div class="item" v-for="(item, index) in listData" :key="index">
        <div class="icon">
          <!-- materialType: 0:视频   1：图片  2文字 -->
          <span
            v-if="item.materialType == 1"
            class="el-icon-picture-outline"
          ></span>
          <span
            v-else-if="item.materialType == 2"
            class="el-icon-document"
          ></span>
          <span v-else class="el-icon-video-camera"></span>
        </div>
        <div class="item_text">{{ item.materialTitle }}</div>
        <div class="item_times">
          总时长：{{ item.programMaterialTotalTime }} s
        </div>
      </div>
      <div
        class="more"
        v-if="pageNo < totalPage && listData.length > 0"
        @click="loadMore"
      >
        点击加载更多~
      </div>
      <div class="more" v-else>暂无更多数据~</div>
    </div>
  </div>
</template>
<script>
import {
  queryProgramList, //查询组列表数据
  programExportExcel, //导出
} from "@/api/program/index.js";
import { downloadFilexlsx } from "@/util/downloadXlsx";
export default {
  props: ["info", "areaType"], //info:A,B,C区全部信息  areaType:A  B  C  D 区域
  data() {
    return {
      loading: true,
      pageNo: 1, //当前页数
      pageSize: 20, //每页显示条数
      totalPage: "", //总页数
      nowDate: "", //当前选中的日期--结束时间
      startDate: "", //开始时间
      index: 0, //当前选中日期索引  0,1,2,3
      titleDate: [], //日期数组
      listData: [], //列表数据
    };
  },
  //   computed: {
  //     fileids() {
  //       let ids = [];
  //       this.fileSelectList.forEach((ele) => {
  //         ids.push(ele.id);
  //       });
  //       return ids.join(",");
  //     },
  //   },
  mounted() {
    //   获取当前时间开始，前30天日期
    this.getMouthDate();
  },
  methods: {
    getMouthDate() {
      // 默认当前日期选中
      // this.nowDate = new Date().toLocaleDateString();
      // this.titleDate = [];
      // for (var i = 0; i < 30; i++) {
      //   this.titleDate.push(
      //     // this.titleDate.unshift(
      //     new Date(
      //       new Date().setDate(new Date().getDate() - i)
      //     ).toLocaleDateString()
      //   );
      // }

      // 获取当前-前30天日期

      var dateTime = Date.parse(new Date()) / 1000; //获取当前日期
      this.titleDate = [];
      for (var i = 29; i >= 0; i--) {
        this.titleDate.push(this.timestampToTime(dateTime));
        dateTime = dateTime - 86400;
      }
      // 当前时间
      this.nowDate = this.titleDate[0];
      // 开始时间
      this.startDate = this.titleDate[this.titleDate.length-1];
      //获取当前列表数据
      this.getTemplateList();
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return Y + M + D;
    },
    getTemplateList() {
      var odata = {
        startTime: this.startDate, //右侧数据展示，传入的月日时间-开始时间
        endTime: this.nowDate, //右侧数据展示，传入的月日时间-结束时间
        groupId: this.$store.state.groupId,
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        modelId: this.info[0].modelId,
        partionId: this.areaType,
        title: "",
      };
      //获取模板列表
      queryProgramList(odata).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length != 0) {
            this.listData = this.listData.concat(res.data.data.programList);
            //总页数
            this.totalPage = Math.ceil(
              res.data.data.programTotal / this.pageSize
            );
            // this.programId = this.info[0].programId;
          }
          //取消加载
          this.loading = false;
        }
      });
    },
    getNowData(index) {
      // 点击当前的日期(结束时间)
      this.nowDate = index;
      // 开始时间计算--前30天
      var dateTime = Date.parse(index) / 1000 - 86400 * 29;
      this.startDate = this.timestampToTime(dateTime);
      //   当前页数
      this.pageNo = 1;
      this.listData = [];
      this.getTemplateList();
    },
    loadMore() {
      // 点击加载更多
      this.pageNo += 1; //页数++
      //请求数据
      this.getTemplateList();
    },
    handleExport() {
      this.$confirm("确认要导出数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 下载
          var odata = {
            groupId: this.$store.state.groupId,
            endTime: this.titleDate[0],
            modelId: this.info[0].modelId,
            partionId: this.areaType,
            startTime: this.titleDate[this.titleDate.length - 1],
          };
          programExportExcel(odata).then((res) => {
            downloadFilexlsx(res, "program");
          });
        })
        .catch(() => {
          console.log("取消下载");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
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
        cursor: pointer;
      }
      li.active {
        color: #f00;
        font-weight: 700;
      }
    }
    .button {
      margin-left: 10px;
    }
  }
  .data_list {
    margin-top: 10px;
    height: 330px;
    overflow-y: scroll;
    .item {
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      border-bottom: 1px solid #ddd;
      .icon {
        width: 40px;
        font-size: 30px;
      }
      .item_text {
        // margin-left: 10px;
        // flex: 1;
        width: 10rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: auto;
      }
    }
  }
  .more {
    height: 50px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
  }
}
</style>