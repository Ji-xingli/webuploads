<template>
  <div class="allindex">
    <el-row type="flex" :gutter="10" class="top" justify="space-around">
      <el-col :span="8">
        <div class="item">
          <span class="icon-zhandian iconfont"></span>
          <dl>
            <dt>站点总数</dt>
            <dd>{{ topIndexInfo.websiteCount }}</dd>
          </dl>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item">
          <span class="el-icon-video-camera-solid icon color1"></span>
          <dl>
            <dt>视频总数</dt>
            <dd>{{ topIndexInfo.videoCount }}</dd>
          </dl>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item">
          <span class="el-icon-picture icon color2"></span>
          <dl>
            <dt>图片总数</dt>
            <dd>{{ topIndexInfo.imageCount }}</dd>
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
            <div
              class="g_item"
              v-for="(item, index) in templateList"
              :key="index"
              :class="active === item.modelId ? 'cur' : ''"
            >
              {{ item.text }}
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-tabs
              v-model="activeName"
              @tab-click="handleTabClick"
              v-if="active"
            >
              <el-tab-pane
                label="A区"
                name="one"
                v-if="active == 1 || active == 2 || active == 3"
              >
                <index-model-list
                  :modelId="active"
                  areaType="A"
                  v-if="activeName == 'one'"
                ></index-model-list>
              </el-tab-pane>
              <el-tab-pane label="B区" name="two" v-if="active == 2">
                <index-model-list
                  :modelId="active"
                  areaType="B"
                  v-if="activeName == 'two'"
                ></index-model-list>
              </el-tab-pane>
              <el-tab-pane label="C区" name="three" v-if="active == 3">
                <index-model-list
                  :modelId="active"
                  areaType="C"
                  v-if="activeName == 'three'"
                ></index-model-list>
              </el-tab-pane>
              <el-tab-pane
                label="D区"
                name="foure"
                v-if="active == 1 || active == 2 || active == 3"
              >
                <index-model-list
                  :modelId="active"
                  areaType="D"
                  v-if="activeName == 'foure'"
                ></index-model-list>
              </el-tab-pane>
            </el-tabs>
            <div class="no_list" v-else>
              <img src="@/assets/img/no_bg.png" alt="" />
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
                :disabled="deviceStatus == 1 ? true : false"
                placeholder="请输入设备编号"
              ></el-input>
            </div>
            <div class="i_item">
              <el-input
                v-model="deviceTwo"
                :disabled="deviceStatus == 1 ? true : false"
                placeholder="请输入设备编号"
              ></el-input>
            </div>
            <div class="i_item">
              <el-button
                class="goLink"
                type="primary"
                v-if="deviceStatus == 0"
                @click="sendDialog"
                >发起对话</el-button
              >
              <el-button
                class="goLink"
                type="primary"
                v-if="deviceStatus == 1"
                @click="endDialog"
                >结束对话</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="top_bottom" justify="space-around">
      <el-col :span="24">
        <div id="chartColumn" style="height: 340px; width: 100%"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  addDialog,
  updateDialog,
  queryDialog,
} from "@/api/siteManage/index.js";

import indexModelList from "@/components/indexModelList";

import {
  indexTopData, //顶部数据
  reqIndexBarData, //柱状图信息
} from "@/api/index/index.js";

import {
  queryProgram, //查询分组是否有模板
} from "@/api/program/index.js";
import echarts from "echarts";
export default {
  data() {
    return {
      topIndexInfo: {}, //顶部列表数据
      activeName: "one", //展示区内容
      active: "", //当前是否有模板使用 1 2 3
      deviceStatus: 0, //设备状态
      deviceOne: "", //设备1
      deviceTwo: "", //设备2
      dialogId: "", //对话id
      disabled: false,
      chartColumn: null,
      templateList: [
        {
          modelId: 1,
          text: "模板1",
        },
        {
          modelId: 2,
          text: "模板2",
        },
        {
          modelId: 3,
          text: "模板3",
        },
      ],
      indexProgramInfo: [], //首页节目-模板信息
    };
  },
  components: {
    indexModelList,
  },
  mounted() {
    //底部图表数据
    this.drawLine();

    // 查询是否有对话链接
    this.queryLink();
    // 当前是否有模板
    this.isTemplate();
    //获取顶部数据
    this.getIndexTopData();
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
    },
  },
  watch: {
    "$store.state.groupId": function () {
      // 当前是否有模板
      this.isTemplate();
      //获取顶部数据
      this.getIndexTopData();
    },
  },
  methods: {
    getIndexTopData() {
      // 获取顶部数据
      indexTopData(this.$store.state.groupId).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.topIndexInfo = res.data.data;
        }
      });
    },
    handleTabClick() {
      // 当前节目模板列表
    },
    isTemplate() {
      // 查询分组是否有模板
      var odata = {
        groupId: this.$store.state.groupId,
        partion: "",
      };
      queryProgram(odata).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length !== 0) {
            console.log("-----");
            console.log(res.data.data);
            this.active = res.data.data[0].modelId;
            //保存当前模板情况
            this.indexProgramInfo = res.data.data;
          } else {
            this.active = "";
          }
        }
      });
    },
    queryLink() {
      //查询是否有对话链接
      queryDialog().then((res) => {
        if (res.data.code == 200) {
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
        dialogStatus: "",
      };
      addDialog(odata).then((res) => {
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
      updateDialog(this.dialogId).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("结束对话成功");
          //查询是否有对话链接
          this.queryLink();
        }
      });
    },
    drawLine() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));
      reqIndexBarData().then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data)
          this.chartColumn.setOption({
            title: { text: "站点在线数" },
            tooltip: {
              trigger: "axis",
              formatter: function (params) {
                let tip = "";
                for(let i=0;i<params.length;i++) {
                      tip+="分组："+params[i].name +'<br>站点在线 : '+params[i].value+'台<br>';
                }
                return tip
              }
            },
            // legend: {
            //       data: ['A区', 'B区', 'C区']
            //   },
            xAxis: {
              type: "category",
              data: res.data.data.xdata,
            },
            yAxis: {
              type: "value",
            },
            grid: {
              left: "1%",
              right: "1%",
              bottom: "12%",
              top: "18%",
              containLabel: true,
            },
            series: [
              {
                // name: "A区",
                data: res.data.data.ydata,
                type: "bar",
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                      [
                        { offset: 0, color: "#f83e73" },
                        // { offset: 0.5, color: "#272d42" },
                        { offset: 1, color: "#fd6963" },
                      ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                    ),
                  },
                },
              },
            ],
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.allindex {
  width: 100%;
  min-height: 100%;
  overflow-y: scroll;
  .top {
    .item {
      padding: 25px 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      // border: 1px solid #409eff;
      margin: 10px 0;
      color: #333;
      background: #fff;
      .icon {
        font-size: 40px;
        margin-right: 10px;
      }
      .iconfont {
        font-size: 40px;
        color: #f8c330;
      }
      .color1 {
        color: #f83e73;
      }
      .color2 {
        color: #2bb212;
      }
      dl {
        overflow: hidden;
        line-height: 24px;
        margin-left: 30px;
        dt {
          font-size: 14px;
        }
        dd {
          font-size: 22px;
          text-align: center;
        }
      }
    }
  }
  .box-card {
    // background:#f8c330;
    height: 500px;
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
        height: 124px;
        line-height: 124px;
        border: 1px solid #ddd;
        margin-bottom: 10px;
        text-align: center;
      }
      .cur {
        border: 1px solid #f00;
      }
    }
    .el-card__body {
      padding: 0 20px !important;
    }

    .input_group {
      overflow: hidden;
      padding: 10px 0 50px;
      .i_item {
        padding: 70px 0 0;
      }
      .goLink {
        width: 100%;
      }
    }
  }
  .top_bottom {
    overflow: hidden;
    height: 340px;
    background: #fff;
    margin-top: 10px;
    padding: 20px;
  }
  .no_list {
    height: 290px;
    img {
      margin: 88px auto 0;
      display: block;
    }
  }
}
</style>