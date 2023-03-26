import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../pages/LoginScreen';
import { RegisterScreen } from '../pages/RegisterScreen';
import { ProtectedScreen } from '../pages/ProtectedScreen';
import { useAppSelector } from '../store';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';



    const Stack = createStackNavigator();

    export const  Navigator = () => {

        // const { theme } = useAppSelector( state => state.theme );

        return (
            <View style={{ flex: 1 }}>
                <NavigationContainer>
            {/* // <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
            //     <NavigationContainer theme={ theme }> */}
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                            cardStyle: {
                                // backgroundColor: 'white'
                            }
                        }}
                    >
                        <Stack.Screen name="LoginScreen" component={ LoginScreen } />
                        <Stack.Screen name="RegisterScreen" component={ RegisterScreen } />
                        <Stack.Screen name="ProtectedScreen" component={ ProtectedScreen } />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        );
    }