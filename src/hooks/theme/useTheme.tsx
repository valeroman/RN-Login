import { Theme } from '@react-navigation/native';

export interface ThemeState extends Theme {

    currentTheme: 'light' | 'dark';
    dividerColor: string;
    secondaryColor: string;
}

export const useThemes = () => {

    const lightTheme: ThemeState = {
        currentTheme: 'light',
        dark: false,
        dividerColor: 'rgba(0,0,0,0.7)',
        colors: {
            primary: '#084F6A',
            background: 'white',
            card: 'white',
            text: 'red',
            border: 'black',
            notification: 'teal',
        },
        secondaryColor: '#D9D9DB'
    }
    
    const darkTheme: ThemeState = {
        currentTheme: 'dark',
        dark: true,
        dividerColor: 'rgba(255,255,255,0.6)',
        colors: {
            primary: '#75CEDB',
            background: 'black',
            card: 'white',
            text: 'white',
            border: 'white',
            notification: 'teal',
        },
        secondaryColor: 'white'
    }

    return {
        lightTheme,
        darkTheme,
    }
}