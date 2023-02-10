import { configureStore } from '@reduxjs/toolkit'
import historyReducer from '../history/historySlice'

export const store = configureStore({
  reducer: {
    history: historyReducer,
  },
})
