import Taro from "@tarojs/taro"

/*获取当前页面url*/
export function getCurrentPageUrl() {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let path = currentPage.router?.path
  return path
}