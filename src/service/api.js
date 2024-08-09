import Taro from '@tarojs/taro'
import BASE_URL from './config'
import interceptors from './interceptors'

interceptors.forEach((item) => Taro.addInterceptor(item))

const baseOption = (options, method = 'GET') => {
  let { url, data } = options
  let contentType = 'application/json'
  contentType = options.contentType || contentType
  const option = {
    url: url.indexOf('http') > -1? url : BASE_URL + url,
    data: data,
    method: method,
    timeout: 3000,
    header: {
      "content-type": contentType
    }
  }
  return Taro.request(option)
}

export default {
  get(url, data = "") {
    let option = { url, data }
    return baseOption(option)
  },
  post(url, data, contentType) {
    let option = { url, data, contentType }
    return baseOption(option, "POST")
  }
}