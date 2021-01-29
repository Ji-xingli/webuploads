<template>
  <div class="allindex">
    <el-row type="flex" :gutter="10" class="top" justify="space-around">
      <el-col :span="8">
        <div class="item">
          <span class="el-icon-files icon"></span>
          <dl>
            <dd>站点总数</dd>
            <dd>123456</dd>
          </dl>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item">
          <span class="el-icon-video-camera icon"></span>
          <dl>
            <dd>视频总数</dd>
            <dd>123456</dd>
          </dl>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item">
          <span class="el-icon-picture-outline icon"></span>
          <dl>
            <dd>图片总数</dd>
            <dd>123456</dd>
          </dl>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" :gutter="10" class="top_center" justify="space-around">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="title">当前使用模板</span>
          </div>
          <div class="group">
            <div class="g_item">A模板</div>
            <div class="g_item">B模板</div>
            <div class="g_item">C模板</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="title">A区节目顺序</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
          </div>
          <div class="text_group">
            <div class="t_item">
              <div class="icon el-icon-picture-outline-round"></div>
              <dl class="text">
                <dt>节目标题</dt>
                <dd>简字简介文简字简介文简字简介文简字简介文简字简介文简字简介文</dd>
              </dl>
              <div class="timer">总时长：18：50</div>
            </div>
            <div class="t_item">
              <div class="icon el-icon-picture-outline-round"></div>
              <dl class="text">
                <dt>节目标题</dt>
                <dd>简字简介文简字简介文简字简介文简字简介文简字简介文简字简介文</dd>
              </dl>
              <div class="timer">总时长：18：50</div>
            </div>
            <div class="t_item">
              <div class="icon el-icon-picture-outline-round"></div>
              <dl class="text">
                <dt>节目标题</dt>
                <dd>简字简介文简字简介文简字简介文简字简介文简字简介文简字简介文</dd>
              </dl>
              <div class="timer">总时长：18：50</div>
            </div>
            <div class="t_item">
              <div class="icon el-icon-picture-outline-round"></div>
              <dl class="text">
                <dt>节目标题</dt>
                <dd>简字简介文简字简介文简字简介文简字简介文简字简介文简字简介文</dd>
              </dl>
              <div class="timer">总时长：18：50</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="title">站点对话</span>
          </div>
          <div class="input_group">
            <div class="i_item">
              <el-input
                v-model="deviceOne"
                :disabled="deviceStatus==1?true:false"
                placeholder="请输入设备编号"
              ></el-input>
            </div>
            <div class="i_item">
              <el-input
                v-model="deviceTwo"
                :disabled="deviceStatus==1?true:false"
                placeholder="请输入设备编号"
              ></el-input>
            </div>
            <div class="i_item">
              <el-button
                class="goLink"
                type="primary"
                v-if="deviceStatus==0"
                @click="sendDialog"
              >发起对话</el-button>
              <el-button
                class="goLink"
                type="primary"
                v-if="deviceStatus==1"
                @click="endDialog"
              >结束对话</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="top_bottom" justify="space-around">
      <el-col :span="24">
        <div id="chartColumn" style="height: 200px; width: 100%"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  addDialog,
  updateDialog,
  queryDialog
} from "@/api/siteManage/index.js";
import echarts from "echarts";
export default {
  data() {
    return {
      deviceStatus: 0, //设备状态
      deviceOne: "", //设备1
      deviceTwo: "", //设备2
      dialogId: "", //对话id
      disabled: false,
      chartColumn: null
    };
  },
  mounted() {
    this.drawLine();

    // 查询是否有对话链接
    this.queryLink();
  },
  computed: {
    compnyname() {
      return this.officeName + "数据统计";
    },
    validateDialog() {
      // 验证发起对话
      let reg = /[1-9]\d?/; //数字
      let errText = "";
      if (!reg.test(this.deviceOne)) {
        errText = "请输入正确的设备编号";
        return { errText };
      } else if (!reg.test(this.deviceTwo)) {
        errText = "请输入正确的设备编号";
        return { errText };
      } else if (this.deviceTwo == this.deviceOne) {
        errText = "两个设备编号不能相同";
        return { errText };
      }
      return { errText };
    }
  },
  methods: {
    queryLink() {
      //查询是否有对话链接
      queryDialog().then(res => {
        if (res.data.code == 200) {
          console.log(res.data.data.length);
          if (res.data.data.length != 0) {
            this.deviceOne = res.data.data[0].dialogNumber;
            this.deviceTwo = res.data.data[0].dialogNumberEnd;
            // 设备状态  1：链接   0：非链接
            this.deviceStatus = res.data.data[0].dialogStatus;
            //对话id
            this.dialogId = res.data.data[0].dialogId;
          } else {
            this.deviceOne = "";
            this.deviceTwo = "";
            // 设备状态  1：链接   0：非链接
            this.deviceStatus = 0;
            //对话id
            this.dialogId = "";
          }
        }
      });
    },
    sendDialog() {
      // 发起对话
      if (this.validateDialog.errText !== "") {
        this.$message.error(this.validateDialog.errText);
        return false;
      }
      var odata = {
        dialogCreateTime: "",
        dialogId: "",
        dialogNumber: this.deviceOne,
        dialogNumberEnd: this.deviceTwo,
        dialogStatus: ""
      };
      addDialog(odata).then(res => {
        if (res.data.code == 200) {
          this.disabled = true;
          this.$message.success("发起成功");
          //查询对话状态
          this.queryLink();
        }
      });
    },
    endDialog() {
      // 结束对话
      updateDialog(this.dialogId).then(res => {
        if (res.data.code == 200) {
          this.$message.success("结束对话成功");
          //查询是否有对话链接
          this.queryLink();
        }
      });
    },
    drawLine() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));

      this.chartColumn.setOption({
        title: { text: "站点在线数" },
        tooltip: {
          trigger: "axis"
        },
        // legend: {
        //       data: ['A区', 'B区', 'C区']
        //   },
        xAxis: {
          type: "category",
          data: ["A组", "B组", "C组", "D组", "E组"]
        },
        yAxis: {
          type: "value"
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "12%",
          top: "18%",
          containLabel: true
        },
        series: [
          {
            name: "A区",
            data: [820, 932, 901, 934, 1290],
            type: "bar"
            // itemStyle : { normal: {label : {show: true}}}
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.allindex {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .top {
    .item {
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      border: 1px solid #409eff;
      margin: 10px 0;
      color: #409eff;
      background: #fff;
      .icon {
        font-size: 40px;
        margin-right: 10px;
      }
      dl {
        overflow: hidden;
        line-height: 24px;
      }
    }
  }
  /deep/ .top_center {
    min-height: 260px;
    overflow: hidden;
    .title {
      font-size: 16px;
    }
    .group {
      width: 80%;
      margin: 20px auto;
      .g_item {
        height: 70px;
        line-height: 70px;
        border: 1px solid #ddd;
        margin-bottom: 10px;
      }
    }
    .el-card__body {
      padding: 0 20px !important;
    }

    .text_group {
      padding-bottom: 10px;
      .t_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ddd;
        padding: 10px 0;
        .icon {
          font-size: 34px;
          margin-right: 10px;
        }
        .text {
          width: 63%;
          text-align: left;
          dt {
            font-size: 14px;
            line-height: 24px;
          }
          dd {
            font-size: 12px;
            line-height: 22px;
            color: #999;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
          }
        }
        .timer {
          font-size: 12px;
        }
      }
    }
    .input_group {
      overflow: hidden;
      padding: 10px 0 50px;
      .i_item {
        padding: 30px 0 0;
      }
      .goLink {
        width: 100%;
      }
    }
  }
  .top_bottom {
    overflow: hidden;
    height: 200px;
    background: #fff;
    margin-top: 10px;
    padding: 20px 0;
  }
}
</style>