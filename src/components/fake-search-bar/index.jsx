import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types'

import "./index.scss"

function FakeSearchBar(props) {
  return (
    <View className='my-fake-search-bar' onClick={props.onClick}>
      <View className='my-fake-search-bar__placeholder-wrap'>
        <Text className='at-icon at-icon-search' />
        <Text className='my-fake-search-bar__placeholder'>
          {props.placeholder}
        </Text>
      </View>
    </View>
  )
}

FakeSearchBar.PropTypes = {
  placeholder: PropTypes.string,
  onClick: PropTypes.func
}

FakeSearchBar.defaultProps = {
  placeholder: "搜索",
  onClick: () => { }
}

export default FakeSearchBar