import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import plugins from './plugins';
import index from './index';
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
  ...index,
  strict: debug,
  modules,
  plugins
});
