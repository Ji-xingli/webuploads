<template>
  <div class="wrap_i">
    <div class="text_group" v-loading="loading"  element-loading-text="正在努力加载中...">
      <div class="t_item" v-for="(item,index) in listData" :key="index">
        <div class="icon el-icon-video-camera-solid" style="color:#f83e73" v-if="item.materialType==0"></div>
        <div class="pic" v-else-if="item.materialType==1"><img :src="item.materialUrl" alt=""></div>
        <div class="icon el-icon-s-order" style="color:#e6a23c;" v-else></div>
        <dl class="text">
          <dt>{{item.materialTitle}}</dt>
          <dd>{{item.materialBrief}}</dd>
        </dl>
        <div class="timer" v-if="item.materialType==0">总时长：{{item.programMaterialTotalTime}}s</div>
        <div class="timer" v-else>设置播放时长：{{item.programMaterialTotalTime}}s</div>
      </div>
       <div class="load_more" v-if="currentPage < totalPage" @click="loadMore">
        点击加载更多
      </div>
      <div class="no_list" v-if="listData.length == 0"><img src="@/assets/img/no_bg.png" alt=""></div>

    </div>
  </div>
</template>
<script>
import {
  queryProgramList, //查询组列表数据
} from "@/api/program/index.js";
export default {
  props:['modelId','areaType'],
  data() {
    return {
      currentPage: 1, //-分页
      pageSize: 10, //-分页
      totalNo: 0, //-分页,总条数
      totalPage: 0, //分页-总页数
      listData: [],
      loading:true
    };
  },
  mounted() {
    this.getTemplateList();
  },
  watch:{
    '$store.state.groupId':function(){
      this.loading=true;
      this.currentPage=1;
      this.totalNo=0;
      this.totalPage=0;
      this.listData=[];
      //监听组选择变化
      this.getTemplateList();
    }
  },
  methods: {
    getTemplateList() {
      var odata = {
        startTime: "", //右侧数据展示，传入的月日时间-开始时间
        endTime: "", //右侧数据展示，传入的月日时间-结束时间
        groupId: this.$store.state.groupId,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        modelId: this.modelId,
        partionId: this.areaType,
        title: "",
      };
      //获取模板列表
      queryProgramList(odata).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length != 0) {
            this.listData = this.listData.concat(res.data.data.programList);
            this.totalNo = res.data.data.programTotal;

            //总页数
            this.totalPage = Math.ceil(this.totalNo / this.pageSize);

            //取消加载
            this.loading=false;
          }
        }
      });
    },
    loadMore() {
      // 点击加载更多
      this.currentPage += 1; //页数++
      //请求数据
      this.getTemplateList();
    },
  },
};
</script>
<style lang="scss" scpoed>
.wrap_i {
  height: 400px;
  // background:#def;
  overflow-y: scroll;
}
.text_group {
  padding-bottom: 10px;
  .t_item {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
    .pic{
      width:34px;
      height:34px;
      margin-right:12px;
      img{
        width:100%;
        height:100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .icon {
      font-size: 34px;
      margin-right: 10px;
    }
    .text {
      width: 420px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right:12px;
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
  .load_more{
    height:50px;
    line-height:50px;
    text-align:center;
  }
  .no_list{
    width:100%;
    img{
      margin:88px auto 0;
      display:block;
    }
    
  }
}
</style>