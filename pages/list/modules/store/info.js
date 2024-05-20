/* eslint-disable-next-line no-param-reassign */
import * as types from '../types/info';
// state
const state = {};

// mutations
const mutations = {
};
// actions
const actions = {
  [types.GET_LEVEL_MESSAGE](context, params = {}) {
    const url = '/cloudtf/activity/activityLevelMessage/getLevelMessage';
    return this.$http.post(url, params);
  },
  [types.UNLOCK_MESSAGE](context, params = {}) {
    const url = '/cloudtf/activity/activityLevelMessage/getUnlockMessage';
    return this.$http.post(url, params);
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
