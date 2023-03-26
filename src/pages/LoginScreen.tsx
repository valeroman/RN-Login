import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, Keyboard, Alert } from 'react-native'
import { useDispatch } from 'react-redux';
import { Background } from '../components/Background'
import { WhiteLogo } from '../components/WhiteLogo'
import { useForm } from '../hooks/useForm';
import { useAppSelector } from '../store';
import { removeError, startLoginWithEmailPassword } from '../store/slices/auth';
import { fetchUsers } from '../store/slices/user/thunks';

import { loginStyles } from '../theme/loginTheme';

interface Props extends StackScreenProps<any, any> {};

export const LoginScreen = ({ navigation }: Props) => {

  const dispatch = useDispatch();

  // const { theme } = useAppSelector( state => state.theme );
  const { errorMessage } = useAppSelector( state => state.auth );

  const { email, password, onChange} = useForm({
    email: '',
    password: ''
  });

  const onLogin = () => {
    console.log({ email, password });
    Keyboard.dismiss();
    // startLoginWithEmailPassword({ email, password });
    // startLoginWithEmailPassword();
    fetchUsers();
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
            // color: theme.colors.text
          }}>Login</Text>

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
            onSubmitEditing={ onLogin }

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
            onSubmitEditing={ onLogin }
            
            autoCapitalize='none'
            autoCorrect={ false }
          />

          {/* Boton Login */}
          <View style={ loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={ 0.8 }
              style={ loginStyles.button }
              onPress={ onLogin }
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


