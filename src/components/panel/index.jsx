import React, { Suspense } from 'react'
import { View, Text, Navigator } from "@tarojs/components"
import PropTypes from "prop-types"
import HorizonList from '../horizon-list'

import "./index.scss"

function Panel(props) {
  const { title = "", url = "", className, data } = props
  const rootCls = `my-panel ${className}`
  return (
    <View className={rootCls}>
      <Navigator url={url} hoverClass="none">
        <View className="my-panel-header at-row at-row__align--center">
          <View className="at-col">{title}</View>
          <Text className='my-panel-header__arrow at-icon at-icon-chevron-right at-col' />
        </View>
      </Navigator>
      <View className="my-panel-body">
        <Suspense fallback={<Loading />}>
          <HorizonList bookList={data} />
        </Suspense>
      </View>
    </View>
  )
}

Panel.PropTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
}

function Loading() {
  return (
    <h2>loading...</h2>
  )
}

export default Panel