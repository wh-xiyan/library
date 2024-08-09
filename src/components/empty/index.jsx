import { View, Image, Text } from "@tarojs/components"
import Taro from "@tarojs/taro"
import PropsType from "prop-types"
import { AtButton } from "taro-ui"

import './index.scss'

const defaultStatus = {
  empty: '../../assets/empty.png',
  error: '../../assets/empty.png',
  network: '../../assets/empty.png',
}

function Empty(props) {
  const { image, imageSize, title, description, status, actions } = props

  const imgSrc = typeof image === 'string' && image !== '' ? image : defaultStatus[status]
  const imgStyle = typeof imageSize === 'number' ? { width: Taro.pxTransform(imageSize), height: Taro.pxTransform(imageSize) } : { with: imageSize, height: imageSize }

  return (
    <View className='my-empty'>
      <Image className='my-empty-img' src={imgSrc} mode='aspectFit' style={imgStyle} />
      {typeof title === 'string' && title ? <View className='my-empty-title'>
        <Text>{title}</Text>
      </View> : title
      }
      {typeof description === 'string' && description ? <View className='my-empty-description'>
        <Text>{title}</Text>
      </View> : description
      }
      {actions.length && <View className="my-empty-actions">
        {actions.map((item) => {
          return (
            <AtButton size='small' circle type='primary' onClick={item.onClick}>{item.text}</AtButton>
          )
        })}
      </View>}
    </View>
  )
}

Empty.PropsType = {
  image: PropsType.string,
  imageSize: PropsType.number | PropsType.string,
  title: PropsType.string | PropsType.node,
  description: PropsType.string | PropsType.node,
  status: PropsType.string,
  actions: PropsType.array
}

Empty.defaultProps = {
  image: '',
  imageSize: '',
  title: '',
  description: '',
  status: 'empty',
  actions: []
}

export default Empty