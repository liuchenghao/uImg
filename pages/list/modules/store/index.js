/* eslint-disable-next-line no-param-reassign */
import * as types from '../types/index';
// state
const state = {};

// mutations
const mutations = {
};
// actions
const actions = {
  [types.GET_PHOTO_LIST](context, params = {}) {
    const url = '/album/topic/getTopic';
    return this.$http.get(url, params);
  },
  [types.GET_TIME_LIST](context, params = {}) {
    const url = '/album/topic/getTopic';
    return this.$http.get(url, params);
  },
  [types.GET_INFO_LIST](context, params = {}) {
    const url = '/album/photo/getPhotoList';
    return this.$http.get(url, params);
  },
};
const getters = {
  get: state => {
    return data => {
      return state[data];
    };
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
