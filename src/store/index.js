import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    groupId: 999,
    groupLen:'',//分组的长度
    isSel:false
  },
  getters: {
    getGroupId(state) {
      return state.groupId;
    },
    getGroupLen(state) {
      return state.groupLen;
    }
  },
  mutations: {
    setGroupId(state, groupId) {
        //设置保存选中组id
      state.groupId = groupId;
    },
    setGroupLen(state, groupLen) {
      //设置分组长度
      state.groupLen = groupLen;
    },
    setSelGroupStatus(state, isSel){
        //设置组的状态
        state.isSel = isSel;
    },
  }
});
export default store;