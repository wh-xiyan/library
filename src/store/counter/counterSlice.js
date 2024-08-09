import { createSlice } from '@reduxjs/toolkit'

// state初始化
const initialState = {
  num: 0
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    add(state) {
      state.num++
    },
    minus(state) {
      state.num--
    }
  }
})

export const { add, minus } = counterSlice.actions

export default counterSlice.reducer