import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';

import { Provider } from 'react-redux';
import { store } from './src/store/store';

// import { ThemeProvider } from './src/helpers/providers/ThemeProvider';

const App = () => {

  return (
    <Provider store={ store }>
      <Navigator />
    </Provider>
  )
}

// const AppThemeState = ({ children }: any) => {

//   return (
//     <ThemeProvider>
//       { children }
//     </ThemeProvider>
//   )
// }

export default App;