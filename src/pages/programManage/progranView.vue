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
              <el-input
                placeholder="请输入名称搜索"
                prefix-icon="el-icon-search"
                v-model="searchVal"
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
              <span class="label">播放形式</span>
              <el-radio-group v-model="isLoop">
                <el-radio :label="1">循环播放</el-radio>
                <el-radio :label="2">不重复播放</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col>
            <div class="top_label">
              <span class="label">已选择文件</span>
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
                <img src="@/assets/img/media/01.png" alt />
              </div>
              <div class="text">
                <p class="play_title">
                  <span>设置播放时长：</span>
                  <el-popover
                    :ref="'refNamePopover' + item.id"
                    placement="left"
                    trigger="click"
                  >
                    <ul class="layer_box">
                      <li
                        v-for="(i, ind) in eidtLayerList"
                        :key="ind"
                        @click="swapItems(i.id, index, item.id)"
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
                <div class="play_times">
                  <el-input
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
                  >:
                  <el-input
                    :readonly="readonly"
                    v-model="item.second"
                    placeholder="秒"
                  ></el-input>
                </div>
              </div>
            </dt>
            <dd class="total_times">
              <span class="a_title">{{ item.title }}</span>
              <span>已设时长：50:00</span>
            </dd>
            <dd class="dd">
              <textarea
                class="textarea"
                maxlength="100"
                v-model="item.title"
              ></textarea>
            </dd>
          </dl>
        </div>
      </div>
      <div class="bottom_btn">
        <el-button @click="goBack">上一步</el-button>
        <el-button type="primary" @click="gotoSel">完成</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 1, //步骤1
      isPopover: true, //弹出窗显示隐藏
      isLoop: 1, //设置是否循环播放
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
      listData: [
        {
          id: 1,
          desc: "标题标题标题标题标题标题级标题表发达范德萨范德萨",
          title: "11一旦房贷卡范德萨范德萨范德萨发第三范德萨范德萨",
          houre: 1,
          minute: 10,
          second: 10,
          checked: false,
        },
        {
          id: 2,
          title: "22一旦房贷卡范德萨范德萨范德萨发第三范德萨范德萨",
          desc: "标题标题标题标题标题标题级标题表发达范德萨范德萨",
          houre: 1,
          minute: 10,
          second: 10,
          checked: false,
        },
        {
          id: 3,
          title: "33一旦房贷卡范德萨范德萨范德萨发第三范德萨范德萨",
          desc: "标题标题标题标题标题标题级标题表发达范德萨范德萨",
          houre: 1,
          minute: 10,
          second: 10,
          checked: false,
        },
        {
          id: 4,
          title: "44一旦房贷卡范德萨范德萨范德萨发第三范德萨范德萨",
          desc: "标题标题标题标题标题标题级标题表发达范德萨范德萨",
          houre: 1,
          minute: 10,
          second: 10,
          checked: false,
        },
        {
          id: 5,
          title: "55一旦房贷卡范德萨范德萨范德萨发第三范德萨范德萨",
          desc: "标题标题标题标题标题标题级标题表发达范德萨范德萨",
          houre: 1,
          minute: 10,
          second: 10,
          checked: false,
        },
        {
          id: 6,
          title: "66一旦房贷卡范德萨范德萨范德萨发第三范德萨范德萨",
          desc: "标题标题标题标题标题标题级标题表发达范德萨范德萨",
          houre: 1,
          minute: 10,
          second: 10,
          checked: false,
        },
        {
          id: 7,
          title: "77一旦房贷卡范德萨范德萨范德萨发第三范德萨范德萨",
          desc: "标题标题标题标题标题标题级标题表发达范德萨范德萨",
          houre: 1,
          minute: 10,
          second: 10,
          checked: false,
        },
        {
          id: 8,
          title: "88一旦房贷卡范德萨范德萨范德萨发第三范德萨范德萨",
          desc: "标题标题标题标题标题标题级标题表发达范德萨范德萨",
          houre: 1,
          minute: 10,
          second: 10,
          checked: false,
        },
        {
          id: 9,
          title: "99一旦房贷卡范德萨范德萨范德萨发第三范德萨范德萨",
          desc: "标题标题标题标题标题标题级标题表发达范德萨范德萨",
          houre: 1,
          minute: 10,
          second: 10,
          checked: false,
        },
        {
          id: 8,
          title: "88一旦房贷卡范德萨范德萨范德萨发第三范德萨范德萨",
          desc: "标题标题标题标题标题标题级标题表发达范德萨范德萨",
          houre: 1,
          minute: 10,
          second: 10,
          checked: false,
        },
        {
          id: 9,
          title: "99一旦房贷卡范德萨范德萨范德萨发第三范德萨范德萨",
          desc: "标题标题标题标题标题标题级标题表发达范德萨范德萨",
          houre: 1,
          minute: 10,
          second: 10,
          checked: false,
        },
      ],
    };
  },
  methods: {
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
      this.listData[index] = this.listData.splice(
        index + 1,
        1,
        this.listData[index]
      )[0];
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
      this.$router.push({
        name: "programManage",
      });
    },
    goBack() {
      //返回上-层
      this.$router.go(-1)
    },
    handleAddSel(type) {
      // todo type:1 添加视频   2：添加内容
      // 跳转至添加
      this.$router.push({
        name: "addProgram",
        query: {
          type: type,
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
              width: 250px;
              height: 80px;
              margin-right: 10px;
              img {
                width: 100%;
                height: 100%;
                display: block;
              }
            }
            .text {
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
    .bottom_btn {
      text-align: center;
      padding: 20px 0 30px;
    }
  }
}
</style>