import { configureStore } from '@reduxjs/toolkit'

import { authSlice } from './slices/auth'
import { themeSlice } from './slices/theme'



export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    auth: authSlice.reducer,
  },
  
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

