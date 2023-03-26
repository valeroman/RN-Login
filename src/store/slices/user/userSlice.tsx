import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User2 } from '../../../interfaces/types';

interface UserState {
  users: User2[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUsersSuccess: (state, action: PayloadAction<User2[]>) => {
      state.loading = false;
      state.users = action.payload;
    },
    getUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getUsersStart, getUsersSuccess, getUsersFailure } = userSlice.actions;

// export default userSlice.reducer;
