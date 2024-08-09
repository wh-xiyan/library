import { useLaunch } from '@tarojs/taro'

import './app.scss'
import './assets/fonts/iconfont.css'

import { Provider } from 'react-redux'
import store from './store/index'

function App({ children }) {

  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return <Provider store={store}>{children}</Provider>
}
  


export default App
