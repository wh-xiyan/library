import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counter/counterSlice'
import homeSlice from './home/homeSlice'

export default configureStore({
  reducer: {
    counterSlice,
    homeSlice
  }
})