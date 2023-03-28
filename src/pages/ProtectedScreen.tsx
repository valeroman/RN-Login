import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../store/slices/auth';

export const ProtectedScreen = ()  => {

  const { user } = useAppSelector( state => state.auth );
  const dispatch = useAppDispatch();

  logout

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>ProtectedScreen</Text>

      <Button 
        title='logout'
        color="#5658D6"
        onPress={ () => dispatch(logout()) }
      />
      <Text>
        {
          JSON.stringify(user, null, 5)
        }
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  }
})
