import React, { useEffect } from 'react'
import { Appearance, AppState, View } from 'react-native'
import { useThemes, useThemeStore } from '../../hooks/theme';


export const ThemeProvider = ({ children }: any) => {

    const { setDarkTheme, setLightTheme } = useThemeStore();

    const { darkTheme, lightTheme } = useThemes();

    useEffect(() => {
        AppState.addEventListener('change', ( status ) => {
            console.log({status});
            if ( status === 'active' ) {
                ( Appearance.getColorScheme() === 'light' )
                    ? setLightTheme(lightTheme)
                    : setDarkTheme(darkTheme)
            }
        });

    },[]);

    return (
        <>
            { children }
        </>
    )
}
