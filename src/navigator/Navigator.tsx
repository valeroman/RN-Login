import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../pages/LoginScreen';
import { RegisterScreen } from '../pages/RegisterScreen';
import { ProtectedScreen } from '../pages/ProtectedScreen';
import { useAppDispatch, useAppSelector } from '../store';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LoadingScreen } from '../pages/LoadingScreen';
import { checkToken } from '../store/slices/auth';



    const Stack = createStackNavigator();

    export const  Navigator = () => {

        const { theme } = useAppSelector( state => state.theme );
        const { status } = useAppSelector( state => state.auth );

        const dispatch = useAppDispatch();

        useEffect(() => {
            dispatch(checkToken());
        },[]);

        if ( status === 'checking' ) return <LoadingScreen />

        return (
           
            <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
                <NavigationContainer theme={ theme }>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                            cardStyle: {
                                // backgroundColor: 'white'
                            }
                        }}
                    >
                        {
                            ( status !== 'authenticated' ) 
                                ? (
                                    <>
                                        <Stack.Screen name="LoginScreen" component={ LoginScreen } />
                                        <Stack.Screen name="RegisterScreen" component={ RegisterScreen } />
                                    </>
                                )
                                   
                                : (
                                    <Stack.Screen name="ProtectedScreen" component={ ProtectedScreen } />
                                )
                        }
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        );
    }