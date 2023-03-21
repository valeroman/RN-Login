

## Iniciar un proyecto en React-Native
```
npx react-native init AwesomeTSProject --template react-native-template-typescript

```

## Instalar iconos 

Documentación https://github.com/oblador/react-native-vector-icons#ios

####Configuracion en IOS:

instalar el paquete
```
yarn add react-native-vector-icons
yarn add -D @types/react-native-vector-icons
```
Abrir en el proyecto la carpeta `node_modules`
    - buscar la carpeta `react-native-vector-icon`
    - buscar la carpeta `Fonts`
    - buscar el archivo `Ionicons.ttf`

Abrir el workspace `xcode` del proyecto:
 - crear un new group llamado Fonts
 - Arrastrar el archivo `Ionicons.ttf` a la carpeta `Fonts` en xcode
 - seleccionamos: 
    - Destination: `copy item if needed`
    - Added folders: `Create folder references`
    - Add to target: `login`

Abrimos la carpeta login en xcode:
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
 


####Configuracion en Android:

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

###Stack Navigation
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

### Async - Storage 

Documentación: https://react-native-async-storage.github.io/async-storage/docs/install/


- Instalación de libreria: 
    ```yarn add @react-native-async-storage/async-storage```


- Realizar un `npx pod-install`

- Para usar esa libreria importamos:
    ```
    import AsyncStorage from '@react-native-async-storage/async-storage';
    ```





