import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tesloApi from "../api/tesloApi";
import { LoginData, RegisterData, User } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: User | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: ( registerData: RegisterData ) => void;
    signIn: ( loginData: LoginData ) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}


export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    
    const [state, dispatch] = useReducer(authReducer, authInitialState);

    useEffect(() => {
        checkToken();
    },[]);

    const checkToken = async() => {
        const token = await  AsyncStorage.getItem('token');

       

        // No token, no autenticado
        if ( !token ) return dispatch({ type: 'notAuthenticated' });

        // Hay token
        try {
            const resp = await tesloApi.get('/auth/check-status');
    
            if ( resp.status !== 200 ) {
                return dispatch({ type: 'notAuthenticated' });
            };

            await AsyncStorage.setItem('token', resp.data.token);

            dispatch({
                type: 'signIn',
                payload: {
                    token: resp.data.token,
                    user: {
                        id: resp.data.id,
                        email: resp.data.email,
                        password: resp.data.password,
                        token: resp.data.token
                    }
                }
            });

        } catch (error: any) {
            // console.log('======ERROR=====',error)
            dispatch({ 
                type: 'addError',
                payload: error.response.data.message || 'Información incorrecta'
            })
        }
       

       
    }

    const signUp = async({ email, fullName, password }: RegisterData ) => {
        try {
            const { data } = await tesloApi.post('/auth/register', { email, fullName, password });

            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: {
                        id: data.id,
                        email: data.email,
                        password: '',
                        token: data.token,
                        fullName: data.fullName
                    }
                }
            });

            

        } catch (error: any) {
            dispatch({ 
                type: 'addError',
                payload: error.response.data.message || 'Información incorrecta'
            })
            // console.log('[2]',error.response.data.message);
        }
    };
    const signIn = async( { email, password }: LoginData ) => {

        try {
            const { data } = await tesloApi.post<User>('/auth/login', { email, password });
            
            dispatch({
                type: 'signIn',
                payload: {
                    token: data.token,
                    user: {
                        id: data.id,
                        email: data.email,
                        password: data.password,
                        token: data.token
                    }
                }
            });

            await AsyncStorage.setItem('token', data.token);

        } catch (error: any) {
            dispatch({ 
                type: 'addError',
                payload: error.response.data.message || 'Información incorrecta'
            });
            // console.log('[1]',error.response.data.message);
        }
    };
    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    };
    const removeError = () => {
        dispatch({ type: 'removeError' })
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,
        }}>
            { children }
        </AuthContext.Provider>
    )
}