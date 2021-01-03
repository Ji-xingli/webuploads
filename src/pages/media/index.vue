<template>
  <div class="wrap">
    <div class="contents">
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 视频上传 -->
        <el-tab-pane :label="videoTotal" name="video">
          <video-list v-if="activeName=='video'" @getTopTotal="getTopTotal"></video-list>
        </el-tab-pane>
        <!-- 图片上传 -->
        <el-tab-pane :label="picTotal" name="pic">
          <pic-list v-if="activeName=='pic'" @getTopTotal="getTopTotal"></pic-list>
        </el-tab-pane>
        <!-- 文本上传 -->
        <el-tab-pane :label="textTotal" name="text">
          <text-list v-if="activeName=='text'" @getTopTotal="getTopTotal"></text-list>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>
<script>
import {getTotalNum} from '@/api/media/index.js'
import videoList from './mediaVideo'
import picList from './mediaPic'
import textList from './mediaText'
export default {
  components:{
    videoList,
    picList,
    textList
  },
  data() {
    return {
      topTota:"",//tab切换总条数
      activeName: "video"
    };
  },
  computed: {
    videoTotal() {
      return `视频（共${this.topTota.videoTotal}条）`;
    },
    picTotal() {
      return `图片（共${this.topTota.imageTotal}条）`;
    },
    textTotal(){
      return `文字（共${this.topTota.textTotal}条）`;
    }
  },
  mounted(){
    this.getTopTotal();
  },
  methods: {
    getTopTotal(){
      getTotalNum().then(res=>{
        if(res.data.code==200){
          this.topTota=res.data.data;
        }
      })
    },
    handleTabClick(tab, event) {
      // this.getTopTotal()
    },
  },
};
</script>
<style lang="scss" scoped>
.el-pagination{
    text-align:center;
  }
.wrap {
  width: 100%;
  height: 100%;
  margin-top: 10px;
  background: #fff;
  overflow: hidden;
  .contents {
    padding: 20px;
  }
  
  .up_video_box {
    width: 200px;
    height: 100px;
    margin-top: 10px;
    position: relative;
    .videoClass {
      width: 100%;
      height: 100%;
    }
    .remove {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 4;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>