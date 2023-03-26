import { PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import tesloApi from "../../../api/tesloApi";
import { LoginData, User } from "../../../interfaces/authInterfaces"
import { AppThunk, RootState } from "../../store"
import { signIn, addError, removeError } from "./authSlice";



export const startLoginWithEmailPassword = (): ThunkAction<void, RootState, unknown, PayloadAction<User>> => async (
    dispatch
  ) => {
    console.log('entro');
    try {
    //   dispatch(getUsersStart());
    //   const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
    //   dispatch(getUsersSuccess(response.data));
    } catch (error) {
    //   dispatch(getUsersFailure(error.message));
    console.log(error)
    }
  };

// export const startLoginWithEmailPassword = ({ email, password }: LoginData): AppThunk => {
// export const startLoginWithEmailPassword = (): AppThunk => {
//     return async (dispatch) => {
//         console.log('entro');
//         try {
//             const { data } = await tesloApi.post<User>('/auth/login', { email, password });
//             console.log('[DATA]', data);
//             dispatch(signIn({
//                 payload: {
//                     token: data.token,
//                     user: {
//                         id: data.id,
//                         email: data.email,
//                         password: data.password,
//                         token: data.token
//                     }
//                 }
//             }))
//         } catch (error: any) {
//             console.log('[error]', error)
//             dispatch( addError({ payload: error.response.data.message || 'Información incorrecta' }));
//         }

//     }
// }
