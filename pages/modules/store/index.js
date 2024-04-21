/* eslint-disable-next-line no-param-reassign */
import {
  SET_CUR_NAV_INDEX
} from '../types';

// state
const state = {
  categories: [],
};

// mutations
const mutations = {
  [SET_CUR_NAV_INDEX](state, payload) {
    if (payload) state.categories = payload;
  },
};
// actions
const actions = {
  setCategories(context, payload) {
    context.commit(SET_CUR_NAV_INDEX, payload);
  },
};
const getters = {
  get: state => {
    return data => {
      return state[data];
    };
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
