import Request from '@/common/lib/request/index.js';
const getTokenStorage = () => {
  let token = '';
  try {
    token = uni.getStorageSync('token');
  } catch (e) {}
  return token;
};
const http = new Request();
http.setConfig((config) => {
  /* 设置全局配置 */
  // config.baseURL = 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest' 
  config.baseURL = 'http://localhost:8080';
  /* 根域名不同 */
  config.header = {
    ...config.header,
  };
  return config;
});
http.interceptors.request.use((config) => {
  const {
    custom: isRemoveToken
  } = config;
  /* 请求之前拦截器。可以使用async await 做异步操作 */
  config.header = {
    ...config.header,
    source: 2,
    rxToken: getTokenStorage()
  };
  // 是否去除token
  if (isRemoveToken) {
    delete config.custom.isRemoveToken;
    delete config.header.Authorization;
  }
  return config;
}, (config) => {
  return Promise.reject(config);
});
http.interceptors.response.use(async (response) => {
  let {
    data
  } = response;
  if (data.errorCode == 500) {
    uni.showModal({
      content: '系统繁忙，请稍后再试',
      showCancel: false
    });
    return Promise.reject(response);
  } else if (!data.success) {
    uni.showModal({
      content: data.message || '系统繁忙，请稍后再试',
      showCancel: false
    });
    return Promise.reject(response);
  }
  return data;
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
  return Promise.reject(response);
});
export {
  http
};
