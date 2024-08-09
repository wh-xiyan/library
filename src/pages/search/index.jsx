import Taro from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import { useEffect, useMemo, useState } from "react"
import { AtActivityIndicator, AtTag } from "taro-ui"
import SearchBar from "../../components/search-bar"
import Empty from '../../components/empty'
import BookCard from '../../components/book-card'

import { isISBN } from "../../utils/validator"
import url from "../../constants/url"

import API from '../../service/api'

import './index.scss'

definePageConfig({
  navigationBarTitleText: '搜索',
})

let defaultState = {
  history: [],
  value: "",
  isSearching: false, // 每次搜索时重置
  isError: false,
  searchResults: []
}

function Search() {
  const [searchData, setSearchData] = useState(defaultState)

  useEffect(() => {
    const data = Taro.getStorageSync("history") || []
    setSearchData({ ...searchData, history: data })
  }, [])

  const showScan = useMemo(() => {
    return !searchData.isSearching && !searchData.isError && !(searchData.searchResults && searchData.searchResults.length)
  }, [searchData.isSearching, searchData.isError, searchData.searchResults])

  const showResults = useMemo(() => {
    return !searchData.isSearching && !searchData.isError && (searchData.searchResults && searchData.searchResults.length)
  }, [searchData.isSearching, searchData.isError, searchData.searchResults])

  const showHistory = useMemo(() => {
    return !searchData.isSearching && !searchData.isError && (searchData.searchResults && searchData.searchResults.length) && searchData.history.length
  }, [searchData.isSearching, searchData.isError, searchData.searchResults])

  const handleChange = (value) => {
    setSearchData({ ...searchData, value: value })
  }

  const handleConfirm = async (e) => {
    let value = e.target.value
    await handleSearch(value)
  }

  const handleSearch = async (value) => {
    try {
      addHistory(value)
      setSearchData({
        ...searchData,
        value,
        isSearching: true
      })
      let { data } = await API.get(`/books?keyword=${value}`)
      setSearchData({ ...searchData, isSearching: false, searchResults: data })
    } catch (_error) {
      setSearchData({ ...searchData, isSearching: false, isError: true })
    }
  }

  const addHistory = (value) => {
    value = value.trim()
    let history = searchData.history.filter((v) => v !== value)
    history.unshift(value)
    if (history?.length > 10) {
      history = history.slice(0, 10)
    }
    setSearchData({ ...searchData, history })
    Taro.setStorage({
      key: 'history',
      data: history
    })
  }

  const handleScan = () => {
    Taro.scanCode({
      scanType: ['barCode'],
      success: (res) => {
        if (!isISBN(res.result)) {
          Taro.showModal({
            title: "扫描内容不合法",
            content: "请扫描图书ISBN条形码",
            showCancel: false
          })
        } else {
          Taro.navigateTo({
            url: `${url.BOOK_DETAIL}isbn=${res.result}`
          })
        }
      },
      fail: () => {
        console.log('扫码失败')
        Taro.showToast({
          title: '扫码失败，请重试！',
          duration: 3000
        })
      }
    })
  }

  const handleError = async () => {
    await handleSearch(searchData.value)
  }

  const handleDeleteHistory = () => {
    Taro.showModal({
      title: '删除',
      content: '确定删除全部历史记录？',
      success: async (_res) => {
        await Taro.removeStorage("history")
        setSearchData({ ...searchData, history: [] })
      }
    })
  }

  const handleClickTag = async (name) => {
    await handleSearch(name)
  }
  return (
    <View className='container'>
      <SearchBar value={searchData.value} fixed focus onChange={handleChange} onConfirm={handleConfirm} onScan={handleScan} />
      {showScan && (
        <View
          className='scan-row at-row at-row__align--center'
          onClick={handleScan}
        >
          <View className='at-col'>扫描图书条形码</View>
          <Text className='scan-row__arrow at-icon at-icon-chevron-right at-col' />
        </View>
      )}
      {showHistory && (
        <View className='history-container'>
          <View className='at-row at-row__align--center'>
            <View className='history-title at-col'>搜索历史</View>
            <View
              className='history-delete at-col'
              onClick={handleDeleteHistory}
            >
              <View className='at-icon at-icon-trash' />
              {/* 清除 */}
            </View>
          </View>
          {searchData.history.map(item => {
            return (
              <AtTag
                className='history-item'
                key={item}
                name={item}
                onClick={() => handleClickTag(item.name)}
              >
                {item}
              </AtTag>
            );
          })}
        </View>
      )}
      {searchData.isSearching && <AtActivityIndicator mode="center" content="加载中..." />}
      {searchData.isError && <Empty status='network' actions={[{ text: '网络错误', onClick: { handleError } }]}></Empty>}
      {showResults && searchData.searchResults.map((item) => {
        return (
          <BookCard cardData={item} key={item.id} />
        )
      })}
    </View>
  )
}

export default Search