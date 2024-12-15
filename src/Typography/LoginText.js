import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const LoginText = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Log in To Your Account
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 30,
        paddingBottom: 75,
    },
    text: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black'
    },
  });

export default LoginText