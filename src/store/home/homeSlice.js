import { createSlice } from "@reduxjs/toolkit";
import API from '../../service/api'

const initialState = {
  newBooks: [],
  hotBooks: [],
  recommendBooks: []
}

// 新书上架
export const getNewBooks = () => async (dispatch) => {
  let result = await API.get("/books/new")
  dispatch(getFetchNewBooks(result))
}

// 热门图书
export const getHotBooks = () => async (dispatch) => {
  let result = await API.get("/books/hot")
  dispatch(getFetchHotBooks(result))
}

// // 推荐图书
export const getRecommendBooks = () => async (dispatch) => {
  let result = await API.get("/books/recommend")
  dispatch(getFetchRecommendBooks(result))
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getDisFavor(state, action) {
      const { id, type } = action.payload
      switch (type) {
        case "new":
          state.newBooks = state.newBooks.filter((item) => item.id !== id)
          break
        case "hot":
          state.hotBooks = state.hotBooks.filter((item) => item.id !== id)
          break
        case "recommend":
          state.recommendBooks = state.recommendBooks.filter((item) => item.id !== id)
          break
      }
    },
    getFetchNewBooks(state, action) {
      state.newBooks = action.payload?.data || []
    },
    getFetchHotBooks(state, action) {
      state.hotBooks = action.payload?.data || []
    },
    getFetchRecommendBooks(state, action) {
      state.recommendBooks = action.payload?.data || []
    }
  },
})

export const { getDisFavor, getFetchNewBooks, getFetchHotBooks, getFetchRecommendBooks } = homeSlice.actions

export default homeSlice.reducer