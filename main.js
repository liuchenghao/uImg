import Vue from 'vue';
import App from './App';
// import store from './store'
import {
  http
} from '@/common/utils/http.js';
import QQMapWS from '@/common/lib/qqmap-ws-jssdk.js';
const qqMapWS = new QQMapWS({
  // key: __uniConfig.qqMapKey
  // key: "CD5BZ-ECWCX-LPF4D-TLHMR-P4STT-LUFYU"
  key: __uMa.qqMapKey
});
Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$map = qqMapWS; 
// Vue.prototype.$store = store
import store from '@/vuex/store';
Vue.prototype.$store = store;
store.$http = http;
App.mpType = 'app';
const app = new Vue({
  store,
  ...App
});
app.$mount(); 
