import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, Keyboard, Alert } from 'react-native'
import { Background } from '../components/Background'
import { WhiteLogo } from '../components/WhiteLogo'

import { useAppDispatch, useAppSelector } from '../store';
import { removeError, startLoginWithEmailPassword } from '../store/slices/auth';

import { loginStyles } from '../theme/loginTheme';
import { isValidEmail } from '../utils/validations';

type FormData = {
  email: string,
  password: string
}

interface Props extends StackScreenProps<any, any> {};

export const LoginScreen = ({ navigation }: Props) => {

  const dispatch = useAppDispatch();
  const { theme } = useAppSelector( state => state.theme );
  const { errorMessage } = useAppSelector( state => state.auth );

  const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const emailWatch = watch('email');

  const onLogin = (data: FormData) => {
    Keyboard.dismiss();
    dispatch(startLoginWithEmailPassword({ email: data.email, password: data.password }));
  }

  useEffect(() => {
   if ( errorMessage.length === 0 ) return;

   Alert.alert(
    'Login incorrecto',
    errorMessage.toString(),
    [
      {
        text: 'Ok',
        onPress: () => dispatch( removeError() )
      }
    ]
   )
  }, [ errorMessage ])
  
  return (
    // ! usamos fragment para que se pueda hacer scroll y el fondo se quede estatico
    <>
       {/* Background */}
      <Background />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={ Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={ loginStyles.formContainer }>
          <WhiteLogo />

          <Text style={{
            ...loginStyles.title,
            color: theme.colors.text
          }}>Login</Text>

          <Text style={ loginStyles.label }>Email:</Text>
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
         

          <Text style={ loginStyles.label }>Password:</Text>
          <Controller 
            control={ control }
            name="password"
            rules={{ 
                required: 'password is required', 
                minLength: { value: 6, message: 'Password should be minimun 6 characters long' } 
            }}
            render={ ({ field: { value, onBlur, onChange } }) => 
              <TextInput 
                placeholder='***********'
                placeholderTextColor="rgba(255,255,255,0.4)"
                underlineColorAndroid="white"
                secureTextEntry
                value={ value }
                onBlur={ onBlur }
                onChangeText={ onChange }
                style={[
                  {borderColor: errors.password ? 'red' : 'white'},
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
          {errors.password && <Text style={{ color: 'red', alignSelf: 'stretch', fontWeight: 'bold' }}>{ errors.password.message }</Text>}

          {/* Boton Login */}
          <View style={ loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={ 0.8 }
              style={ loginStyles.button }
              onPress={ handleSubmit(onLogin) }
            >
              <Text style={ loginStyles.buttonText }>Login</Text>
            </TouchableOpacity>
          </View>


          {/* Crear  una nnueva cuenta */}
          <View style={ loginStyles.newUserContainer }>
            <TouchableOpacity
              activeOpacity={ 0.8 }
              onPress={ () => navigation.replace('RegisterScreen') }
            >
              <Text style={ loginStyles.buttonText }>Nueva cuenta </Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>

    </>
  )
}


