import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { tesloApi } from '../api'

import { authSlice } from './slices/auth'
import { themeSlice } from './slices/theme'
import { userSlice } from './slices/user/userSlice'


export const store = configureStore({
  reducer: {
    // theme: themeSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer

    // [tesloApi.reducerPath]: tesloApi.reducer,
  },
  // middleware: getDefaultMiddleware =>
  // getDefaultMiddleware({
  //   thunk: {
  //     extraArgument: tesloApi
  //   }
  // })
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  //     .concat( tesloApi.middleware )
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
