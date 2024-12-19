import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const ForgotPassword = ({ setCurrentPanel }) => {

  const router = useRouter()
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.push('passwordrecovery')}> 
      <Text style={styles.signUp}>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
    },
    signUp: {
        fontSize: 16,
        fontWeight: 'semibold',
        color: '#0c3e27',
      },
  });

export default ForgotPassword