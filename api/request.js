import {baseUrl} from './config'
import {showToast} from '@/common/utils/tools.js'

export function request(url, method = 'GET', data, header = {}) {
  return new Promise((resolve, reject) => {
    uni.showLoading({title: '玩命加载中...'})
    uni.request({
      url: baseUrl + url + ".json",
      method,
      data,
      header: {'Content-Type': 'json'},
      success: function (res) {
        if (res.statusCode === 200) {
			console.info(res.data)
		  let data = res.data
          resolve(data)
        } else {
          showToast('发生未知错误!')
          reject(res.data)
        }
      },
      fail: function () {
        showToast('获取数据失败!')
      },
      complete:function () {
        uni.hideLoading()
      }
    })
  })
}
