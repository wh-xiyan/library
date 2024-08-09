import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Taro from "@tarojs/taro"
import { View } from "@tarojs/components"
import URL from '../../constants/url'
import Panel from '../../components/panel'
import FakeSearchBar from "../../components/fake-search-bar"

import { getNewBooks, getHotBooks, getRecommendBooks } from '../../store/home/homeSlice'

import "./index.scss"

definePageConfig({
  navigationBarTitleText: '首页',
})

function Home() {
  const { newBooks, hotBooks, recommendBooks } = useSelector((state) => state.homeSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    Taro.showToast({
      title: "说明",
      content: "本项目仅是学习使用，数据为随机生成，仅供演示",
      showCancel: false
    })
    dispatch(getNewBooks())
    dispatch(getHotBooks())
    dispatch(getRecommendBooks())
  }, [])

  // 跳转到搜索页
  const handleClick = () => {
    Taro.navigateTo({
      url: URL.SEARCH
    })
  }

  return (
    <View>
      <FakeSearchBar onClick={handleClick} />
      <Panel
        url={`${URL.BOOK_LIST}?type=new`}
        title="新书速递"
        className="panel--first"
        data={newBooks}
      />
      <Panel
        url={`${URL.BOOK_LIST}?type=hot`}
        title="近期热门"
        className='margin-top-lg'
        data={hotBooks}
      />
      <Panel
        url={`${URL.BOOK_LIST}?type=recommend`}
        title="为你推荐"
        className='margin-top-lg'
        data={recommendBooks}
      />
    </View>
  )
}

export default Home