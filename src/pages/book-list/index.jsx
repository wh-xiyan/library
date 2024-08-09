import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { AtMessage, AtNoticebar } from "taro-ui"
import BookCard from '../../components/book-card'
import { getDisFavor } from '../../store/home/homeSlice'


definePageConfig({
  navigationBarTitleText: ''
})

function BookList() {
  const [type, setType] = useState()
  const [data, setData] = useState([])
  const [isShowNotice, setShowNotice] = useState(true)

  const { newBooks, hotBooks, recommendBooks } = useSelector((state) => state.homeSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    const page = Taro.getCurrentPages().pop()
    if (page) {
      const { type } = page.options
      initData(type)
    }
  }, [])

  useEffect(() => {
    if (type === 'new') {
      setData(newBooks)
    } else if (type === 'hot') {
      setData(hotBooks)
    } else {
      setData(recommendBooks)
    }
  }, [newBooks, hotBooks, recommendBooks])

  function initData(type) {
    switch (type) {
      case "new":
        Taro.setNavigationBarTitle({ title: '新书速递' })
        break
      case "hot":
        Taro.setNavigationBarTitle({ title: '近期热门' })
        break
      case "recommend":
        Taro.setNavigationBarTitle({ title: '为你推荐' })
        break
      default:
        break
    }
    setType(type)
  }

  // notice关闭
  const handleNoticeClose = () => {
    setShowNotice(false)
  }

  const onLongPress = (id) => {
    Taro.showActionSheet({
      itemList: ["不感兴趣"],
      success: () => {
        let param = { id: id, type: type }
        dispatch(getDisFavor(param))

        Taro.atMessage({
          message: "我们会减少此图书的出现频率"
        })
      },
      fail: () => {
        console.log('取消点击')
      }
    })
  }

  return (
    <View>
      <AtMessage />
      {isShowNotice && <AtNoticebar close onClose={handleNoticeClose}>长按标记不感兴趣的图书</AtNoticebar>}
      {data?.map((item) => {
        return (
          <BookCard cardData={item} key={item.id} onLongPress={onLongPress}></BookCard>
        )
      })}
    </View>
  )
}

export default BookList