
import AsyncStorage from "@react-native-async-storage/async-storage";
import tesloApi from "../../../api/tesloApi";
import { LoginData, RegisterData, User } from "../../../interfaces/authInterfaces"
import { AppDispatch } from "../../store";
import { signIn, addError, notAuthenticated, signUp  } from "./authSlice";




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

export const startSignUp = ({ email, fullName, password }: RegisterData ) => {
  return async (dispatch: AppDispatch) => {

    try {
        const { data } = await tesloApi.post<User>('/auth/register', { email, fullName, password });
  
        dispatch( signUp( data ) );
  
        
  
    } catch (error: any) {
      console.log('[error]', error.response.data.message)
      dispatch( addError( error.response.data.message || 'Información incorrecta signUp' ));
    }
  }
};

export const checkToken = () => {
  return async (dispatch: AppDispatch) => {
    const token = await  AsyncStorage.getItem('token');

    // No token, no autenticado
    if ( !token ) return dispatch( notAuthenticated( ));

    // Hay token
    try {
        const resp = await tesloApi.get('/auth/check-status');

        if ( resp.status !== 200 ) {
            return dispatch( notAuthenticated() );
        };

        await AsyncStorage.setItem('token', resp.data.token);

        dispatch(signIn( resp.data ))

    } catch (error: any) {
        // console.log('======ERROR=====',error)
        console.log('[error]', error.response.data.message)
        dispatch( addError( error.response.data.message || 'Información incorrecta check token' ));
    }
  }
}
