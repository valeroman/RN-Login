import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';

import { Provider } from 'react-redux';
import { store } from './src/store';
import { ThemeProvider } from './src/helpers/providers/ThemeProvider';

const App = () => {

  return (
    <Provider store={ store }>
      <AppThemeState>
        <Navigator />
      </AppThemeState>
    </Provider>
  )
}

const AppThemeState = ({ children }: any) => {

  return (
    <ThemeProvider>
      { children }
    </ThemeProvider>
  )
}

export default App;