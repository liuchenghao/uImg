/**
 * JSONP请求
 * @param {string} url 请求的地址
 * @param {object} options 请求的参数
 * @param {Function} success 请求成功的回调
 * @param {Function} error 请求失败的回调
 */
export function getJSONP (url, options, success, error, complete) {
  var js = document.createElement('script');
  var callbackKey = options.callback || 'callback';
  var callbackName = '__callback' + Date.now();
  var timeout = options.timeout || 30000;
  var timing;
  function end (res) {
    clearTimeout(timing);
    delete window[callbackName];
    js.remove(); 
    if (typeof complete === 'function') {
      complete(res);
    }
  }
  window[callbackName] = (res) => {
    if (typeof success === 'function') {
      success(res);
    }
    end(res);
  };
  js.onerror = (err) => {
    if (typeof error === 'function') {
      error(err);
    }
    end(err);
  };
  timing = setTimeout(function () {
    if (typeof error === 'function') {
      error();
    }
    end({});
  }, timeout);
  js.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + callbackKey + '=' + callbackName;
  document.body.appendChild(js); 
}
