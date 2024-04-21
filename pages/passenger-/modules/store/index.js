/* eslint-disable-next-line no-param-reassign */
import * as types from '../types';

// state
const state = {
  curCity: '',
  curNavIndex: 0,
  startPlace: '出发地', //出发地
  startFormattedPlace: '', //更具人性化的描述的出发地
  startPosition: [], //包含startLatitude和startLongitude
  destination: '你要去哪儿', //目的地
  endPosition: [], //包含endLatitude和endLongitude
  driver: {}, //司机信息 包含Cartnumber:"赣A66666"cart: "红色●路虎Q5" id: "1" name: "李师傅" stars: "5.0 2w+单"
  cost: 0, //花费
  indexInfo: {}
};

// mutations
const mutations = {
  [types.SET_INDEX_INFO](state, indexInfo) {
    state.indexInfo = indexInfo;
  },
  [types.SET_CUR_NAV_INDEX](state, index) {
    console.info(index, "--------", this);
    state.curNavIndex = index;
  },
  [types.SET_PHONE](state, phone) {
    state.phone = phone;
  },
  [types.SET_START_PLACE](state, startPlace) {
    state.startPlace = startPlace;
  },
  [types.SET_FORMATTED_START_PLACE](state, startFormattedPlace) {
    state.startFormattedPlace = startFormattedPlace;
  },
  [types.SET_DESTINATION](state, destination) {
    state.destination = destination;
  },
  [types.SET_START_POSITION](state, startPosition) {
    state.startPosition = startPosition;
  },
  [types.SET_END_POSITION](state, endPosition) {
    state.endPosition = endPosition;
  },
  [types.SET_CUR_CITY](state, curCity) {
    state.curCity = curCity;
  },
  [types.SET_DRIVER](state, driver) {
    state.driver = driver;
  },
  [types.SET_COST](state, cost) {
    state.cost = cost;
  }
};
// actions
const actions = {
  /* [types.GET_INDEX_INFO](context, params) {
    console.info("========================",this.$http)
    return this.$http.get('/static/mock/didi/comments.json', {}).then(res => {
        console.log('全局http 更新用户信息 post success----期望custom 含有custom: 66');
        console.log(res, "====++++==");
        context.commit(types.SET_INDEX_INFO, params);
        return res;
      })
      .catch(err => {
        console.info(err, "[==d--d-d-]")
      });
  }, */
  [types.GET_DRIVERS](context, params) {
    return Promise.resolve({
      "errorCode": 200,
      "success": true,
      "data": {
        "drivers": [{
            "id": "0",
            "name": "@cword()师傅",
            "stars": "@float(1, 4, 1, 1) @integer(1, 9)w+单",
            "Cartnumber": "赣A30H75",
            "cart": "黑色●宝马Q@integer(1, 9)"
          },
          {
            "id": "1",
            "name": "@cword()师傅",
            "stars": "@float(1, 4, 1, 1) @integer(1, 9)w+单",
            "Cartnumber": "赣A66666",
            "cart": "红色●路虎Q@integer(1, 9)"
          },
          {
            "id": "2",
            "name": "@cword()师傅",
            "stars": "@float(1, 4, 1, 1) @integer(1, 9)w+单",
            "Cartnumber": "赣A365K2",
            "cart": "蓝色●奔驰Q@integer(1, 9)"
          },
          {
            "id": "3",
            "name": "@cword()师傅",
            "stars": "@float(1, 4, 1, 1) @integer(1, 9)w+单",
            "Cartnumber": "赣A85IHG",
            "cart": "白色●宝马Q@integer(1, 9)"
          },
          {
            "id": "4",
            "name": "@cword()师傅",
            "stars": "@float(1, 4, 1, 1) @integer(1, 9)w+单",
            "Cartnumber": "赣AHGN42",
            "cart": "白色●大众Q@integer(1, 9)"
          },
          {
            "id": "5",
            "name": "@cword()师傅",
            "stars": "@float(1, 4, 1, 1) @integer(1, 9)w+单",
            "Cartnumber": "赣A88888",
            "cart": "黑色●哈福Q@integer(1, 9)"
          }
        ],
      }
    });

  },
  [types.GET_TAB_MENUS](context, params) {
    return Promise.resolve({
      "errorCode": 200,
      "success": true,
      "data": {
        "tabMenus": [{
            "id": "0",
            "name": "预约",
            "url": "/static/img/car/cart1.png"
          },
          {
            "id": "1",
            "name": "飞机",
            "url": "/static/img/car/cart2.png"
          },
          {
            "id": "2",
            "name": "火车",
            "url": "/static/img/car/cart3.png"
          }
        ],
      }
    });

  },
  [types.GET_COST_DATA](context, params) {
    return Promise.resolve({
      "errorCode": 200,
      "success": true,
      "data": {
        "costData": [{
            "id": "0",
            "name": "现在出发",
            "url": "/static/img/time.png"
          },
          {
            "id": "1",
            "name": "换乘车人",
            "url": "/static/img/people.png"
          },
          {
            "id": "2",
            "name": "个人支付",
            "url": "/static/img/play.png"
          }
        ],
      }
    });
  },
  [types.GET_AD_SERVICE](context, params) {
    return Promise.resolve({
      "errorCode": 200,
      "success": true,
      "data": {
        "ads": ["/static/img/swiper/swiper-1.png", "/static/img/swiper/swiper-2.png",
          "/static/img/swiper/swiper-3.png"
        ],
      }
    });

  },
  [types.GET_INDEX_INFO](context, params) {
    return Promise.resolve({
      "errorCode": 200,
      "success": true,
      "data": {
        "waitingTimes": [
          "最快3分钟接驾",
          "最快2分钟接驾",
          "最快2分钟接驾",
          "最快1分钟接驾",
          "最快2分钟接驾",
          "最快4分钟接驾",
          "最快3分钟接驾",
          "最快5分钟接驾",
          "最快3分钟接驾",
          "附近暂无车可用，请稍等"
        ],
        "drivers": [{
            "id": "0",
            "name": "@cword()师傅",
            "stars": "@float(1, 4, 1, 1) @integer(1, 9)w+单",
            "Cartnumber": "赣A30H75",
            "cart": "黑色●宝马Q@integer(1, 9)"
          },
          {
            "id": "1",
            "name": "@cword()师傅",
            "stars": "@float(1, 4, 1, 1) @integer(1, 9)w+单",
            "Cartnumber": "赣A66666",
            "cart": "红色●路虎Q@integer(1, 9)"
          },
          {
            "id": "2",
            "name": "@cword()师傅",
            "stars": "@float(1, 4, 1, 1) @integer(1, 9)w+单",
            "Cartnumber": "赣A365K2",
            "cart": "蓝色●奔驰Q@integer(1, 9)"
          },
          {
            "id": "3",
            "name": "@cword()师傅",
            "stars": "@float(1, 4, 1, 1) @integer(1, 9)w+单",
            "Cartnumber": "赣A85IHG",
            "cart": "白色●宝马Q@integer(1, 9)"
          },
          {
            "id": "4",
            "name": "@cword()师傅",
            "stars": "@float(1, 4, 1, 1) @integer(1, 9)w+单",
            "Cartnumber": "赣AHGN42",
            "cart": "白色●大众Q@integer(1, 9)"
          },
          {
            "id": "5",
            "name": "@cword()师傅",
            "stars": "@float(1, 4, 1, 1) @integer(1, 9)w+单",
            "Cartnumber": "赣A88888",
            "cart": "黑色●哈福Q@integer(1, 9)"
          }
        ],
        "navData": [{
            "id": "0",
            "name": "预约",
            "url": "/static/img/car/cart1.png"
          },
          {
            "id": "1",
            "name": "飞机",
            "url": "/static/img/car/cart2.png"
          },
          {
            "id": "2",
            "name": "火车",
            "url": "/static/img/car/cart3.png"
          }
        ],
        // "imgUrls": ["/static/img/swiper/swiper-1.png", "/static/img/swiper/swiper-2.png",
        //   "/static/img/swiper/swiper-3.png"
        // ],
        "cost": [{
            "id": "0",
            "name": "现在出发",
            "url": "/static/img/time.png"
          },
          {
            "id": "1",
            "name": "换乘车人",
            "url": "/static/img/people.png"
          },
          {
            "id": "2",
            "name": "个人支付",
            "url": "/static/img/play.png"
          }
        ],

      }
    });
  },
  [types.SET_CUR_CITY](context, params) {
    context.commit(types.SET_CUR_CITY, params);
  },
  [types.SET_CUR_NAV_INDEX](context, params) {
    context.commit(types.SET_CUR_NAV_INDEX, params);
  },
  [types.SET_PHONE](context, params) {
    context.commit(types.SET_PHONE, params);
  },
  [types.SET_START_PLACE](context, params) {
    context.commit(types.SET_START_PLACE, params);
  },
  [types.SET_FORMATTED_START_PLACE](context, params) {
    context.commit(types.SET_FORMATTED_START_PLACE, params);
  },
  [types.SET_DESTINATION](context, params) {
    context.commit(types.SET_DESTINATION, params);
  },
  [types.SET_START_POSITION](context, params) {
    context.commit(types.SET_START_POSITION, params);
  },
  [types.SET_END_POSITION](context, params) {
    context.commit(types.SET_END_POSITION, params);
  },
  [types.SET_DRIVER](context, params) {
    context.commit(types.SET_DRIVER, params);
  },
  [types.SET_COST](context, params) {
    context.commit(types.SET_COST, params);
  }
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
