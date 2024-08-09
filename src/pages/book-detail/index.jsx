import { View, Text, Image } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { AtActivityIndicator } from "taro-ui"
import { useEffect, useState } from "react"

import API from '../../service/api'

import HorizonList from '../../components/horizon-list'
import Empty from "../../components/empty"

import './index.scss'

definePageConfig({
  navigationBarTitleText: '图书详情',
})

function BookDetail() {
  const [isFetching, setFetching] = useState(false)
  const [isError, setError] = useState(false)
  const [book, setBook] = useState({})
  const [routerParam, setRouterParam] = useState({})

  useEffect(async () => {
    const curPage = Taro.getCurrentPages().pop()
    if (curPage) {
      const { id, isbn } = curPage.options
      setRouterParam({ id, isbn })
      await loadData(id, isbn)
    }
  }, [])

  async function loadData(id, isbn) {
    setFetching(true)
    let result = {}
    try {
      if (id) {
        result = await API.get(`/books/${id}`)
      } else {
        result = await API.get(`/books/isbn/${isbn}`)
      }
      setBook(result)
    } catch (error) {
      console.log('error===', error)
      setError(true)
    } finally {
      setFetching(false)
    }
  }

  const onPreview = (url) => {
    Taro.previewImage({
      current: url,
      urls: [url],
      enablesavephoto: true
    })
  }

  const onReload = async () => {
    const { id, isbn } = routerParam
    await loadData(id, isbn)
  }

  return (
    <View>
      {!isFetching && !isError && (
        <>
          <View className='at-row at-row__align--start book'>
            <View className='at-col book__info'>
              <View className='book__info-title'>{book.title}</View>
              <View>
                评分：<Text class='color-warning'>{book.score}</Text>（
                {book.review_num}条评论）
              </View>
              <View>作者：{book.author}</View>
              <View>出版社：{book.publisher}</View>
              <View>出版日期：{book.pubdate}</View>
              <View>ISBN：{book.isbn}</View>
            </View>
            <Image
              className='at-col at-col--auto book__img'
              src={book.image}
              mode='widthFix'
              onClick={() => onPreview(book.image)}
            />
          </View>
          <View className='book-introduction'>
            <View className='book-introduction__title'>简介与目录</View>
            <View className='book-introduction__content'>
              {book.introduction}
            </View>
          </View>
          <View className='related-books'>
            <View className='related-books__title'>相关图书</View>
            <View className='related-books__content'>
              <HorizonList bookList={book.related_books} sideSpace={32} />
            </View>
          </View>
        </>
      )}
      {isFetching && (<AtActivityIndicator mode="center" content="加载中..."></AtActivityIndicator>)}
      {!isFetching && isError && (<Empty status='error' actions={[{ text: '重新加载', onClick: onReload }]} />)}
    </View>
  )
}

export default BookDetail