import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const NoAccountPrompt = ({ setCurrentPanel }) => {
  
  const router = useRouter()
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Don't Have an Account? </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('signup')}> 
        <Text style={styles.signUp}>Sign Up</Text>
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
    text: {
      fontSize: 16,
    },
    signUp: {
        fontSize: 16,
        textDecorationLine: 'underline',
        color: '#0c3e27',
      },
  });

export default NoAccountPrompt