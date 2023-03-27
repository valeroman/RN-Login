import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { pokemonSlice } from './slices/pokemon/pokemonSlice';



export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
