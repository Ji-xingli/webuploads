<template>
  <div class="wrap">
    <div class="manage_box">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="block_title">
            <el-row :gutter="20" class="title_box">
              <el-col :span="6">
                <div class="title">A区节目播放</div>
              </el-col>
              <el-col :span="12" :offset="6">
                <div class="search">
                  <el-button type="primary">编辑节目单</el-button>
                  <el-input placeholder="请输入名称搜索" prefix-icon="el-icon-search" v-model="searchVal"></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <div class="row_box">
                <el-col :span="8">
                  <dl class="dl">
                    <dt>
                      <div class="img">
                        <img src="@/assets/img/media/01.png" alt>
                      </div>
                      <div class="text">
                        <p class="play_title">
                          <span>设置播放时长：</span>
                          <!-- <span class="setting el-icon-setting"></span> -->
                        </p>
                        <div class="play_times">
                          <el-input :readonly="readonly" v-model="i_hour" placeholder="时"></el-input>:
                          <el-input :readonly="readonly" v-model="i_minute" placeholder="分"></el-input>:
                          <el-input :readonly="readonly" v-model="i_second" placeholder="秒"></el-input>
                        </div>
                      </div>
                    </dt>
                    <dd class="dd">备注签文本签备注签文本签备注签文本签备注备注签文本签备注</dd>
                  </dl>
                </el-col>
                <el-col :span="8">
                  <dl class="dl">
                    <dt>
                      <div class="img">
                        <img src="@/assets/img/media/01.png" alt>
                      </div>
                      <div class="text">
                        <p class="play_title">
                          <span>设置播放时长：</span>
                          <!-- <span class="setting el-icon-setting"></span> -->
                        </p>
                        <div class="play_times">
                          <el-input :readonly="readonly" v-model="i_hour" placeholder="时"></el-input>:
                          <el-input :readonly="readonly" v-model="i_minute" placeholder="分"></el-input>:
                          <el-input :readonly="readonly" v-model="i_second" placeholder="秒"></el-input>
                        </div>
                      </div>
                    </dt>
                    <dd class="dd">备注签文本签备注签文本签备注签文本签备注备注签文本签备注</dd>
                  </dl>
                </el-col>
                <el-col :span="8">
                  <dl class="dl">
                    <dt>
                      <div class="img">
                        <img src="@/assets/img/media/01.png" alt>
                      </div>
                      <div class="text">
                        <p class="play_title">
                          <span>设置播放时长：</span>
                          <!-- <span class="setting el-icon-setting"></span> -->
                        </p>
                        <div class="play_times">
                          <el-input :readonly="readonly" v-model="i_hour" placeholder="时"></el-input>:
                          <el-input :readonly="readonly" v-model="i_minute" placeholder="分"></el-input>:
                          <el-input :readonly="readonly" v-model="i_second" placeholder="秒"></el-input>
                        </div>
                      </div>
                    </dt>
                    <dd class="dd">备注签文本签备注签文本签备注签文本签备注备注签文本签备注</dd>
                  </dl>
                </el-col>
              </div>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="right">
            <div class="date_title">
              <ul class="ul">
                  <li v-for="(item,index) in titleDate" :key="index">{{item}}</li>
              </ul>
              <el-button class="button" type="primary" icon="el-icon-download" circle></el-button>
            </div>
            <div class="data_list">
              <div class="item" v-for="(item,index) in listData" :key="index">
                <div class="icon"><span class="el-icon-picture-outline-round"></span></div>
                <div class="item_text">{{item.title}}</div>
                <div class="item_times">{{item.times}}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchVal:"",
      i_hour:"",
      i_minute:"",
      i_second:"",
      readonly:true,
      titleDate:['01-01','01-02','01-03','01-04','01-05','01-06','01-07','01-08','01-09','01-10','01-11','01-12','01-13','01-14','01-15','01-16','01-17','01-18','01-19','01-20','01-21','01-22'],
      listData:[
        {
        title:"一旦房贷卡范德萨范德萨范德萨发第三范德萨范德萨",
        times:"01-01"
      },
      {
        title:"一旦房贷卡范德萨范德萨范德萨发第三范德萨范德萨",
        times:"01-01"
      },
      {
        title:"一旦房贷卡范德萨范德萨范德萨发第三范德萨范德萨",
        times:"01-01"
      },
      {
        title:"一旦房贷卡范德萨范德萨范德萨发第三范德萨范德萨",
        times:"01-01"
      },
      {
        title:"一旦房贷卡范德萨范德萨范德萨发第三范德萨范德萨",
        times:"01-01"
      }
      ]
   };
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  margin-top: 10px;
  background: #f1f1f1;
  overflow: hidden;
  .manage_box {
    overflow: hidden;
    width: 100%;
    height:100%;
    .block_title {
      padding: 10px;
      .title_box{
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
      .row_box{
        width:100%;
        overflow:hidden;
        margin-top:10px;
        .dl{
          background:#fff;
           min-height:200px;
          overflow:hidden;
          padding:10px;
          dt{
            display:flex;
            justify-content: space-between;
            .img{
              width:250px;
              height:80px;
              margin-right:10px;
              img{
                width:100%;
                height:100%;
                display:block;
              }
            }
            .text{
              overflow:hidden;
              .play_title{
                line-height:40px;
                display:flex;
                justify-content: space-between;
                .setting{
                  font-size:20px;
                }
              }
              .play_times{
                display:flex;
                align-items: center;
              }
            }
          }
          .dd{
            margin-top:10px;
            font-size:14px;
            line-height:30px;
          }
        }
      }
    }
      .right{
        background:#fff;
        overflow:hidden;
        margin-top:10px;
        padding:10px;
        .date_title{
          width:100%;
          height:40px;
          line-height:40px;
          display:flex;
          overflow:hidden;
          .ul{
            display:flex;
            white-space:nowrap;
            overflow-x: scroll;
            overflow-y: hidden;
            li{
              padding:6px;
            }
          }
          .button{
            margin-left:10px;
          }
        }
        .data_list{
          margin-top:10px;
          .item{
            display:flex;
            justify-content: space-between;
            height:40px;
            align-items: center;
            .icon{
              width:40px;
              font-size:30px;
            }
            .item_text{
              margin-left:10px;
              flex:1;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
  }
}
</style>