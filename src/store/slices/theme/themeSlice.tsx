import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: {
        currentTheme: 'light',
        dark: false,
        dividerColor: 'rgba(0,0,0,0.7)',
        colors: {
            primary: '#084F6A',
            background: 'white',
            card: 'white',
            text: 'brown',
            border: 'black',
            notification: 'teal',
        },
    }
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        onSetLightTheme: ( state, action ) => {
            state.theme = action.payload; 
        },
        onSetDarkTheme: ( state, action ) => {
            state.theme = action.payload
        }
    }
})

export const { onSetLightTheme, onSetDarkTheme } = themeSlice.actions;