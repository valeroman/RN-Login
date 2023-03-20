import React from 'react'
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Background } from '../components/Background'
import { WhiteLogo } from '../components/WhiteLogo'
import { loginStyles } from '../theme/loginTheme';


export const LoginScreen = () => {
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

          <Text style={ loginStyles.title }>Login</Text>

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
            // TODO: onChange, value
            autoCapitalize='none'
            autoCorrect={ false }
          />

          <Text style={ loginStyles.label }>Password:</Text>
          <TextInput 
            placeholder='***********'
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
            ]}
            selectionColor="white"
            // TODO: onChange, value
            autoCapitalize='none'
            autoCorrect={ false }
          />

          {/* Boton Login */}
          <View style={ loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={ 0.8 }
              style={ loginStyles.button }
            >
              <Text style={ loginStyles.buttonText }>Login</Text>
            </TouchableOpacity>
          </View>


          {/* Crear  una nnueva cuenta */}
          <View style={ loginStyles.newUserContainer }>
            <TouchableOpacity
              activeOpacity={ 0.8 }
              onPress={ () => console.log('click')}
            >
              <Text style={ loginStyles.buttonText }>Nueva cuenta </Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>

    </>
  )
}


