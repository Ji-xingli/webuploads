<template>
  <div class="wrap">
    <dl class="no_template">
      <dt><img src="@/assets/img/media/01.png" alt="" /></dt>
      <dd>请前往<span>模板管理</span>页，选择需要使用的模板</dd>
    </dl>
    <div class="manage_box">
      <!-- A区 -->
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="block_title">
            <el-row :gutter="20" class="title_box">
              <el-col :span="6">
                <div class="title">A区节目播放</div>
              </el-col>
              <el-col :span="12" :offset="6">
                <div class="search">
                  <el-button type="primary" @click="gotoEdit"
                    >编辑节目单</el-button
                  >
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
            <div class="row_box">
              <dl
                class="dl flip-list-move"
                v-for="(item, index) in listDataA"
                :key="index"
              >
                <dt>
                  <div class="img">
                    <img src="@/assets/img/media/01.png" alt />
                  </div>
                  <div class="text">
                    <p class="play_title">
                      <span>设置播放时长：</span>
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
                  <span>总时长：50:00</span>
                </dd>
                <dd class="dd">
                  {{ item.desc }}
                </dd>
              </dl>
              <div class="no_list" v-if="listDataA.length==0">暂无节目</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="right">
            <div class="date_title">
              <ul class="ul">
                <li v-for="(item, index) in titleDate" :key="index">
                  {{ item }}
                </li>
              </ul>
              <el-button
                class="button"
                type="primary"
                icon="el-icon-download"
                circle
              ></el-button>
            </div>
            <div class="data_list">
              <div class="item" v-for="(item, index) in listDataA" :key="index">
                <div class="icon">
                  <span class="el-icon-picture-outline-round"></span>
                </div>
                <div class="item_text">{{ item.title }}</div>
                <div class="item_times">{{ item.times }}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- B区 -->
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="block_title">
            <el-row :gutter="20" class="title_box">
              <el-col :span="6">
                <div class="title">B区节目播放</div>
              </el-col>
              <el-col :span="12" :offset="6">
                <div class="search">
                  <el-button type="primary" @click="gotoEdit"
                    >编辑节目单</el-button
                  >
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
            <div class="row_box">
              <dl
                class="dl flip-list-move"
                v-for="(item, index) in listDataB"
                :key="index"
              >
                <dt>
                  <div class="img">
                    <img src="@/assets/img/media/01.png" alt />
                  </div>
                  <div class="text">
                    <p class="play_title">
                      <span>设置播放时长：</span>
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
                  <span>总时长：50:00</span>
                </dd>
                <dd class="dd">
                  {{ item.desc }}
                </dd>
              </dl>
              <div class="no_list" v-if="listDataB.length==0">暂无节目</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="right">
            <div class="date_title">
              <ul class="ul">
                <li v-for="(item, index) in titleDate" :key="index">
                  {{ item }}
                </li>
              </ul>
              <el-button
                class="button"
                type="primary"
                icon="el-icon-download"
                circle
              ></el-button>
            </div>
            <div class="data_list">
              <div class="item" v-for="(item, index) in listDataA" :key="index">
                <div class="icon">
                  <span class="el-icon-picture-outline-round"></span>
                </div>
                <div class="item_text">{{ item.title }}</div>
                <div class="item_times">{{ item.times }}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- c区域 -->
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="block_title">
            <el-row :gutter="20" class="title_box">
              <el-col :span="6">
                <div class="title">C区节目播放</div>
              </el-col>
              <el-col :span="12" :offset="6">
                <div class="search">
                  <el-button type="primary" @click="gotoEdit"
                    >编辑节目单</el-button
                  >
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
            <div class="row_box">
              <dl
                class="dl flip-list-move"
                v-for="(item, index) in listDataC"
                :key="index"
              >
                <dt>
                  <div class="img">
                    <img src="@/assets/img/media/01.png" alt />
                  </div>
                  <div class="text">
                    <p class="play_title">
                      <span>设置播放时长：</span>
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
                  <span>总时长：50:00</span>
                </dd>
                <dd class="dd">
                  {{ item.desc }}
                </dd>
              </dl>
              <div class="no_list" v-if="listDataC.length==0">暂无节目</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="right">
            <div class="date_title">
              <ul class="ul">
                <li v-for="(item, index) in titleDate" :key="index">
                  {{ item }}
                </li>
              </ul>
              <el-button
                class="button"
                type="primary"
                icon="el-icon-download"
                circle
              ></el-button>
            </div>
            <div class="data_list">
              <div class="item" v-for="(item, index) in listDataC" :key="index">
                <div class="icon">
                  <span class="el-icon-picture-outline-round"></span>
                </div>
                <div class="item_text">{{ item.title }}</div>
                <div class="item_times">{{ item.times }}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 文字专区--无论选择哪屏模板都有此区 -->
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="block_title">
            <el-row :gutter="20" class="title_box">
              <el-col :span="6">
                <div class="title">文字专区</div>
              </el-col>
              <el-col :span="12" :offset="6">
                <div class="search">
                  <el-button type="primary" @click="gotoEdit"
                    >编辑节目单</el-button
                  >
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
            <div class="row_box">
              <dl
                class="dl flip-list-move"
                v-for="(item, index) in listDataText"
                :key="index"
              >
                <dt>
                  <div class="img">
                    <img src="@/assets/img/media/03.png" alt />
                  </div>
                  <div class="text">
                    <p class="play_title">
                      <span>设置播放时长：</span>
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
                  <span>总时长：50:00</span>
                </dd>
                <dd class="dd">
                  {{ item.desc }}
                </dd>
              </dl>
              <div class="no_list" v-if="listDataText.length==0">暂无节目</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="right">
            <div class="date_title">
              <ul class="ul">
                <li v-for="(item, index) in titleDate" :key="index">
                  {{ item }}
                </li>
              </ul>
              <el-button
                class="button"
                type="primary"
                icon="el-icon-download"
                circle
              ></el-button>
            </div>
            <div class="data_list">
              <div class="item" v-for="(item, index) in listDataA" :key="index">
                <div class="icon">
                  <span class="el-icon-picture-outline-round"></span>
                </div>
                <div class="item_text">{{ item.title }}</div>
                <div class="item_times">{{ item.times }}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    
  </div>
</template>
<script>
import {
  queryProgram,//查询是否有分组

} from '@/api/program/index.js'

export default {
  data() {
    return {

      searchVal: "",
      i_hour: "",
      i_minute: "",
      i_second: "",
      readonly: true,
      titleDate: [
        "01-01",
        "01-02",
        "01-03",
        "01-04",
        "01-05",
        "01-06",
        "01-07",
        "01-08",
        "01-09",
        "01-10",
        "01-11",
        "01-12",
        "01-13",
        "01-14",
        "01-15",
        "01-16",
        "01-17",
        "01-18",
        "01-19",
        "01-20",
        "01-21",
        "01-22",
      ],
      listDataA: [
        // {
        //   id: 1,
        //   desc: "标题标题标题标题标题标题级标题表发达范德萨范德萨",
        //   title: "11一旦房贷卡范德萨范德萨范德萨发第三范德萨范德萨",
        //   houre: 1,
        //   minute: 10,
        //   second: 10,
        //   checked: false,
        // }
      ],
      listDataB:[],
      listDataC:[],
      listDataText:[],
    };
  },
  mounted(){
    console.log("id::",this.$store.state.groupId)
    this.searchProgram();
  },
  methods: {
    searchProgram(){
      // 查询分组是否有模板
      var odata={
        groupId:1
      }
      queryProgram(odata).then(res=>{
        if (res.data.code == 200) {
          if(res.data.data.length==0){
            // 选择分组
          }else{
            this.listDataA=res.data.data;
          }
        }
      })
    },
    gotoEdit() {
      this.$router.push({
        name: "progranEdit",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/.el-input .el-input__inner{
  padding:0;
  text-align:center;
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
              width: 500px;
              height: 80px;
              margin-right: 10px;
              img {
                width: 100%;
                height: 100%;
                display: block;
              }
            }
            .text {
              flex:1;
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
        .no_list{
          font-size:18px;
          text-align:center;
          line-height:200px;
          width:100%;
          color:palevioletred;
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
}
</style>