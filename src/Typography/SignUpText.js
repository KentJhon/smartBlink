import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const SignUpText = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Create an Account
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
        paddingBottom: 30,
    },
    text: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black'
    },
  });

export default SignUpText