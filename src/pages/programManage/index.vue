<template>
  <div class="wrap">
    
    <div class="manage_box" v-if="isTemplate">
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
                    <img v-if="item.materialType==1" :src="item.materialUrl" alt="">
                    <img v-if="item.materialType==0" src="@/assets/img/media/01.png" alt />
                    <img v-if="item.materialType==2" src="@/assets/img/media/03.png" alt />
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
                  <span class="a_title">{{ item.materialTitle }}</span>
                  <span v-if="item.materialType!=0">已设时长：{{item.programMaterialTotalTime}}</span>
                  <span v-else>总时长：{{item.programMaterialTotalTime}}</span>
                </dd>
                <dd class="dd">
                  {{ item.materialBrief }}
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
      
      <!-- c区域 -->

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
                  <span class="a_title">{{ item.title }} {{item.materialType}}</span>
                  <span v-if="item.materialType==0">总时长22：50:00</span>
                  <span v-if="item.materialType==1">已设时长：{{item.programMaterialTotalTime}}</span>
                </dd>
                <dd class="dd">
                  {{ item.materialBrief}}
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
    <dl class="no_template" v-else>
      <dt><img src="@/assets/img/media/01.png" alt="" /></dt>
      <dd>请前往<span>模板管理</span>页，选择需要使用的模板</dd>
    </dl>
  </div>
</template>
<script>
import {
  queryProgram,//查询是否有分组
  queryProgramList,//查询组列表数据
} from '@/api/program/index.js'

export default {
  data() {
    return {
      isTemplate:false,//true :有模板
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
      pageNo:1,//当前页
      pageSize:3//每页显示多少条
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
        groupId:this.$store.state.groupId
      }
      queryProgram(odata).then(res=>{
        if (res.data.code == 200) {
          if(res.data.data.length==0){
            // 选择分组--没有选择模板--展示无内容
            this.isTemplate=false;
          }else{
            // 有模板，查询当前组节目模板列表
            this.isTemplate=true;
            this.getTemplateList();
          }
        }
      })
    },
    getTemplateList(){
      var odata={
        groupId:this.$store.state.groupId,
        pageNum:this.pageNo,
        pageSize:this.pageSize
      }
      //获取模板列表
      queryProgramList(odata).then(res=>{
        if (res.data.code == 200) {
          this.listDataA=res.data.data;
          this.programId=res.data.data[0].programId
        }
      })
    },
    gotoEdit() {
      this.$router.push({
        name: "progranEdit",
        query:{
          programId:this.programId
        }
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
              width: 150px!important;
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
              text-align:left;
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