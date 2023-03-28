import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../interfaces/authInterfaces';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    user: User | null; 
}

const initialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: ( state, action: PayloadAction<User> ) => {
            state.status = 'authenticated'; 
            state.errorMessage = '';
            state.token = action.payload.token;
            state.user = action.payload;
        },
        signUp: ( state, action: PayloadAction<User> ) => {
            state.status = 'authenticated'; 
            state.errorMessage = '';
            state.token = action.payload.token;
            state.user = action.payload;
        },
        addError: ( state, action ) => {
            state.status = 'not-authenticated';
            state.errorMessage = action.payload;
            state.token = null;
            state.user = null;
        },
        removeError: ( state ) => {
            state.errorMessage = '';
        },
        logout: ( state ) => {
            state.status = 'not-authenticated';
            state.token = null;
            state.user= null;
        },
        notAuthenticated: ( state ) => {
            state.status = 'not-authenticated';
            state.token = null;
            state.user= null;
        },
       
    }
})

export const { signIn, signUp,  addError, removeError, logout, notAuthenticated } = authSlice.actions;