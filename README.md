

## Iniciar un proyecto en React-Native
```
npx react-native init AwesomeTSProject --template react-native-template-typescript

```

## Instalar iconos 

Documentación https://github.com/oblador/react-native-vector-icons#ios

#### Configuracion en IOS:

- instalar el paquete:
    ```
        yarn add react-native-vector-icons
        yarn add -D @types/react-native-vector-icons
    ```
- Abrir en el proyecto la carpeta `node_modules`
    - buscar la carpeta `react-native-vector-icon`
    - buscar la carpeta `Fonts`
    - buscar el archivo `Ionicons.ttf`

- Abrir el workspace `xcode` del proyecto:
    - crear un new group llamado Fonts
    - Arrastrar el archivo `Ionicons.ttf` a la carpeta `Fonts` en xcode
 - seleccionamos: 
    - Destination: `copy item if needed`
    - Added folders: `Create folder references`
    - Add to target: `login`

- Abrimos la carpeta login en xcode:
    - Seleccionamos el archivo `info.plist`
    - Click derecho => Open As => Source Code
    - copiamos dentro del archivo `info.plist` despues del tag `</false>`
    ```
    <key>UIAppFonts</key>
    <array>
    <string>AntDesign.ttf</string>
    <string>Entypo.ttf</string>
    <string>EvilIcons.ttf</string>
    <string>Feather.ttf</string>
    <string>FontAwesome.ttf</string>
    <string>FontAwesome5_Brands.ttf</string>
    <string>FontAwesome5_Regular.ttf</string>
    <string>FontAwesome5_Solid.ttf</string>
    <string>Foundation.ttf</string>
    <string>Ionicons.ttf</string>
    <string>MaterialIcons.ttf</string>
    <string>MaterialCommunityIcons.ttf</string>
    <string>SimpleLineIcons.ttf</string>
    <string>Octicons.ttf</string>
    <string>Zocial.ttf</string>
    <string>Fontisto.ttf</string>
    </array>

    ```
- Y solo dejamos el `<string>Ionicons.ttf</string>`, los demas los borramos

 ```
    <key>UIAppFonts</key>
    <array>
        <string>Ionicons.ttf</string>
    </array>
 ```

- Luego hacemos un `npx pod-install`, para instalar esas nuevas dependencias


- Corremos la aplicacion si sale el siguiente error:

```
error: Multiple commands produce '/Users/romanvalero/Library/Developer/Xcode/DerivedData/login-diopfeqmcnfxgofbdltuaszshxlw/Build/Products/Debug-iphonesimulator/login.app/Ionicons.ttf'
    note: Target 'login' (project 'login') has copy command from '/Users/romanvalero/react-native/login/ios/Fonts/Ionicons.ttf' to '/Users/romanvalero/Library/Developer/Xcode/DerivedData/login-diopfeqmcnfxgofbdltuaszshxlw/Build/Products/Debug-iphonesimulator/login.app/Ionicons.ttf'
    note: That command depends on command in Target 'login' (project 'login'): script phase “[CP] Copy Pods Resources”
note: Removed stale file '/Users/romanvalero/Library/Developer/Xcode/DerivedData/login-diopfeqmcnfxgofbdltuaszshxlw/Build/Intermediates.noindex/Pods.build/Debug-iphonesimulator/hermes-engine.build/InputFileList-46EB2E00018F70-hermes-engine-xcframeworks-input-files-2f1133f9de36360a0aa5246c567a3f30-resolved.xcfilelist'
```
- Abrimos el workspace `xcode` del proyecto:
    - Seleccionamos `Build Phases` y en `Copy Bundle Resources`
    - Eliminamos el archivo `Ionicons.ttf`
 


#### Configuracion en Android:

- Ir a la ruta dentro VSCode `android/app/build.gradle`
- pego el siguiente coodigo y solo coloco el archivo de Ionicons.ttf:
    ```
    project.ext.vectoricons = [
        iconFontNames: [ 'Ionicons.ttf' ]
    ]

    apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
    ```

## Instalar Navigation 

Documentación https://reactnavigation.org/docs/getting-started

- Instalación basica
    ```
    yarn add @react-navigation/native
    yarn add react-native-screens react-native-safe-area-context
    ```
- Realizar un `npx pod-install`


- Configuración adicional en Android:
    - Agregar en `android/app/src/main/java/<your package name>/MainActivity.java`


    ```
    import android.os.Bundle;

    public class MainActivity extends ReactActivity {
        // ...
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(null);
        }
        // ...
    }
    ```

- Colocar en el `App.jsx`:
    ```
    import * as React from 'react';
    import { NavigationContainer } from '@react-navigation/native';

    export default function App() {
        return (
            <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
        );
    }
    ```

### Stack Navigation
- Instalar:
    ```
    yarn add @react-navigation/stack
    yarn add react-native-gesture-handler
    ```

- Colocar en el `App.jsx` lo siguiente:
    ```
    import 'react-native-gesture-handler';
    ```
- Instalar:
    ```
    yarn add @react-native-masked-view/masked-view
    ```
- Luego hacemos un `npx pod-install`, para instalar esas   nuevas dependencias

###Ejemplo del Stack

```
    import { createStackNavigator } from '@react-navigation/stack';

    const Stack = createStackNavigator();

    function MyStack() {
        return (
            <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        );
    }
```

## Configuración de Redux - Redux Toolkit
Documentación: https://redux-toolkit.js.org/introduction/getting-started

- Instalación de paquetes:
 ``` yarn add @reduxjs/toolkit react-redux ```

### ConfigureStore y Slice

- Creamos la carpeta `store`, dentro del scr
- Creamos el archivo `store.ts`
-Agregamos el siguuiente codigo:

```
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
```
- Agregamos un archivo `index.ts`, dentro de la carpeta `store`
- Exportamos todo: `export * from './store';`

- Agregamos el Provider en el archivo `App.tsx`

```
import { Provider } from 'react-redux';
import { store } from './src/store/store';

const App = () => {

  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  )
}
```

- Creamos una nueva carpeta llamada `slices` dentro de la carpeta `store`

- Dentro de la carpeta `slices`, creamos la carpeta `theme`

- Creamos nuestro archivo `themeSlice.tsx`

- Agregamos el siguiente coodigo:
```
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
```
Agregamos un archivo `index.ts`, dentro de la carpeta `theme`

Exportamos todo: export * from './themeSlice';

- Agregamos un reducer al `store`
- Abrimos el archivo `store.ts`
- Agregamos el siguiente codigo: 
```
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { themeSlice } from './slices/theme'


export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
```

- Creamos el hook personalizado, para importar el `RootState` y el `AppDispatch`
- Dentro de la carpeta `store`, creamos el archivo `hooks.ts` y agregamos el siguiente codigo:
```
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```
- Lo exportamos al archivo `index.ts`

- Creamos los hooks `useTheme` y `useThemeStore`, en la carpta `src/hooks/theme`

- Agregamos un archivo `index.ts`, dentro de la carpeta `hooks/theme`

- Agregamos el codigo en el `useTheme`

```
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
```

- Agregamos el codigo en el `useThemeStore`

```
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
```

- Creamos la carpeta `helpers` y dentro de helpers creamos la carpeta `provider`
- Creamos el archivo `ThemeProvider.tsx`

- Agregamos el siguiente codigo:
```
import React, { useEffect } from 'react'
import { Appearance, AppState, View } from 'react-native'
import { useThemes, useThemeStore } from '../../hooks/theme';


export const ThemeProvider = ({ children }: any) => {

    const { setDarkTheme, setLightTheme } = useThemeStore();

    const { darkTheme, lightTheme } = useThemes();

    console.log('UNO');

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
```

- Modificamos el archivo `App.tsx` agregando:

```
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
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
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
```

- Ahora modificamos el archivo `Navigator.tsx` coneste codigo:
```
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
```

- Ahora el `App.tsx` queda asi:
```
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
```
### Thunks
Es una acción que es asincrona que dispara otra acción.

- Creamos el archivo `thunks.ts`, dentro de la carpeta `slices/auth`

- Codigo de ejemplo:
```
export const startLoginWithEmailPassword = ({ email, password }: LoginData) => {
  return async (dispatch: AppDispatch) => {

      try {
          const { data } = await tesloApi.post<User>('/auth/login', { email, password });
          dispatch( signIn( data ) );

          await AsyncStorage.setItem('token', data.token);
          
      } catch (error: any) {
          console.log('[error]', error.response.data.message)
          dispatch( addError( error.response.data.message || 'Información incorrecta Login' ));
      }

  }
}
```
### Axios
- Instalación de `axios`, para realizar peticiones `http`
`yarn add axios`

- Creamos la carpeta `api` dentro de la carpeta `scr`
- Creamos el archivo `tesloApi.tsx`
- Agregamos el siguiente codigo:
```

import axios  from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const baseURL = 'http://localhost:3001/api';

const tesloApi = axios.create({ baseURL });

tesloApi.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem('token');
        if ( token ) {
            config.headers["Authorization"] = `Bearer ${ token }`;
        }
        return config;
    }
)


export default tesloApi;
```



### Async - Storage
Documentación: https://react-native-async-storage.github.io/async-storage/docs/install/

- Instalación de libreria: 
`yarn add @react-native-async-storage/async-storage`

- Realizar un `npx pod-install`

- Para usar esa libreria importamos:

```import AsyncStorage from '@react-native-async-storage/async-storage';```

### React Hook Form
Documentación: https://react-hook-form.com/ 

- Instalación de libreria: 
`yarn add react-hook-form`

- Como se usa:
  - Importamos la libreria
    ```
    import { useForm, Controller } from 'react-hook-form';
    ```
  - Creamos un typado:
    ```
      type FormData = {
        email: string,
        password: string
      }
    ```
  - Agregamos el siguiente codigo:
    ```
      const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
      const emailWatch = watch('email'); // me permite observar si el campo email esta cambiando

      const onLogin = (data: FormData) => {
        Keyboard.dismiss();
        dispatch(startLoginWithEmailPassword({ email: data.email, password: data.password }));
      }
    ```
  - Utilizar en el input `email` los siguente:
    ```
    <Controller 
      control={ control }
      name="email"
      rules={{ 
        required: 'email is required',
        validate:  value => isValidEmail(emailWatch) || "Email is invalid"
      }}
      render={ ({ field: { value, onBlur, onChange } }) => 
        <TextInput 
          placeholder='Ingrese su email'
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType='email-address'
          underlineColorAndroid="white"
          value={ value }
          onBlur={ onBlur }
          onChangeText={ onChange }
          style={[
            {borderColor: errors.email ? 'red' : 'white'},
            loginStyles.inputField,
            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
          ]}
          selectionColor="white"
          onSubmitEditing={ handleSubmit(onLogin) }
          autoCapitalize='none'
          autoCorrect={ false }
        />
      }
    />
    {errors.email && <Text style={{ color: 'red', alignSelf: 'stretch', fontWeight: 'bold' }}>{ errors.email?.message }</Text>}
    ```

### Selector Picker
Documentación: https://www.npmjs.com/package/@react-native-picker/picker

- Instalación de libreria: 
`yarn add @react-native-picker/picker`

- Realizar un `npx pod-install`

- Importamos el paquete:
  ```
  import { Picker } from '@react-native-picker/picker';
  ```


