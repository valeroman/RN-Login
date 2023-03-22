import { useDispatch, useSelector } from 'react-redux'
import { onSetDarkTheme, onSetLightTheme } from '../../store/slices/theme';
import { AppDispatch, RootState } from '../../store/store';
import { ThemeState } from '../theme';

export const useThemeStore = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { theme }: any = useSelector<RootState>( state => state.theme );

    const setDarkTheme = ( setDarkTheme: ThemeState ) => {
        dispatch( onSetDarkTheme( setDarkTheme ) );
    }

    const setLightTheme = ( setLightTheme: ThemeState ) => {
        dispatch( onSetLightTheme( setLightTheme ));
    }

    return {
        theme,
        setDarkTheme,
        setLightTheme
    }
}