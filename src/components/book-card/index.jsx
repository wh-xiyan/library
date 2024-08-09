import { View, Navigator, Image, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import URL from "../../constants/url";

import './index.scss'

function BookCard(props) {
  const { cardData, showArrow = true, onLongPress } = props

  const handleLongPress = (e) => {
    e.preventDefault()
    onLongPress(cardData.id)
  }

  return (
    <View onLongPress={handleLongPress}>
      <Navigator className="at-row at-row__align--start my-book-card" hoverClass="none" url={`${URL.BOOK_DETAIL}?id=${cardData.id}`}>
        <Image className='at-col at-col--auto my-book-card__img' src={cardData.image} mode='aspectFill' style={{ marginRight: Taro.pxTransform(24) }}></Image>
        <View className='at-col my-book-card__info'>
          <View className='my-book-card__info-title'>{cardData.title}</View>
          <View>
            评分：<Text class='color-warning'>{cardData.score}</Text>
            <Text>（{cardData.review_num}条评论）</Text>
          </View>
          <View>作者：{cardData.author}</View>
          <View>出版社：{cardData.publisher}</View>
          <View>出版日期：{cardData.pubdate}</View>
          <View>ISBN：{cardData.isbn}</View>
        </View>
        {showArrow && <Text className='at-icon at-icon-chevron-right panel-header__arrow at-col at-col-1 at-col--auto' style={{ alignSelf: 'center' }} />}
      </Navigator>
    </View>
  )
}

export default BookCard