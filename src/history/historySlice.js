import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cache: [],
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addCache: (state, action) => {
        state.cache.push(action.payload)
    },
    resetCache: (state) => {
      state.cache = []
    },
  },
})

export const { addCache, resetCache } = historySlice.actions
export default historySlice.reducer