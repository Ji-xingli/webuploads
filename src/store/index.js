import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    groupId: 999,
    isSel:false
  },
  getters: {
    getGroupId(state) {
      return state.groupId;
    }
  },
  mutations: {
    setGroupId(state, groupId) {
        //设置保存选中组id
      state.groupId = groupId;
    },
    setSelGroupStatus(state, isSel){
        //设置组的状态
        state.isSel = isSel;
    },
  }
});
export default store;