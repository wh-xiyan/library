import { Input, Text, View } from "@tarojs/components"
import { useEffect, useMemo, useState } from "react"
import PropTypes from 'prop-types'

import './index.scss'

function SearchBar(props) {
  const fontSize = 14
  const { value = '', focus = false, placeholder = '搜索', maxlength = 140, disabled = false, fixed = false, customStyle = {}, onChange = () => { }, onFocus = () => { }, onBlur = () => { }, onConfirm = () => { }, onScan = () => { } } = props

  const [isFocus, setFocus] = useState(false)

  useEffect(() => {
    setFocus(focus)
  }, [])

  // 聚焦时左移
  let placeholderWrapStyle = useMemo(() => {
    if (isFocus || (!isFocus && value)) {
      return {
        width: `${(placeholder.length + 2.5) * fontSize}px`,
        flexGrow: 0
      }
    } else if (!isFocus && !value) {
      return {
        flexGrow: 1
      }
    }
    return {}
  }, [isFocus, value])

  let placeholderStyle = useMemo(() => {
    if (!value) {
      return { visibility: 'visible' }
    }
    return { visibility: 'hidden' }
  }, [value])

  let clearIconStyle = useMemo(() => {
    if (!value) {
      return { display: 'none' }
    }
    return { display: 'flex' }
  }, [value])

  let scanIconStyle = useMemo(() => {
    if (!value) {
      return { display: 'flex' }
    }
    return { display: 'none' }
  }, [value])

  let rootCls = 'my-search-bar'
  if (fixed) {
    rootCls += 'my-search-bar--fixed'
  }

  const handleChange = (e, ...arg) => {
    onChange(e.target.value, ...arg)
  }

  const handleFocus = (...arg) => {
    setFocus(true)
    onFocus(...arg)
  }

  const handleBlur = (...arg) => {
    setFocus(false)
    onBlur(...arg)
  }

  const handleConfirm = (...arg) => {
    onConfirm(...arg)
  }

  const handleClear = (...arg) => { onChange('', ...arg) }

  const handleScan = (...arg) => { onScan(...arg) }
  return (
    <View className={rootCls} style={customStyle}>
      <View className='my-search-bar__input-container'>
        <View className='my-search-bar__placeholder-wrap'
          style={placeholderWrapStyle}>
          <Text className="at-icon at-icon-search"></Text>
          <Text className="my-search-bar__placeholder" style={placeholderStyle}>{placeholder}</Text>
        </View>
        <Input className='my-search-bar__input' confirmType="search" value={value} focus={focus} disabled={disabled} maxlength={maxlength} onInput={handleChange} onFocus={handleFocus} onBlur={handleBlur} onConfirm={handleConfirm}></Input>
        <View
          className='my-search-bar__clear'
          style={clearIconStyle}
          onClick={handleClear}
        >
          <Text className='at-icon at-icon-close' />
        </View>
        <View
          className='my-search-bar__scan'
          style={scanIconStyle}
          onClick={handleScan}
        >
          <Text className='icon icon-scan' />
        </View>
      </View>
    </View>
  )
}

SearchBar.PropTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  focus: PropTypes.bool,
  disabled: PropTypes.bool,
  fixed: PropTypes.bool,
  customStyle: PropTypes.object,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onConfirm: PropTypes.func,
  onScan: PropTypes.func
}

export default SearchBar