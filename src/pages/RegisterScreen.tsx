import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Text, TextInput, View, Keyboard, TouchableOpacity, Alert } from 'react-native'
import { WhiteLogo } from '../components/WhiteLogo'
import { useForm } from '../hooks/useForm'
import { useAppDispatch, useAppSelector } from '../store';
import { removeError, startSignUp } from '../store/slices/auth';
import { loginStyles } from '../theme/loginTheme';

interface Props extends StackScreenProps<any, any> {};

export const RegisterScreen = ({ navigation }: Props) => {

  const dispatch = useAppDispatch();
  const { errorMessage } = useAppSelector( state => state.auth );

  const { email, password, fullName, onChange} = useForm({
    fullName: '',
    email: '',
    password: ''
  });

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

  const onRegister = () => {
    console.log({ email, password, fullName });
    Keyboard.dismiss();
    dispatch( startSignUp({ email, password, fullName }))
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
          <TextInput 
            placeholder='Ingrese su nombre'
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
            ]}
            selectionColor="white"

            onChangeText={( value ) => onChange( value, 'fullName')}
            value={ fullName }
            onSubmitEditing={ onRegister }

            autoCapitalize='words'
            autoCorrect={ false }
          />

          <Text style={ loginStyles.label }>Email:</Text>
          <TextInput 
            placeholder='Ingrese su email'
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType='email-address'
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
            ]}
            selectionColor="white"

            onChangeText={( value ) => onChange( value, 'email')}
            value={ email }
            onSubmitEditing={ onRegister }

            autoCapitalize='none'
            autoCorrect={ false }
          />

          <Text style={ loginStyles.label }>Password:</Text>
          <TextInput 
            placeholder='***********'
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            secureTextEntry
            style={[
              loginStyles.inputField,
              ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
            ]}
            selectionColor="white"
            
            onChangeText={( value ) => onChange( value, 'password')}
            value={ password }
            onSubmitEditing={ onRegister }
            
            autoCapitalize='none'
            autoCorrect={ false }
          />

          {/* Boton Login */}
          <View style={ loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={ 0.8 }
              style={ loginStyles.button }
              onPress={ onRegister }
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
