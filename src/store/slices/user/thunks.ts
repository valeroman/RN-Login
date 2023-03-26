import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { User2 } from '../../../interfaces/types';
import { AppThunk, RootState } from '../../store';
import { getUsersFailure, getUsersStart, getUsersSuccess } from './userSlice';
// import { RootState } from './store';
// import { getUsersStart, getUsersSuccess, getUsersFailure } from './userSlice';
// import { User } from './types';

export const fetchUsers = (): ThunkAction<void, RootState, unknown, PayloadAction<User2[]>> => async (
  dispatch
) => {
    console.log('POR FIN')
//   try {
//     dispatch(getUsersStart());
//     const response = await axios.get<User2[]>('https://jsonplaceholder.typicode.com/users');
//     dispatch(getUsersSuccess(response.data));
//   } catch (error) {
//     dispatch(getUsersFailure(error.message));
//   }
};

// export const fetchUsers = (): AppThunk => {
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