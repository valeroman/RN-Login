import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
// import { Picker } from '@react-native-picker/picker';
import { KeyboardAvoidingView, Platform, Text, TextInput, View, Keyboard, TouchableOpacity, Alert } from 'react-native'
import { WhiteLogo } from '../components/WhiteLogo';

import { useAppDispatch, useAppSelector } from '../store';
import { removeError, startSignUp } from '../store/slices/auth';
import { loginStyles } from '../theme/loginTheme';
import { isValidEmail } from '../utils/validations';

type FormData = {
  fullName: string,
  email: string,
  password: string,
  password_repect: string,
}

interface Props extends StackScreenProps<any, any> {};

export const RegisterScreen = ({ navigation }: Props) => {

  // const [selectedLanguage, setSelectedLanguage] = useState();

  const dispatch = useAppDispatch();
  const { errorMessage } = useAppSelector( state => state.auth );



  const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const emailWatch = watch('email');
  const passwordWatch = watch('password');


  useEffect(() => {
    if ( errorMessage.length === 0 ) return;
 
    Alert.alert(
     'Register incorrecto',
     errorMessage.toString(),
     [
       {
         text: 'Ok',
         onPress: () => dispatch( removeError() )
       }
     ]
    )
   }, [ errorMessage ])

  const onRegister = (data: FormData) => {
    // console.log({ email, password, fullName });
    Keyboard.dismiss();
    dispatch( startSignUp({ email: data.email, password: data.password, fullName: data.fullName }))
  }


  return (
    // ! usamos fragment para que se pueda hacer scroll y el fondo se quede estatico
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#5856D6' }}
        behavior={ Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={ loginStyles.formContainer }>
          <WhiteLogo />

          <Text style={ loginStyles.title }>Registro</Text>

          <Text style={ loginStyles.label }>Nombre:</Text>
          <Controller 
            control={ control }
            name='fullName'
            rules={{ 
              required: 'fullName is required',
              minLength: { value: 3, message: 'fullName should be at leat 3 characters long' }
            }}
            render={({ field: { value, onBlur, onChange } }) =>
              <TextInput 
                placeholder='Ingrese su nombre'
                placeholderTextColor="rgba(255,255,255,0.4)"
                underlineColorAndroid="white"
                style={[
                  { borderColor: errors.email ? 'red' : 'white' },
                  loginStyles.inputField,
                  ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                ]}
                selectionColor="white"
                value={ value }
                onBlur={ onBlur }
                onChangeText={ onChange }
                onSubmitEditing={ handleSubmit( onRegister ) }
    
                autoCapitalize='words'
                autoCorrect={ false }
              />
            }
          />
           {errors.fullName && <Text style={{ color: 'red', alignSelf: 'stretch', fontWeight: 'bold' }}>{ errors.fullName?.message }</Text>}
          
           {/* <Text style={ loginStyles.label }>Pais:</Text>
           <View style={{ backgroundColor: 'red' }}>
            <Picker
                numberOfLines={2}
                // style={{  }}
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="node" value="node" />
                <Picker.Item label="flutter" value="flutter" />
                <Picker.Item label="Next" value="Next" />
                <Picker.Item label="Nest" value="Nest" />
                <Picker.Item label="React" value="React" />
                <Picker.Item label="React Native" value="rn" />
              </Picker>

           </View> */}


          <Text style={ loginStyles.label }>Email:</Text>
          <Controller 
            control={ control }
            name='email'
            rules={{
              required: 'email is required',
              validate:  value => isValidEmail(emailWatch) || "Email is invalid"
            }}
            render={({ field: { value, onBlur,onChange } }) => 
              <TextInput 
                placeholder='Ingrese su email'
                placeholderTextColor="rgba(255,255,255,0.4)"
                keyboardType='email-address'
                underlineColorAndroid="white"
                style={[
                  { borderColor: errors.email ? 'red' : 'white' },
                  loginStyles.inputField,
                  ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                ]}
                selectionColor="white"
    
                value={ value }
                onBlur={ onBlur }
                onChangeText={ onChange }
                onSubmitEditing={ handleSubmit( onRegister ) }
    
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
            render={({ field: { value, onBlur, onChange } }) => 
              <TextInput 
                placeholder='***********'
                placeholderTextColor="rgba(255,255,255,0.4)"
                underlineColorAndroid="white"
                secureTextEntry
                style={[
                  { borderColor: errors.email ? 'red' : 'white' },
                  loginStyles.inputField,
                  ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                ]}
                selectionColor="white"
                value={ value }
                onBlur={ onBlur }
                onChangeText={ onChange }
                onSubmitEditing={ handleSubmit( onRegister ) }
                autoCapitalize='none'
                autoCorrect={ false }
              />
            }
          />
          {errors.password && <Text style={{ color: 'red', alignSelf: 'stretch', fontWeight: 'bold' }}>{ errors.password.message }</Text>}

          <Text style={ loginStyles.label }>Password Repect:</Text>
          <Controller 
            control={ control }
            name="password_repect"
            rules={{ 
              required: 'password is required', 
              minLength: { value: 6, message: 'Password should be minimun 6 characters long' },
              validate: value => value == passwordWatch || 'Password do not match' 
            }}
            render={({ field: { value, onBlur, onChange } }) => 
              <TextInput 
                placeholder='***********'
                placeholderTextColor="rgba(255,255,255,0.4)"
                underlineColorAndroid="white"
                secureTextEntry
                style={[
                  { borderColor: errors.email ? 'red' : 'white' },
                  loginStyles.inputField,
                  ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                ]}
                selectionColor="white"
                value={ value }
                onBlur={ onBlur }
                onChangeText={ onChange }
                onSubmitEditing={ handleSubmit( onRegister ) }
                autoCapitalize='none'
                autoCorrect={ false }
              />
            }
          />
          {errors.password_repect && <Text style={{ color: 'red', alignSelf: 'stretch', fontWeight: 'bold' }}>{ errors.password_repect.message }</Text>}

          {/* Boton Login */}
          <View style={ loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={ 0.8 }
              style={ loginStyles.button }
              onPress={ handleSubmit( onRegister ) }
            >
              <Text style={ loginStyles.buttonText }>Crear cuenta</Text>
            </TouchableOpacity>
          </View>


          {/* Crear  una nueva cuenta */}
          <TouchableOpacity
            activeOpacity={ 0.8 }
            onPress={ () => navigation.replace('LoginScreen') }
            style={ loginStyles.buttonReturn }
          >
            <Text style={ loginStyles.buttonText }>Login</Text>
          </TouchableOpacity>
          
        </View>

      </KeyboardAvoidingView>

    </>
  )
}
