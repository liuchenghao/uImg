/* eslint-disable-next-line no-param-reassign */
import * as types from './types';

// state
const state = {
  loginInfo: {
    userInfo: {},
    hasLogin: false,
    isDriver: false
  }
};

// mutations
const mutations = {
  [types.SET_LOGIN_INFO](state, info){
    console.info("-------info-------", info);
    state.loginInfo = info;
  },
};
// actions
const actions = {
  
};
const getters = {
  
};

export default {
  state,
  actions,
  getters,
  mutations,
};
