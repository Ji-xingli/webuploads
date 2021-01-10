<template>
  <div class="wrap">
    <div class="box">
      <dl
        v-for="(item, index) in templateList"
        :key="index"
        :class="active == index ? 'cur' : ''"
        @click="handleClickItem(item.modelId)"
      >
        <dt>
          <div class="item"></div>
          <div class="item" v-if="item.modelId == 1 || item.modelId == 2"></div>
          <div class="item" v-if="item.modelId == 2"></div>
        </dt>
        <dd>
          {{ item.text
          }}<span class="nowTemplate" v-if="active == index"
            >--当前选用模板</span
          >
        </dd>
      </dl>
    </div>
    <div class="bottom_btn">
      <el-button type="primary" v-if="list.length != 0">重置模板</el-button>
      <el-button type="primary" @click="selTemplate" v-else>确定</el-button>
    </div>
  </div>
</template>
<script>
import {
  queryProgram, //查询是否有分组
} from "@/api/program/index.js";
export default {
  data() {
    return {
      active: "",
      list: [],
      templateList: [
        {
          modelId: 0,
          text: "模板1",
        },
        {
          modelId: 1,
          text: "模板2",
        },
        {
          modelId: 2,
          text: "模板3",
        },
      ],
    };
  },
  mounted() {
    //   查询当前组是否有模板
    this.isTemplate();
  },
  methods: {
    handleClickItem(id) {
      this.active = id;
    },
    isTemplate() {
      // 查询分组是否有模板
      var odata = {
        groupId: this.$store.state.groupId,
      };
      queryProgram(odata).then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.data;
          this.active = this.list.length;
        }
      });
    },
    selTemplate() {
      // 选择模板
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
  .box {
    height: 300px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    dl.cur {
      border: 1px solid #f00;
    }
    dl {
      margin: 10px;
      flex: 1;
      border: 1px solid #ddd;
      line-height: 30px;
      &:hover {
        border: 1px solid #f00;
        cursor: pointer;
      }
      dt {
        display: flex;
        flex-flow: column;
        height: 250px;
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