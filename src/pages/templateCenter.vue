<template>
  <div class="wrap">
    <div class="box">
      <div class="item_box" v-for="(item, index) in templateList" :key="index">
          <!-- v-if="item.modelId!=3&&item.modelId!=1" -->
      <dl
        :class="active=== item.modelId ? 'cur' : ''"
       
      >
        <dt>
          <img v-if="item.modelId == 1" src="@/assets/template1.jpg" alt="">
            <img  @click="handleClickItem(item.modelId)" v-if="item.modelId == 2" src="@/assets/template2.jpg" alt="">
          <img v-if="item.modelId == 3" src="@/assets/template3.jpg" alt="">
          <!-- <div class="item"></div>
          <div class="item" v-if="item.modelId == 2 || item.modelId == 3"></div>
          <div class="item" v-if="item.modelId == 3"></div> -->
        </dt>
        <dd>
          {{ item.text
          }}<span class="nowTemplate" v-if="active === item.modelId"
            ></span
          >
        </dd>
      </dl>
      <!-- <dl
      >
        <dt>
         
          <div class="item"></div>
          <div class="item" v-if="item.modelId == 2 || item.modelId == 3"></div>
          <div class="item" v-if="item.modelId == 3"></div>
        </dt>
        <dd>
          {{ item.text
          }}<span class="nowTemplate" v-if="active === item.modelId"
            ></span
          >
        </dd>
      </dl> -->
      </div>
    </div>
    <div class="bottom_btn">
      <!-- <el-button type="primary" v-if="list.length != 0">重置模板</el-button> -->
      <el-button type="primary" @click="selTemplate" v-if="list.length == 0">确定</el-button>
    </div>
  </div>
</template>
<script>
import {
  queryProgram, //查询是否有分组
  addProgram
} from "@/api/program/index.js";
export default {
  data() {
    return {
      active: "",
      list: [],
      info:{},
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
    };
  },
  mounted() {
    
    this.isTemplate();
  },
  methods: {
    // searchProgram() {
    //   // 查询分组是否有模板
    //   var odata = {
    //     groupId: this.$store.state.groupId,
    //   };
    //   queryProgram(odata).then((res) => {
    //     if (res.data.code == 200) {
    //       if (res.data.data.length == 0) {
    //         this.info = res.data.data;
    //         //   查询当前组是否有模板
    //         this.isTemplate();
    //       }
    //     }
    //   });
    // },
    handleClickItem(id) {
      this.active = id;
    },
    isTemplate() {
      // 查询分组是否有模板
      var odata = {
        groupId: this.$store.state.groupId,
        partion:""
      };
      queryProgram(odata).then((res) => {
        if (res.data.code == 200) {
          if(res.data.data.length!==0){
            this.list = res.data.data;

            //当前默认选择一个
            // this.active = this.list[0].modelId;
          }
        }
      });
    },
    selTemplate() {
      // 选择模板
      var odata={
        "modelId": this.active,
        "programBroadcast": "",
        "programBroastStartTime": null,
        "programBroastStatus": "",
        "programBroastUrl": "",
        "programCreateTime": "",
        "programGroupId": this.$store.state.groupId,
        "programId": "",
        "programStartTime": "",
        "programType": "",
        "programUpdateTime": null
      }
      addProgram(odata).then(res=>{
        if (res.data.code == 200) {
          this.$message.success("操作成功");
          this.$router.push({
            name:"programManage"
          })
        }
      })
    },
  },
};
</script>
<style lang="scss">
.wrap {
  padding: 10px;
  height: 100%;
  overflow: hidden;
  background: #fff;
  margin-top: 10px;
  padding-bottom:4rem;
  .box {
    // height: 300px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    overflow:hidden;
    .item_box{
      // flex:1;
      img{
        width:100%;
        height:30rem;
        
      }
    }
    dl.cur {
      border: 3px solid rgb(30, 255, 0);
    }
    dl {
      width:70%;
      margin: 10px;
      flex: 1;
      border: 1px solid #ddd;
      line-height: 30px;
      margin:0 auto;
      // &:hover {
      //   border: 1px solid #f00;
      //   cursor: pointer;
      // }
      dt {
        display: flex;
        flex-flow: column;
        // height: 250px;
        .item {
          flex: 1;
          background: #efefef;
          margin: 5px;
        }
      }
      .nowTemplate {
        color: #f00;
      }
    }
  }
  .bottom_btn {
    padding: 30px 0 0;
    text-align: center;
  }
}
</style>